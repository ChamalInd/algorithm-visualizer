#include "includes/algorithms.h"

std::vector<Events> bubbleSort(std::vector<int>& array)
{
	Record rec;

	for (size_t i = 1; i < array.size(); i++)
	{
		bool swapped = false;
		size_t j;
		for (j = 0; j < array.size() - i; j++)
		{
			if (array[j] > array[j + 1])
			{
				rec.add("swap", j > 0 ? j - 1 : 0, static_cast<int>(j), static_cast<int>(j + 1));
				std::swap(array[j], array[j + 1]);
				swapped = true;
			}
			else
			{
				rec.add("noswap", j > 0 ? j - 1 : 0, static_cast<int>(j), static_cast<int>(j + 1));
			}
		}
			
		rec.add("noswap", static_cast<int>(j - 1), -1, -1);
		if (!swapped) break;
	}

	return rec.events;
}
