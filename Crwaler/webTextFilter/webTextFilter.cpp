#include "webTextFilter.hpp"
#include <curlpp/Easy.hpp>
#include <curlpp/Options.hpp>
#include <curlpp/Infos.hpp>
#include <curlpp/Exception.hpp>
#include <gumbo.h>
#include <sstream>
#include <iostream>
#include <unordered_map>
#include <regex>
#include <algorithm>
#include <memory>
#include <string>
#include <exception>

std::unique_ptr<std::string> WebTextFilter::fetchPageContent() const
{
    try {
        std::ostringstream html_os;
        curlpp::Cleanup cleanup;
        curlpp::Easy request;
        request.setOpt(curlpp::options::Url(m_url));
        request.setOpt(curlpp::options::WriteStream(&html_os));
        request.perform();

        long http_code = 0;
        curlpp::infos::ResponseCode::get(request, http_code);

        if (http_code == 200) {
            return std::make_unique<std::string>(html_os.str());
        } else {
            std::cerr << "HTTP error code " << http_code << " received while fetching URL: " << m_url << std::endl;
            return nullptr;
        }
    } catch (const curlpp::RuntimeError& e) {
        std::cerr << "Runtime error occurred while fetching URL " << m_url << ": " << e.what() << std::endl;
        return nullptr;
    } catch (const curlpp::LogicError& e) {
        std::cerr << "Logic error occurred while setting up request for URL " << m_url << ": " << e.what() << std::endl;
        return nullptr;
    } catch (const std::exception& e) {
        std::cerr << "Standard exception occurred: " << e.what() << std::endl;
        return nullptr;
    } catch (...) {
        std::cerr << "Unknown exception occurred." << std::endl;
        return nullptr;
    }
}

// פונקציה רקורסיבית שעוברת על כל העץ ומחזירה את הטקסט הנקי
void WebTextFilter::extract_text(const GumboNode* node, std::string& output) {
    if (node->type == GUMBO_NODE_TEXT) {
        output.append(node->v.text.text);
        output.append(" ");
    } else if (node->type == GUMBO_NODE_ELEMENT && node->v.element.tag != GUMBO_TAG_SCRIPT && node->v.element.tag != GUMBO_TAG_STYLE) {
        const GumboVector* children = &node->v.element.children;
        for (unsigned int i = 0; i < children->length; ++i) {
            extract_text(static_cast<GumboNode*>(children->data[i]), output);
        }
    }
}

// פונקציה לניקוי טקסט מ-HTML
std::string WebTextFilter::cleanTextFromHTML(const std::string& html) {
    GumboOutput* output = gumbo_parse(html.c_str());//יוצר עץ html
    std::string clean_text;
    extract_text(output->root, clean_text);
    gumbo_destroy_output(&kGumboDefaultOptions, output);

    // הסרת רווחים כפולים ומילים מיותרות
    std::regex whitespace("\\s+");
    clean_text = std::regex_replace(clean_text, whitespace, " ");

    // הסרת פסיקים, תווים מיוחדים, מספרים ותווים נוספים
    std::regex special_chars("[,.;:!&/?\"'()\\[\\]{}<>|0-9+\\-*#₪$%]");
    clean_text = std::regex_replace(clean_text, special_chars, "");

    return clean_text;
}

// פונקציה שמקבלת טקסט ומחזירה מילון של מילים ומספר הפעמים שכל מילה מופיעה
std::unordered_map<std::string, std::unordered_map<std::string, int>> WebTextFilter::wordFrequency(const std::string& text) {
    std::unordered_map<std::string, std::unordered_map<std::string, int>> word_count;
    std::istringstream stream(text);//ממיר את הטקסט למילים נפרדות
    std::string word;

    while (stream >> word) {
        // המרת המילה לאותיות קטנות (לא נדרש עבור עברית, אך שומר על עקביות)
        std::transform(word.begin(), word.end(), word.begin(), ::tolower);

        // עדכון המילה במילון
        if (!word.empty()) {
            word_count[word][m_url]++;
        }
    }

    return word_count;
}
