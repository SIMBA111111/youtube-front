import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { Subs } from "@/widgets";
import styles from "./styles.module.scss";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailShortVideoCard } from "@/entities";
import { ThumbnailShortVideoSmallCard } from "@/entities/thumbnailShortVideo/ui/SmallCard";
import { Text } from "@/shared/ui";
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";

export default async function MySubsChannels() {

  const channelList = await getMySubsChannels()

  return (
    <div className={styles.mainPage__container}>

    </div>
  );
}
