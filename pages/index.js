import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useTodoListData } from "../hooks/useTodoListData";
import { DragDropContext } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import { useEditTodoItemData } from "../hooks/useTodoListData";

const TaskBoardCol = dynamic(() => import("../components/TaskBoardCol"), {
  ssr: false,
});

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

  const { mutate: editTodo } = useEditTodoItemData();

  const handleEditTodoClick = (todoId, newStatus) => {
    const editedTodo = {
      _id: todoId,
      status: newStatus,
    };
    const todo = editedTodo;
    editTodo(todo);
  };

  const onSuccess = (data) => {
    Object.entries(columns).map(([id, column], index) => {
      setColumns({
        ...columns,
        [column.status]: {
          ...column,
          items: data?.data.filter((task) => task.status === column.status),
        },
      });
    });
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

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    handleEditTodoClick(result.draggableId, result.destination.droppableId);
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
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
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([id, column], index) => {
              // debugger;
              // setColumns({
              //   ...columns,
              //   [column.status]: {
              //     ...column,
              //     items: getTasksListByStatus(column.status, data?.data),
              //   },
              // });
              return (
                <TaskBoardCol
                  key={id}
                  columnData={column}
                  columnId={id}
                  tasksList={getTasksListByStatus(column.status, data?.data)}
                ></TaskBoardCol>
              );
            })}
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}
