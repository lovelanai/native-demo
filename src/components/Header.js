import { Link } from "react-router-dom";
import skanska from "../Assets/skanska.svg";
import { useState } from "react";

import "../Style/Header.sass";

export default function Header() {


  return (
    <header>
      <div>
        <Link to="/">
          <img src={skanska} alt="logo" />
        </Link>
      </div>
    </header>
  );
}
