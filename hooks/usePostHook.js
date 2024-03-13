import { useMutation } from '@tanstack/react-query';

export function usePostHook(endpoint) {
  return useMutation({
    mutationFn: async (newProduct) => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.log(`Unable to add product: ${error.message}`);
      }
    },
  });
}
