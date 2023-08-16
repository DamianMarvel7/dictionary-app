import React, { useEffect, useRef, useState } from "react";
import { Form, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import iconArrowDown from "../assets/images/icon-arrow-down.svg";

const Root = () => {
  const handleFontChange = (event) => {
    const bodyElement = document.querySelector("body");
    bodyElement.setAttribute("data-language", event.target.value);
  };

  const selectedTheme = localStorage.getItem("theme");
  useEffect(() => {
    if (selectedTheme === "dark") {
      const bodyElement = document.querySelector("body");
      bodyElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const handleThemeChange = (event) => {
    const bodyElement = document.querySelector("body");
    const svgElement = document.querySelector(".icon-moon");

    const dataTheme = event.target.checked ? "dark" : "light";
    const iconColor = event.target.checked
      ? "hsl(274, 82%, 60%)"
      : "hsl(0, 0%, 51%)";
    localStorage.setItem("theme", dataTheme);
    bodyElement.setAttribute("data-theme", dataTheme);
    svgElement.querySelector("path").setAttribute("stroke", iconColor);
  };

  return (
    <div className="dictionary container">
      <header>
        <nav className="flex">
          <img src={logo} />
          <div className="flex">
            <select id="font-select" onChange={handleFontChange}>
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
            <div className="toggle__container flex">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  onChange={handleThemeChange}
                  defaultChecked={selectedTheme == "dark"}
                />
                <span className="slider"></span>
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                className="icon-moon"
              >
                <path
                  fill="none"
                  stroke="hsl(0, 0%, 51%)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                />
              </svg>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
};

export default Root;
