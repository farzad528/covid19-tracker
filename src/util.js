import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#a820df",
    rgb: "rgb(169, 32, 223)",
    half_op: "rgb(169, 32, 223,0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgba(125,215,29)",
    half_op: "rgba(125,215,29,0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgba(251,68,67)",
    half_op: "rgba(251,68,67,0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  return [...data].sort((a, b) => b.cases - a.cases);
};

// DRAW circles on the map with interative tooltop
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <h1>IM a Popup</h1>
      </Popup>
    </Circle>
  ));
