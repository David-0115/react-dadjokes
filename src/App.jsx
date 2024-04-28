import React, { Component } from "react";
import JokeList from "./JokeList-Class";

/** App component. Renders list of jokes. */

const App = () => {
    return (
        <div className="App">
            <JokeList />
        </div>
    );
}
export default App;