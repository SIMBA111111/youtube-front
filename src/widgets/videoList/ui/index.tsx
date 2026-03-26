'use client'

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";

export const VideoList = ({videoList}: {videoList: IVideo[]}) => {

    console.log('videoList = ', videoList);

    return (
        <div className={styles.container}>
            <div className={styles.videoGrid}>
                {videoList.map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
                ))}
            </div>
        </div>
    );
};