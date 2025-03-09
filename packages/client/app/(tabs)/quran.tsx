import { fetchQuranEpub } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { View, Text, ActivityIndicator } from "react-native";
import { Reader, ReaderProvider, useReader } from "@epubjs-react-native/core";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useFileSystem } from '@epubjs-react-native/file-system';
import { useFileSystem } from "@epubjs-react-native/expo-file-system";

export default function QuranScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quran"],
    queryFn: () =>
      fetchQuranEpub(
        "677dac55-83ec-423e-9571-64e80c745534-A7B16ABC-8C93-4115-9DBA-24D5973CF5B4-27901-0000029AB3DCC8D5"
      ),
  });
  const { goToLocation } = useReader();

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading daily Sunnah</Text>;


  return (
    <ReaderProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Reader src={data?.data.url} fileSystem={useFileSystem} />
      </SafeAreaView>
    </ReaderProvider>
  );
}
