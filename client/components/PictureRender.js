import React, {Component} from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import API from '../../secrets'
import ParksRender from './ParksRender'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import AppBar from '@material-ui/core/AppBar'

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
            const emotion = data.responses[0].faceAnnotations[0]

            console.log(joy)
            console.log(emotion)
            if (joy === 'UNLIKELY' || joy === 'VERY_UNLIKELY') {
                this.setState({sadness: true})
            } else {
                this.setState({sadness: false})
            }
        } catch (err) {
            console.log(err)
        }
    }

    happy = () => {
        this.setState({sadness: false, picture: ''})
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
                    <AppBar><h1 className="feeling">How are you feeling?</h1></AppBar>
                    <div className="webcam" >
                        <Webcam
                            audio={false}
                            height={350}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                            width={350}
                            videoConstraints={videoConstraints}
                        />
                    </div>
                    
                    <div className="screenshot">
                        <img src={this.state.picture} />
                    </div>
                    <div className="buttonPic">
                        <Button variant="contained" color="primary" onClick={this.capture}>Capture photo</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                   <AppBar>Cheer Up :) And Go Explore!
                    <Button className="happy" variant="contained" color="primary" onClick={() => this.happy()}>I'm Happy. I Promise</Button></AppBar>
                    
                    {this.state.parks.map((park) => {
                        return (
                            <div key={park.id}>
                                <ul key={park.id}>
                                    <Card variant="contained" color="primary"><ParksRender park={park} /></Card>
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