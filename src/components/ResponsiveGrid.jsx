import React, { useContext } from "react";
import Grid from "@mui/joy/Grid";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import EmptyWidget from "./EmptyWidget";
import SubscriptionCard from "./SubscriptionCard";
import { TopicSubscriptions } from "./SubscriptionContext";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.level1,
  }),
}));

export const ResponsiveGrid = () => {
  const { subscriptions } = useContext(TopicSubscriptions);

  const tileList = Array.from({ length: 6 }, (_, index) => (
    <Grid key={index} xs={12} md={6} lg={4}>
      <Item>
        {subscriptions[index] ? (
          <SubscriptionCard index={index} />
        ) : (
          <EmptyWidget index={index} />
        )}
      </Item>
    </Grid>
  ));
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {tileList}
    </Grid>
  );
};
