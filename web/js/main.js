import { initializeEngine } from "./module.js";
import { setupSliders, generateRandomArray } from "./ui.js";
import { toggleSortStop, shuffleBars } from "./sorting.js";

initializeEngine();
setupSliders();
generateRandomArray();

document.getElementById("shuffleBtn").addEventListener("click", shuffleBars);
document.getElementById("sortBtn").addEventListener("click", toggleSortStop);
