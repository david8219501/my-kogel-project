#ifndef THREADS_SAFE_VECTOR_H
#define THREADS_SAFE_VECTOR_H

#include <vector>
#include <mutex>
#include <cassert>
#include <optional>


template <typename T>
class SafeVector 
{
    public:
        SafeVector() = default;

        SafeVector(std::initializer_list<T> list);

        SafeVector(size_t size, const T& value = T());

        SafeVector(const std::vector<T>& vec);

        ~SafeVector() = default;

        SafeVector(const SafeVector& other) = delete;

        SafeVector operator=(const SafeVector& other) = delete;

        void push_back(const T& value);

        std::optional<T> pop_back();

        size_t size() const;

        T& at(size_t index);

        const T& at(size_t index) const;

        typename std::vector<T>::iterator begin();

        typename std::vector<T>::iterator end();

        typename std::vector<T>::const_iterator begin() const;

        typename std::vector<T>::const_iterator end() const;

    private:

        std::vector<T> m_vector;

        mutable std::mutex m_mtx;        mutable std::mutex m_mtx;

};

template <typename T>
SafeVector<T>::SafeVector(size_t size, const T& value)
    : m_vector(size, value)
{
}

template <typename T>
SafeVector<T>::SafeVector(std::initializer_list<T> list)
    : m_vector(list) 
{
}

template <typename T>
SafeVector<T>::SafeVector(const std::vector<T>& vec)
    : m_vector(vec)
{
}

template <typename T>
void SafeVector<T>::push_back(const T& value)
{
    std::lock_guard<std::mutex> guard(m_mtx);

    m_vector.push_back(value);
}

template <typename T>
std::optional<T> SafeVector<T>::pop_back() {

    std::lock_guard<std::mutex> guard(m_mtx);

    if(m_vector.empty()) {return std::nullopt;}

    T value = m_vector.back();

    m_vector.pop_back();

    return value;
}

template <typename T>
size_t SafeVector<T>::size() const
{
    std::lock_guard<std::mutex> guard(m_mtx);

    return m_vector.size();
}

template <typename T>
T& SafeVector<T>::at(size_t index)
{
    std::lock_guard<std::mutex> guard(m_mtx);

    return m_vector.at(index);
}

template <typename T>
const T& SafeVector<T>::at(size_t index) const
{
    std::lock_guard<std::mutex> guard(m_mtx);

    return m_vector.at(index);
}

template <typename T>
typename std::vector<T>::iterator SafeVector<T>::begin()
{
    std::lock_guard<std::mutex> guard(m_mtx);

    return m_vector.begin();
}

template <typename T>
typename std::vector<T>::iterator SafeVector<T>::end()
{
    std::lock_guard<std::mutex> guard(m_mtx);

    return m_vector.end();
}

template <typename T>
typename std::vector<T>::const_iterator SafeVector<T>::begin() const
{
    std::lock_guard<std::mutex> guard(m_mtx);

    return m_vector.begin();
}

template <typename T>
typename std::vector<T>::const_iterator SafeVector<T>::end() const
{
    std::lock_guard<std::mutex> guard(m_mtx);

    return m_vector.end();
}


#endif