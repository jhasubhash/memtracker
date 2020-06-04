#!/usr/bin/env bash
#rm -rf build/
rm -rf wasmSrc
mkdir wasmSrc
cd wasmSrc
EMCC_PATH="/Users/sujha/Documents/xd/emcc_playground/emsdk/emscripten/1.38.31/"
$EMCC_PATH/em++ --bind -g4 ../src/cpp/src/App.cpp ../src/cpp/src/MemoryTracker.cpp -s WASM=1 -s MODULARIZE=1 -s ALLOW_MEMORY_GROWTH=1 -s ENVIRONMENT='web' -o app.js || exit 1
[ -h ../node_modules/wasm ] || ln -s ../wasmSrc/ ../node_modules/wasm
