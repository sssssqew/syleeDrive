import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from './Img';

const propTypes = {
	data: PropTypes.array
}

const defaultProps = {
	data: []
}

class ImgList extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
    	 const mapToComponents = data => {
	      return data.map( (img, key) => {
	        return (
	            <Img 
	              key={key} 
	              img={img}/>
	        )
	      })
	    }
        return (
            <div>
            	{ mapToComponents(this.props.data)}
            </div>
        );
    }
}

ImgList.propTypes = propTypes;
ImgList.defaultProps = defaultProps;

export default ImgList;