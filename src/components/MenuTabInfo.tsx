import { useTranslation } from "@/app/i18n/client";
import React from "react";

function MenuTabInfo({ activeTab, listMenu, className = "", setActiveTab, lng }) {
  return (
    <div className={`flex justify-between md:justify-start items-baseline md:gap-7 ${className}`}>
      {listMenu?.map((i) => (
        <TabItem key={i?.id} activeTab={activeTab} menuItem={i} setActiveTab={setActiveTab} lng={lng} />
      ))}
    </div>
  );
}

export default MenuTabInfo;

function TabItem({ activeTab, menuItem, setActiveTab, lng }) {
  const { t } = useTranslation(lng, "assets");
  const handleClickItem = () => {
    setActiveTab(menuItem?.id);
  };
  return (
    <div
      className={`cursor-pointer font-bold hover:text-xl hover:text-black dark:hover:text-textDark smooth-transform ${
        menuItem?.id === activeTab ? "text-xl text-black underline-offset-4 dark:text-textDark" : "text-base text-title"
      }`}
      onClick={handleClickItem}
    >
      {t(menuItem.label)}
    </div>
  );
}
