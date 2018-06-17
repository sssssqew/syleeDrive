import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {

   constructor(props) {
    super(props);
      this.state = {
        imgs: [],
        uploadStatus: false
      }
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload(e){
    e.preventDefault();
    const files = this.uploadInput.files
    const uploaders = Object.keys(files).map(key => {
      // console.log(files[key].name)
      const data = new FormData();
      data.append('file', files[key]);
      data.append('filename', files[key].name);

      return axios.post('http://localhost:8000/upload', data)
        .then((res) => {
          // state 변경시 무조건 setState 함수 사용하기 
          // state 배열 변경시 spread연산자나 immutability helper 사용하기 
          // 둘 이상의 태그를 배열에 추가할때는 div 태그로 묶어줘야 함
          // 상태를 저장하기 위해(새로고침 후에도 남아있으려면) 각 주소를 추후에 
          // redux로 보내서 액션을 통해 store에 주소 배열로 저장한다
          // 이미지 주소를 배열에 추가함
          this.setState({
            imgs: [...this.state.imgs, 
            <div key={key}>
              <img src={`http://localhost:8000/${res.data.file}`} width="40%" alt="img"/><br/>
            </div>
            ]
          })
        })
        .catch((error) => {
          console.log(error);
        });
    })
    // redux로 주소 배열을 액션으로 보냄 
    axios.all(uploaders).then(() => {
      console.log(this.state.imgs);
      console.log("upload done!!")
    });
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }
  
  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} type="file" multiple/>
          </div>
          <button className="btn btn-success" type="submit">Upload</button>
        </form>
        {this.state.imgs }
      </div>
    )
  }
}

export default FileUpload;