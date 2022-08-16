import * as React from "react";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskItemStyles from "../styles/TaskItem.module.css";
import { red } from "@mui/material/colors";
import Link from "next/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import { useDeleteTodoItemData } from "../hooks/useTodoListData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useEditTodoItemData } from "../hooks/useTodoListData";
import TaskBoardColStyles from "../styles/TaskBoardCol.module.css";

// eslint-disable-next-line react/display-name
const TaskItem = forwardRef(({ taskData, ref }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: deleteTodo } = useDeleteTodoItemData();

  const handleDeleteTodoClick = (e) => {
    deleteTodo(e.target.id);
    setAnchorEl(null);
  };

  // Modal Code

  const [openModal, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [values, setValues] = React.useState(taskData);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const { mutate: editTodo } = useEditTodoItemData();

  const handleEditTodoClick = () => {
    const todo = values;
    editTodo(todo);
    setOpen(false);
    setValues({
      title: "",
      subject: "",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div ref={ref}>
      <Card className={TaskItemStyles.taskItemContainer} sx={{ minWidth: 275 }}>
        <CardContent className={TaskItemStyles.tasks_container_box_content}>
          <div className={TaskItemStyles.itemHeader}>
            <div className={TaskItemStyles.colTitle}>
              <Typography variant="subtitle1" gutterBottom component="div">
                <Link href={`todos/${taskData?._id}`}>
                  <a className={TaskItemStyles.todoLink}>{taskData.title}</a>
                </Link>
              </Typography>
            </div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "13ch",
                },
              }}
            >
              <MenuItem
                className={TaskItemStyles.menuItem}
                key="delete"
                id={taskData?._id}
                onClick={handleDeleteTodoClick}
              >
                Delete <DeleteIcon sx={{ color: red[500] }} />
              </MenuItem>
              <MenuItem
                className={TaskItemStyles.menuItem}
                key="edit"
                onClick={handleOpenModal}
              >
                Edit <ModeIcon color="secondary" />
              </MenuItem>
            </Menu>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
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
            onSubmit={handleSubmit(handleEditTodoClick)}
            className={TaskBoardColStyles.modalForm}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="title"
                defaultValue={taskData?.title}
                onChange={handleChange("title")}
                label="Title"
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="subject"
                defaultValue={taskData?.subject}
                onChange={handleChange("subject")}
                label="Subject"
                multiline
                rows={4}
              />
            </FormControl>

            <FormControl className={TaskBoardColStyles.modalFormBtnSubmit}>
              <Button type="submit" variant="contained" color="success">
                Edit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
});

export default TaskItem;
