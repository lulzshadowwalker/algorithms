CXX ?= c++
CXXFLAGS ?= -std=c++20 -Wall -Wextra -Wpedantic -O0 -g
FILE ?= main.cpp
OUT := build/$(FILE:.cpp=)

.PHONY: all build run clean

all: run

build:
	mkdir -p build
	$(CXX) $(CXXFLAGS) $(FILE) -o $(OUT)

run: build
	./$(OUT)

clean:
	rm -rf build
