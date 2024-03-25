import { dir } from "i18next";
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import ClientProviders from "@/providers";

// Css import
import "@rainbow-me/rainbowkit/styles.css";
import "../style/globals.css";
import "../style/skeleton-loading.css";
import "react-toastify/dist/ReactToastify.css";
import "@reach/dialog/styles.css";
import "../style/table.css";
import "../style/swiper.css";
import { languages } from "../i18n/settings";

// const montserrat = Montserrat({ subsets: ["latin"] });
const exo = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "rAssets",
  description: "Welcome to rAssets",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body className={exo.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
