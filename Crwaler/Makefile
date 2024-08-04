CXX = g++
CC = $(CXX)

# הגדרות לקומפילציה
CXXFLAGS = -std=c++17 -pedantic -Wall -Wconversion -Werror

LDFLAGS = -lcurlpp -lcurl -lgumbo -lmongocxx -lbsoncxx

# מטרות לבניית הפרויקט
main: clean main.o webTextFilter/webTextFilter.o
	export LD_LIBRARY_PATH=/usr/local/lib:$$LD_LIBRARY_PATH && \
	$(CXX) $(CXXFLAGS) -o main main.o webTextFilter/webTextFilter.o $(LDFLAGS)

main.o: main.cpp
	$(CXX) $(CXXFLAGS) -c main.cpp

webTextFilter/webTextFilter.o: webTextFilter/webTextFilter.cpp
	$(CXX) $(CXXFLAGS) -c webTextFilter/webTextFilter.cpp -o webTextFilter/webTextFilter.o

check: main
	export LD_LIBRARY_PATH=/usr/local/lib:$$LD_LIBRARY_PATH && ./main

clean:
	rm -f *.o webTextFilter/*.o main error_report_url.txt

