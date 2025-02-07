import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from "../types/Task";

// API için axios örneği oluşturma
const api = axios.create({
  baseURL: "https://task-manager-backend1-0.onrender.com",
});

// Axios istekleri öncesinde token ekleme
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');  // localStorage yerine AsyncStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Görevleri Getir
export const getTasks = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await api.get('/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Görev Ekle
export const addTask = async (title: string, description: string) => {
  const token = await AsyncStorage.getItem('token');
  const response = await api.post('/tasks', { title, description }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Görev Güncelle
export const updateTask = async (id: string, updatedFields: Partial<Task>) => {
  const token = await AsyncStorage.getItem('token');
  const response = await api.put(`/tasks/${id}`, updatedFields, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Görev Sil
export const deleteTask = async (id: string): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  await api.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Görev Tamamla
export const completeTask = async (id: string): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  const response = await api.put(`/tasks/${id}`, { status: "closed" }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Kullanıcı Girişi
export const loginUser = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  const token = response.data.access_token;

  await AsyncStorage.setItem('token', token);  // Tokeni sakla
  return token;
};