import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateNFT from "./components/CreateNFT";
import Navbar from "./components/Navbar";
import AppProvider from "./context/AppProvider";
import imgLink from "./functions/getIPFS";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  // useEffect(() => {
  //   imgLink().then((result) => console.log(result));
  // }, []);

  return (
    <AppProvider>
      <Toaster />

      <AppComponent>
        <Navbar />
        <Home />
      </AppComponent>
    </AppProvider>
  );
}

export default App;

const AppComponent = styled.div`
  position: relative;
  height: 400rem;
`;
