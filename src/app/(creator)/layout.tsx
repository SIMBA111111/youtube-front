import { cookies } from "next/headers";

import { getChannels } from "@/shared/api/channels/getChannels";
import { PageWrapper } from "@/widgets/pageWrapper";
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";

import ProgressBarProvider from "../providers/progressProvider";
import { ThemeProvider } from "../providers/themeProvider";
import { ToastProvider } from "../providers/toastProvider";

import "../globals.scss";
import { CreatorPageProvider } from "../providers/creatorPageProvider";
import { getAuthData } from "@/shared/hooks/getAuthData";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value

  const currentTheme = theme ? theme : 'device'  

  const authData = await getAuthData()
  
  console.log('authData = ', authData);


  if (!authData) {
    return (
      <div>
        Хуй
      </div>
    )
  }

  return (
    <ThemeProvider initialTheme={currentTheme as any}>
      <ToastProvider>
        <ProgressBarProvider>
          <CreatorPageProvider 
            channelAvatar={authData.avatarUrl}
            channelName={authData.name}
            channelId={authData.id}
            channelUsername={authData.username}
            // activeTheme={}
            activeLanguage={authData.lang}
          >
            {children}
          </CreatorPageProvider>
        </ProgressBarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
