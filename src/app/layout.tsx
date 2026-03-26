
import { ToastProvider } from "./providers/toastProvider";
import { getChannels } from "@/shared/api/channels/getChannels";
import { PageWrapper } from "@/widgets/pageWrapper";
import ProgressBarProvider from "./providers/progressProvider";
import { cookies } from "next/headers";
import { ThemeProvider } from "./providers/themeProvider";
import { Header } from "@/widgets/header";

import 'normalize.css'
import "./globals.scss";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const channels = await getChannels()
  
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value

  const currentTheme = theme ? theme : 'device'  
  
  return (
    <html lang="en">
      <body>
        <ThemeProvider initialTheme={currentTheme as any}>
          <ToastProvider>
            <ProgressBarProvider>
              <PageWrapper channels={channels}>
                {children}
              </PageWrapper>
            </ProgressBarProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
