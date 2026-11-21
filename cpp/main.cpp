#include "includes/algorithms.h"

EMSCRIPTEN_BINDINGS(module)
{
	emscripten::value_object<Events>("Events")
		.field("step", &Events::step)
		.field("eventDesc", &Events::eventDesc)
		.field("array", &Events::array);

	emscripten::register_vector<int>("InpVec");
	emscripten::register_vector<Events>("OutVec");
	emscripten::function("bubbleSort", &bubbleSort);
}
