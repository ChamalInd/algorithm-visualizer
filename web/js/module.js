import { state } from "./state.js";

export async function initializeEngine() 
{
	state.module = await createModule();
	console.log("C++ engine loaded.");
}

export function runAlgorithm(name, input) 
{
	const fn = state.module[name];  
	if (!fn) throw new Error(`Unknown algorithm: ${name}`);
	return fn(input);
}
