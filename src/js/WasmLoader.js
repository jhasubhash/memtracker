
const wasmInit = require("wasm/app.js");

export async function loadWasm() {
    return new Promise((resolve, reject) => {
        const WasmModule = {};
        wasmInit(WasmModule).then((Module)=>{
            delete Module['then'];
            resolve(Module);
        });
    });
}