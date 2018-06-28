import React, { Component } from 'react';
import PropTypes from 'prop-types';
import File from './File';

const propTypes = {
	data: PropTypes.array
}

const defaultProps = {
	data: []
}

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentKey: -1
        };
        this.updateCurrentKey = this.updateCurrentKey.bind(this); 
    }
    // 2
    // 부모 컴포넌트는 현재 플레이 중인 자식 컴포넌트의 키 값을 가지며 
    // 아래 함수를 통해 다른 컴포넌트를 플레이 시작할 때 키 값을 업데이트한다
    updateCurrentKey(key){
        if(this.state.currentKey !== key){
            // console.log('prev key change')
            this.setState({ currentKey: key })
            // console.log('after key change')
        }
    }
    // 3
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(this.state.currentKey); // -1
    //     console.log(nextState); // 9
    //   }

    // 5
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(this.state.currentKey); // 9 (change)
    //   }

    // 자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달하거나 
    // 부모 컴포넌트의 state를 변경하려면 부모에서 선언한 함수를 
    // 자식 컴포넌트의 props로 전달해주고 자식 컴포넌트에서 
    // 부모 함수를 호출하고 데이터를 전달해주면 된다
    render() {
    	 const mapToComponents = data => {
	      return data.map( (file, key) => {
	        return (
	            <File 
	              key={key} 
                        keyId={key}
                        current={this.state.currentKey}
	              file={file}
                        updateCurrentKey={this.updateCurrentKey}/>
	        )
	      })
	    }
        return (
            <div>
            <section id="photos">
            	{ mapToComponents(this.props.data)}
            </section>
            </div>
        );
    }
}

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;

export default FileList;