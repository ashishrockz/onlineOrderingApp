import { useState } from "react";
import { loginToken } from "./src/hooks/AuthuContext";
import React from "react";
import Index from "./src/screens/Index";
import Header from "./src/components/Header";
import Login from "./src/screens/Login";
import RecentOrdersOfUsers from "./src/components/RecentOrdersOfUsers";
import ComponentNavigations from "./src/navigations/ComponentNavigations";
 
 
function App(): React.JSX.Element {
  const [token, setToken] = useState(false);
 
  return (
    <loginToken.Provider value={{ token, setToken }}>
      {token ? (
        <>
          {/* <Header />
          <Index />
          <RecentOrdersOfUsers/> */}
          <ComponentNavigations />
        </>
      ) : (
        <Login />
      )}
    </loginToken.Provider>
    // <>
    // {/* <RecentOrdersOfUsers /> */}
    // </>
  );
}
 
 
export default App;