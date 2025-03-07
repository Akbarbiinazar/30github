import { fetchBooks, fetchDailySunnah } from "@/api/api";
import StoriesBlock from "@/components/ui/StoriesBlock";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, View } from "react-native";

export default function HomeScreen() {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["dailySunnah"],
  //   queryFn: fetchDailySunnah,
  // });
  // // const { data, isLoading, error } = useQuery({
  // //   queryKey: ["books"],
  // //   queryFn: fetchBooks,
  // // });
  // console.log(data);

  // if (isLoading) return <ActivityIndicator size="large" />;
  // if (error) return <Text>Error loading daily Sunnah</Text>;

  return (
    <View>
      <StoriesBlock />
    </View>
  );
}
