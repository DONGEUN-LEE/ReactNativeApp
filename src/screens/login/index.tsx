import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../RootStackParams";
import { setLogin } from "../../modules/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_ANDROID, API_URL_IOS } from "react-native-dotenv";

const url = Platform.select({
  ios: `${API_URL_IOS}/api/login`,
  android: `${API_URL_ANDROID}/api/login`,
});

interface ILoginScreenProps {
  children: React.ReactNode;
}

// type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: FC<ILoginScreenProps> = props => {
  // const navigation = useNavigation<loginScreenProp>();
  const dispatch = useDispatch();
  const onSetLogin = (login: boolean) => dispatch(setLogin(login));

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const onPress = async () => {
    const response = await fetch(url!, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    if (result.message == "Success") {
      await AsyncStorage.setItem("token", result.token);
      const token = await AsyncStorage.getItem("token");
      onSetLogin(true);
      // navigation.navigate('Main');
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        autoCapitalize="none"
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign In" onPress={onPress} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  input: {
    height: 40,
    width: "90%",
    padding: 8,
    margin: 8,
    borderWidth: 1,
  },
});
