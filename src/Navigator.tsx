import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/main";
import LoginScreen from "./screens/login";
import { RootStackParamList } from "./screens/RootStackParams";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogin } from "./modules/user";

const Stack = createStackNavigator<RootStackParamList>();

interface INavigatorProps {
}

const Navigator: FC<INavigatorProps> = props => {
  const dispatch = useDispatch();
  const onSetLogin = (login: boolean) => dispatch(setLogin(login));
  AsyncStorage.getItem("token").then(token => {
    if (token) {
      onSetLogin(true);
    }
  });
  const { isLogin } = useSelector((state: any) => ({
    isLogin: state.user.isLogin,
  }));
  return isLogin ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
