import React, { useState, useContext } from "react";

import { ShareContext } from "../../shared/context/share-contex";
import OutsideClickHandler from "../../shared/util/OutsideClickHandler";
import city from "../../assets/cities.json";
import "./OptionCity.css";

const OptionCity = (props) => {
  const share = useContext(ShareContext);
  const [cityName, setCity] = useState("Москва");
  const [showList, setShowList] = useState(false);

  const focusHandler = () => {
    setCity("");
    setShowList(true);
  };
  
  const selectHandler = (e) => {
    setCity(e.target.firstChild.innerText);
    setShowList(false);
    share.city = e.target.firstChild.innerText;
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowList(false);
        if(cityName === "") {
          setCity("Москва")
        }
      }}
    >
      <div className="input_city-wrapper" >
        <label className="input_city-placeholder">{cityName}</label>
        <input
          className={`city_input ${props.cityClass}`}
          id={props.idCity}
          name={props.nameCity}
          type="text"
          onChange={(e) => setCity(e.target.value)}
          onFocus={focusHandler}
          value={cityName}
        />

        {showList && (
          <div id="cityname" className="droplist-city-wrapper">
            {city
              .filter(
                (f) =>
                  f.city.toUpperCase().includes(cityName.toUpperCase()) ||
                  cityName === ""
              )
              .map((item) => (
                <div
                  className="droplist-city-item"
                  onClick={selectHandler}
                  key={item.city}
                >
                  <p className="droplist-city-item-name">{item.city}</p>
                  <p className="droplist-city-item-name-holder">{item.city}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default OptionCity;
