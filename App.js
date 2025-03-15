import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, Button } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy groceries', completed: false },
    { key: '2', description: 'Walk the dog', completed: false },
  ]);
  
  const [newTask, setNewTask] = useState('');

  const toggleTaskCompletion = (taskKey) => {
    setTasks(tasks.map(task => 
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        key: (tasks.length + 1).toString(),
        description: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.key)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={tasks} renderItem={renderItem} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add a new task"
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
