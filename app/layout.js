import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "File Share",
  description: "Server to upload files and share with other people",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen -z-20`}>{children}</body>
    </html>
  );
}
