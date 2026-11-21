let Module;
const size = 10;

async function initializeEngine()
{
	Module = await createModule();
	console.log("C++ engine loaded.");
}

initializeEngine();

function generateRandomArray(size)
{
	const integers = [];
	for (let i = 0; i < size; i++)
	{
		integers[i] = Math.floor(Math.random() * 100) + 1;
	}
	return integers;
}

function startSorting()
{
	if (!Module) return;

	const array = generateRandomArray(size);
	const input = new Module.InpVec();
	for (let i = 0; i < size; i++)
	{
		input.push_back(array[i]);
	}

	const algorithm = document.getElementById("algo").value;
	
	if (algorithm === "bubbleSort")
	{
		const result = Module.bubbleSort(input);
	}
}
