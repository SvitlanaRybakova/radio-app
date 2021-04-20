import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarAside from "./components/NavbarAside.jsx";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <NavbarAside />


        <Route exact path="/" component={HomePage} />
      </BrowserRouter>

    </div>
  );
}

export default App;
