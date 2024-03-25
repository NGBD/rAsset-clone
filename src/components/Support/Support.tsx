"use client";
import React, { useState } from "react";
import Title from "../Title";
import InfoBlock from "../InfoBlock";
import BlockTitle from "../BlockTitle";
import ContactCard from "./ContactCard";
import TwitterIcon from "../icon/TwitterIcon";
import DiscordIcon from "../icon/DiscordIcon";
import YoutubeIcon from "../icon/YoutubeIcon";
import FAQQuestionBlock from "./FAQQuestionBlock";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import TelegramIcon from "../icon/TelegramIcon";

const dataEn = [
  {
    id: 1,
    question: "What benefits do I get from holding asset tokens ?",
    title: "Just by holding the asset tokens, you can receive the following benefits:",
    list: [
      { id: 1, answer: "- Report basic asset mining income monthly." },
      { id: 2, answer: "- rAsset's annual audited financial statements." },
      {
        id: 3,
        answer:
          "- The legal documents of the assets are held by the depository bank, acting as a trustee to ensure safety for the investor.",
      },
      {
        id: 4,
        answer:
          "- Get profit sharing and earn rewards in the rAsset ecosystem like discounts, free accommodation, etc.",
      },
    ],
  },
  {
    id: 2,
    question: "How do I start depositories ?",
    href: "https://www.google.com",
    title: "to open the depositories guideline.",
  },
  {
    id: 3,
    question: "How do I receive my rental income ?",
    title: "rAsset delivers the rent distribution every  month, and there are three ways to get it!",
    list: [
      {
        id: 1,
        title: "1. Rent distribution on Polygon Main Network.",
        answer:
          "On Polygon, rent distribution are delivered in USDC, a stablecoin whose value equals one US Dollar. When choosing rent distribution on Polygon, holders of rAsset Tokens have to activate a smart contract (you pay gas fees) to receive the USDC to their address.In the Profit page of rAsset.io, you must connect to the Polygon wallet address you registered with rAsset, then click the 'Claim' button. Rent distribution accumulates in the Polygon rent vault  until you claim it.",
      },
      {
        id: 2,
        title: "2. Reinvesting automatically.",
        answer:
          "rAsset offers another solution for investers who don't want to immediately cash out their rent dítribution. You can automatically reinvest your rent distribution into fractions of new properties to compound your income month after month. With this option, instead of stablecoins, you receive a fraction of tokenized Real Estate with a value equivalent to the rent distribution you would have received.",
      },
    ],
  },
  {
    id: 4,
    question: "How do I sell my rAssetTokens ?",
    title: "You can sell your rAssetTokens in different ways:",
    list: [
      { id: 1, answer: "- rAsset swap" },
      { id: 2, answer: "- staking" },
      {
        id: 3,
        answer: "- rAsset communition",
      },
    ],
    detail:
      "Be careful, if you want to buy on secondary market, you must be whitelisted for the relevant property. To be whitelisted, you must purchase at least one rAssetTokens of the relevant property on our website or market a whitelisting request with the 'whitelist' button from your portfoio on our website.You can also sell your rAsetTokens on the rAsset website. Using  the 'Sell Tokens' button found on the homepage you can generate a sale request, with insstruc tions that follow. Most token sales through the rAsset website take 10 working dáy to process. The rAssetToken are sold for the fair-market-value of the property, as determined by the most recent property appraisal. All properties receive new appraisals once-per-year.With Uniswap or rAssetswap, you can guaranteed to instantly be able to sell your rAssetTokens, however the price you receive in the sale is determined by market forces at that time. By selling on the website, you know the price you are selling the rAssetTokens for, but it is not an instantaneous process.",
  },
  {
    id: 5,
    question: "Is the rAsset platform only for residential property ?",
    title:
      "rAsset has chosen residential family properties to start due to their attractiveness for international investors.",
    detail:
      "However, rAsset works equally well for all types of property! rAsset is currently working on adding commercial properties, along with hotels and office complexes, in order to generate a move diverse set of offerings to our customers.Additionally, rAsset has the opportunity to include other types of real estate and non-real estate assets. Loans, mortgages, and high-value art are all potential assets able to be tokenized through rAsset.",
  },
];
const dataVi = [
  {
    id: 1,
    question: "Tôi nhận được lợi ích gì khi nắm giữ tokens của tài sản ?",
    title: "Chỉ cần nắm giữ  của tài sản bạn có thể nhận được những lợi ích sau:",
    list: [
      { id: 1, answer: "- Báo cáo thu nhập khai thác tài sản cơ bản hàng tháng." },
      { id: 2, answer: "- Báo cáo tài chính đã được kiểm toán hàng năm của rAsset." },
      {
        id: 3,
        answer:
          "- Giấy tờ pháp lý của tài sản được nắm giữ bởi ngân hàng lưu ký, đóng vai trò là người ủy thác để đảm bảo an toàn cho chủ đầu tư.",
      },
      {
        id: 4,
        answer:
          "- Nhận lợi nhuận chia sẻ và kiếm phần thưởng trong hệ sinh thái rAsset như giảm giá, chỗ ở miễn phí, v.v...",
      },
    ],
  },
  {
    id: 2,
    question: "Tôi bắt đầu lưu ký như thế nào ?",
    href: "https://www.google.com",
    title: "để mở hướng dẫn lưu ký.",
  },
  {
    id: 3,
    question: "Làm thế nào để tôi nhận được thu nhập cho thuê của mình ?",
    title: "rAsset delivers the rent distribution every  month, and there are three ways to get it!",
    list: [
      {
        id: 1,
        title: "1. Rent distribution on Polygon Main Network.",
        answer:
          "On Polygon, rent distribution are delivered in USDC, a stablecoin whose value equals one US Dollar. When choosing rent distribution on Polygon, holders of rAsset Tokens have to activate a smart contract (you pay gas fees) to receive the USDC to their address.In the Profit page of rAsset.io, you must connect to the Polygon wallet address you registered with rAsset, then click the 'Claim' button. Rent distribution accumulates in the Polygon rent vault  until you claim it.",
      },
      {
        id: 2,
        title: "2. Reinvesting automatically.",
        answer:
          "rAsset offers another solution for investers who don't want to immediately cash out their rent dítribution. You can automatically reinvest your rent distribution into fractions of new properties to compound your income month after month. With this option, instead of stablecoins, you receive a fraction of tokenized Real Estate with a value equivalent to the rent distribution you would have received.",
      },
    ],
  },
  {
    id: 4,
    question: "Làm cách nào để bán rAssetTokens của tôi ?",
    title: "You can sell your rAssetTokens in different ways:",
    list: [
      { id: 1, answer: "- rAsset swap" },
      { id: 2, answer: "- staking" },
      {
        id: 3,
        answer: "- rAsset communition",
      },
    ],
    detail:
      "Be careful, if you want to buy on secondary market, you must be whitelisted for the relevant property. To be whitelisted, you must purchase at least one rAssetTokens of the relevant property on our website or market a whitelisting request with the 'whitelist' button from your portfoio on our website.You can also sell your rAsetTokens on the rAsset website. Using  the 'Sell Tokens' button found on the homepage you can generate a sale request, with insstruc tions that follow. Most token sales through the rAsset website take 10 working dáy to process. The rAssetToken are sold for the fair-market-value of the property, as determined by the most recent property appraisal. All properties receive new appraisals once-per-year.With Uniswap or rAssetswap, you can guaranteed to instantly be able to sell your rAssetTokens, however the price you receive in the sale is determined by market forces at that time. By selling on the website, you know the price you are selling the rAssetTokens for, but it is not an instantaneous process.",
  },
  {
    id: 5,
    question: "Nền tảng rAsset chỉ dành cho bất động sản nhà ở phải không?",
    title:
      "rAsset has chosen residential family properties to start due to their attractiveness for international investors. ",
    detail:
      "However, rAsset works equally well for all types of property! rAsset is currently working on adding commercial properties, along with hotels and office complexes, in order to generate a move diverse set of offerings to our customers.Additionally, rAsset has the opportunity to include other types of real estate and non-real estate assets. Loans, mortgages, and high-value art are all potential assets able to be tokenized through rAsset. ",
  },
];
function Support({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "support");
  const param = useParams();
  const [openId, setOpenId] = useState(null);
  const handleOpenDetail = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-maxContent mx-auto">
      <Title>{t("title")}</Title>
      <div className="flex flex-col gap-5">
        <InfoBlock>
          <BlockTitle label={t("contact-us")} />
          <div className="grid grid-cols-4 rounded-md gap-2">
            <ContactCard
              icon={<TelegramIcon className="h-[35px] fill-[#342D2D] dark:fill-white" />}
              title="Telegram"
              description={`30,000 ${t("members")}`}
              href={"/shares"}
            />
            <ContactCard
              icon={<DiscordIcon />}
              title="Discord"
              description={`30,000 ${t("members")}`}
              href={"/shares"}
            />
            <ContactCard
              icon={<TwitterIcon className="h-[30px] fill-[#342D2D] dark:fill-white" />}
              title="Twitter "
              description={`30,000 ${t("followers")}`}
              href={"https://twitter.com/rAsset_io"}
            />
            <ContactCard
              icon={<YoutubeIcon className="h-[30px] fill-[#342D2D] dark:fill-white" />}
              title="Youtube"
              description={`30,000 ${t("videos")}`}
              href={"https://www.youtube.com/@rAsset_io"}
            />
          </div>
        </InfoBlock>
        {param.lng === "en" ? (
          <InfoBlock className="min-h-[calc(100vh-370px)] gap-5 justify-start">
            <BlockTitle label={t("faq")} />
            {dataEn.map((i) => (
              <FAQQuestionBlock
                data={i}
                key={i.id}
                openDetail={openId === i.id}
                handleOpenDetail={() => handleOpenDetail(i.id)}
              />
            ))}
          </InfoBlock>
        ) : (
          <InfoBlock className="min-h-[calc(100vh-370px)] gap-5 justify-start">
            <BlockTitle label={t("faq")} />
            {dataVi.map((i) => (
              <FAQQuestionBlock
                data={i}
                key={i.id}
                openDetail={openId === i.id}
                handleOpenDetail={() => handleOpenDetail(i.id)}
              />
            ))}
          </InfoBlock>
        )}
      </div>
    </div>
  );
}

export default Support;
