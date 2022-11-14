// à importer (non effectif)

import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 0;
const MAX = 500;

const FilterPrice = ({ setFetchPrices }) => {
  const [pricesValues, setPricesValues] = useState([10, 500]);

  return (
    <Range
      step={5}
      min={MIN}
      max={MAX}
      values={pricesValues}
      onChange={(values) => setPricesValues(values)}
      onFinalChange={(values) => {
        setFetchPrices(values);
      }}
      renderTrack={({ props, children }) => (
        <div
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "50%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "4px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: pricesValues,
                colors: ["#ccc", " #2cb1ba", "#ccc"],
                min: MIN,
                max: MAX,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ index, props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "17px",
            width: "17px",
            borderRadius: "60%",
            border: isDragged ? "" : "1px solid white",
            backgroundColor: "#2cb1ba",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30px",
              color: "#fff",
              fontSize: "15px",
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "#2cb1ba",
            }}
          >
            {pricesValues[index]}€
          </div>
        </div>
      )}
    />
  );
};

export default FilterPrice;
