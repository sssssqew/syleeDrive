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
    this.initialize = this.initialize.bind(this);
  }

  abortUpload(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({progress: 0});
    console.log('Uploading aborted.');
  }

  initialize(){
    this.setState({progress: 0});
  }

  handleUpload(files){
    let loaded = 0;
    
    const uploaders = Object.keys(files).map(key => {
    
        const data = new FormData();
        data.append('file', files[key]);
        data.append('filename', files[key].name);

        const callback = {
          onUploadProgress: (e) => {
              if (e.lengthComputable) {
                loaded = loaded + parseInt(e.loaded / e.total, 10);
                this.setState({ progress: parseInt(loaded*100/files.length, 10) })
                console.log(this.state.progress);
              }
            }
         }

        return this.props.onPost(data, callback).then(
          (s) => {
             if(s === "duplicate"){
                console.log("haha, duplicated~")
                this.setState({ progress: 0 })
              }
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
        let update = JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data) || this.state !== nextState;
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
      height: "100vh",
      padding: "1%",
      backgroundColor: '#F7F9F9',
      overflow: "auto"
    }
    const dropzoneActive = {
      opacity: "0.4",
      backgroundColor: 'black',
    }
    return(
      <div> 
      <UploadStatus loaded={this.state.progress} onUploadAbort={this.abortUpload} />
        <Dropzone 
            id="drop"
            multiple  
            accept="image/*, video/*, mp3/*"
            disableClick
            onDrop={this.handleUpload}
            onDragEnter={this.initialize}
            style={dropzone}
            activeStyle={dropzoneActive}>
        <ImgList data={this.props.data}/>
        </Dropzone>
      </div>
    )
  }
}

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;