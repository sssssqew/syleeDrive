import React, { Component } from 'react';

// import PropTypes from 'prop-types';

// const propTypes = {
// 	number: PropTypes.number
// }

// const defaultProps = {
// 	number: -1
// }

class Img extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
   //  	const style = {
			// width: "30%",
			// height: "auto",
			// borderRadius: "10px"
   //  	}
        return (
          <img src={`http://localhost:8000/${this.props.img.path}`} alt="img"/>
        );
    }
}

// Img.propTypes = propTypes;
// Img.defaultProps = defaultProps;

export default Img;