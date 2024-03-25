import Image from "next/image";
import React from "react";

// const images = [
//   "https://gaixinhbikini.com/wp-content/uploads/2023/02/hinh-co-gai-xinh-dep-005.jpg",
//   "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-viet-nam.jpg",
//   "https://gaixinhbikini.com/wp-content/uploads/2022/09/52321187927_023da6d2ec_o.jpg",
// ];

function TestImage() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-3 w-full bg-fuchsia-600 min-h-[300px] gap-3">
        <div className="relative bg-blue-500">
          <Image
            alt="test"
            fill
            src="https://dgg-marketplace-prod.s3.ap-southeast-1.amazonaws.com/UICP%2C%7BM%7D01xZ~oNI9Zs.XSoIVta~bvs%2BRjR%3A.jpeg"
            // sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
            sizes="33vw"
            className="object-cover"
          />
        </div>
        <Image
          alt="test1"
          src="https://dgg-marketplace-prod.s3.ap-southeast-1.amazonaws.com/UICP%2C%7BM%7D01xZ~oNI9Zs.XSoIVta~bvs%2BRjR%3A.jpeg"
          width={200}
          height={300}
        />
      </div>
      <Image
        alt="test1"
        src="https://dgg-marketplace-prod.s3.ap-southeast-1.amazonaws.com/UICP%2C%7BM%7D01xZ~oNI9Zs.XSoIVta~bvs%2BRjR%3A.jpeg"
        width={800}
        height={400}
        className="!w-[800px] !h-[400px] object-cover"
      />

      {/* <ImageAssetDetail images={images} /> */}
    </div>
  );
}

export default TestImage;
