#include "includes/algorithms.h"

void quickSortAlg(std::vector<int>& array, int low, int high, Record& rec)
{
	if (low > high) return;
	if (low == high)
	{
		rec.add("noswap", -1, low, -1);
		return;
	}

	int pivot = low;
	int left = low + 1;
	int right = high;
	int last = -1;
	
	rec.add("noswap", -1, pivot, -1);

	while (right >= left)
	{
		while (right >= left && array[left] <= array[pivot]) 
		{
			rec.add("noswap", last, left, pivot);
			last = left;
			left++;

		}		
		while (right >= left && array[right] >= array[pivot]) 
		{
			rec.add("noswap", last, right, pivot);
			last = right;
			right--; 
		}
		if (right > left) 
		{
			rec.add("swap", last, left, right);
			rec.add("noswap", left, -1, -1);
			std::swap(array[left], array[right]);
			last = right;
		}
	}

	if (right != pivot)
	{
		rec.add("swap", last, pivot, right);
		rec.add("noswap", pivot, -1, -1);
		std::swap(array[right], array[pivot]);
	}
	else
	{
		rec.add("noswap", last, -1, -1);
	}

	quickSortAlg(array, low, right - 1, rec);
	quickSortAlg(array, right + 1, high, rec);
}

std::vector<Events> quickSort(std::vector<int>& array)
{
	Record rec;
	quickSortAlg(array, 0, array.size() - 1, rec);
	return rec.events;
}
