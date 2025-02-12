import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { TopicSubscriptions } from "./SubscriptionContext";
import { updateStaticData } from "../utils/constants";

export default function FormModal({ index, setOpen }) {
  const initialValues = {
    hostIp: "",
    port: "",
    subscriptionTopic: "",
    tileName: "",
  };
  const [formValues, setFormValues] = React.useState(initialValues);
  const { setSubscriptions } = React.useContext(TopicSubscriptions);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson);
    updateStaticData(index, formJson);
    setSubscriptions((subscriptions) => {
      const newSubscriptions = [...subscriptions];
      newSubscriptions[index] = true;
      return newSubscriptions;
    });
    setOpen(false);
  };
  return (
    <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>Host/IP address</FormLabel>
          <Input
            name="hostIp"
            value={formValues.hostIp}
            placeholder="192.168.0.101"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Port</FormLabel>
          <Input
            name="port"
            value={formValues.port}
            placeholder="8080"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Subscription Topic</FormLabel>
          <Input
            name="subscriptionTopic"
            value={formValues.subscriptionTopic}
            placeholder="temperature"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tile name</FormLabel>
          <Input
            name="tileName"
            value={formValues.tileName}
            placeholder="I BF temperature"
            required
          />
        </FormControl>
        <Button type="submit">Subscribe</Button>
      </Stack>
    </form>
  );
}
