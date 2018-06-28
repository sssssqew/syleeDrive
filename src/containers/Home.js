import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import FileUpload from 'components/FileUpload';
import { connect } from 'react-redux';
import { FileUploadRequest, FileListRequest } from 'actions/file';

// const propTypes = {
// 	number: PropTypes.number
// }

// const defaultProps = {
// 	number: -1
// }

class Home extends Component {
    constructor(props) {
        super(props);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.loadFiles = this.loadFiles.bind(this);
    }

    uploadFiles(data, callback){
        return this.props.FileUploadRequest(data, callback).then(
            () => {
                if(this.props.postStatus === "SUCCESS"){
                    window.Materialize.toast("Success !!", 1000, 'bottom');
                }else{
                    window.Materialize.toast("Duplicated", 1000, 'bottom');
                    return "duplicate"
                }
            }
        )
    }

    loadFiles(){
        return this.props.FileListRequest();
    }

    componentDidMount(){
        console.log('home mount...')
        return this.props.FileListRequest();
    }

    shouldComponentUpdate(nextProps, nextState){
        let update = JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
        return update;
    }

    render() {
        return (
            <div className="container">
	        <FileUpload 
                    data={this.props.data}
                    onPost={this.uploadFiles}
                    onList={this.loadFiles}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
        postStatus: state.file.post.status,
        listStatus: state.file.list.status,
        data: state.file.list.data,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FileUploadRequest: (data, callback) => {
            return dispatch(FileUploadRequest(data, callback));
        },
        FileListRequest: () => {
            return dispatch(FileListRequest());
        }
    }
}

// Home.propTypes = propTypes;
// Home.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);