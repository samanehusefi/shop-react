import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../../Redux/store";
import { getFooterAction } from "../../../Redux/Footer/action";

import FooterAbout from "./FooterAbout";
import TopSection from "./TopSection";
import FooterServices from "./FooterServices";
import FooterDownload from "./FooterDownload";
import FooterBrands from "./FooterBrands";
import FooterContat from "./FooterContat";
import FooterMenuSection from "./FooterMenuSection";
import FooterLinks from "./FooterLinks";
import CopyRightSection from "./CopyRightSection";
import AppDownloadSheet from "./AppDownloadSheet";
import FooterBottomNav from "./FooterBottomNav";

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    dispatch(getFooterAction());
  }, [dispatch]);

  return (
    <footer
      className="w-full border-t border-gray-200 bg-white pb-20 lg:pb-0"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <TopSection />

        <FooterContat onOpen={() => setIsDownloadOpen(true)} />
        <FooterServices />

        <FooterLinks />

        <FooterAbout />

        <FooterDownload onOpen={() => setIsDownloadOpen(true)} />

        <CopyRightSection />

        <FooterBrands />
      </div>

      <FooterMenuSection onOpen={() => setIsDownloadOpen(true)} />

      <AppDownloadSheet
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
      <FooterBottomNav />
    </footer>
  );
};

export default Footer;
