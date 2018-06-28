import React, { Component } from 'react';
import ReactPlayer from 'react-player';


class File extends Component {
    constructor(props){
        super(props);
        this.state = {
            playing: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    // 1
    handleClick(){
        console.log(this.props.keyId);
        this.props.updateCurrentKey(this.props.keyId);
        // console.log('previous playing')
        this.setState({
            playing: !this.state.playing
        })
        // console.log('after playing')
    }
    
    // componentWillUpdate나 componentDidUpdate에서 
    //state를 변경하면 무한루프에 빠지게 된다
    componentWillReceiveProps(nextProps) {
        if(this.props.current !== -1 && this.props.keyId === this.props.current){
            console.log(`File No.${this.props.current} stopped`);
            this.setState({ playing: !this.state.playing })
        }
        // console.log(this.props.current); // -1
        // console.log(nextProps.current); //9
    }

        // 4
       componentWillUpdate(prevProps, prevState) {
        // if(this.props.current !== -1 && this.props.keyId === this.props.current){
        //     console.log(`File No.${prevProps.current} stopped`);
        //     this.setState({ playing: !this.state.playing })
        // }
        // console.log(this.props.current); // -1 (prev)
        // console.log(nextProps.current); // 9 (next)
        // console.log('update file component ^^');
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
                                        {btn}
                                    </div>);
    			break;
    		case 'image':
    			tag = (
                                <div>
                                   <img 
                                        src={src} 
                                        alt={this.props.file.name}/> 
                                </div>);
    			break;
    		default:
    			tag = (<br/>);
    	}
        return tag;
    }
}

export default File;