#include "includes/algorithms.h"

EMSCRIPTEN_BINDINGS(module)
{
	emscripten::value_object<Events>("Events")
		.field("step", &Events::step)
		.field("desc", &Events::desc)
		.field("prev", &Events::prev)
		.field("cur", &Events::cur)
		.field("next", &Events::next);

	emscripten::register_vector<int>("InpVec");
	emscripten::register_vector<Events>("OutVec");
	emscripten::function("bubbleSort", &bubbleSort);
	emscripten::function("selectionSort", &selectionSort);
	emscripten::function("insertionSort", &insertionSort);
}
