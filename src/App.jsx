import React, { useState } from "react";
import "./App.css";
import SubscriptionCard from "./components/SubscriptionCard.jsx";
import EmptyWidget from "./components/EmptyWidget.jsx";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import { ResponsiveGrid } from "./components/ResponsiveGrid.jsx";
import { TopicSubscriptions } from "./components/SubscriptionContext.jsx";

function App() {
  const [subscriptions, setSubscriptions] = React.useState(
    Array.from({ length: 6 }, () => false)
  );

  console.log("state ", subscriptions);
  return (
    <TopicSubscriptions.Provider value={{ subscriptions, setSubscriptions }}>
      <ResponsiveGrid />
    </TopicSubscriptions.Provider>
  );
}

export default App;
