let Module;
const size = 20;
let array = [];

async function initializeEngine()
{
	Module = await createModule();
	console.log("C++ engine loaded.");
}

initializeEngine();

function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomArray()
{
	for (let i = 0; i < size; i++)
	{
		array[i] = Math.floor(Math.random() * 100) + 1;
	}
	renderBars();
}

function renderBars()
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

async function startSorting()
{
	if (!Module) return;
	if (array.length === 0) return;

	const input = new Module.InpVec();
	for (let i = 0; i < size; i++)
	{
		input.push_back(array[i]);
	}

	const algorithm = document.getElementById("algo").value;
	renderBars(array);
	let result;
	
	if (algorithm === "bubbleSort")
	{
		result = Module.bubbleSort(input);
	}
	
	const stepCount = document.getElementById("stepCount");
	const step= document.getElementById("step");

	for (let i = 0; i < result.size(); i++)
	{
		stepCount.innerHTML = `Step of ${i + 1} / ${result.get(result.size() - 1).step}`;
		step.innerHTML = `${result.get(i).eventDesc}`;
		await sleep(2000);
	}
}
