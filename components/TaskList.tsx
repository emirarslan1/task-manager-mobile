import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { getTasks, completeTask, deleteTask, updateTask } from '../services/api';
import Task from '../types/Task';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const fetchTasks = async () => {
    const data: Task[] = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleComplete = async (id: string) => {
    await completeTask(id);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
  };

  const handleUpdate = async () => {
    if (editingTaskId) {
      await updateTask(editingTaskId, { title: updatedTitle, description: updatedDescription });
      setEditingTaskId(null);
      fetchTasks();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Tüm Görevler</Text>
            <TaskForm onTaskAdded={fetchTasks} />
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={item.status === 'closed' ? styles.completedTask : styles.task}>
              {item.title}: {item.description}
            </Text>
            <Button title="Update" onPress={() => handleEdit(item)} />
            <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            <Button title="Complete" color="green" onPress={() => handleComplete(item.id)} />
          </View>
        )}
        ListFooterComponent={() =>
          editingTaskId ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                placeholder="New Title"
                value={updatedTitle}
                onChangeText={setUpdatedTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="New Description"
                value={updatedDescription}
                onChangeText={setUpdatedDescription}
              />
              <Button title="Save" onPress={handleUpdate} />
              <Button title="Cancel" color="red" onPress={() => setEditingTaskId(null)} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  taskContainer: { marginBottom: 15 },
  task: { fontSize: 18 },
  completedTask: { fontSize: 18, textDecorationLine: 'line-through', color: 'gray' },
  editContainer: { marginTop: 20 },
  input: { borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default TaskList;