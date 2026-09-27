import { cookies } from "next/headers";

import { ShortsSwiper } from "@/widgets/shortVideos";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getChannelData } from "@/shared/utils/getChannelData";
import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { getVideoById } from "@/shared/api/video/getVideoById";
import { getVideos } from "@/shared/api/video/getVideoList";

export default async function Shorts({
  params
}: {
  params: Promise<{ [key: string]: string }>,
}) {
  const { videoId } = await params;

  const cookie = await cookies();
  const myChannelData = await getChannelData(cookie)
  
  const res = await getVideos(null, 'shorts', null, 0, 5);

  console.log('res: ', res);
  

  const resGetVideoById = await getVideoById(videoId);

  if (!resGetVideoById) {
    return (
      <div>
        Ошибка...
      </div>
    )
  }

  return <ShortsSwiper
            videos={res.data}
            initVideo={resGetVideoById} 
            videoId={videoId} 
            myChannelData={myChannelData}
          />;
}
