import styles from "./styles.module.scss";

export const VideoThumbnailSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.video}></div>
            <div className={styles.videoName}></div>
            <div className={styles.videoInfo}></div>
        </div>
    )
}