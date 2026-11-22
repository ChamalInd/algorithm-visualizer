#pragma once

#include <string>
#include <vector>
#include <utility>
#include <emscripten/bind.h>

struct Events
{
	int step;
	std::string desc;
	int prev;
	int cur;
	int next;
};

struct Record
{
	std::vector<Events> events;
	int step = 1;

	void add(const std::string s, int p, int c, int n)
	{
		Events e;
		e.step = step++;
		e.desc = s;
		e.prev = p;
		e.cur = c;
		e.next = n;
		events.push_back(e);
	}
};

std::vector<Events> bubbleSort(std::vector<int>& array);
std::vector<Events> selectionSort(std::vector<int>& array);
std::vector<Events> insertionSort(std::vector<int>& array);
std::vector<Events> quickSort(std::vector<int>& array, int low, int high);

