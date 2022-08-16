import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TaskBoardColStyles from "../styles/TaskBoardCol.module.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { green } from "@mui/material/colors";
import TaskItem from "./TaskItem";
import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { useAddTodoItemData } from "../hooks/useTodoListData";
import { Draggable, Droppable } from "react-beautiful-dnd";

const TaskBoardCol = ({ columnData, tasksList, columnId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = React.useState({
    title: "",
    subject: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const { mutate: addTodo } = useAddTodoItemData();

  const handleAddTodoClick = () => {
    const todo = values;
    addTodo(todo);
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
    <div>
      <Card
        className={TaskBoardColStyles.tasks_container_box}
        sx={{ minWidth: 275 }}
      >
        <CardContent className={TaskBoardColStyles.tasks_container_box_content}>
          <div className={TaskBoardColStyles.colHeader}>
            <div
              className={TaskBoardColStyles.badge_line}
              style={{ backgroundColor: columnData.columnColor }}
            ></div>
            <div className={TaskBoardColStyles.colTitle}>
              <Typography variant="h5" component="div">
                {columnData.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {columnData.description}
              </Typography>
            </div>
            {columnData.hasAddButton ? (
              <IconButton
                aria-label="settings"
                className={TaskBoardColStyles.addButton}
                onClick={handleOpen}
              >
                <AddTaskIcon
                  sx={{
                    fontSize: 30,
                    color: "white",
                    backgroundColor: green[500],
                    borderRadius: "200px",
                  }}
                />
              </IconButton>
            ) : null}
          </div>

          <Droppable droppableId={columnId}>
            {(droppableProvided, droppableSnapshot) => {
              return (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  style={{
                    background: "#f8f9fa",
                    padding: 0,
                    width: "100%",
                    minHeight: "200px",
                    border: droppableSnapshot.isDraggingOver
                      ? "1px dashed"
                      : "none",
                  }}
                >
                  {tasksList?.map((task, index) => {
                    return (
                      <Draggable
                        key={task._id}
                        draggableId={`${task._id}`}
                        index={index}
                      >
                        {(draggableProvided, draggableSnapshot) => {
                          return (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              <TaskItem
                                key={task._id}
                                taskData={task}
                              ></TaskItem>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </div>
              );
            }}
          </Droppable>
        </CardContent>
      </Card>
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
            Add a New Task
          </Typography>

          <form
            onSubmit={handleSubmit(handleAddTodoClick)}
            className={TaskBoardColStyles.modalForm}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="title"
                value={values.title}
                onChange={handleChange("title")}
                label="Title"
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="subject"
                value={values.subject}
                onChange={handleChange("subject")}
                label="Subject"
                multiline
                rows={4}
              />
            </FormControl>

            <FormControl className={TaskBoardColStyles.modalFormBtnSubmit}>
              <Button type="submit" variant="contained" color="success">
                Add
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskBoardCol;
