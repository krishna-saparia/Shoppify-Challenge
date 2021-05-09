import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nomineesList, setNomineesList] = useState([]);
  const [removeNomineeList, setRemoveNomineeList] = useState(filteredData);

  const handleRemove = (id) => {
    const newList = removeNomineeList.filter((item) => item.id !== id);
    setRemoveNomineeList(newList);
    console.log("Item is called");
  };

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
                              {/* <button
                                className="button"
                                disabled={removeNomineeList
                                  .map((el) => el.imdbID)
                                  .includes(Nomdata.imdbID)}
                                onClick={() => handleRemove(Nomdata.imdbID)}
                              >
                                Remove
                              </button> */}
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
export default App;
