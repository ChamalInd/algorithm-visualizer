import { state } from "./state.js";

export const container = document.getElementById("bar-container");
export const newBtn = document.getElementById("new");
export const speedSlider = document.getElementById("speed");
export const sizeSlider = document.getElementById("size");

export function setupSliders() 
{
	const speedText = document.getElementById("speedText");
	const sizeText = document.getElementById("sizeText");

	speedSlider.addEventListener("input", () => {
		speedText.innerText = speedSlider.value;
	});
	sizeSlider.addEventListener("input", () => {
    	sizeText.innerText = sizeSlider.value;
  	});
}

export function renderBars() 
{
	container.innerHTML = "";

	for (let i = 0; i < state.size; i++) 
	{
		const bar = document.createElement("div");
		bar.classList.add("bar");
		bar.style.height = "0px";
		bar.style.width = `${100 / state.size}%`;
		container.appendChild(bar);

		requestAnimationFrame(() => {
			bar.style.height = `${state.array[i]}%`;
    	});
	}
}

export function generateRandomArray() 
{
	state.size = Number(sizeSlider.value);
	for (let i = 0; i < state.size; i++) 
	{
    	state.array[i] = Math.floor(Math.random() * 100) + 1;
	}
  	renderBars();
}
