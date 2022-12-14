import React, { useContext } from "react";
import MoonIcon from "@/icons/MoonIcon";
import SunIcon from "@/icons/SunIcon";
import { Context } from "../../../context";

const index = () => {
  const { state, dispatch } = useContext(Context);
  const { isDark } = state.themeColor;

  return (
    <>
      {/* dark toggle */}
      {!isDark && (
        <div
          className="themeIcon"
          onClick={() =>
            dispatch({
              type: "TOGGLE_THEME_COLOR",
              payload: { isDark: true },
            })
          }
        >
          <MoonIcon />
        </div>
      )}
      {isDark && (
        <div
          className="themeIcon"
          onClick={() =>
            dispatch({
              type: "TOGGLE_THEME_COLOR",
              payload: { isDark: false },
            })
          }
        >
          <SunIcon />
        </div>
      )}

      <style jsx>{`
        .themeIcon {
          width: 30px;
          cursor: pointer;
          color: ${isDark ? "#fff" : "#000"};
        }
      `}</style>

      <style global>{`
        body {
         
          background-color: ${isDark ? "#474e68" : "#fff"};
        }
        .container .blogBody *,
        .container .blogTitle{
          color:${isDark ? "#fff" : "#000"};
        }
      `}</style>
    </>
  );
};

export default index;
