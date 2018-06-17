import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import FileUpload from 'components/FileUpload';
import { connect } from 'react-redux';
import { imgPostRequest } from 'actions/img';

// const propTypes = {
// 	number: PropTypes.number
// }

// const defaultProps = {
// 	number: -1
// }

class Home extends Component {
    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    handlePost(data){
        return this.props.imgPostRequest(data).then(
            () => {
                if(this.props.postStatus === "SUCCESS"){
                    console.log("upload success !!")
                }
            }
        )
    }

    render() {
        return (
            <div>
            	<h2> File upload </h2>
	        <FileUpload 
                    data={this.props.files}
                    onPost={this.handlePost}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
        postStatus: state.img.post.status,
        files: state.img.post.files,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        imgPostRequest: (data) => {
            return dispatch(imgPostRequest(data));
        }
    }
}

// Home.propTypes = propTypes;
// Home.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);