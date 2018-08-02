import React, {Component} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import API from '../../secrets'

class PictureRender extends Component {

    constructor(){
        super();
        this.state = {
            picture: ''
        }
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = async () => {
        const imageSrc = this.webcam.getScreenshot();
        await this.setState({picture: imageSrc})
        // let setState = new Promise(this.setState({picture: imageSrc}))
        // setState.then(() => {
        //     console.log(this.state)    
        // })
        
        console.log(this.state.picture)
        const data = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API}`, {KEY: this.state.picture})
        console.log(data)
    };
    
      render() {
        const videoConstraints = {
          width: 1280,
          height: 720,
          facingMode: 'user',
        };
        
        return (
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
                <img src={this.state.picture} />
                <button onClick={this.capture}>Capture photo</button>

            </div>
        );
    }
}

export default PictureRender