import "./App.css";
import React from "react";
import * as MUI from "@material-ui/core";
import { ReactHookForm } from "./ReactHookForm";
import { FormikForm } from "./FormikForm";
const App = () => (
    <MUI.Box
        className="App"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
    >
        <MUI.Box
            display="flex"
            padding="16px"
            width="40%"
            justifyContent="center"
        >
            <ReactHookForm />
        </MUI.Box>
        <MUI.Box
            display="flex"
            padding="16px"
            width="40%"
            justifyContent="center"
        >
            <FormikForm />
        </MUI.Box>
    </MUI.Box>
);

export default App;
