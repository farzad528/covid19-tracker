import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  // STATE = How to write a variable in REACT <<<<<<<

  // https://disease.sh/v3/covid-19/countries

  // USEEFECT = Runs a piece of code based on a given condition

  useEffect(() => {
    // The code inside here wil run once when the component loads and not again
    // async -> send a request, wait for it, do something with it

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom, France
            value: country.countryInfo.iso2, // UK, USA, FR
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1> COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        {/* InfoBox title="Coronavirus cases" */}
        {/* InfoBox title="Coronavirus recoveries" */}
        {/* InfoBox */}
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
