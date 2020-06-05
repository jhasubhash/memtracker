import React from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default class TableView extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            columns : [],
            data : []
        }
    }

    renderData(dataArr){
        let currData = [];
        for(let idx = 0; idx <dataArr.length; idx++){
            let item = dataArr[idx];
            let currItem = {};
            currItem.browser_name = item.browser.name;
            currItem.browser_version = item.browser.version;
            currItem.os_name = item.os.name;
            currItem.os_version = item.os.version;
            currItem.device_model = item.device.model;
            currItem.device_type = item.device.type;
            currItem.wasm_memory = parseInt(item.wasmMemory);
            currData.push(currItem);
        }
        let currColumns = [
            { title: 'Browser', field: 'browser_name', cellStyle: { whiteSpace: 'nowrap' } },
            { title: 'Version', field: 'browser_version', width:100  },
            { title: 'OS', field: 'os_name', width:100  },
            { title: 'Version', field: 'os_version', width:100  },
            { title: 'Device Model', field: 'device_model', cellStyle: { whiteSpace: 'nowrap' } },
            { title: 'Device Type', field: 'device_type', cellStyle: { whiteSpace: 'nowrap' } },
            { title: 'WASM Memory (MB)', field: 'wasm_memory', type: 'numeric', cellStyle: { whiteSpace: 'nowrap', textAlign: "center" }  },
        ]
        this.setState({columns:currColumns});
        this.setState({data:currData});
    }

    render(){
        return <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                icons={tableIcons}
                options={{
                    paginationType : "stepped",
                }}
                title="All Devices and Browsers Info"
                columns={this.state.columns}
                data={this.state.data}
            />
            </div>
    }
}
