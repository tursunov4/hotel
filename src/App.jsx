import "./sass/index.scss";
import { Route, Routes } from "react-router";
import SignIn from "./routes/SignIn/SignIn";
import SignUp from "./routes/SignUp/SignUp";
import RequireAuth from "./routes/notUiRoutes/RequireAuth/RequireAuth";
import PrivateRoutes from "./routes/notUiRoutes/PrivateRoutes/PrivateRoutes";
import NotFound from "./routes/notUiRoutes/NotFound/NotFound";
import ObjectManage from "./routes/ObjectManage/ObjectManage";
import RegistrNewObj from "./routes/RegistrNewObj/RegistrNewObj";
import Registrate1 from "./routes/RegistratePages/Registrate1/Registrate1";
import Registrate3 from "./routes/RegistratePages/Registrate3/Registrate3";
import Registrate4 from "./routes/RegistratePages/Registrate4/Registrate4";
import SingleMap from "./routes/RegistratePages/Registrate2/SingleMap";

function App() {
  const token = localStorage.getItem('token')
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={ <RequireAuth />}> */}
          {/* <Route path="/singin" element={<SignIn />} /> */}
          <Route path="/singup" element={<SignUp />} />
          <Route path="/" element={ token ? <PrivateRoutes /> : <SignIn/> }>
          {/* <Route path="/" element={ <PrivateRoutes />  }> */}
            <Route path="/object-manage" element={<ObjectManage />}/>
            <Route path="/registre-new-object" element={<RegistrNewObj />}>
              <Route path="1" element={<Registrate1 />} />            
             
            </Route>
            <Route children path="/register-single/:id" element={<Registrate3 />} />
            <Route children path="/register-next/:id" element={<Registrate4 />} />
            <Route path="/regiter-map/:id" element={<SingleMap/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
