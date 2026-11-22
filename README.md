# Algorithm Visualizer

A web page that shows how sorting algorithms work in real time. The algorithms are written in C++, compiled to WebAssembly with Emscripten, and animated in the browser with plain JavaScript.

The C++ code does the sorting and records every step as an event. The JavaScript replays those events on a set of bars, so what you see is exactly what the algorithm did.

[Demo Video](assets/recording.mov)

## Algorithms

- Bubble sort
- Selection sort
- Insertion sort
- Quick sort
- Merge sort

## Controls

| Control | What it does |
|---|---|
| Algorithm | Picks which sort to run |
| Animation speed | Sets the delay between steps |
| Array size | Sets how many bars to generate |
| New Array | Generates a new random array |
| Reset | Puts the current array back to its unsorted state |
| Sort | Runs the selected algorithm |
| Stop | Stops a running sort (use Reset or New Array afterwards) |

Bar colors: light green marks the bars the algorithm is currently looking at, and every bar turns green when the sort finishes.

## Project structure

```
algorithm-visualizer/
├── CMakeLists.txt
├── cpp/
│   ├── main.cpp              # Embind bindings
│   ├── includes/
│   │   └── algorithms.h      # Events, Record, algorithm declarations
│   └── algorithms/
│       ├── bubble.cpp
│       ├── selection.cpp
│       ├── insertion.cpp
│       ├── quick.cpp
│       └── merge.cpp
└── web/
    ├── index.html
    ├── script.js
    ├── styles.css
    └── wasm/                 # Build output: engine.js + engine.wasm
```

## Requirements

- [Emscripten](https://emscripten.org/) (provides `emcc`, `em++` and `emcmake`)
- [CMake](https://cmake.org/) 3.16 or newer
- [Python](https://www.python.org/) 3 (only used to serve the page locally)
- A modern browser

## Building

Run these from the project root (the folder that contains `cpp/` and `web/`).

**1. Configure** (`emcmake` points CMake at the Emscripten toolchain):

```bash
emcmake cmake -B build -S .
```

**2. Build:**

```bash
cmake --build build
```

This writes `web/wasm/engine.js` and `web/wasm/engine.wasm`. After the first configure, rebuilding is just `cmake --build build`.

For a debug build with readable stack traces:

```bash
emcmake cmake -B build -S . -DCMAKE_BUILD_TYPE=Debug
cmake --build build
```

For a clean rebuild:

```bash
rm -rf build web/wasm/engine.*
emcmake cmake -B build -S .
cmake --build build
```

## Running

Browsers block loading `.wasm` files from `file://`, so the page must be served over HTTP. Serve the `web/` folder:

```bash
cd web
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

If you changed the C++ code and the page still behaves like the old version, do a hard refresh (Cmd+Shift+R on macOS, Ctrl+Shift+R elsewhere) or tick "Disable cache" in the browser's DevTools Network tab.
