import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
//contextos
import { useAuthContext } from "./hooks/useAuthContext";
//pages
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Search from "./pages/Search/Serach";
import Recipe from "./pages/Recipe/Recipe";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
//components
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";
function App() {
  const { authIsReady, user } = useAuthContext();
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/" exact component={Signup}></Route>
            {user && <Route path="/home" exact component={Home}></Route>}
            {user && <Route path="/create" exact component={Create}></Route>}
            {!user && <Redirect to="/" />}
            {user && <Route path="/search" exact component={Search}></Route>}
            {!user && <Redirect to="/" />}
            {user && (
              <Route path="/recipe/:id" exact component={Recipe}></Route>
            )}
            {!user && <Redirect to="/" />}
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
