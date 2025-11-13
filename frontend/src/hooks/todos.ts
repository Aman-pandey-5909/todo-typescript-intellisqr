import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../libs/api";

export const useTodos = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await api.get("/todo");
      return data.todos;
    },
  });


export const useCreateTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string; description: string }) =>
      api.post("/todo", payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};


export const useUpdateTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; title?: string; description?: string }) =>
      api.put(`/todo/${payload.id}`, {
        title: payload.title,
        description: payload.description,
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};


export const useDeleteTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/todo/${id}`),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};


export const useToggleTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.patch(`/todo/${id}`),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
