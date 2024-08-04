#ifndef WEB_TEXT_FILTER_HPP
#define WEB_TEXT_FILTER_HPP

#include <string>
#include <regex>
#include <curlpp/cURLpp.hpp>
#include <curlpp/Easy.hpp>
#include <curlpp/Options.hpp>
#include <curlpp/Infos.hpp>
#include "gumbo.h"
#include <unordered_map>
#include <memory>

class WebTextFilter
{
public:
    WebTextFilter() = default;
    WebTextFilter(const std::string& url)
    : m_url(url) {}
    WebTextFilter(const WebTextFilter& other) = default;
    ~WebTextFilter() = default;

    std::unique_ptr<std::string> fetchPageContent() const;
    std::string cleanTextFromHTML(const std::string& html);
    std::unordered_map<std::string, std::unordered_map<std::string, int>> wordFrequency(const std::string& text);

private:
    void extract_text(const GumboNode* node, std::string& output);

    std::string m_url;
};

#endif // WEB_TEXT_FILTER_HPP
