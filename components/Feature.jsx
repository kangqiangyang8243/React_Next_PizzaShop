import Image from "next/image";
import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
function Feature() {
  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 1",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Slide 2",
    },
    {
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 3",
    },
  ];
  return (
    <div className="w-full">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <img
            src={slideImage.url}
            key={index}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            // ObjectFit="cover"
            // className="w-full h-auto"

            className="w-full h-[200px] md:h-[300px] lg:h-[700px]"
          />
        ))}
      </Slide>
    </div>
  );
}

export default Feature;
