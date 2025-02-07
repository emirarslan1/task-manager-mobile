import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, Text, TouchableOpacity , Button, View, StyleSheet} from 'react-native';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/types';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


useEffect(() => {
  console.log("signing situ is changed");
}, [isLoggedIn]);

  useEffect(() => {
    const checkAuth = async ()=> {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkAuth();
  },[] );

  const handleLogout = async ()=> {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        {isLoggedIn && (
          <View style={styles.header}>
          <Text style={styles.headerTitle}>Tasks</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        )}
        <Stack.Navigator screenOptions={{ headerShown: !isLoggedIn }}>
          {isLoggedIn ? (
            <Stack.Screen name="Tasks" component={TaskList} />
          ) : (
            <Stack.Screen name="Login">
            {(props: NativeStackScreenProps<RootStackParamList, 'Login'>) => (
              <LoginForm {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
          )}
          <Stack.Screen name="Register" component={RegisterForm} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

