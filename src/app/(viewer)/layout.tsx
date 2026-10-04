import { cookies } from "next/headers";
import { PageWrapper } from "@/widgets/pageWrapper";
import { getChannelData } from "@/shared/utils/getChannelData";
import ProgressBarProvider from "../providers/progressProvider";
import { Theme, ThemeProvider } from "../providers/themeProvider";
import { ToastProvider } from "../providers/toastProvider";

import "normalize.css";
import "../globals.scss";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const jwt = cookieStore.get("jwt")?.value;
  const myChannelData = await getChannelData(cookieStore)

  const currentTheme = theme ? theme : "device based";

  return (
    <ThemeProvider initialTheme={currentTheme as Theme}>
      <ToastProvider>
        <ProgressBarProvider>
          <PageWrapper myChannelData={myChannelData} jwt={jwt}>{children}</PageWrapper>
        </ProgressBarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
