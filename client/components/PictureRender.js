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
        // let setState = new Promise(this.setState({picture: imageSrc}))
        // setState.then(() => {
        //     console.log(this.state)    
        // })
        console.log(await this.state.picture.slice(23) + "")

        console.log(await toString(this.state.picture.slice(23)))
        try {
            const data = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API}`, {
                requests:[
                    {
                        image: {
                            content: toString(this.state.picture.slice(23))
                        },
                        features: [
                            {
                                type: 'FACE_DETECTION',
                                maxResults: 1
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