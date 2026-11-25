import { initializeEngine } from "./module.js";
import { setupSliders, generateRandomArray } from "./ui.js";
import { startSorting, shuffleBars } from "./sorting.js";

initializeEngine();
setupSliders();
generateRandomArray();

// adjust these ids to match your HTML
document.getElementById("new").addEventListener("click", shuffleBars);
document.getElementById("sort").addEventListener("click", startSorting);
