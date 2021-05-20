import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, Button } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../RootStackParams";
import { setLogin } from "../../modules/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

// type mainScreenProp = StackNavigationProp<RootStackParamList, "Main">;

function MainScreen() {
  // const navigation = useNavigation<mainScreenProp>();
  const dispatch = useDispatch();
  const onSetLogin = (login: boolean) => dispatch(setLogin(login));
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Main Screen</Text>
      {/* <Button title="Login" onPress={() => navigation.navigate("Login")} /> */}
      <Button title="Logout" onPress={async () => {
        //navigation.navigate("Login");
        await AsyncStorage.removeItem("token");
        onSetLogin(false);
      }} />
    </View>
  );
}

export default MainScreen;
