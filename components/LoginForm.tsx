import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';


interface LoginFormProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const handleLogin = async () => {
    try {
      const response = await axios.post('https://task-manager-backend1-0.onrender.com/auth/login', {
        username,
        password,
      });
      await AsyncStorage.setItem('token', response.data.access_token);
      setIsLoggedIn(true);
      navigation.navigate('Tasks');
      Alert.alert('Succesed', 'Log in Successed');
    } catch (err) {
      setError('Log in failed! Check your informations !');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.registerText}>Don't have an account ? No Problem</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Register' as never)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderColor: 'green',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  registerText: {
    marginTop: 20,
  },
});

export default LoginForm;