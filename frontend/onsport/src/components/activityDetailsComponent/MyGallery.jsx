import React, { Component } from 'react';
import './carrousel.scss';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default class MyGallery extends Component {
    render() {
        return (
            <Carousel>
                {this.props.myActivity.images_collection.map((image) => {
                    return (
                        <img key={image} src={image} alt="image_activity"></img>
                    );
                })}
            </Carousel>
        );
    }
}
