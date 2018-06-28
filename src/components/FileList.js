import React, { Component } from 'react';
import PropTypes from 'prop-types';
import File from './File';


/* 자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달하거나 
    부모 컴포넌트의 state를 변경하려면 부모에서 선언한 함수를 
    자식 컴포넌트의 props로 전달해주고 자식 컴포넌트에서 
    부모 함수를 호출하고 데이터를 전달해주면 된다

    updateCurrentKey
*/

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

    // 실행순서 : 2
    // 부모 컴포넌트는 현재 플레이 중인 자식 컴포넌트의 키 값을 state로 가지며 
    // 아래 함수를 통해 다른 컴포넌트가 재생을 시작하면 해당 컴포넌트로 키 값을 업데이트한다
    updateCurrentKey(key){
        if(this.state.currentKey !== key){
            this.setState({ currentKey: key })
        }
    }
    // 실행순서 : 3
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(this.state.currentKey); // prv key
    //     console.log(nextState); // next key 
    //   }

    // 실행순서 : 5
    // componentDidUpdate(prevProps, prevState) {
    //      console.log(prevState) // prev key
    //     console.log(this.state.currentKey); // next key
    //   }

    // 실행순서 : 4
    // 부모 컴포넌트에서 변경된 state는 current라는 props로 자식에게 전달해준다
    // 부모 컴포넌트의 state가 변경되면서 모든 자식 컴포넌트들이 렌더링될 수도 있지만
    // shouldcomponentupdate함수를 통해  특정한 자식 컴포넌트만 렌더링하도록 할 수 있다
    // 하지만 변경된 state는 componentWillReceiveProps함수를 통해서 
    // 모든 자식 컴포넌트에게 전달된다
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