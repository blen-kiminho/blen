import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../../App.css";

export default function Layout() {
  const [isTop, setIsTop] = useState(true);
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="wrap">
      <Header isTop={isTop} />

      <main className={isAdminPage ? "content admin-content" : "content container"}>
        <Outlet />
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}