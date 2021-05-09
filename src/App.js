import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import ReactNotification from "react-notifications-component";
import React, { useState, useEffect } from "react";
import { AppHeader, HeaderTitle } from "./styles";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nomineesList, setNomineesList] = useState([]);

  useEffect(() => {
    console.log("Loading status", loading);
  }, [loading]);

  const handleSearchInputChange = (e) => {
    axios(`http://www.omdbapi.com/?apikey=dfdd536&s=${e.target.value}`)
      .then((response) => {
        // setLoading("true");
        if (response.data.hasOwnProperty("Error")) {
          // setLoading("false");
          setFilteredData([]);
        } else {
          // setLoading("false");
          setFilteredData(response.data.Search);
        }
        console.log("res", response);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
    // setLoading("false");
  };
  let NomData = JSON.stringify(nomineesList);
  let NomDataA = JSON.parse(NomData);
  return (
    <div className="flexbox">
      <div className="search">
        <h1>The Shoppies</h1>
        <h3>Click below to search movies</h3>
        <div>
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => handleSearchInputChange(e)}
            required
          />
          <div className="result-container">
            <div className="result-wrapper">
              <div className="result-row">
                <div className="col1">
                  <h3>
                    Your movie result{" "}
                    {(e) => handleSearchInputChange(e.target.value)}
                  </h3>
                  {filteredData &&
                    filteredData.map((value, index) => {
                      return (
                        <div key={index} className="flex-container">
                          <>
                            <div>
                              <>
                                {value.Title}({value.Year})
                                <button
                                  className="button"
                                  disabled={nomineesList
                                    .map((el) => el.imdbID)
                                    .includes(value.imdbID)}
                                  onClick={() =>
                                    setNomineesList((old_list) => [
                                      ...old_list,
                                      value,
                                    ])
                                  }
                                >
                                  Nominate
                                </button>
                              </>
                            </div>
                          </>
                        </div>
                      );
                    })}
                </div>
                <div className="col2">
                  <div className="flex-container">
                    <h3>Your Nomination list</h3>
                    {nomineesList.map((Nomdata) => {
                      console.log(Nomdata);
                      return (
                        <div>
                          <ul>
                            <ol key={Nomdata.imdbID}>
                              {Nomdata.Title}({Nomdata.Year})
                            </ol>
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {console.log(NomDataA.Title)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  display: "inline",
  width: "30%",
  height: 50,
  float: "left",
  padding: 5,
  border: "0.5px solid black",
  marginBottom: 10,
  marginRight: 10,
};

export default App;
