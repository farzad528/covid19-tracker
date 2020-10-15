import React from "react";
import "./Table.css";
import numeral from "numeral";
import { blue, red } from "@material-ui/core/colors";

function Table({ countries }) {
  return (
    <div className="table" style={{backgroundColor:"#26292e"}}>
      {countries.map(({ country, cases }) => (
        <tr style={{backgroundColor:"#26292e"}}>
          <td style={{color: "white"}}>{country}</td>
          <td>
            <strong style={{color: "#e60000"}}>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
