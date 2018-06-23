import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.array,
  onPost: PropTypes.func
}

const defaultProps = {
  data: [],
  onPost: (data) => { console.error('post function not defined'); }
}

class FileUpload extends Component {

   constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e){
    e.preventDefault();
    const files = this.uploadInput.files
    
    Object.keys(files).map(key => {
    
        const data = new FormData();
        data.append('file', files[key]);
        data.append('filename', files[key].name);

        return this.props.onPost(data).then(
          () => {
             console.log('upload done !!');
          }
        )
    })
  }

  componentDidMount(){
    console.log('componentDidMount');  
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
      return data.map( (file, key) => {
        return (
             <div key={key}>
                <img src={`http://localhost:8000/${file}`} width="40%" alt="img"/><br/>
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