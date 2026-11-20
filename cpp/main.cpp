#include "includes/algorithms.h"

int main()
{
	std::vector<int> a = {5, 3, 8, 2};
	std::vector<Events> events = algo::bubbleSort(a);

	for (Events e : events)
	{
		std::cout << e.step << ": " << std::left << std::setw(20) << e.eventDesc << " : ";
		for (int i : e.array)
		{
			std::cout << i << " ";
		}
		std::cout << std::endl;
	}
}
