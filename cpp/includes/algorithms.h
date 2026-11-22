#pragma once

#include <string>
#include <vector>
#include <emscripten/bind.h>

struct Events
{
	int step;
	std::string desc;
	int prev;
	int cur;
	int next;
};

std::vector<Events> bubbleSort(std::vector<int>& array);
std::vector<Events> selectionSort(std::vector<int>& array);
std::vector<Events> insertionSort(std::vector<int>& array);

