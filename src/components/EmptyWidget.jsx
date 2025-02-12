import * as React from "react";
import Button from "@mui/joy/Button";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Add from "@mui/icons-material/Add";
import FormModal from "./FormModal";

export default function EmptyWidget({ index }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New Tile
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new tile</DialogTitle>
          <DialogContent>Fill in the information of the tile.</DialogContent>
          <FormModal setOpen={setOpen} index={index} />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
