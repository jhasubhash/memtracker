import {loadWasm} from '../../js/WasmLoader'
export default class DashboardViewModel {
    constructor() {
    }

    load(wasmRef){
        loadWasm().then((Module) => {
            wasmRef = Module;
            // self.wasm = Module;
        });
    }
}