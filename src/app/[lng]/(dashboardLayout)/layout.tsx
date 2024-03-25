import { languages } from "../../i18n/settings";
import MainLayout from "@/components/MainLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function checkLogin() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  return accessToken;
}

export default async function RootLayout({ children, params: { lng } }) {
  const token = await checkLogin();
  if (!token) {
    redirect("/login");
  }
  return <MainLayout lng={lng}>{children}</MainLayout>;
}
