import { fallbackLng, languages } from "@/app/i18n/settings";
import { useParams } from "next/navigation";

export default function useMultiLanguage() {
  const params = useParams();
  const currentLang = params.lng || fallbackLng;
  const langsRemain = languages.filter((l) => currentLang !== l);
  return { currentLang, langsRemain };
}
