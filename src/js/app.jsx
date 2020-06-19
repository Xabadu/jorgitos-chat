import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBF2wAkbMR5yNvD9QO-BtCiHaPMWt1oY_c",
  authDomain: "jorgitos-chat.firebaseapp.com",
  databaseURL: "https://jorgitos-chat.firebaseio.com",
  projectId: "jorgitos-chat",
  messagingSenderId: "390207476309",
  appId: "1:390207476309:web:6fcffeae59f4efe3733adc",
};

firebase.initializeApp(firebaseConfig);

const App = () => <p>Hola!</p>;

ReactDOM.render(<App />, document.querySelector("#container"));
