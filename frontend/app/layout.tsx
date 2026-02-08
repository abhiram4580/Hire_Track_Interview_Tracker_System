import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "HireTrack - Interview Application Tracker",
  description: "Track your job applications and interview progress with HireTrack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}

