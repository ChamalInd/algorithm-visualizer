#include "includes/algorithms.h"

std::vector<Events> insertionSort(std::vector<int>& array)
{
	Record rec;	
	for (size_t i = 1; i < array.size(); i++)
	{
		size_t j;

		for (j = i; j > 0; j--)
		{
		
			if (array[j] < array[j - 1]) 
			{
				rec.add("swap", j > 0 ? j - 1 : 0, static_cast<int>(j - 1), static_cast<int>(j));
				std::swap(array[j], array[j - 1]);
			}
			else
			{
				rec.add("noswap", j > 0 ? j - 1 : 0, static_cast<int>(j - 1), static_cast<int>(j));
				break;
			}
		}
	}

	return rec.events;
}
