import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TaskBoardColStyles from "../styles/TaskBoardCol.module.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { green } from "@mui/material/colors";
import TaskItem from "./TaskItem";

const TaskBoardCol = ({ columnData, tasksList }) => {
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

          <div>
            {tasksList?.map((task) => {
              return <TaskItem key={task._id} taskData={task}></TaskItem>;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskBoardCol;
