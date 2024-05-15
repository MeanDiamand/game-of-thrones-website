import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { grabId } from "../utils/util";

export function House() {
  const apiService = useContext(AppContext);
  const { clickedItem, characterMap } = apiService;
  const navigate = useNavigate();
  const [data, setData] = useState(new Map());

  useEffect(() => {
    window.scrollTo(0, 0); // set the location to the top when ever this house page is showing

    // call the API to fetch the data and store in local
    apiService.fetchAlldata().then(() => {
      setData(apiService.allMap);
    });

    // extracting the type and id from the current URL to fetch only the detail of the specific house
    const typeAndIdUrl = grabId(window.location.href).split("?");

    // fetching the detail of the specific house using the variable above
    apiService
      .fetchUrl(`${apiService.apiUrl}/${typeAndIdUrl[0]}/${typeAndIdUrl[1]}`)
      .then((res) => {
        apiService.clickedItem = res;
      });
  }, []);

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
        <div className="Detail">
          <h1>{clickedItem.name}</h1>
          <p>Name: {clickedItem.name}</p>
          <p>Region: {clickedItem.region}</p>
          <p>Coat Of Arms: {clickedItem.coatOfArms}</p>
          <p>Words: {clickedItem.words}</p>
          <p>Titles: {clickedItem.titles} </p>
          <p>Seats: {clickedItem.seats}</p>
          <p>Sworn Members of the House:</p>
          {clickedItem.swornMembers.map(
            (characterUrl: any, characterIndex: any) => {
              const id: string = grabId(characterUrl);
              if (characterMap.has(id))
                return (
                  <div
                    key={characterIndex} className="entity" onClick={() => handleClick(characterMap.get(id))}>
                    <a>{characterMap.get(id).name}</a>
                  </div>
                );
            }
          )}
        </div>
      </div>
    )
  );
}
