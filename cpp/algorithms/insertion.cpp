#include "includes/algorithms.h"

std::vector<Events> insertionSort(std::vector<int>& array)
{
	std::vector<Events> events;
	int step = 1;
	
	for (size_t i = 1; i < array.size(); i++)
	{
		size_t j;

		for (j = i; j > 0; j--)
		{
			Events newEvent;
			newEvent.step = step++;
			newEvent.desc = "noswap";
			newEvent.prev = j > 0 ? j - 1 : 0;
			newEvent.cur = static_cast<int>(j - 1);
			newEvent.next = static_cast<int>(j);

			if (array[j] < array[j - 1]) 
			{
				int temp = array[j];
				array[j] = array[j - 1];
				array[j - 1] = temp;
				newEvent.desc = "swap";
				events.push_back(newEvent);
			}
			else
			{
				events.push_back(newEvent);
			}
		}
	}

	return events;
}
