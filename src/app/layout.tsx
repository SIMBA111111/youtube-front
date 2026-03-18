import { Header } from "@/widgets/header";

import 'normalize.css'
import "./globals.scss";
import { ToastProvider } from "./providers/toastProvider";
import { Sidebar } from "@/widgets/sidebar";
import { getChannels } from "@/shared/api/channels/getChannels";


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
          <Sidebar channels={channels}/>
          <Header/>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
