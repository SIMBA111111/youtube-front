import { cookies } from "next/headers";

import { getChannels } from "@/shared/api/channels/getChannels";
import { PageWrapper } from "@/widgets/pageWrapper";
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";

import ProgressBarProvider from "./providers/progressProvider";
import { ThemeProvider } from "./providers/themeProvider";
import { ToastProvider } from "./providers/toastProvider";

import 'normalize.css'
import "./globals.scss";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value

  const currentTheme = theme ? theme : 'device'  
  
  return (
    <html lang="en">
      <body>
        <ThemeProvider initialTheme={currentTheme as any}>
          <ToastProvider>
            <ProgressBarProvider>
              <PageWrapper>
                {children}
              </PageWrapper>
            </ProgressBarProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
