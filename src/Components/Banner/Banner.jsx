import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import tourTravel from '../../assets/tour-travel-book.jpg'
import archiTecture from '../../assets/archi-tecture.jpg'
import abstractBrochure from '../../assets/abstract-brochure-design.jpg'

export const Banner = () => {

  

    return (
        <Carousel
            autoPlay
            infiniteLoop
            interval={1000}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            swipeable={true}
            dynamicHeight={false}
        >
            <div>
                <img src={tourTravel} alt="Slide 1" />
            </div>

            <div>
                <img src={archiTecture} alt="Slide 2" />
            </div>

            <div>
                <img src={abstractBrochure} alt="Slide 3" />
            </div>
        </Carousel>
    )
}
