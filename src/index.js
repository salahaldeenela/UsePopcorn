import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import StarRating from "./Components/StarRating";

function Test() {
  const [star, setStar] = useState(0);
  return (
    <div>
      <StarRating color="green" onsetRating={setStar} />
      <p>The star is {star}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/*<StarRating messege={["Bad", "meh", "ok", "good", "Great"]} />
    <StarRating
      MaxRating={10}
      size={20}
      color="blue"
      fontColor="grey"
      defaultRating={100}
    />*/}
    {/* <Test />*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
