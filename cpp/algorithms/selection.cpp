#include "includes/algorithms.h"

std::vector<Events> selectionSort(std::vector<int>& array)
{
	std::vector<Events> events;
	int step = 1;
	
	for (size_t i = 0; i < array.size() - 1; i++)
	{
		int min = array[i];
		int index = i;
		size_t j;

		for (j = i + 1; j < array.size(); j++)
		{
			Events newEvent;
			newEvent.step = step++;
			newEvent.desc = "noswap";
			newEvent.prev = j > 0 ? j - 1 : 0;
			newEvent.cur = static_cast<int>(i);
			newEvent.next = static_cast<int>(j);
			events.push_back(newEvent);

			if (array[j] < min) 
			{
				min = array[j];
				index = j;
			}		
		}
		Events newEvent;
		newEvent.step = step++;
		newEvent.desc = "noswap";
		newEvent.prev = static_cast<int>(j - 1);
		newEvent.cur = static_cast<int>(i);
		newEvent.next = index;
		
		if (index != static_cast<int>(i))
		{
			int temp = array[i];
			array[i] = array[index];
			array[index] = temp;
			newEvent.desc = "swap";
		}
		events.push_back(newEvent);
		
		newEvent.step = step++;
		newEvent.desc = "noswap";
		newEvent.prev = (index != static_cast<int>(i)) ? index : -1;
		newEvent.cur = -1;
		newEvent.next = -1;
		events.push_back(newEvent);
	}

	return events;
}
