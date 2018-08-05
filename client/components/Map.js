import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import {compose, withProps, lifecycle} from 'recompose'
import API from '../../secrets'

const MapWithADirectionsRenderer = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API}`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {
        const DirectionsService = new google.maps.DirectionsService();
  
        DirectionsService.route({
          origin: new google.maps.LatLng(Number(this.props.originLatitude), Number(this.props.originLongitude)),
          destination: new google.maps.LatLng(Number(this.props.destinationLatitude), Number(this.props.destinationLongitude)),
          travelMode: google.maps.TravelMode.WALKING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    })
  )(props =>
    <GoogleMap
      defaultZoom={7}
      defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
export default MapWithADirectionsRenderer;