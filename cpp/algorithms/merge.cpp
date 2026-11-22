#include "includes/algorithms.h"

void merge(std::vector<int>& array, int low, int mid, int high, Record& rec)
{
	std::vector<int> temp;
	temp.reserve(high - low + 1);

	int i = low, j = mid + 1;
	int lastK = -1;

	while (i <= mid && j <= high)
	{
		rec.add("noswap", lastK, i, j);
		bool takeLeft = array[i] <= array[j];
		int value = takeLeft ? array[i] : array[j];
		int k = low + static_cast<int>(temp.size());
		temp.push_back(value);

		rec.add("set", i, k, -1, value);
		rec.add("noswap", j, -1, -1);
		lastK = k;

		if (takeLeft) i++;
		else j++;
	}

	while (i <= mid)
	{
		int k = low + static_cast<int>(temp.size());
		temp.push_back(array[i]);
		rec.add("set", lastK, k, -1, array[i]);
		lastK = k;
		i++;
	}

	while (j <= high)
	{
		int k = low + static_cast<int>(temp.size());
		temp.push_back(array[j]);
		rec.add("set", lastK, k, -1, array[j]);
		lastK = k;
		j++;
	}

	for (int t = 0; t < static_cast<int>(temp.size()); t++)
	{
		array[low + t] = temp[t];
	}
	rec.add("noswap", lastK, -1, -1);
}

void mergeSortAlg(std::vector<int>& array, int low, int high, Record& rec)
{
	if (low >= high) return;
	
	int mid = low + (high - low) / 2;

	mergeSortAlg(array, low, mid, rec);
	mergeSortAlg(array, mid + 1, high, rec);
	merge(array, low, mid, high, rec);
}

std::vector<Events> mergeSort(std::vector<int>& array)
{
	Record rec;
	mergeSortAlg(array, 0, array.size() - 1, rec);
	return rec.events;
}
