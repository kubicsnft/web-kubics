import React, { Component, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'


export default function Slider(props) {


  const [goToSlide, setstateGoToSlide] = useState(0);


  return (
    <div style={{ width: "100%", margin: "0 auto" }} className='sm:h-[450px] h-[350px] relative'>
      <Carousel
        slides={props.category}
        goToSlide={goToSlide}
        offsetRadius={props.radius}
        showNavigation={false}
      // animationConfig={this.state.config}
      />
      {/*-------- Buttoms ------- */}
      <div className='z-10 flex flex-row justify-center w-full mt-4 text-secondary'>
        {/* Button left */}
        <div className="p-1 mr-10 text-3xl transition duration-300 ease-in-out rounded-full shadow-lg cursor-pointer hover:scale-125"
          onClick={() => {
            setstateGoToSlide(goToSlide - 1);
          }}>
          <MdOutlineArrowBackIosNew />
        </div>

        {/* button right */}
        <div className="p-1 ml-10 text-3xl transition duration-300 ease-in-out rounded-full shadow-lg cursor-pointer hover:scale-125"
          onClick={() => {
            setstateGoToSlide(goToSlide + 1);
          }}>
          <MdOutlineArrowForwardIos />
        </div>
      </div>
    </div>
  );

}
