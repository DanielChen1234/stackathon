import React, {Component} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import API from '../../secrets'
// const vision = require('@google-cloud/vision')
// const client = new vision.ImageAnnotatorClient()

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
        const imageSrc = this.webcam.getScreenshot()
        await this.setState({picture: imageSrc})
      
        try {
            const data = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API}`, {
                requests:[
                    {
                        image: {
                            content: this.state.picture.slice(23)
                        },
                        features: [
                            {
                                type: 'FACE_DETECTION',
                            }
                        ]
                    }
                ]
            })
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    
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