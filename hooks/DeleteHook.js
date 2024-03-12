import { useMutation } from '@tanstack/react-query';

export function DeleteHook(endpoint) {
  return useMutation({
    mutationFn: async (productId) => {
      try {
        const response = await fetch(`${endpoint}/${productId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        throw new Error(`Unable to delete product: ${error.message}`);
      }
    },
  });
}
