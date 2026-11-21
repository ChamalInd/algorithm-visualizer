#include "includes/algorithms.h"


std::vector<Events> bubbleSort(std::vector<int>& array)
{
	std::vector<Events> events;
	int step = 1;

	for (size_t i = 1; i < array.size(); i++)
	{
		bool swapped = false;
		size_t j;
		for (j = 0; j < array.size() - i; j++)
		{
			Events newEvent;
			newEvent.step = step++;
			
			if (array[j] > array[j + 1])
			{
				newEvent.desc = "swap";
				int temp = array[j];
				array[j] = array[j + 1];;
				array[j + 1] = temp;
				swapped = true;
			}
			else
			{
				newEvent.desc = "noswap";
			}
			newEvent.prev = j > 0 ? j - 1 : 0;
			newEvent.cur = static_cast<int>(j);
			newEvent.next = static_cast<int>(j + 1);
			events.push_back(newEvent);
		}
			
		Events newEvent;
		newEvent.step = step++;
		newEvent.desc = "noswap";
		newEvent.prev = static_cast<int>(j - 1);
		newEvent.cur = -1;
		newEvent.next = -1;
		events.push_back(newEvent);
		if (!swapped) break;
	}

	return events;
}
