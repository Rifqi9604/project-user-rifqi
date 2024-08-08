"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { truncateText } from "@/lib/utils";

interface PostCardItemProps {
  title: string;
  image: string;
  date: string;
}

const PostCardItem: React.FC<PostCardItemProps> = ({ title, image, date }) => {
  const [truncatedText, setTruncatedText] = useState(title);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const truncateToThreeLines = () => {
      if (paragraphRef.current) {
        const element = paragraphRef.current;
        let currentTitle = title;
        let wordCount = currentTitle.split(" ").length;

        element.textTitle = currentTitle;
        while (element.scrollHeight > element.offsetHeight && wordCount > 1) {
          wordCount--;
          currentTitle = truncateText(title, wordCount);
          element.textTitle = currentTitle;
        }

        setTruncatedText(currentTitle);
      }
    };

    truncateToThreeLines();
    window.addEventListener("resize", truncateToThreeLines);

    return () => window.removeEventListener("resize", truncateToThreeLines);
  }, [title]);

  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMM yyyy");
  };

  return (
    <div className="w-full border border-[#FF6600] h-[300px] shadow-md rounded-xl">
      <div className="h-1/2 flex items-center justify-center bg-slate-300 relative rounded-t-xl">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>
      <div className="h-1/2 p-4 flex flex-col justify-between">
        <div>
          <p className="text-slate-400 text-md mb-2">{formatDate(date)}</p>

          <p ref={paragraphRef} className="text-xl line-clamp-3 font-bold">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCardItem;
