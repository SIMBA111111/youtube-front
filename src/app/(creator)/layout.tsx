import { cookies } from "next/headers";

import { getChannelData } from "@/shared/utils/getChannelData";

import ProgressBarProvider from "../providers/progressProvider";
import { ThemeProvider } from "../providers/themeProvider";
import { ToastProvider } from "../providers/toastProvider";
import { CreatorChannelPageProvider } from "../providers/creatorChannelPageProvider";

import "../globals.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const userData = await getChannelData(cookieStore)
  const jwt = cookieStore.get('jwt')?.value
  
  const theme = cookieStore.get('theme')?.value
  const lang = cookieStore.get('lang')?.value

  const currentTheme = theme ? theme : 'device based'  
  
  if (!userData) {
    return (
      <div>
        Нет юзера
      </div>
    )
  }

  return (
    <ThemeProvider initialTheme={currentTheme as any}>
      <ToastProvider>
        <ProgressBarProvider>
          <CreatorChannelPageProvider 
            channelAvatar={userData.avatarUrl}
            channelName={userData.name}
            channelId={userData.id}
            channelUsername={userData.username}
            activeTheme={currentTheme}
            activeLanguage={lang || ''}
          >
            {children}
          </CreatorChannelPageProvider>
        </ProgressBarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
