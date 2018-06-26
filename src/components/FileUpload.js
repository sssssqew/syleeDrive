import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import ImgList from './ImgList';
import UploadStatus from './UploadStatus';

const propTypes = {
  data: PropTypes.array,
  onPost: PropTypes.func,
  onList: PropTypes.func
}

const defaultProps = {
  data: [],
  onPost: (data, callback) => { console.error('post function not defined'); },
  onList: (data) => { console.error('list function not defined'); }
}

class FileUpload extends Component {

   constructor(props) {
    super(props);
    this.state = {
      progress: 0
    }
    this.abortUpload = this.abortUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  abortUpload(e) {
    e.stopPropagation();
    e.preventDefault();
    // source.cancel();
    this.setState({progress: 0});
    console.log('Uploading aborted.');
  }

  handleUpload(files){
    this.setState({progress: 0});
    
    const uploaders = Object.keys(files).map(key => {
    
        const data = new FormData();
        data.append('file', files[key]);
        data.append('filename', files[key].name);

        const callback = {
          onUploadProgress: (e) => {
              if (e.lengthComputable) {
                let loaded = Math.round((e.loaded / e.total) * 100);
                // this.setState({progress: loaded});
                console.log(`progress[${key}]: ${loaded}`);
                this.setState({progress: loaded});
              }
            }
         }

        return this.props.onPost(data, callback).then(
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
      <UploadStatus loaded={this.state.progress} onUploadAbort={this.abortUpload} />
        <Dropzone 
            multiple  
            accept="image/*, video/*, mp3/*"
            disableClick
            name="Dropzone"
            onDrop={this.handleUpload}
            style={dropzone}
            activeStyle={dropzoneActive}>
        <p>DropZone</p>
        <ImgList data={this.props.data}/>
        </Dropzone>
      </div>
    )
  }
}

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;