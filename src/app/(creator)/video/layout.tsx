import { cookies } from "next/headers";

import ProgressBarProvider from "../../providers/progressProvider";
import { ThemeProvider } from "../../providers/themeProvider";
import { ToastProvider } from "../../providers/toastProvider";
import { CreatorVideoPageProvider } from "../../providers/creatorVideoPageProvider";

import "../../globals.scss";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const userData = JSON.parse(cookieStore.get('channelData')?.value || '{}')
  const jwt = cookieStore.get('jwt')?.value
  
  const theme = cookieStore.get('theme')?.value

  const currentTheme = theme ? theme : 'device'  
  
  return (
    <ThemeProvider initialTheme={currentTheme as any}>
      <ToastProvider>
        <ProgressBarProvider>
          <CreatorVideoPageProvider 
            channelAvatar={userData.avatarUrl}
            channelName={userData.name}
            channelId={userData.id}
            channelUsername={userData.username}
            activeTheme={currentTheme}
            activeLanguage={userData.lang}
          >
            {children}
          </CreatorVideoPageProvider>
        </ProgressBarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
