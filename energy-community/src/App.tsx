import React, {useEffect} from 'react';
import LeftBar from "components/leftbar/LeftBar";
import {editState, RootState} from "services/redux";
import {useSelector} from "react-redux";
import {Auth, Consumptions, Home, Predictions, SolarPanels, WindTurbines} from "pages";
import {Navbar} from "components";
import {auth, load, select} from "services/firebase";
import {userSlice} from "services/redux/store";
import {onAuthStateChanged} from 'firebase/auth';
import {Bills} from "./pages";

export default function App() {

  const state: RootState = useSelector((state: RootState) => state);
  const user = state.user;
  const utility = state.utility;

  onAuthStateChanged(auth, async (user) => {
    if(user) {
      const profile = await select("users", ["uid"], "==", user.uid);
      editState(userSlice, '', profile[0]);
    }
  });

  useEffect(() => {
    if(user.uid) {
      load(userSlice, "users", user.id);
    }
  })

  return (<>
    {(state.user.uid) && <>
      <LeftBar state={state} />
      <Navbar state={state} />
    </>}
    {(!user.uid) && <Auth />}
    {(user.uid && user.route === 0) && <Home state={state} />}
    {(user.uid && user.route === 1) && <SolarPanels length={user.solarPanels} user={user.id} />}
    {(user.uid && user.route === 2) && <WindTurbines length={user.windTurbines} user={user.id} />}
    {(user.uid && user.route === 3) && <Predictions />}
    {(user.uid && user.route === 4) && <Bills user={user.id} />}
    {(user.uid && user.route === 5) && <Consumptions user={user.id} devices={utility.devices} />}



  </>);


}
