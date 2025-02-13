import * as React from "react";
import Button from "@mui/joy/Button";

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Add from "@mui/icons-material/Add";
import FormModal from "./FormModal";
import { Box } from "@mui/joy";

export default function EmptyWidget({ index }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Box
        component="div"
        sx={{ p: 2, border: "1px dashed grey" }}
        height={128}
        alignContent="center"
        onClick={() => setOpen(true)}
      >
        <Button
          variant="plain"
          color="neutral"
          size="lg"
          startDecorator={<Add />}
        >
          New Tile
        </Button>
      </Box>
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
