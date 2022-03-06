import ImageSliderData from './ImageSliderData.js';
import React, {useState} from 'react';
import sliderStyles from '../styles/Slider.module.css'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0)
    const length = slides.length

    const nextSlide = () => {
        // if we go past length, reset to 0
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        // if we go past length, reset to 0
        setCurrent(current === 0 ? length -1  : current - 1)
    }
    
    if(!Array.isArray(slides) || length <=0 ){
        return null;
    }

    return (
        <section className ={sliderStyles.slider}>
            <FaArrowAltCircleLeft className={sliderStyles.left_arrow} onClick={prevSlide}/>
            <FaArrowAltCircleRight className={sliderStyles.right_arrow} onClick={nextSlide}/>
            {ImageSliderData.map((slide, index) =>{
                return(
                    <div className={index === current ? 'slide active' : 'slide' } key={index}>
                        {index === current && (
                            <img src={slide.image} className={sliderStyles.image}/>
                        )}
                    </div>
                )
            })}
        </section>
    )
}

export default ImageSlider
