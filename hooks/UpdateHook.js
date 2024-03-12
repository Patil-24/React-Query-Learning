import { useMutation } from '@tanstack/react-query';

export function UpdateHook(endpoint) {
  return useMutation({
    mutationFn: async ({ productId, title }) => {
      try {
        const response = await fetch(`${endpoint}/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        throw new Error(`Unable to update product: ${error.message}`);
      }
    },
  });
}
