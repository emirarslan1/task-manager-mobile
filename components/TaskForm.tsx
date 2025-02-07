import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addTask } from '../services/api';

interface TaskFormProps {
    onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Error', 'Please, fill all the areas.');
            return;
        }

        try {
            await addTask(title, description);
            setTitle('');
            setDescription('');
            onTaskAdded();
        } catch (error) {
            Alert.alert('Error', 'Task couldnt added.');
            console.log('Task couldnt added.', error);
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>Title of Task</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
            />

            <Text style={styles.label}>Description of Task</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter task description"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add the Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TaskForm;