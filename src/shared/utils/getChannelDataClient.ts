// utils/server-cookies.ts
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getChannelDataClient = async (cookie: Cookies.CookiesStatic) => {
  const channelData = cookie.get("channelData");

  try {
    return channelData ? JSON.parse(channelData) : {};
  } catch (error) {
    console.error("Failed to parse channelData cookie:", error);
    return {};
  }
};
