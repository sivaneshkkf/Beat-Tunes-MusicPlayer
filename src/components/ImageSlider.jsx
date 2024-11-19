import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import baner1 from "../data/baners/baner1.png";
import baner2 from "../data/baners/baner2.png";
import baner3 from "../data/baners/baner3.webp";
import baner4 from "../data/baners/baner4.webp";
import InstallButton from "./InstallButton";

const ImageSlider = () => {
  const images1 = [baner1, baner3, baner4];
  const images2 = [baner2, baner3, baner4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [installStatus, setInstallStatus] = useState(false)
  const [clickDownload, setClickDownload] = useState(false)
  const [imageAutoSliding, setImageAutoSliding] = useState(true)
  const [images,setImages] = useState(images1)

  useEffect(() => {
    if(installStatus){
        setImages(images1)
    }else{
        setImages(images2)
    }
  },[installStatus])

  const prevSlide = () => {
    setImageAutoSliding(false)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setImageAutoSliding(false)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  function handleImgClick(img) {
    if(img.includes("baner1")){
        setImageAutoSliding(false)
        setClickDownload(true)
    }
  }

  useEffect(() => {
    let timer;
    if(imageAutoSliding){
        timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000)
    }
    return () => clearInterval(timer)
  },[imageAutoSliding])

  useEffect(() => {
    const timer = setInterval(() => {
        setImageAutoSliding(true)
    }, 10000);
  },[setImageAutoSliding])

  return (
    <div className="relative max-w-4xl rounded-lg mx-auto overflow-hidden">
      {/* Images */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className="w-full object-cover cursor-pointer"
          onClick={() => handleImgClick(image)}
        />
        
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 flex justify-center w-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
      <InstallButton setStatus={setInstallStatus} clickDownload={clickDownload} setClickDownload={setClickDownload}/>
    </div>
  );
};

export default ImageSlider;
