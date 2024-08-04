#ifndef THREADS_SAFE_QUEUE_H
#define THREADS_SAFE_QUEUE_H

#include <deque>
#include <initializer_list>
#include <mutex>
#include <condition_variable>
#include <iostream>
#include <cassert>


template <typename T>
class wordsFilter
{
    public:

        wordsFilter(T value, unsigned int num_workers, const T snare);

        wordsFilter(unsigned int num_workers, const T snare);

        wordsFilter() = delete;

        wordsFilter(const wordsFilter& other) = delete;

        ~wordsFilter() = default;

        wordsFilter& operator=(const wordsFilter& other) = delete;

        void push(const T& value);

        T pop();

    private:

        std::deque<T> m_queue;
        
        mutable std::mutex m_mtx;

        std::condition_variable m_cv;

        unsigned int m_num_workers;

        const T m_snare;

        int m_num_sleep_threads;
        
};


template <typename T>
wordsFilter<T>::wordsFilter(T value, const unsigned int num_workers, const T snare)
    : m_queue({value})
    , m_num_workers(num_workers)
    , m_snare(snare)
    , m_num_sleep_threads(0)
{
    assert(num_workers != 0);
}

template <typename T>
wordsFilter<T>::wordsFilter(const unsigned int num_workers, const T snare)
    : m_num_workers(num_workers)
    , m_snare(snare)
    , m_num_sleep_threads(0)
{
    assert(num_workers != 0);
}

template <typename T>
void wordsFilter<T>::push(const T& value)
{
    std::unique_lock<std::mutex> guard{m_mtx};

    m_queue.push_back(value); 
    
    m_cv.notify_one();

}
template <typename T>
T wordsFilter<T>::pop()
{
    std::unique_lock<std::mutex> guard{m_mtx};

    if(m_queue.empty()) {
         
         if(m_num_sleep_threads == static_cast<int>(m_num_workers - 1)) { return m_snare;}

        m_num_sleep_threads += 1;

        while (m_queue.empty())
        {
            m_cv.wait(guard);
        }
        m_num_sleep_threads -= 1;
    }

    T value = m_queue.front();

    m_queue.pop_front();

    return value;
}

#endif 