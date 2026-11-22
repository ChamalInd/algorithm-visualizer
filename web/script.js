let Module;
let array = [];
let size = 0;
let sorted = true;
let resetted = true;

// initialize the c++ engine
async function initializeEngine()
{
	Module = await createModule();
	console.log("C++ engine loaded.");
}

initializeEngine();

// helper function to sleep
function sleep(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}

// setting slider values
const speedSlider = document.getElementById("speed");
const speedText = document.getElementById("speedText");
speedSlider.addEventListener("input", () => {
	speedText.innerText = `${Number(speedSlider.value)}`;
});

const sizeSlider = document.getElementById("size");
const sizeText = document.getElementById("sizeText");
sizeSlider.addEventListener("input", () => {
	sizeText.innerText = `${Number(sizeSlider.value)}`;
});

function generateRandomArray()
{
	if (!sorted) return;
	size = Number(sizeSlider.value);
	for (let i = 0; i < size; i++)
	{
		array[i] = Math.floor(Math.random() * 100) + 1;
	}
	renderBars();
}

function renderBars()
{
	if (!sorted) return;
	const container = document.getElementById("bar-container");
	container.innerHTML = "";

	for (let i = 0; i < size; i++)
	{
		const bar = document.createElement("div");
		bar.classList.add("bar");
		bar.style.height = "0px";
		bar.style.width = `${20 / size * 30}px`;

		container.appendChild(bar);

		requestAnimationFrame(() => {
			bar.style.height = `${array[i] * 6}px`;
		});
		
	}
	resetted = true;
}

// display an array on load
generateRandomArray();

// sorting happens
async function startSorting()
{
	if (!Module) return;
	if (array.length === 0) return;
	if (!sorted) return;
	if (!resetted) return;

	sorted = false;
	resetted = false;
	
	const newBtn = document.getElementById("new");
	const resetBtn = document.getElementById("reset");
	newBtn.disabled = true;
	resetBtn.disabled = true;

	const algorithm = document.getElementById("algo").value;
	const bars = document.getElementById("bar-container").children; 
	const delay = 2000 - ((Number(speedSlider.value) - 5) / (100 - 5)) * (2000 - 1);
	
	const input = new Module.InpVec();
	let result;

	try
	{
		for (let i = 0; i < size; i++)
		{
			input.push_back(array[i]);
		}

		
		if (algorithm === "bubbleSort")
		{
			result = Module.bubbleSort(input);
		}
		else if (algorithm === "selectionSort")
		{
			result = Module.selectionSort(input);
		}

		for (let i = 0; i < result.size(); i++)
		{
			const e = result.get(i);
			if (e.prev >= 0) bars[e.prev].classList.remove("selected");
			if (e.cur >= 0) bars[e.cur].classList.add("selected");
			if (e.next >= 0) bars[e.next].classList.add("selected");

			if (result.get(i).desc === "swap")
			{
				const temp = bars[e.cur].style.height;
				bars[e.cur].style.height = bars[e.next].style.height;
				bars[e.next].style.height = temp;
			}

			await sleep(delay);
		}

		for (let i = 0; i < bars.length; i++)
		{
			bars[i].classList.add("selected");
		}
	}
	finally
	{
		sorted = true;
		input.delete();
		result.delete();
		newBtn.disabled = false;
		resetBtn.disabled = false;
	}
}
