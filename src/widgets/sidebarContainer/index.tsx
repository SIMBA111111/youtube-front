import { useEffect, useState } from "react";

import { IThumbnailShortVideo } from "@/entities/thumbnailShortVideo/modal/types";
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";
import { getVideos } from "@/shared/api/video/getVideoList";
import { getChannelDataClient } from "@/shared/hooks/getChannelDataClient";

import { MobileSidebar } from "./MobileSidebar";
import { DesktopSidebar } from "./desktopSidebar";
import styles from "./styles.module.scss";


export const SidebarContainer = () => {
  const [randomShortVideo, setRandomShortVideo] =
    useState<IThumbnailShortVideo | null>(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const handleGetRandomVideo = async () => {
      const myChannelData = getChannelDataClient();

      const res = await getVideos(null, null, true, 0, 1);
      setRandomShortVideo(res.data[0].video);

      if (myChannelData && myChannelData.id) {
        const channels = await getMySubsChannels(myChannelData.id, 0, 5);

        setChannels(channels?.data);
      }
    };

    handleGetRandomVideo();
  }, []);

  return (
    <>
      <div className={styles.desktopSidebar}>
        <DesktopSidebar
          channels={channels}
          randomShortVideo={randomShortVideo}
        />
      </div>
      <div className={styles.tabletSidebar}>
        <MobileSidebar
          channels={channels}
          randomShortVideo={randomShortVideo}
        />
      </div>
    </>
  );
};
