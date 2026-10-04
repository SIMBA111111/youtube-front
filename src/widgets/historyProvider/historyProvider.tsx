'use client'

import { useState } from "react"
import { History } from "@/widgets/feed/history"
import { HistorySettings } from "@/features/HistorySettings/ui"
import { ITagEntity } from "@/entities/videoTags/model"
import styles from "./styles.module.scss"

interface IHistoryProvider {
  userId: string
  jwt: string
  tags: ITagEntity[]
  isSaveHistory: boolean
}

export const HistoryProvider = ({
  userId,
  jwt,
  tags,
  isSaveHistory,
}: IHistoryProvider) => {
  // ключ-версия: меняем — History перемонтируется и заново грузит данные
  const [historyVersion, setHistoryVersion] = useState(0)

  return (
    <div className={styles.mainPage_body}>
      <div className={styles.mainPage_body_videos}>
        <History
          key={historyVersion}
          userId={userId}
          jwt={jwt}
          tags={tags}
        />
      </div>
      <div className={styles.mainPage_body_settings}>
        <HistorySettings
          meId={userId}
          isSaveHistory={isSaveHistory}
          onHistoryCleared={() => setHistoryVersion(v => v + 1)}
        />
      </div>
    </div>
  )
}