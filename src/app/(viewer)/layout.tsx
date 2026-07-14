import { cookies } from "next/headers";
import { PageWrapper } from "@/widgets/pageWrapper";
import ProgressBarProvider from "../providers/progressProvider";
import { ThemeProvider } from "../providers/themeProvider";
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

  const currentTheme = theme ? theme : "device";

  return (
    <ThemeProvider initialTheme={currentTheme as any}>
      <ToastProvider>
        <ProgressBarProvider>
          <PageWrapper>{children}</PageWrapper>
        </ProgressBarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
