import {loadWasm} from '../../js/WasmLoader'
export default class DashboardViewModel {
    constructor() {
    }

    load(callback){
        loadWasm().then((Module) => {
            callback(Module);
        });
    }
}