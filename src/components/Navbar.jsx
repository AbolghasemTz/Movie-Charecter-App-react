import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
function Navbar() {
  return (
    <navbar className="navbar">
      <div className="navbar__logo">logo</div>
      <input type="text" className="text-field" name="" id="" />
      <div className="navbar__result">Fount X charecter</div>
      <button className="heart">
        <HeartIcon className="icon" />
      </button>
    </navbar>
  );
}

export default Navbar;
