import { Link } from "react-router-dom";
import skanska from "../Assets/skanska.svg";
import swedishFlag from "../Assets/sweden-flag.svg"
import unitedKingdomFlag from "../Assets/united-kingdom-flag.svg"
import "../Style/Header.sass";

import { useTranslation } from "react-i18next";


export default function Header() {


  const { i18n } = useTranslation("translation");

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={skanska} alt="logo" />
        </Link>
      </div>
      <div className="language-flags">
        <div style={{backgroundImage: `url(${unitedKingdomFlag})`}} className="lang-img-container" onClick={() => i18n.changeLanguage('en')}>

        </div>
    
      <div style={{backgroundImage: `url(${swedishFlag})`}} className="lang-img-container" onClick={() => i18n.changeLanguage('sv')}>
        
    
      </div>
     
      </div>
      
    </header>
  );
}
