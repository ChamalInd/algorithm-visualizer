#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <iomanip>

struct Events
{
	int step;
	std::string eventDesc;
	std::vector<int> array;
};

namespace algo
{
	std::vector<Events> bubbleSort(std::vector<int>& array);
};
