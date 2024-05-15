import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { grabId } from "../utils/util";

export function Home() {
  const apiService = useContext(AppContext); // for access the API service
  const [data, setData] = useState(new Map()); // for hold the data that fetch
  const navigate = useNavigate(); // navigate between the different page
  const [searchTerm, setSearchTerm] = useState(""); // keep track of search term

  useEffect(() => {
    window.scrollTo(0, 0); // set the location to the top when ever this Home page is showing

    // call the API to fetch the data and store in local
    apiService.fetchAlldata().then(() => {
      setData(apiService.allMap);
    });
  }, []);

  // when the user input the keyword
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // handle when click on the entity to navigate to the detail page of the clicked entity
  const handleClick = (itemData: any) => {
    apiService.clickedItem = itemData;
    const typeAndId = grabId(itemData.url).split("/");
    navigate(`/api/${typeAndId[0]}?${typeAndId[1]}`);
  };

  return (
    data.size > 0 && (
      <div>
        <div id="title">
          <Link to={"/"} className="title-link">
            <h1>Game Of Thrones</h1>
          </Link>
        </div>
        <div className="search-wrapper">
          <input type="search" id="search" placeholder="Search" value={searchTerm} onChange={handleChange} /*using the handleChange to update the searchTerm state*//> 
        </div>
        {searchTerm.length > 0 && ( // display data only when the user input something
          <div>
            {Array.from(data.entries())
              .filter(
                ([itemName]) => itemName.toLowerCase().includes(searchTerm.toLowerCase()) // filtering the data based on the search that users the user input
              )
              .map(([itemName, itemData], index) => (
                <div key={index} className="entity" onClick={() => handleClick(itemData)}>
                  <a>{itemName}</a>
                </div>
              ))}
          </div>
        )}
      </div>
    )
  );
}
