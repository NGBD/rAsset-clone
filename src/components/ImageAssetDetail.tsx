import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DialogOverlay } from "@reach/dialog";
import MotionDialogContent from "./MotionDialogContent";
import CloseDialogIcon from "./icon/CloseDialogIcon";
import FullScreenImage from "./FullScreenImage";

export default function App({ assetDetails }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (768 <= window.innerWidth && window.innerWidth < 1000) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className={`h-[400px] w-full relative flex flex-col gap-5 ${isSmallScreen ? "" : "md:h-full"}`}>
        <Swiper
          style={{ color: "#5550DC" }}
          spaceBetween={10}
          navigation={true}
          loop
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper2 rounded-md w-full h-full relative ${isSmallScreen ? "md:h-3/5" : "md:h-4/5"}`}
        >
          {assetDetails?.images?.map((i, index) => (
            <SwiperSlide key={`big-img-${index}`}>
              <Image
                className="cursor-pointer"
                onClick={() => setShowDialog(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                fill
                src={i || "/images/img-default.png"}
                alt="image"
              />
              <div
                className={`absolute top-[10px] right-[10px] px-3 py-1 rounded-md  text-white cursor-pointer ${
                  assetDetails?.isStable ? "bg-primary" : "bg-green-600"
                }`}
              >
                {assetDetails?.isStable ? "Stable" : "Grow"}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper rounded-md cursor-pointer w-full md:h-[100px] ${
            isSmallScreen ? "h-[60px]" : "h-[100px]"
          }`}
        >
          {assetDetails?.images?.map((i, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                fill
                src={i || "/images/img-default.png"}
                alt="image"
                className="rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <AnimatePresence>
        {showDialog && (
          <DialogOverlay onDismiss={close} className="z-50 w-full h-full flex items-center justify-center text-black">
            <MotionDialogContent
              aria-label="full-img-slide"
              style={{ width: "100vw", padding: "0", margin: "0" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 bg-black"
            >
              <motion.div className="flex flex-col bg-black relative" initial={{ y: +30 }} animate={{ y: 0 }}>
                <div
                  onClick={() => setShowDialog(false)}
                  className="absolute z-30 cursor-pointer drop-shadow-md shadow-md p-1 bg-white rounded-full bg-opacity-60 top-5 right-5"
                >
                  <CloseDialogIcon color="#fff" />
                </div>
                <FullScreenImage assetDetails={assetDetails} />
              </motion.div>
            </MotionDialogContent>
          </DialogOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}
