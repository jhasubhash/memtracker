// const wasmPath = require("wasm/app.wasm");

const wasmInit = require("wasm/app.js")
export async function loadWasm() {
    // const exports_ = await import("wasm/app.js");
    return new Promise((resolve, reject) => {
        const WasmModule = {
            /*locateFile: function (path) {
                return wasmPath;
            }*/
        };
        wasmInit(WasmModule).then((Module)=>{
            delete Module['then'];
            resolve(Module);
        });
    });
}