#include "includes/algorithms.h"

std::vector<Events> selectionSort(std::vector<int>& array)
{
	Record rec;
	for (size_t i = 0; i < array.size() - 1; i++)
	{
		int min = array[i];
		int index = i;
		size_t j;

		for (j = i + 1; j < array.size(); j++)
		{
			rec.add("noswap", j > 0 ? j - 1 : 0, static_cast<int>(i), static_cast<int>(j));

			if (array[j] < min) 
			{
				min = array[j];
				index = j;
			}		
		}
		
		if (index != static_cast<int>(i))
		{
			rec.add("swap", static_cast<int>(j - 1), static_cast<int>(i), index);
			std::swap(array[i], array[index]);
		}
		else
		{
			rec.add("noswap", static_cast<int>(j - 1), static_cast<int>(i), index);
		}
		
		rec.add("noswap", (index != static_cast<int>(i)) ? index : -1, -1, -1);
	}

	return rec.events;
}
