import { Header } from "@/widgets/header";

import 'normalize.css'
import "./globals.scss";
import { ToastProvider } from "./providers/toastProvider";
import { SidebarContainer } from "@/widgets/sidebarContainer";
import { getChannels } from "@/shared/api/channels/getChannels";
import { getDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { PageWrapper } from "@/widgets/pageWrapper";
import ProgressBarProvider from "./providers/progressProvider";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const channels = await getChannels()
  
  console.log('channels = ', channels);
  

  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <ProgressBarProvider>
            <PageWrapper channels={channels}>
              {children}
            </PageWrapper>
          </ProgressBarProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
