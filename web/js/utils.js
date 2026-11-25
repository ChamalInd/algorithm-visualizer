import { state } from "./state.js";

export function sleep(ms) 
{
	return new Promise((resolve) => {
		const t = setTimeout(resolve, ms);
  	});
}
