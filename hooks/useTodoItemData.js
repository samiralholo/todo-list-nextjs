import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchTodo = ({ queryKey }) => {
  const todoId = queryKey[1];
  return request({ url: `/todos/${todoId}` });
};

export const useTodoData = (todoId) => {
  const queryClient = useQueryClient();
  return useQuery(["todo", todoId], fetchTodo, {
    initialData: () => {
      const todo = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((todo) => todo._id === parseInt(todo));
      if (todo) {
        return { data: todo };
      } else {
        return undefined;
      }
    },
  });
};
