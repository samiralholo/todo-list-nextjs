import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchTodoList = () => {
  return request({ url: "/todos" });
};

export const useTodoListData = (onSuccess, onError) => {
  return useQuery("todo-list", fetchTodoList, {
    onSuccess,
    onError,
  });
};

const addTodoItem = (todoItem) => {
  return request({ url: "/todos", method: "post", data: todoItem });
};

export const useAddTodoItemData = () => {
  const queryClient = useQueryClient();

  return useMutation(addTodoItem, {
    onMutate: async (newTodoItem) => {
      await queryClient.cancelQueries("todo-list");
      const previousTodoItemData = queryClient.getQueryData("todo-list");
      queryClient.setQueryData("todo-list", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length - 1, ...newTodoItem },
          ],
        };
      });
      return { previousTodoItemData };
    },
    onError: (_err, _newTodoItem, context) => {
      queryClient.setQueryData("todo-list", context.previousTodoItemData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("todo-list");
    },
    /**Optimistic Update End */
  });
};

const deleteTodoItem = (todoId) => {
  return request({ url: `/todos/${todoId}`, method: "delete" });
};

export const useDeleteTodoItemData = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodoItem, {
    onMutate: async (newTodoItem) => {
      await queryClient.cancelQueries("todo-list");
      const previousTodoItemData = queryClient.getQueryData("todo-list");
      queryClient.setQueryData("todo-list", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newTodoItem },
          ],
        };
      });
      return { previousTodoItemData };
    },
    onError: (_err, _newTodoItem, context) => {
      queryClient.setQueryData("todo-list", context.previousTodoItemData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("todo-list");
    },
    /**Optimistic Update End */
  });
};

const editTodoItem = (todoItem) => {
  const editedTodo = {
    title: todoItem.title,
    subject: todoItem.subject,
    status: todoItem.status,
  };
  return request({
    url: `/todos/${todoItem._id}`,
    method: "patch",
    data: editedTodo,
  });
};

export const useEditTodoItemData = () => {
  const queryClient = useQueryClient();

  return useMutation(editTodoItem, {
    onMutate: async (newTodoItem) => {
      await queryClient.cancelQueries("todo-list");
      const previousTodoItemData = queryClient.getQueryData("todo-list");
      queryClient.setQueryData("todo-list", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length, ...newTodoItem },
          ],
        };
      });
      return { previousTodoItemData };
    },
    onError: (_err, _newTodoItem, context) => {
      queryClient.setQueryData("todo-list", context.previousTodoItemData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("todo-list");
    },
    /**Optimistic Update End */
  });
};
