import { cookies } from "next/headers";

import { ShortsSwiper } from "@/widgets/shortVideos";
import { updateViewVideo } from "@/shared/api/video/updateViewVideo";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getVideoByHash } from "@/shared/api/video/getVideoByHash";
import { getChannelData } from "@/shared/utils/getChannelData";

export default async function Shorts({
  params
}: {
  params: Promise<{ [key: string]: string }>,
}) {
  const { videoHash } = await params;

  const cookie = await cookies();
  const myChannelData = await getChannelData(cookie)

  // const videoData = await getVideoByHash(videoHash, myChannelData?.id);

  // await updateViewVideo({
  //   videoId: videoData.video?.id,
  //   userId: myChannelData?.id,
  // });

  return <ShortsSwiper videos={[]} videoId={videoHash} myChannelData={myChannelData}/>;
}
