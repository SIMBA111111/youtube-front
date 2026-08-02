// utils/server-cookies.ts
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface IChannelData {
  id: string
  name: string
  username: string
  avatarUrl: string
  email: string
}

export const getChannelData = async (
  cookie: ReadonlyRequestCookies
): Promise<IChannelData | null> => {
  const channelData = cookie.get("channelData")?.value || ""

  try {
    return channelData ? JSON.parse(channelData) : null
  } catch (error) {
    console.error("Failed to parse channelData cookie:", error)
    return null
  }
};
