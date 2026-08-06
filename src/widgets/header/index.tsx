"use client";

import { BurgerButton, Svg } from "@/shared/ui";
import {
  CreateContentBtn,
  LoginBtn,
  Notifications,
  UserBtn,
  VideoSearch,
} from "@/features";
import { MainLogoBtn } from "@/features/mainLogoBtn/ui";
import { IChannelData } from "@/shared/utils/getChannelData";
import styles from "./styles.module.scss";

export const Header = ({myChannelData}: {myChannelData: IChannelData | null}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainer__block}>
        <BurgerButton />
        {/* <MainLogoBtn/> */}
      </div>
      <div className={styles.headerContainer__block}>
        <div className={styles.searcher}>
          <VideoSearch />
        </div>
      </div>
      <div className={styles.headerContainer__block}>
        {myChannelData ? (
          <>
            <CreateContentBtn channelId={myChannelData.id} />
            <Notifications userId={myChannelData.id}/>
            <UserBtn
              id={myChannelData.id}
              username={myChannelData.username}
              channelName={myChannelData.name}
              avatarUrl={myChannelData.avatarUrl}
            />
          </>
        ) : (
          <>
            <UserBtn/>
            <LoginBtn />
          </>
        )}
      </div>
    </div>
  );
};
