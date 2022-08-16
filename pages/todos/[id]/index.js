import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import todoDetailsStyles from "../../../styles/TodoDetails.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/Link";
import CircularProgress from "@mui/material/CircularProgress";
import { useTodoData } from "../../../hooks/useTodoItemData";
import { useRouter } from "next/router";

const todo = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { id } = router.query;

  const getBackgroundColor = (status) => {
    switch (status) {
      case "todo":
        return "#F66568";
      case "doing":
        return "#FFC773";
      case "done":
        return "#6BE795";
      case "archive":
        return "#7389FF";
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, data, isError, error, refetch } = useTodoData(id);

  if (isLoading) {
    return (
      <div className={styles.spinnerContainerStyle}>
        <CircularProgress size="20vh" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>TODO Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TODO List</h1>
        <div className={todoDetailsStyles.todoContainer}>
          <h2 className={todoDetailsStyles.mainTitle}>Task Details</h2>

          <Card className={todoDetailsStyles.todoBox} sx={{ minWidth: 275 }}>
            <CardContent>
              <div className={todoDetailsStyles.prop}>
                <h3 className={todoDetailsStyles.headingBox}>Name</h3>
                <p className={todoDetailsStyles.detailsBox}>
                  {data?.data?.title}
                </p>
              </div>

              <div className={todoDetailsStyles.prop}>
                <h3 className={todoDetailsStyles.headingBox}>Subject</h3>
                <p className={todoDetailsStyles.detailsBox}>
                  {data?.data?.subject}
                </p>
              </div>

              <div className={todoDetailsStyles.prop}>
                <h3 className={todoDetailsStyles.headingBox}>Status</h3>
                <p className={todoDetailsStyles.detailsBox}>
                  <span
                    className={todoDetailsStyles.statusCircle}
                    style={{
                      backgroundColor: getBackgroundColor(data?.data?.status),
                    }}
                  ></span>
                  {data?.data?.status}
                </p>
              </div>
            </CardContent>
          </Card>

          <Link href="/">
            <a className={todoDetailsStyles.backBtn}>back</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default todo;
