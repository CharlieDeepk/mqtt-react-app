import * as React from "react";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import GaugeTile from "./GaugeTile/GaugeTile.jsx";
import { Tooltip } from "@mui/joy";
import { TopicSubscriptions } from "./SubscriptionContext.jsx";
import mqtt from "mqtt";
import { getStaticData } from "../utils/constants.jsx";
import { getLatestDateTime } from "../utils/formatedDate.jsx";

export default function SubscriptionCard({ index }) {
  const { setSubscriptions } = React.useContext(TopicSubscriptions);
  const [currentVal, setCurrentVal] = React.useState(0);
  const [currentDateTime, setCurrentDateTime] = React.useState(
    getLatestDateTime(new Date())
  );

  const { hostIp, port, subscriptionTopic, tileName } = getStaticData(index);

  const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
  // const host = "ws://broker.emqx.io:8083/mqtt";
  const host = "ws://" + hostIp + ":" + port + "/mqtt";

  const options = {
    keepalive: 30,
    clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: subscriptionTopic,
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  };

  console.log("connecting mqtt client");
  const client = mqtt.connect(host, options);

  client.on("error", (err) => {
    console.log(err);
    client.end();
  });

  client.on("connect", () => {
    console.log("client connected:" + clientId);
    client.subscribe(subscriptionTopic, { qos: 0 });
    // client.subscribe("gas", { qos: 0 });
    // client.publish('topic', 'wss secure connection demo...!', { qos: 0, retain: false })
  });

  client.on("message", (topic, message, packet) => {
    console.log(
      "Received Message:= " + message.toString() + "\nOn topic:= " + topic
    );
    setCurrentDateTime(getLatestDateTime(new Date()));
    const jsonString = message.toString();
    const jsonObject = JSON.parse(jsonString);
    const tempString = jsonObject.temp;
    const tempInt = parseInt(tempString, 10);
    setCurrentVal(tempInt);
  });

  // client.on('close', () => {
  //   console.log(clientId + ' disconnected')
  // })

  const onUnsubscribe = () => {
    setSubscriptions((subscriptions) => {
      const newSubscriptions = [...subscriptions];
      newSubscriptions[index] = false;
      return newSubscriptions;
    });
  };
  return (
    <Card
      sx={{
        width: 320,
        // to make the card resizable
        // overflow: 'auto',
      }}
    >
      <div>
        <Typography level="title-lg">{tileName}</Typography>
        <Typography level="body-sm">
          {currentDateTime.formattedTime +
            " | " +
            currentDateTime.formattedDate}
        </Typography>
        <Tooltip title="Unsubscribe" placement="top">
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
            onClick={onUnsubscribe}
          >
            <BookmarkRemoveOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
      <CardContent>
        <GaugeTile
          minVal={10}
          maxVal={35}
          currentVal={currentVal}
          unitOfMeasurement="c"
        />
      </CardContent>
      <CardActions buttonFlex="1">
        <ButtonGroup variant="outlined" sx={{ bgcolor: "background.surface" }}>
          <Button>History</Button>
          <Button>Actions</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
