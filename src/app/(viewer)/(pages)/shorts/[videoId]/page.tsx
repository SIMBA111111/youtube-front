import { cookies } from "next/headers";

import { ShortsSwiper } from "@/widgets/shortVideos";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getChannelData } from "@/shared/utils/getChannelData";
import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { getVideoById } from "@/shared/api/video/getVideoById";
import { getVideos } from "@/shared/api/video/getVideoList";
import { updateViewVideo } from "@/shared/api/video/updateViewVideo";

export default async function Shorts({
  params
}: {
  params: Promise<{ [key: string]: string }>,
}) {
  const { videoId } = await params;

  const cookie = await cookies();
  const myChannelData = await getChannelData(cookie)
  
  const resGetVideoById = await getVideoById(videoId, myChannelData?.id, true);

  await updateViewVideo({
    videoId: videoId,
    userId: myChannelData && myChannelData.isSaveHistory ? myChannelData?.id : '',
  });

  if (!resGetVideoById || !resGetVideoById.data || resGetVideoById.error || !resGetVideoById.success) {
    return (
      <div>
        Ошибка...
      </div>
    )
  }

  return (
    <ShortsSwiper
      initVideo={resGetVideoById.data} 
      videoId={videoId} 
      myChannelData={myChannelData}
    />
  ) 
}
