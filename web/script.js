let Module;
let array = [];
let size = 0;
let sorted = true;

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
	size = Number(sizeSlider.value);
	if (!sorted) return;
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
		bar.style.height = "0px";
		bar.style.width = `${20 / size * 30}px`;

		container.appendChild(bar);
		
		requestAnimationFrame(() => {
			bar.style.height = `${array[i] * 6}px`;
		});
	}
}


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

async function startSorting()
{
	if (!Module) return;
	if (array.length === 0) return;
	if (!sorted) return;

	sorted = false;

	renderBars();
	const input = new Module.InpVec();
	for (let i = 0; i < size; i++)
	{
		input.push_back(array[i]);
	}

	const delay = 2000 - ((Number(speedSlider.value) - 5) / (100 - 5)) * (2000 - 10);

	const algorithm = document.getElementById("algo").value;
	let result;
	
	if (algorithm === "bubbleSort")
	{
		result = Module.bubbleSort(input);
	}
	
	const stepCount = document.getElementById("stepCount");
	const step = document.getElementById("step");
	const bars = document.getElementById("bar-container").children; 

	for (let i = 0; i < result.size(); i++)
	{
		stepCount.innerHTML = `Step of ${i + 1} / ${result.get(result.size() - 1).step}`;
		
		if (result.get(i).prev >= 0) bars[result.get(i).prev].classList.remove("selected");
		if (result.get(i).cur >= 0) bars[result.get(i).cur].classList.add("selected");
		if (result.get(i).next >= 0) bars[result.get(i).next].classList.add("selected");

		if (result.get(i).desc === "swap")
		{
			const temp = bars[result.get(i).cur].style.height;
			bars[result.get(i).cur].style.height = bars[result.get(i).next].style.height;
			bars[result.get(i).next].style.height = temp;
		}

		await sleep(delay);
	}

	const remainning = bars.length - document.querySelectorAll(".selected").length;
	for (let i = remainning - 1; i >= 0; i--)
	{
		bars[i].classList.add("selected");
	}

	sorted = true;
}
