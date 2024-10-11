import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import PromptCard from "../../components/PromptCard/PromptCard";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <PromptCard prompt={"What is the most interesting thing you've learned this week?"} tag={"Image"} startTime={"2024-09-27T00:00:00"} duration={86400} answered = {true} numAnswers={3}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
