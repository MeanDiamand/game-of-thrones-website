import {
  processObjectToMapById,
  processObjectToMapByName,
} from "../utils/util";

export class APIService {
  // Maps for storing the data
  bookMap = new Map<any, any>();
  characterMap = new Map<any, any>();
  houseMap = new Map<any, any>();
  allMap = new Map<any, any>();

  // store the item when the user click from the search and detail page
  clickedItem: any = null;

  // initialize the API URL
  apiUrl = "https://anapioficeandfire.com/api";

  // method for fetching the data from URL
  async fetchUrl(url: string) {
    const resp = await fetch(`${url}?pageSize=50`);
    const json = await resp.json();
    return json;
  }

  // method for fetching all the data
  async fetchAlldata() {
    await this.getBooks();
    await this.getCharacters();
    await this.getHouses();
  }

  // method for fetching the books
  async getBooks() {
    const books = await this.fetchUrl(`${this.apiUrl}/books`);
    processObjectToMapByName(books, this.allMap, "book");
    processObjectToMapById(books, this.bookMap, "book");
  }

  // method for fetching the characters
  async getCharacters() {
    const characters = await this.fetchUrl(`${this.apiUrl}/characters`);
    processObjectToMapByName(characters, this.allMap, "character");
    processObjectToMapById(characters, this.characterMap, "character");
  }

  // method for fetching the houses
  async getHouses() {
    const houses = await this.fetchUrl(`${this.apiUrl}/houses`);
    processObjectToMapByName(houses, this.allMap, "house");
    processObjectToMapById(houses, this.houseMap, "house");
  }
}
