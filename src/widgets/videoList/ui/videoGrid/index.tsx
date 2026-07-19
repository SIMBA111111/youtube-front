// import { memo } from "react";

// const VideoGrid = memo(({ videos, deviceType }) => {
//     return (
//                 <div className={styles.videoGrid}>
//         {data
//             .filter((video: IVideo) => !video?.isShort)
//             .slice(getVideosCount(device), getVideosCount(device) * 2)
//             .map((video: IVideo, index) => (
//             <div key={index} className={styles.videoCardWrapper}>
//                 <ThumbnailVideoCard video={video} />
//             </div>
//             ))}
//         </div>
//     )
// });