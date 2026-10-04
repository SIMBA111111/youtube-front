import { cookies } from "next/headers";
import { Text } from "@/shared/ui";
import { MySubChannels } from "@/widgets/mySubChannels";
import { getChannelData } from "@/shared/utils/getChannelData";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import styles from "./styles.module.scss";


export default async function SubsChannels() {
  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  let jwt

  if(myChannelData) {
    jwt = cookie.get('jwt')?.value || ''
  } else {
    return (
      <UnauthorizedWidget svgName="history" title="Чтобы посмотреть историю просмотра, войдите в аккаунт." />
    )
  }

  return (
    <div className={styles.mainPage__container}>
      <Text size={32} weight={700}>Каналы, на которые вы подписаны</Text>
      <MySubChannels jwt={jwt || ''} userId={myChannelData.id} />
    </div>
  );
}
