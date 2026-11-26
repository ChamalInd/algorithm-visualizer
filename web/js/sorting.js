import { state } from "./state.js";
import { runAlgorithm } from "./module.js";
import { sleep } from "./utils.js";
import {
	container, sortBtn, shuffleBtn, speedSlider,
	renderBars, generateRandomArray,
} from "./ui.js";

function setButtonState(running)
{
	sortBtn.textContent = running ? "Stop" : "Sort";
	sortBtn.classList.toggle("stop", running);
}

export function toggleSortStop()
{
	if (state.sorted) startSorting();
	else stopSorting();
}

export function shuffleBars() 
{
	if (!state.sorted) return;
	const touched = container.querySelectorAll(".selected").length;
	touched === 0 ? generateRandomArray() : renderBars();
}

function getDelay() 
{
	return 2000 - ((Number(speedSlider.value) - 5) / (100 - 5)) * (2000 - 1);
}

function stopSorting()
{
	if (state.sorted) return;
	state.stopSignal = true;
	if (state.wakeUp) state.wakeUp();
}

async function startSorting() 
{
	if (!state.module) return;
	if (!state.sorted) return;
	if (state.array.length === 0) return;

	state.sorted = false;
	state.stopSignal = false;
	shuffleBtn.disabled = true;

	setButtonState(true);

	const algorithm = document.getElementById("algo").value;
	const bars = container.children;
	const delay = getDelay();

	const input = new state.module.InpVec();
	let result;

	try 
	{
		for (let i = 0; i < state.size; i++) input.push_back(state.array[i]);

		result = runAlgorithm(algorithm, input);

		for (let i = 0; i < result.size(); i++) 
		{
			const e = result.get(i);

			if (e.prev >= 0) bars[e.prev].classList.remove("selected");
			if (e.cur >= 0)  bars[e.cur].classList.add("selected");
			if (e.next >= 0) bars[e.next].classList.add("selected");

			if (e.desc === "swap") 
			{
				const tmp = bars[e.cur].style.height;
				bars[e.cur].style.height = bars[e.next].style.height;
				bars[e.next].style.height = tmp;
      		} 
			else if (e.desc === "set") 
			{
        		bars[e.cur].style.height = `${e.val}%`;
      		}

      		await sleep(delay);
			if (state.stopSignal) break;
		}
      	
		if (!state.stopSignal)
		{
			for (const bar of bars) bar.classList.add("selected");
		}
	} 
	finally 
	{
		const stopped = state.stopSignal;
		state.sorted = true;
		state.stopSignal = false;
		state.wakeUp = null; 
    	shuffleBtn.disabled = false;
    	input.delete();
    	if (result) result.delete();

		setButtonState(false);
		if (stopped) renderBars();
	}
}
