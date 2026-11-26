#include "includes/algorithms.h"

std::vector<Events> shellSort(std::vector<int>& array)
{
	Record rec;	
	size_t gap = array.size() / 2;
	while (gap >= 1)
	{
		for (size_t i = 0; i < array.size(); i += gap)
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

		gap /= 2;
	}

	return rec.events;
}
