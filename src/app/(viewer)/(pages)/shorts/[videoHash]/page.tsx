import { cookies } from "next/headers";

import { ShortsSwiper } from "@/widgets/shortVideos";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getChannelData } from "@/shared/utils/getChannelData";

export default async function Shorts({
  params
}: {
  params: Promise<{ [key: string]: string }>,
}) {
  const { videoHash } = await params;

  const cookie = await cookies();
  const myChannelData = await getChannelData(cookie)

  return <ShortsSwiper videoId={videoHash} myChannelData={myChannelData}/>;
}
