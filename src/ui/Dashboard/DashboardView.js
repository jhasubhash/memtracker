import React from 'react';
import DashboardViewModel from './DashboardViewModel';
import WasmTrackerView from '../WasmTracker/WasmTrackerView';
import './DashboardView.css'

export default class DashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.wasmRef = React.createRef();
        this.dashboardViewModel = new DashboardViewModel();
    }

    componentDidMount() {
        this.dashboardViewModel.load(this.wasmRef);
    }

    render(){
        return <div>
        <WasmTrackerView ref={this.wasmRef} />
        </div>
    }
}