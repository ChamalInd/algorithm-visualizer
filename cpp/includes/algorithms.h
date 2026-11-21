#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <emscripten/bind.h>

struct Events
{
	int step;
	std::string eventDesc;
	std::vector<int> array;
};

std::vector<Events> bubbleSort(std::vector<int>& array);

