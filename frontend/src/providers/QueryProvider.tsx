import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Configure Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,                 // 1 retry on failure
      refetchOnWindowFocus: false, // Do NOT refetch when switching tabs
      staleTime: 1000 * 60 * 1, // Data fresh for 1 min
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
