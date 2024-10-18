import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import PromptCard from "../../components/PromptCard/PromptCard";
import PromptResponseButton from "../../components/PromptResponseButton";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <PromptCard prompt={"What is the most interesting thing you've learned this week?"} tag={"Text"} startTime={"2024-10-18T00:00:00"} duration={86400} numAnswers={3}/>
      <PromptResponseButton tag = "Text" onPress={() => {console.log("Button Pressed")}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32
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
