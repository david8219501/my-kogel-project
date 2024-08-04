#ifndef THREADS_SAFE_SET_H
#define THREADS_SAFE_SET_H

#include <set>
#include <string>
#include <mutex>
#include <condition_variable>


template <typename T>
class SafeSet
{
    public:
    
        SafeSet();

        SafeSet(const SafeSet& other) = de;

        ~SafeSet() = default;

        SafeSet& operator=(const SafeSet& other) = delete;

        typename std::set<T>::iterator find(const T& value);

        typename std::set<T>::iterator end() 
;

        bool insert(const T& value);

        size_t size() const;

    private:
    
        std::set<T> m_set;

        mutable std::mutex m_mtx;
};

template <typename T>
SafeSet<T>::SafeSet() 
    : m_set({})

{
}

template <typename T>
typename std::set<T>::iterator SafeSet<T>::find(const T& value) 
{
    std::unique_lock<std::mutex> guard{m_mtx};

    return m_set.find(value);
}


template <typename T>
typename std::set<T>::iterator SafeSet<T>::end() 
{
    std::unique_lock<std::mutex> guard{m_mtx};

    return m_set.end();
}

template <typename T>
bool SafeSet<T>::insert(const T& value)
{
    std::unique_lock<std::mutex> guard{m_mtx};

    return m_set.insert(value).second;
}

template <typename T>
size_t SafeSet<T>::size() const
{
    std::unique_lock<std::mutex> guard{m_mtx};

    return m_set.size();
}

#endif 