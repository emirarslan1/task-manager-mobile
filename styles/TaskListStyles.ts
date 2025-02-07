import { StyleSheet } from 'react-native';

const TaskListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
    marginVertical: 10,
  },
  taskContainer: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 16,
  },
  completedTaskText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginLeft: 5,
  },
  updateButton: {
    backgroundColor: '#007bff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  completeButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },

  // Form Stilleri
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formInput: {
    width: '100%',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 15,
  },
  formButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  formButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TaskListStyles;