#include "../includes/algorithms.h"


std::vector<Events> bubbleSort(std::vector<int>& array)
{
	std::vector<Events> events;
	int step = 1;

	for (size_t i = 1; i < array.size(); i++)
	{
		bool swapped = false;
		for (size_t j = 0; j < array.size() - i; j++)
		{
			Events newEvent;
			newEvent.step = step++;
			if (array[j] > array[j + 1])
			{
				newEvent.eventDesc = "Swapped " + std::to_string(array[j]) + " with " + std::to_string(array[j + 1]);
				int temp = array[j];
				array[j] = array[j + 1];;
				array[j + 1] = temp;
				swapped = true;
			}
			else
			{
				newEvent.eventDesc = "No swaps " + std::to_string(array[j]) + " with " + std::to_string(array[j + 1]);
			}
			newEvent.array = array;
			events.push_back(newEvent);
		}
		if (!swapped) break;
	}

	return events;
}
