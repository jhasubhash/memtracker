import {loadWasm} from '../../js/WasmLoader'
export default class DashboardViewModel {

    load(callback){
        loadWasm().then((Module) => {
            callback(Module);
        });
    }
}