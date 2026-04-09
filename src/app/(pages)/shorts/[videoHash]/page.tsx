"use client"

import { ShortPlayer } from "@webitch/short-player";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Svg } from "@/shared/ui";
import styles from "./styles.module.scss";
import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ShortsSwiper } from "@/widgets/shortVideos/page";

export default async function Shorts() {
  const res = await getShortVideos()
  
  return (
    <ShortsSwiper videos={res} />
  )
}