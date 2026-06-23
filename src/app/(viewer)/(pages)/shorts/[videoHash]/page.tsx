import { cookies } from "next/headers";

import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { ShortsSwiper } from "@/widgets/shortVideos";
import { updateViewVideo } from "@/shared/api/video/updateViewVideo";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getVideoByHash } from "@/shared/api/video/getVideoByHash";
import { getVideos } from "@/shared/api/video/getVideoList";

export default async function Shorts({
  params
}: {
  params: Promise<{ [key: string]: string }>,
}) {
  // const { videoHash } = await searchParams;
  const { videoHash } = await params;

  const cookie = await cookies();
  const channelData = cookie.get("channelData")?.value || "";
  let myChannelData;
  if (channelData) {
    myChannelData = JSON.parse(channelData);
  } else {
    myChannelData = {};
  }

  // const res = await getVideos();

  // const videoData = await getVideoByHash(videoHash, myChannelData?.id);

  // await updateViewVideo({
  //   videoId: videoData.video?.id,
  //   userId: myChannelData?.id,
  // });

  // console.log('res ---- ', res);

  console.log('videoHash = ', videoHash);
  
  

  return <ShortsSwiper videos={[]} videoId={videoHash} myChannelData={myChannelData}/>;
}
