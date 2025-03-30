import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function ImageCarousels({ images }: { images: string[] }) {
  return (
    <div className="w-full h-full relative">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="w-full h-full absolute top-0 left-0"
      >
        {images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt="image"
              fill
              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
