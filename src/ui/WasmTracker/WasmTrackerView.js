import React from 'react';
import './WasmTrackerView.css'
import WasmTrackerViewModel from './WasmTrackerViewModel'
import ProgressBar from './ProgressBar'
import AlertView from './AlertView'
import Typography from '@material-ui/core/Typography';
import DB from '../../js/Database';
import TableView from './TableView';
import RowView from './RowView';

export default class DashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.wasmSizeLimit  = 6000; //size in MB
        this.wasmTrackerViewModel = new WasmTrackerViewModel();
        this.state = {
            wasmSize : 0,
            alertActive : false,
            tableActive : false,
            rowActive : false
        }
        this.rowRef = React.createRef();
        this.tableRef = React.createRef();
    }

    componentDidMount() {
        this.fetchWasmSize();
        this.handleStartClick();
        DB.initDatabase();
    }

    handleStartClick = () => {
        this.wasmTrackerViewModel.startAllocation(this.props.wasm, this.showAlert);
    }

    showAlert = () => {
        this.setState({alertActive:true});
        this.setState({rowActive:true});
        DB.add(this.state.wasmSize.toFixed(2), this.onDBData);
        this.rowRef.current.renderData(DB.getCurrent());
    }

    onDBData = (data) => {
        this.setState({tableActive:true});
        this.tableRef.current.renderData(data);
    }

    fetchWasmSize = () => {
        if(this.state.rowActive) return;
        let currWasmSize = this.wasmTrackerViewModel.getWasmSize(this.props.wasm);
        currWasmSize = currWasmSize/(1024*1024);
        this.setState({wasmSize:currWasmSize});
        requestAnimationFrame(this.fetchWasmSize);
    }

    getProgress = () =>{
        return this.state.wasmSize;
    }

    render(){
        return <div className="wasmTracker">
            <Typography variant="h5"  >WASM Memory Limit</Typography>
            <div className="pBar">
                <ProgressBar getProgress={this.getProgress} limit={this.wasmSizeLimit}/>
            </div>
            <div className="sizeInfo">
            <Typography>Current wasm Size is : {this.state.wasmSize.toFixed(2)} MB</Typography>
            </div>
            <div className="alert">
            { this.state.alertActive && <AlertView/>}
            </div>
            <div className="table">
            {this.state.rowActive && <RowView ref={this.rowRef} />}
            </div>
            <div className="table">
            { this.state.tableActive && <TableView ref={this.tableRef} />}
            </div>
        </div>
    }
}