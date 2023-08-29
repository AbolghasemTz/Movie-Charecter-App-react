import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar({numOfResult}) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO😍</div>
      <input type="text" className="text-field" name="" id="" />
      <div className="navbar__result">Found {numOfResult.length} charecter</div>
      <button className="heart">
        <HeartIcon className="icon" />
      </button>
    </nav>
  );
}

export default Navbar;
