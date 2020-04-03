import React from 'react';
import MaterialTable from "material-table";
import { Fab, Typography } from '@material-ui/core';
import axios from 'axios';
import "@material-ui/icons";

import './App.css';


function App() {
  return (
    <div className="App">
        <h1>Files</h1>
        <Table/>
        <div className="fab-container">
          <FileUpload/>
        </div>
    </div>
  );
}

class Table extends React.Component{
  render() {
    return(
      <div className="table-container">
        <MaterialTable
          columns={[
            { title: "Filename", field: "filename" },
            { title: "Date Downloaded", field: "date" },
            { title: "Log id", field: "id", type: "numeric" },
          ]}
          data={() => axios.get("/files")}
          options={{
            search: false,
            paging:false,
            toolbar:false
          }}
          title="Files"
          actions={[
            {
              icon: 'delete',
              onClick: (event, rowData) => { 
                const confirmed = window.confirm("Are you sure you wish to delete " + rowData.filename + "?")
                if(confirmed){
                  const url = '/files/' + rowData.id.toString();
                  axios.delete(url)
                }
              }
            }
          ]}
        />
      </div>
    )
  }

}

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data); //TODO:: handle errors gracefully
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
    this.submit.submit()
  }

  fileUpload(file){
    const url = '/files';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  axios.post(url, formData, config)
  }
  
  render() {
    return (
      <form ref={(ref) => this.submit = ref}>
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
      </form>
    );
  }
}

export default App;
