import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TaskBoardColStyles from "../styles/TaskBoardCol.module.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { green } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import TaskItem from "./TaskItem";

const TaskBoardCol = () => {
  return (
    <div>
      <Card
        className={TaskBoardColStyles.tasks_container_box}
        sx={{ minWidth: 275 }}
      >
        <CardContent className={TaskBoardColStyles.tasks_container_box_content}>
          <div className={TaskBoardColStyles.colHeader}>
            <div className={TaskBoardColStyles.badge_line}></div>
            <div className={TaskBoardColStyles.colTitle}>
              <Typography variant="h5" component="div">
                TO Do
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Things that need to be done.
              </Typography>
            </div>
            <IconButton aria-label="settings">
              <Icon sx={{ color: green[500], width: "100%", height: "100%" }}>
                <AddTaskIcon sx={{ fontSize: 30 }} />
              </Icon>
            </IconButton>
          </div>

          <div>
            <TaskItem></TaskItem>
            <TaskItem></TaskItem>
            <TaskItem></TaskItem>
            <TaskItem></TaskItem>
            <TaskItem></TaskItem>
            <TaskItem></TaskItem>
            <TaskItem></TaskItem>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskBoardCol;
