import { Header } from "@/widgets/header";

import 'normalize.css'
import "./globals.scss";
import { ToastProvider } from "./providers/toastProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Header/>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
