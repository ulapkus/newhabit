import Navbar from "../components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

import { getServerSession } from "next-auth";
import SessionProvider from "../utils/SessionProvider";

// const { Metadata } = require("next");

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className} >
        <SessionProvider session={session}>
          <div className="layout-background">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

// previous - before yt video:
// import "./globals.css";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// const RootLayout = ({ children }) => {
//   return (
//     <html lang="en">
//       <link
//         rel="apple-touch-icon"
//         sizes="180x180"
//         href="/apple-touch-icon.png"
//       />
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="32x32"
//         href="/favicon-32x32.png"
//       />
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="16x16"
//         href="/favicon-16x16.png"
//       />
//       <link rel="manifest" href="/site.webmanifest" />
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// };

// export default RootLayout;
