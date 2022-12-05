import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landing from "./components/Landing";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";
import Users from "./components/Users";
import UsersWithCustomHook from "./components/UsersWithCustomHook";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/users/newUser" exact>
            <NewUser />
          </Route>
          <Route path="/users/edit/:userId" exact>
            <EditUser />
          </Route>
          <Route path="/customHookUsers" exact>
            <UsersWithCustomHook />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
