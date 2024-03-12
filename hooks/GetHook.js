import { useQuery } from '@tanstack/react-query';

export function GetHook(endpoint, queryKey) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.products;
      } catch (error) {
        console.error('Error fetching products:', error);        
      }
    },
    staleTime: Infinity,
  });
}
