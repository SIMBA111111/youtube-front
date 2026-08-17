import { cookies } from "next/headers";

import { ShortsSwiper } from "@/widgets/shortVideos";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getChannelData } from "@/shared/utils/getChannelData";
import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { getVideoById } from "@/shared/api/video/getVideoById";

export default async function Shorts({
  params
}: {
  params: Promise<{ [key: string]: string }>,
}) {
  const { videoId } = await params;

  const cookie = await cookies();
  const myChannelData = await getChannelData(cookie)

  const resGetVideos = await getShortVideos(0, 5);
  const resGetVideoById = await getVideoById(resGetVideos.result[0].id);

  return <ShortsSwiper videos={resGetVideos.result} initVideo={resGetVideoById} videoId={videoId} myChannelData={myChannelData}/>;
}
