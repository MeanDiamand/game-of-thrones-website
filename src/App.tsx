import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
import { House } from "./pages/House";
import { createContext } from "react";
import { APIService } from "./services/APISevice";
import { Character } from "./pages/Character";

const apiService = new APIService();
export const AppContext = createContext(apiService);

// setting up the router for navigate from one page to another
function App() {
  return (
    <AppContext.Provider value={apiService}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/books" element={<Book />} />
          <Route path="/api/characters" element={<Character />} />
          <Route path="/api/houses" element={<House />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
