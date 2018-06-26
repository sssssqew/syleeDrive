import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import ImgList from './ImgList';

const propTypes = {
  data: PropTypes.array,
  onPost: PropTypes.func,
  onList: PropTypes.func
}

const defaultProps = {
  data: [],
  onPost: (data) => { console.error('post function not defined'); },
  onList: (data) => { console.error('list function not defined'); }
}

class FileUpload extends Component {

   constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(files){
    
    const uploaders = Object.keys(files).map(key => {
    
        const data = new FormData();
        data.append('file', files[key]);
        data.append('filename', files[key].name);

        return this.props.onPost(data).then(
          () => {
             console.log('upload done !!');
          }
        )
    });

    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      return this.props.onList().then(
        console.log('upload completed...')
      )
    });
  }

  shouldComponentUpdate(nextProps, nextState){
        let update = JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
        return update;
    }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }
  
  render() {
    console.log('render...')
   
    const dropzone = {
      width: "100%",
      height: "100%",
    }
    const dropzoneActive = {
      backgroundColor: "#EBF5FB"
    }
    return(
      <div> 
        <Dropzone 
            multiple  
            accept="image/*, video/*, mp3/*"
            disableClick
            name="Dropzone"
            onDrop={this.handleUpload}
            style={dropzone}
            activeStyle={dropzoneActive}>
        <p>DropZone</p>
        <div>
        <ImgList data={this.props.data}/>
        </div>
        </Dropzone>
      </div>
    )
  }
}

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;