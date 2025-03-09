import { fetchBooks, fetchDailySunnah } from "@/api/api";
import StoriesBlock from "@/components/ui/StoriesBlock";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <StoriesBlock />
    </View>
  );
}
