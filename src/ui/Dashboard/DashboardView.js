import React from 'react';
import { observable, computed, decorate } from "mobx"
import DashboardViewModel from './DashboardViewModel';
import WasmTrackerView from '../WasmTracker/WasmTrackerView';
import './DashboardView.css'

export default class DashboardView extends React.Component {
    // state = { wasmRef: React.createRef() };
    constructor(props) {
        super(props);
        this.state = {
            wasmRef: null
        }
        this.dashboardViewModel = new DashboardViewModel();
    }

    componentDidMount() {
        this.dashboardViewModel.load(this.setWasmRef);
    }

    setWasmRef = (ref) => {
        // this.wasmRef = ref;
        this.setState({wasmRef:ref});
        // this.forceUpdate();
    }

    render(){
        return <div>
        { this.state.wasmRef && <WasmTrackerView wasm={this.state.wasmRef} />}
        </div>
    }
}

decorate(DashboardView, {
    wasmRef: observable
})