import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarAside from "./components/NavbarAside.jsx";
import ChannelsProvider from "./contexts/ChannelsProvider.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";




function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <ChannelsProvider>
          <Navbar />
          <NavbarAside />


          <Route exact path="/" component={HomePage} />
          <Route exact path="/channels/:channelId" component={ChannelPage}/>
        </ChannelsProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
