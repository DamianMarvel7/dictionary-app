import React, { useRef, useState } from "react";
import DictionaryContent from "../component/DictionaryContent";
import { Form } from "react-router-dom";
import iconSearch from "../assets/images/icon-search.svg";

const Dictionary = () => {
  const [searchWord, setSearchWord] = useState("keyboard");

  const searchInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const word = formData.get("search-bar");

    setSearchWord(word);

    searchInputRef.current.value = "";
  };

  return searchWord ? (
    <div className="">
      <Form
        method="post"
        onSubmit={handleSubmit}
        className="search-bar__container flex space-block-600"
      >
        <input
          type="text"
          className="search-bar"
          name="search-bar"
          ref={searchInputRef}
        />
        <button type="submit" className="search-btn">
          <img src={iconSearch} alt="" />
        </button>
      </Form>
      <DictionaryContent searchWord={searchWord} />
    </div>
  ) : (
    <>
      <Form
        method="post"
        onSubmit={handleSubmit}
        className="search-bar__container flex space-block-600"
        style={{ border: "1px solid hsl(0, 100%, 66%)", marginBottom: "5px" }}
      >
        <input
          type="text"
          className="search-bar"
          name="search-bar"
          ref={searchInputRef}
        />
        <button type="submit" className="search-btn">
          <img src={iconSearch} alt="" />
        </button>
      </Form>
      <p className="empty-search">Whoops, cant'be empty...</p>
    </>
  );
};

export default Dictionary;
