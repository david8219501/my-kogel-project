#include <iostream>
#include "webTextFilter/webTextFilter.hpp"

int main() {
    std::string url = "https://translate.google.com/?sl=en&tl=iw&op=translate";
    WebTextFilter filter(url);
    std::unique_ptr<std::string> html_content = filter.fetchPageContent();

    if (html_content) {
        std::cout << "Raw HTML content:\n" << *html_content << std::endl;
        std::string clean_text = filter.cleanTextFromHTML(*html_content);
        std::cout << "--------------------------------------------------------------------------------------" << std::endl;
        std::cout << "Cleaned text:\n" << clean_text << std::endl;
        std::cout << "--------------------------------------------------------------------------------------" << std::endl;
        
        // קבלת המילון של מילים ומספר הפעמים שמופיעות
        auto frequencies = filter.wordFrequency(clean_text); 
        
        // הדפסת המילון
        for (const auto& pair : frequencies) {
            std::cout << "Word: " << pair.first << std::endl;
            for (const auto& url_freq : pair.second) {
                std::cout << "  URL: " << url_freq.first << " - Count: " << url_freq.second << std::endl;
            }
        }
    } else {
        std::cerr << "Failed to fetch or clean the content." << std::endl;
    }

    return 0;
}
