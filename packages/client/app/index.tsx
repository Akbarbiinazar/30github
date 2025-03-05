import { Redirect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function IndexScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <Redirect href="/(tabs)/quran" />
    </QueryClientProvider>
  );
}
