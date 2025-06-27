import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter, Route , path} from 'react-router-dom'
import Homescreen from "./views/Homescreen";
import Navbar from "./components/Navbar";
import Loginscreen from "./views/Loginscreen";
import Registerscreen from "./views/Registerscreen";
import 'antd/dist/antd.css';
import Bookingscreen from "./views/Bookingscreen";
import Profilescreen from "./views/Profilescreen";
import Landingscreen from "./views/Landingscreen";
import Adminscreen from "./views/Adminscreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      
         <Route path="/" exact component={Landingscreen}/>
         <Route path="/home" exact component={Homescreen}/>
         <Route path="/login" component={Loginscreen}/>
         <Route path="/register" component={Registerscreen}/>
         <Route path="/book/:roomid/:fromdate/:todate" component={Bookingscreen}/>
         <Route path="/profile" component={Profilescreen}/>
         <Route path="/admin" component={Adminscreen}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
