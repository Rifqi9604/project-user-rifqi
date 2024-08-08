import React from "react";
import Image from "next/image";
import Canyon from "../../../../public/canyon.jpeg";

const Banner: React.FC = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        src={Canyon}
        alt="Banner Background"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold">Ideas</h1>
        <p className="text-xl mt-2">Where all our great things begin</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white transform -skew-y-1 origin-bottom-right"></div>
    </div>
  );
};

export default Banner;
