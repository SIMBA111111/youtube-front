import { cookies } from "next/headers";
import { getTags } from "@/shared/api/tags/getTags";
import styles from "./styles.module.scss";


export default async function MainPage() {
  const jwt = await (await cookies()).get('jwt')
  const tags = await getTags()

  return (
    <div className={styles.page}>
      {/* <VideoList tags={tags.tags} jwt={jwt?.value || ''}/> */}
    </div>
  );
}
