import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await axios.post('https://task-manager-backend1-0.onrender.com/auth/register', {
        username,
        password,
      });
      setSuccess('Register successed, You can enter now!');
      setError('');
      setTimeout(() => navigation.navigate('Login' as never), 1000);
    } catch (err) {
      setError('Registiration failed, username could be taken.');
      setSuccess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <Button title="Sign" onPress={handleRegister} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderColor: 'blue',
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
  success: {
    color: 'green',
    marginTop: 10,
  },
});

export default RegisterForm;