import { cookies } from "next/headers";

import { getVideos } from "@/shared/api/video/getVideoList";
import { VideoList } from "@/widgets";
import { getTags } from "@/shared/api/tags/getTags";

import styles from "./styles.module.scss";
import { createVideo } from "@/shared/api/video/admin/createVideo";


export default async function MainPage() {

    const channelData = await (await cookies()).get('channelData')?.value
    const jwt = await (await cookies()).get('jwt')?.value

    const userId = JSON.parse(channelData).id

    await createVideo(userId, jwt)

    return (
        <div className={styles.page}>
            <div>Создать Видео</div>
        </div>
    );
}
