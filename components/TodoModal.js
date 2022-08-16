import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import TaskBoardColStyles from "../styles/TaskBoardCol.module.css";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

const TodoModal = ({ openStatus, handlerAction, action, todoData }) => {
  const [open, setOpen] = React.useState(openStatus);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = React.useState({
    title: "",
    subject: "",
  });

  handlerAction = () => {
    debugger;
    handleOpen;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={TaskBoardColStyles.modalBox}>
          <Typography
            className={TaskBoardColStyles.modalTitle}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Edit Task
          </Typography>

          <form
            onSubmit={handleSubmit(handlerAction)}
            className={TaskBoardColStyles.modalForm}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="title"
                value={todoData.title}
                onChange={handleChange("title")}
                label="Title"
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="subject"
                value={todoData.subject}
                onChange={handleChange("subject")}
                label="Subject"
                multiline
                rows={4}
              />
            </FormControl>

            <FormControl className={TaskBoardColStyles.modalFormBtnSubmit}>
              <Button type="submit" variant="contained" color="success">
                {action}
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TodoModal;
