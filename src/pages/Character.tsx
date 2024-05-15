import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { grabId } from "../utils/util";

export function Character() {
  const apiService = useContext(AppContext);
  const { clickedItem, bookMap } = apiService;
  const navigate = useNavigate();
  const [data, setData] = useState(new Map());

  useEffect(() => {
    window.scrollTo(0, 0); // set the location to the top when ever this character page is showing

    // call the API to fetch the data and store in local
    apiService.fetchAlldata().then(() => {
      setData(apiService.allMap);
    });

    // extracting the type and id from the current URL to fetch only the detail of the specific character
    const typeAndIdUrl = grabId(window.location.href).split("?");

    // fetching the detail of the specific character using the variable above
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
          <p>Gender: {clickedItem.gender}</p>
          <p>Culture: {clickedItem.culture}</p>
          <p>Born: {clickedItem.born}</p>
          <div>
            <p>Titles:</p>
            <ul>
              {clickedItem.titles.map((title: any, index: any) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </div>
          <div>
            <p>TV Series:</p>
            <ul>
              {clickedItem.tvSeries.map((tvSerie: any, index: any) => (
                <li key={index}>{tvSerie}</li>
              ))}
            </ul>
          </div>
          <p>Books:</p>
          {clickedItem.books.map((bookUrl: any, bookIndex: any) => {
            const id: string = grabId(bookUrl);
            if (bookMap.has(id))
              return (
                <div key={bookIndex} className="entity" onClick={() => handleClick(bookMap.get(id))}>
                  <a>{bookMap.get(id).name}</a>
                </div>
              );
          })}
          <p>Cast: {clickedItem.playedBy}</p>
        </div>
      </div>
    )
  );
}
