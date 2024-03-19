import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a react app!!
          <br /> Hello, world!
        </p>
        <Button
          size="small"
          type={"button"}
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => {
            setCounter((c) => c + 1);
          }}
        >
          Create {counter}
        </Button>
      </header>
    </div>
  );
}

export default App;
