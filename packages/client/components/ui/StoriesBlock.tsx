import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDailySunnah } from "@/api/api";

const StoriesBlock = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dailySunnah"],
    queryFn: fetchDailySunnah,
  });
  console.log(data);

  if (isLoading)
    return <ActivityIndicator size="large" style={styles.loader} />;
  if (error)
    return <Text style={styles.errorText}>Error loading daily Sunnah</Text>;

  return (
    <View style={styles.storiesContainer}>
      <View style={styles.card}>
        <Text style={styles.hadithText}>{data.hadithEnglish}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Read more")}
        >
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    width: "100%",
    maxWidth: 400,
  },
  hadithText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Arial", // you can change the font here
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontFamily: "Arial",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StoriesBlock;
