import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarAside from "./components/NavbarAside.jsx";
import ChannelsProvider from "./contexts/ChannelsProvider.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";
import ProgramsProvider from "./contexts/ProgramsProvider.jsx";




function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <ChannelsProvider>
          <ProgramsProvider>
          <Navbar />
          <NavbarAside />


          <Route exact path="/" component={HomePage} />
          <Route exact path="/channels/:channelId" component={ChannelPage}/>
        
          </ProgramsProvider>
        </ChannelsProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
