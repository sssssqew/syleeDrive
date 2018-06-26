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
    	const style = {
			width: "40%",
			height: "300px",
			borderRadius: "10px"
    	}
        return (
            <div>
              <img src={`http://localhost:8000/${this.props.img.path}`} style={style} alt="img"/><br/>
            </div>
        );
    }
}

// Img.propTypes = propTypes;
// Img.defaultProps = defaultProps;

export default Img;