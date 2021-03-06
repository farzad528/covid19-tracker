import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table";
import InfoBox from "./InfoBox";
import Map from "./Map";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import MenuIcon from "@material-ui/icons/Menu";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4754a3",
      main: "#092c74",
      dark: "#000248",
      contrastText: "#fff",
    },
    secondary: {
      light: "#efefef",
      main: "#bdbdbd",
      dark: "#8d8d8d",
      contrastText: "#000",
    },
  },
});

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom, France
            value: country.countryInfo.iso2, // UK, USA, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__navbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              🌐
            </IconButton>
            <Typography variant="h6">FullStackFarzzy</Typography>
            <a href="https://ko-fi.com/fullstackfarzzy" target="_blank" className="app__navbar--link">
              <Button className="app__navbar--coffee">
                <span className="app__navbar--coffee-logo">
                  <img
                    src="https://storage.ko-fi.com/cdn/cup-border.png"
                    className="kofimg"
                    alt="coffee"
                  />
                </span>
                Buy me a Coffee
              </Button>
            </a>
          </Toolbar>
        </AppBar>
      </div>
      <div className="app__content">
        <div className="app__left">
          <div className="app__header">
            <h1> COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select
                style={{ backgroundColor: "#26292e", color: "white" }}
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              color="textSecondary"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3> Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className="app_graphTitle">Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} className="app__graph" />
            {/* Graph */}
          </CardContent>
        </Card>
      </div>
      <p className="app__footer"> Sources: CDC, WHO, Disease.sh</p>
    </div>
  );
}

export default App;
