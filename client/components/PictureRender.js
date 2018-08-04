import React, {Component} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import API from '../../secrets'
import ParksRender from './ParksRender'

class PictureRender extends Component {

    constructor(){
        super();
        this.state = {
            picture: '',
            sadness: false,
            parks: []
        }
    }

    componentDidMount = async () => {
        const {data} = await axios.get('/api/parks')
        console.log(data)
        this.setState({parks: data})
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

            const joy = data.data.responses[0].faceAnnotations[0].joyLikelihood
            if (joy === 'UNLIKELY' || 'VERY_UNLIKELY') {
                console.log(joy)
                this.setState({sadness: true})
            }
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
        
        if (this.state.sadness === false){
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
            )
        } else {
            return this.state.parks.map((park) => {
                return (
                    <div>
                        <ul>
                            <ParksRender park={park} />
                        </ul>
                    </div>
                )
            })
        }
    }
}

export default PictureRender