import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import FileUpload from 'components/FileUpload';
import { connect } from 'react-redux';
import { imgPostRequest, imgListRequest } from 'actions/img';

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
        this.loadImg = this.loadImg.bind(this);
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

    loadImg(){
        return this.props.imgListRequest();
    }

    componentDidMount(){
        console.log('home mount...')
        return this.props.imgListRequest();
    }

    shouldComponentUpdate(nextProps, nextState){
        let update = JSON.stringify(this.props.imgData) !== JSON.stringify(nextProps.imgData);
        return update;
    }

    

    render() {
        return (
            <div>
            	<h2> File upload </h2>
	        <FileUpload 
                    data={this.props.imgData}
                    onPost={this.handlePost}
                    onList={this.loadImg}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
        postStatus: state.img.post.status,
        files: state.img.post.files,
        listStatus: state.img.list.status,
        imgData: state.img.list.data,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        imgPostRequest: (data) => {
            return dispatch(imgPostRequest(data));
        },
        imgListRequest: () => {
            return dispatch(imgListRequest());
        }
    }
}

// Home.propTypes = propTypes;
// Home.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);