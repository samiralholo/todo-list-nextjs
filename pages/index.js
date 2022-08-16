import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import TaskBoardCol from "../components/TaskBoardCol";
// import { v4 as uuid } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";
import { useTodoListData } from "../hooks/useTodoListData";

const BOARD_COLUMNS = {
  ["todo"]: {
    title: "TO Do",
    status: "todo",
    description: "Things that need to be done.",
    hasAddButton: true,
    columnColor: "#F66568",
    items: [],
  },
  ["doing"]: {
    title: "Doing",
    status: "doing",
    description: "What you're doing.",
    hasAddButton: false,
    columnColor: "#FFC773",
    items: [],
  },
  ["done"]: {
    title: "Done",
    status: "done",
    description: "Already done.",
    hasAddButton: false,
    columnColor: "#6BE795",
    items: [],
  },
  ["archive"]: {
    title: "Archive",
    status: "archive",
    description: "Not important but need to write down.",
    hasAddButton: false,
    columnColor: "#7389FF",
    items: [],
  },
};

export default function Home() {
  const [columns, setColumns] = useState(BOARD_COLUMNS);

  const onSuccess = (data) => {
    console.log({ data });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const { isLoading, data, isError, error, refetch } = useTodoListData(
    onSuccess,
    onError
  );

  if (isLoading) {
    return (
      <div className={styles.spinnerContainerStyle}>
        <CircularProgress size="20vh" />
      </div>
    );
  }

  const getTasksListByStatus = (status, taskList) => {
    if (taskList) {
      return taskList.filter((task) => task.status === status);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TODO List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TODO List</h1>

        <div className={styles.boardColumns}>
          {Object.entries(columns).map(([id, column], index) => {
            return (
              <TaskBoardCol
                key={index}
                columnData={column}
                tasksList={getTasksListByStatus(column.status, data?.data)}
              ></TaskBoardCol>
            );
          })}
        </div>
      </main>
    </div>
  );
}
