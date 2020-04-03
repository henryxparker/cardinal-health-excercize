import React from 'react';
import MaterialTable from "material-table";
import { Fab, Typography } from '@material-ui/core';
import { post } from 'axios';
import "@material-ui/icons";

import './App.css';


function App() {
  return (
    <div className="App">
        <h1>Files</h1>
        <div className="table-container">
          <MaterialTable
            columns={[
              { title: "Filename", field: "filename" },
              { title: "Date Downloaded", field: "date" },
              { title: "Log id", field: "id", type: "numeric" },
            ]}
            data={[
              { filename: "Fake.log", date: "1/1/1", id: 1 }
            ]}
            options={{
              search: false,
              paging:false,
              toolbar:false
            }}
            title="Files"
            actions={[
              {
                icon: 'delete',
                onClick: (event, rowData) => window.confirm("Are you sure you wish to delete " + rowData.filename + "?")
              }
            ]}
          />
        </div>
        <div className="fab-container">
          <FileUpload/>
        </div>
    </div>
  );
}

class FileUpload extends React.Component {
  
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    const url = 'http://localhost/files'
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    const config = {
      headers: {
        'processData': false,
        'content-type': false
      }
    }
    post(url, formData, config).then((response)=>{
      console.log(response.data) //TODO:: handle response gracefully
    })
  }
  
  render() {
    return (
      <div>
        <input 
          id="upload" 
          type="file"
          onChange={this.onChange}
          ref={(ref) => this.upload = ref} 
          style={{ display: 'none' }} 
          />
        <Fab 
          color="primary"
          variant="extended"
          onClick={(e) => this.upload.click() }
        >
          <Typography>Upload</Typography>  
        </Fab>
      </div>
    );
  }
}

export default App;
