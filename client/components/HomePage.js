import React, {Component} from 'react';
import {connect} from 'react-redux';
import PictureRender from './PictureRender'

class HomePage extends Component {
    render(){
        return(
            <div>
                <PictureRender />
            </div>
        )
    }
}

export default HomePage