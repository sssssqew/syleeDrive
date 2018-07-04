import React, { Component } from 'react';
import ReactPlayer from 'react-player';

/*
 부모 컴포넌트 호출하면서 현재 클릭한 음악의 key 값을 부모에게 전송함 (updateCurrentKey 함수)
 부모 컴포넌트에서 현재 클륵한 음악의 key 값을 업데이함 (updateCurrentKey 함수)
 부모 컴포넌트의 state(currentKey)가 변경되었으므로 모든 자식 컴포넌트가 업데이트 과정을 거침 
 동시에 부모의 state(currentKey)를 자식 컴포넌트들에게 전달함 (this.props.current)
 자식 컴포넌트들의 업데이트 과정에서 이전에 재생중이던 컴포넌트를 찾고 재생을 중지함  (componentWillReceiveProps 함수)
 재생이 중지된 자식 컴포넌트의 state(playing)만 변경되었으므로 state가 변경된 자식 컴포넌트만 렌더링하도록 강제함 (shouldComponentUpdate 함수)

 정리하면 현재 클릭한 자식 컴포넌트를 부모에게 알려주고 
 부모는 모든 자식 컴포넌트들 중에서 이전에 재생중인 컴포넌트를 찾아 재생을 중지하며 
 중지된 컴포넌트만 렌더링하도록 한다  
*/


class File extends Component {
    constructor(props){
        super(props);
        this.state = {
            playing: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    // 실행순서 : 1
    handleClick(){
        console.log(this.props.keyId);
        // 자식 컴포넌트에서 부모 컴포넌트의 함수를 호출하여 
        // 부모 컴포넌트의 상태를 변경하기 위함이다
        this.props.updateCurrentKey(this.props.keyId);
        // setState는 비동기 함수라서 state는 나중에 변경된다
        this.setState({
            playing: !this.state.playing
        })
    }
    
    // componentWillUpdate나 componentDidUpdate에서 
    //state를 변경하면 무한루프에 빠지게 되므로 아래 함수를 통해 
    // 무한루프에 빠지지 않도록 한다 
    // 모든 자식 컴포넌트들은 부모의 변경된 state를 props로 전달받는다
    componentWillReceiveProps(nextProps) {
        if(this.props.current !== nextProps.current){
            // 이전에 플레이 중이던 자식 컴포넌트를 찾아서 플레이를 중지한다
            if(this.props.current !== -1){
                if(this.props.keyId === this.props.current){
                    console.log(`File No.${this.props.current} stopped`);
                    this.setState({ playing: false })
                }
            }
        }else{
            // // 내림차순 정렬 
            // if(this.props.current !== -1){
            //     if(this.props.keyId === this.props.current){
            //         console.log(`File No.${this.props.current} stopped`);
            //         this.setState({ playing: false })
            //     }
            // }
            // 오름차순 정렬
            console.log('uploading^^')
            console.log('prev: ', this.props.current); // prev key
            console.log('next: ', nextProps.current); // next key
        }
    }

    render() {
    	let tag = (<br/>);
        const server = 'http://localhost:8000';
        const src = `${server}/${this.props.file.path}`;
        const cover = `${server}/${this.props.file.cover}`;
        const btn = (
            <a href="" className="playWrapper">
                <span className="playBtn"><img src={require('resource/playbtn2.png')} width="50" height="50" alt=""/></span>
            </a>
        )
       
       // console.log(this.props.file.name)
    	switch(this.props.file.category){
    		case 'audio':
    			tag = (
                                <div className="playDiv">
                                    <img src={cover} 
                                            alt={this.props.file.name}
                                            onClick={this.handleClick}/>
                                    <ReactPlayer
                                        className="player" 
                                        playing={this.state.playing}
    					url={src}>
                                    </ReactPlayer>
                                    
                                </div>);
    			break;
    		case 'video':
    			tag = (
                                    <div className="playDiv">
                                        <ReactPlayer 
                                            className="player" 
                                            playing={this.state.playing}
                                            url={src}
                                            onClick={this.handleClick}>
                                        </ReactPlayer>
                                        
                                    </div>);
    			break;
    		case 'image':
    			tag = (
                                <div>
                                   <img 
                                        src={src} 
                                        alt={this.props.file.cover}/> 
                                </div>);
    			break;
    		default:
    			tag = (<br/>);
    	}
        return tag;
    }
}

export default File;