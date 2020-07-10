import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chatroom from "./components/chatroom";
import Lobby from "./components/lobby";

const firebaseConfig = {
  apiKey: "AIzaSyBF2wAkbMR5yNvD9QO-BtCiHaPMWt1oY_c",
  authDomain: "jorgitos-chat.firebaseapp.com",
  databaseURL: "https://jorgitos-chat.firebaseio.com",
  projectId: "jorgitos-chat",
  messagingSenderId: "390207476309",
  appId: "1:390207476309:web:6fcffeae59f4efe3733adc",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const App = () => (
  <Router>
    <Suspense fallback={<p>Cargando...</p>}>
      <Switch>
        <Route exact path="/" component={() => <Lobby db={db} />} />
        <Route path="/chatroom" component={() => <Chatroom db={db} />} />
      </Switch>
    </Suspense>
  </Router>
);

ReactDOM.render(<App />, document.querySelector("#container"));
