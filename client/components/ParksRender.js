import React, {Component} from 'react';
import axios from 'axios';
import API from '../../secrets';

class ParksRender extends Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        const {data} = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API}`, {
            wifiAccessPoints: [
                {macAddress: '8c:85:90:aa:8f:57'}
            ]
        })
        
    }

    render(){
        return (
            <div>
                <h1>{this.props.park.name}</h1>
                <img src={this.props.park.picture} />
                <p>{this.props.park.description}</p>
                <h4>{this.props.park.address}</h4>
            </div>
        )
    }
}

export default ParksRender
