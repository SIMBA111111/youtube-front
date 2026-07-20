// utils/server-cookies.ts
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';

export const getChannelData = async (cookie: ReadonlyRequestCookies) => {
  const channelData = cookie.get("channelData")?.value || "";
  
  try {
    return channelData ? JSON.parse(channelData) : {};
  } catch (error) {
    console.error("Failed to parse channelData cookie:", error);
    return {};
  }
}