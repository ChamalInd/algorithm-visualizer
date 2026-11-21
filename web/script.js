let Module;

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

function bubbleSort()
{
	if (!Module) return;

	let size = 10;
	const array = generateRandomArray(size);

	for (let i = 0; i < size; i++)
	{
		console.log(array[i]);
	}

	const input = new Module.InpVec();
	for (let i = 0; i < size; i++)
	{
		input.push_back(array[i]);
	}
	const result = Module.bubbleSort(input);
	console.log("Sorted array:");

	for (let i = 0; i < size; i++)
	{
		const event = result.get(i);
		console.log(event.step, event.eventDesc);
	}
}
