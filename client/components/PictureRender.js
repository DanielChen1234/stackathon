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
            parks: [],
        }
    }

    componentDidMount = async () => {
        const {data} = await axios.get('/api/parks')
        this.setState({parks: data})
        
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = async () => {
        const imageSrc = this.webcam.getScreenshot()
        await this.setState({picture: imageSrc})
      
        try {
            const {data} = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API}`, {
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

            const joy = data.responses[0].faceAnnotations[0].joyLikelihood
            console.log(joy)
            if (joy === 'UNLIKELY' || joy === 'VERY_UNLIKELY') {
                console.log(joy)
                this.setState({sadness: true})
            } else {
                this.setState({saddness: false})
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
            return (
                <div>
                    <h1>Cheer Up :)! NYC is huge. Go Explore!</h1>
                    
                    {this.state.parks.map((park) => {
                        return (
                            <div>
                                <ul>
                                    <ParksRender park={park} key={park.id} />
                                </ul>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}

export default PictureRender