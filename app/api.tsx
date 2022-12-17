import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Tree } from './types';

export const useTrees = (filter: string | undefined) => {
  return useQuery(['trees', filter], async () => {
    return (await fetch(`/api/trees?street=${filter || ''}`).then((response) =>
      response.json()
    )) as Tree[];
  });
};

export const useTreeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(async (tree: Tree) => {
    const method = tree._id === undefined ? 'POST' : 'PUT';

    const res = await fetch(`/api/tree`, {
      method,
      body: JSON.stringify(tree),
    }).then((response) => {
      return response.json();
    });
    queryClient.invalidateQueries({ queryKey: ['trees'] });
    return res;
  });
};

export const useTreeDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(async (_id: string) => {
    const res = await fetch(`/api/tree`, {
      method: 'DELETE',
      body: JSON.stringify({ _id }),
    }).then((response) => {
      return response.json();
    });
    queryClient.invalidateQueries({ queryKey: ['trees'] });
    return res;
  });
};
