import React, {Component} from 'react';


class ParksRender extends Component {
    constructor(){
        super()
    }

    componentDidMount = async () => {
        function showPosition(position) {
            console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude)
        }
        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERR:
                    x.innerHTML = "An unknown error occurred.";
                    break;
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition)
        } else {
            console.log("Geolocation API doesn't supported.")
        }

        
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
