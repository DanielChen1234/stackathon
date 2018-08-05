import React from 'react';
import API from '../../secrets';

const ParksRender = (props) => {
    const googleMapsClient = require('@google/maps').createClient({
        key: API
    });
    return (
        <div>
            <h1>{props.park.name}</h1>
            <img src={props.park.picture} />
            <p>{props.park.description}</p>
            <h4>{props.park.address}</h4>
        </div>
    )
}

export default ParksRender
