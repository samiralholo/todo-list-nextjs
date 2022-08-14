import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskItemStyles from "../styles/TaskItem.module.css";
import { green } from "@mui/material/colors";
import Icon from "@mui/material/Icon";

const TaskItem = () => {
  return (
    <div>
      <Card className={TaskItemStyles.taskItemContainer} sx={{ minWidth: 275 }}>
        <CardContent className={TaskItemStyles.tasks_container_box_content}>
          <div className={TaskItemStyles.itemHeader}>
            <div className={TaskItemStyles.colTitle}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Something I have to do but I dont have time to do.
              </Typography>
            </div>
            <IconButton aria-label="settings">
              <Icon sx={{ color: green[500], width: "100%", height: "100%" }}>
                <MoreVertIcon sx={{ fontSize: 30 }} />
              </Icon>
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskItem;
