import * as React from "react";
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

const TaskItem = ({ taskData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: deleteTodo } = useDeleteTodoItemData();

  const handleAddTodoClick = (e) => {
    deleteTodo(e.target.id);
    setAnchorEl(null);
  };

  return (
    <div>
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
                onClick={handleAddTodoClick}
              >
                Delete <DeleteIcon sx={{ color: red[500] }} />
              </MenuItem>
              <MenuItem
                className={TaskItemStyles.menuItem}
                key="edit"
                onClick={handleClose}
              >
                Edit <ModeIcon color="secondary" />
              </MenuItem>
            </Menu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskItem;
