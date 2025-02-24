import { useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {onLogin, onRegister} = useAuth()
     
    const login = async () => {
        const result = await onLogin!(email, password)
        if (result & result.error) {
            alert(result.msg)
        }
    }

    const register = async () => {
        const result = await onRegister!(email, password)
        if (result && result.error) {
            alert(result.msg)
        } else {
            login()
        }
    }

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};
