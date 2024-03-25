import AssetManagement from "@/components/Assets/AssetManagement";
// import HomePage from "@/components/Home/HomePage";
import MainLayout from "@/components/MainLayout";

export default async function Page({ params: { lng } }) {
  return (
    <MainLayout lng={lng}>
      {/* <HomePage /> */}
      <AssetManagement lng={lng} />
    </MainLayout>
  );
}
