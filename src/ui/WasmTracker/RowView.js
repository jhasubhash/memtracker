import React from 'react';
import MaterialTable from 'material-table';

export default class RowView extends React.Component  {
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
            { title: 'Browser', field: 'browser_name',cellStyle: { whiteSpace: 'nowrap' }},
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
                options={{
                    search: false,
                    paging: false,
                    showTitle: false,
                    toolbar: false,
                    sorting: false,
                    columnsButton: false
                }}
                title="Your Device and Browser Info"
                columns={this.state.columns}
                data={this.state.data}
            />
            </div>
    }
}
