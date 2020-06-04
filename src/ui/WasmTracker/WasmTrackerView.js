import React from 'react';
import './WasmTrackerView.css'
import WasmTrackerViewModel from './WasmTrackerViewModel'
import ProgressBar from './ProgressBar'
import Typography from '@material-ui/core/Typography';

export default class DashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.wasmSize = 0; //size in MB
        this.wasmSizeLimit  = 4000; //size in MB
        this.wasmTrackerViewModel = new WasmTrackerViewModel();
    }

    componentDidMount() {
    }

    handleStartClick = () => {
        this.wasmTrackerViewModel.startAllocation(this.props.wasm);
    }

    fetchWasmSize = () => {
        let wasmSize = this.wasmTrackerViewModel.getWasmSize(this.props.wasm);
        this.wasmSize = wasmSize/(1024*1024);
        requestAnimationFrame(this.fetchWasmSize);
    }

    render(){
        return <div>
            <ProgressBar progress={this.wasmSize} limit={this.wasmSizeLimit}/>
            <Typography>Current wasm Size is : {this.wasmSize} MB</Typography>
        </div>
    }
}