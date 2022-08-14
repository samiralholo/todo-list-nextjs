import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import TaskBoardCol from "../components/TaskBoardCol";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TODO List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TODO List</h1>

        <div className={styles.boardColumns}>
          <TaskBoardCol></TaskBoardCol>
          <TaskBoardCol></TaskBoardCol>
          <TaskBoardCol></TaskBoardCol>
          <TaskBoardCol></TaskBoardCol>
        </div>
      </main>
    </div>
  );
}
