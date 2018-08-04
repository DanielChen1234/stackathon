import React from 'react';

const ParksRender = (props) => {
    console.log(props, 'this is parksrender')
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
