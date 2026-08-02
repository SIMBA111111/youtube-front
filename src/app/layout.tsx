import Head from "next/head";
import { cookies } from "next/headers";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // TO DO без этого будет моргание белой темы всегда при перезагрузке страницы
              (function() {
                let initTheme = document.cookie.split(';').filter(cookie => cookie.includes('theme='))

                if(!initTheme) {
                  // Если тема не сохранена, используем системную
                  initTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                    ? 'dark' 
                    : 'light';
                } else {
                  initTheme = initTheme[0].split('=')[1]
                }

                const root = document.documentElement;
                root.setAttribute("data-theme", initTheme);
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
