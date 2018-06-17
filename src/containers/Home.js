import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import FileUpload from 'components/FileUpload';

// const propTypes = {
// 	number: PropTypes.number
// }

// const defaultProps = {
// 	number: -1
// }

class Home extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
            	<h2> File upload </h2>
		        <FileUpload />
            </div>
        );
    }
}

// Home.propTypes = propTypes;
// Home.defaultProps = defaultProps;

export default Home;