let Module;
const size = 20;

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

function renderBars(array)
{
	const container = document.getElementById("bar-container");
	container.innerHTML = "";

	for (let i = 0; i < size; i++)
	{
		const bar = document.createElement("div");
		bar.classList.add("bar");

		bar.style.height = `${array[i] * 6}px`;
		
		container.appendChild(bar);
	}
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
	renderBars(array);
	
	if (algorithm === "bubbleSort")
	{
		const result = Module.bubbleSort(input);
	}
}
