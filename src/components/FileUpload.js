import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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

  handleUpload(e){
    e.preventDefault();
    const files = this.uploadInput.files
    
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

  componentDidMount(){
    console.log('upload mount ?');  
    // 새로고침 할때마다 DB에서 파일 리스트 가져오기
    // 가져와서 리덕스 상태 변경하기

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
    const mapToComponents = data => {
      return data.map( (img, key) => {
        return (
             <div key={key}>
                <img src={`http://localhost:8000/${img.path}`} width="40%" alt="img"/><br/>
              </div>
        )
      })
    }
    return(
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} type="file" multiple/>
          </div>
          <button className="btn btn-success" type="submit">Upload</button>
        </form>     
        { mapToComponents(this.props.data)}
      </div>
    )
  }
}

FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

export default FileUpload;