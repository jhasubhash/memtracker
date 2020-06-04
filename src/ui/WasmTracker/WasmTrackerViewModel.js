
export default class WasmTrackerViewModel {
    constructor() {
    }
    
    startAllocation(wasm){
        let size_in_mb = 10;
        wasm.tryAllocationToWasm(size_in_mb);
    }

    getWasmSize(wasm){
        let wasm_size = 0;
        wasm_size = wasm.getWasmMemorySize();
        return wasm_size;
    }
}