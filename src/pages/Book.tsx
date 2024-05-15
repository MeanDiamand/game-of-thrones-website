import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { grabId } from "../utils/util";

export function Book() {
  const apiService = useContext(AppContext);
  const { clickedItem, characterMap } = apiService;
  const navigate = useNavigate();
  const [data, setData] = useState(new Map());

  useEffect(() => {
    window.scrollTo(0, 0); // set the location to the top when ever this book page is showing

    // call the API to fetch the data and store in local
    apiService.fetchAlldata().then(() => {
      setData(apiService.allMap);
    });

    // extracting the type and id from the current URL to fetch only the detail of the specific book
    const typeAndIdUrl = grabId(window.location.href).split("?");

    // fetching the detail of the specific book using the variable above
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
          <p>Author: {clickedItem.authors.join(", ")}</p>
          <p>Number of Pages: {clickedItem.numberOfPages}</p>
          <p>Country: {clickedItem.country}</p>
          <p>Publisher: {clickedItem.publisher}</p>
          <p>Media Type: {clickedItem.mediaType}</p>
          <p>Released: {clickedItem.released}</p>
          <p>Characters:</p>
          {clickedItem.characters.map(
            (characterUrl: any, characterIndex: any) => {
              const id: string = grabId(characterUrl);
              if (characterMap.has(id))
                return (
                  <div key={characterIndex} className="entity" onClick={() => handleClick(characterMap.get(id))}>
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
