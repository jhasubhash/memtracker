
export default class WasmTrackerViewModel {
    constructor() {
    }
    
    startAllocation(wasm, showAlert){
        let size_in_mb = 10;
        let success = false;
        success = wasm.tryAllocationToWasm(size_in_mb);
        if(!success){
            console.log("wasm out of memory");
            showAlert();
            return;
        }
        requestAnimationFrame(this.startAllocation.bind(this, wasm, showAlert));
    }

    getWasmSize(wasm){
        let wasm_size = 0;
        wasm_size = wasm.getWasmMemorySize();
        return wasm_size;
    }
}