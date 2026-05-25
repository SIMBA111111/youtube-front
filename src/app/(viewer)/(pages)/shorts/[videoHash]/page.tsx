import { cookies } from "next/headers";

import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { ShortsSwiper } from "@/widgets/shortVideos";
import { updateViewVideo } from "@/shared/api/video/updateViewVideo";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getVideoByHash } from "@/shared/api/video/getVideoByHash";


export default async function Shorts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { v: videoHash } = await searchParams;

  
  const cookie = await cookies();
  const channelData = cookie.get("channelData")?.value || "";
  let myChannelData;
  if (channelData) {
    myChannelData = JSON.parse(channelData);
  } else {
    myChannelData = {};
  }

  const res = await getShortVideos()

  const videoData = await getVideoByHash(videoHash, myChannelData?.id);

  console.log('videoData = ', videoData);
  

  await updateViewVideo({
    videoId: videoData.video?.id,
    userId: myChannelData?.id,
  });
  
  return (
    <ShortsSwiper videos={res} />
  )
}