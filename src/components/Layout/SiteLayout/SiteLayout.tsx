import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const SiteLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />

      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SiteLayout;
