import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarAside from "./components/NavbarAside.jsx";
import ChannelsProvider from "./contexts/ChannelsProvider.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";
import ProgramsProvider from "./contexts/ProgramsProvider.jsx";
import ProgramPage from "./pages/ProgramPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import UserProvider from "./contexts/UserProvider"




function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <UserProvider>
          <ChannelsProvider>
            <ProgramsProvider>
              <Navbar />
              <NavbarAside />

              <Route exact path="/" component={HomePage} />
              <Route exact path="/channels/:channelId" component={ChannelPage} />
              <Route exact path="/programs/:programId" component={ProgramPage} />
              <Route exact path="/all-schedule" component={SchedulePage} />

            </ProgramsProvider>
          </ChannelsProvider>
        </UserProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
