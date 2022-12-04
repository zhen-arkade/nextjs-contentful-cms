import React, { useContext } from "react";
import Link from "next/link";
import ThemeColorToggle from "./ThemeColorToggle";
import SearchBar from "./SearchBar";

import { Context } from "../../context";

const Header = () => {
  const { state } = useContext(Context);
  const { isDark } = state.themeColor;

  return (
    <header>
      <div className="container">
        <div className="nav">
          {/* logo text */}
          <div className="logoText">
            <Link href="/">
              <span> NextjsCMS</span>
            </Link>
          </div>
          {/* search bar */}
          <SearchBar />
          {/* theme color toggle */}
          <ThemeColorToggle />
        </div>
      </div>

      <style jsx>{`
        header {
          background-color: ${isDark ? "#000" : "#d6e4e5"};
          color: ${isDark ? "#fff" : "#000"};
          padding: 20px 20px;
        }

        .nav {
          display: flex;
          justify-content: space-between;
        }

        .logoText {
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Header;
