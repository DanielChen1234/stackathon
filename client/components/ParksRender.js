import React, {Component} from 'react';
import axios from 'axios';

class ParksRender extends Component {
    constructor(){
        super();
        this.state = {
            parks: []
        }
    }

    render(){
        // if (this.state.parks.length) {
        //     this.state.parks.map((park) => {
                return (
                    <div>
                        <h1>{park.name}</h1>
                        <small>{park.description}</small>
                        <h2>{park.picture}</h2>
                        <h4>{park.address}</h4>
                    </div>
                )
            }
        // )
        // } else {
        //     return null
        // }
    // }
}

export default ParksRender
