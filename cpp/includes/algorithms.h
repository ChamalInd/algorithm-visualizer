#pragma once

#include <iostream>
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

