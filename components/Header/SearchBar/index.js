import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../context";

const SearchBar = () => {
  const { dispatch } = useContext(Context);
  const [searchBarQuery, setSearchBarQuery] = useState("");

  useEffect(() => {
    dispatch({
      type: "INPUT_SEARCH_BAR_QUERY",
      payload: searchBarQuery,
    });
  }, [searchBarQuery]);
  return (
    <>
      <div className="searchContainer">
        <input
          className="inputField"
          type="text"
          placeholder="Search something"
          onChange={(e) => setSearchBarQuery(e.target.value)}
          value={searchBarQuery}
        />
        {searchBarQuery && (
          <button className="clearBtn" onClick={() => setSearchBarQuery("")}>
            Clear
          </button>
        )}
      </div>

      <style jsx>{`
        .searchContainer {
          display: none;
        }
        .inputField {
          border-radius: 8px;
          border: none;
          width: 300px;
          padding: 10px 5px;
        }
        .clearBtn {
          background-color: #282a3a;
          color: #fff;
          border: none;
          padding: 5px 10px;
          margin-left: 10px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .searchContainer {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default SearchBar;
