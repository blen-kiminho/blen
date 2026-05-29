import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrap">
      <Header isTop={isTop} />

      <main
        className="content"
        style={{
          paddingTop: "70px",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

