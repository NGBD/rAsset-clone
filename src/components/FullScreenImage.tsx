import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

function FullScreenImage({ assetDetails }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        if (768 <= window.innerWidth && window.innerWidth < 1000) {
          setIsSmallScreen(true);
        } else {
          setIsSmallScreen(false);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full max-w-maxContent mx-auto h-screen flex flex-col md:p-10 p-4 justify-between md:gap-5">
      <Swiper
        style={{}}
        spaceBetween={10}
        navigation={true}
        loop
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`mySwiper2 rounded-md w-full h-[30vh] mt-28 md:mt-0 relative ${
          isSmallScreen ? "md:h-[60vh]" : "md:h-[85vh]"
        } ${isSmallScreen ? "md:mt-10" : "mt-0"}`}
      >
        {assetDetails?.images?.map((i, index) => (
          <SwiperSlide key={`big-img-${index}`}>
            <Image className="cursor-pointer" sizes="90vw" fill src={i || "/images/img-default.png"} alt="image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={isMobile ? 3 : 6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper rounded-md cursor-pointer md:min-h-[100px] min-h-[90px] md:mb-0 mb-16 w-full"
      >
        {assetDetails?.images?.map((i, index) => (
          <SwiperSlide key={`slide-${index}`} className="">
            <Image sizes="30vw" fill src={i || "/images/img-default.png"} alt="image" className="rounded-md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FullScreenImage;
