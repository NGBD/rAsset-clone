import Link from "next/link";
import React from "react";
import { useTranslation } from "../../app/i18n";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/app/i18n/settings";

async function HomePageTest({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);

  return (
    <div className="p-5">
      <p>{t("page-name")}</p>
      <br />
      <Link href={`${lng}/test`}>{t("to-test-page")}</Link>
      <br />
      <Trans i18nKey="switch-lang" t={t}>
        {/* @ts-ignore */}
        Switch from <strong>{{ lng }}</strong> to:{" "}
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </div>
  );
}

export default HomePageTest;
