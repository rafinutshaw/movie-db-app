import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FilmDetail from "./pages/FilmDetail/FilmDetail";
import WishList from "./pages/WishList/WishList";
import Navbar from "./components/Navbar/Navbar";
import "./styles/App.scss";
import "./styles/Variables.scss";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
