import { useMutation } from "react-query";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@Components/Dialog";
import Button from "@Components/Button";
import Box from "@Components/Box";
import Avatar from "@Components/Avatar";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addConversation } from "@Api/conversations";
import React from "react";

interface User {
  id: number;
  nickname: string;
}

interface ModalNewConversationProps {
  open: boolean;
  handleClose: () => void;
  userOptions: User[];
}

export const ModalNewConversation: React.FC<ModalNewConversationProps> = ({
  open,
  handleClose,
  userOptions,
}) => {
  const mutationConversation = useMutation((recipientId: number) =>
    addConversation(1, recipientId)
  );

  const onAddConversation = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const recipiendId = formData.get("select-user");

    mutationConversation.mutate(recipiendId);
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Nouvelle conversation</DialogTitle>
      <form onSubmit={onAddConversation}>
        <DialogContent>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 360 }}>
              <InputLabel htmlFor="select-user">
                Sélectionner un utilisateur
              </InputLabel>
              <Select
                inputProps={{ name: "select-user" }}
                defaultValue=""
                sx={{
                  "& .MuiInputBase-input": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                input={
                  <OutlinedInput
                    label="Sélectionner un utilisateur"
                    id="select-user"
                    inputProps={{ name: "select-user" }}
                  />
                }
              >
                {userOptions.map(({ id, nickname }) => (
                  <MenuItem key={id} sx={{ padding: 2 }} value={id}>
                    <Avatar
                      src={`https://i.pravatar.cc/50?img=${id}`}
                      sx={{ mr: 2 }}
                    ></Avatar>
                    {nickname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
