import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';

const ParentComponent = (props) => {
  return <View>{props.children}</View>;
};

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim() === '') {
      return;
    }

    setCourseGoals((currentCourseGoals) => [
      ...courseGoals,
      { id: Math.random().toString(), value: enteredGoalText },
    ]);
    setEnteredGoalText('');
  }

  return (
    <ImageBackground
      source={require('./assets/flower.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.appContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.Title}>My Goals</Text>
          <Text style={styles.subHeader}>Your Milestone Tracker</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Course Goal"
            style={styles.inputText}
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />
          <Pressable title="Add Goal" color="#5D4534" onPress={addGoalHandler}
            onPressOut = {addGoalHandler}
            unstable_pressDelay={3000}>
            <Text style={styles.Press}>Add Goal</Text>
          </Pressable>
        </View>
        

        <FlatList
          keyExtractor={(item) => item.id}
          data={courseGoals}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setCourseGoals((prevGoals) =>
                  prevGoals.filter((goal) => goal.id !== item.id)
                );
              }}
            >
              <View>
                <ScrollView style={styles.goalItem}>
                  <Text style={styles.goalText}>{item.value}</Text>
                </ScrollView>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
    borderBottomWidth: 2,
    borderBottomColor: '#282321',
    minHeight: 80,
    maxHeight: 40,
  },
  inputText: {
    borderWidth: 2,
    color: 'black',
    width: '70%',
    marginRight: 12,
    padding: 10,
    borderColor: '#61564A',
    borderRadius: 8,
    backgroundColor: '#B3AEA4',
    fontSize: 16,
    minHeight: 40,
    maxHeight: 40,
    bottom: -2,
  },
  goalContainer: {
    flex: 5,
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  headerContainer: {
    backgroundColor: '#B3AEA4',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 60,
    marginRight: 60,
    marginTop: 1,
    marginBottom: 1,
    borderWidth: 2,
    borderRadius: 20,
  },
  Press: {
    flex: -1,
    fontSize: 23,
    backgroundColor: '#964B00',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 13,
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#302821',
    paddingBottom: 1,
  },
  subHeader: {
    margin: 5,
    fontSize: 15,
    color: '#302821',
  },
  goalItem: {
    padding: 10,
    backgroundColor: '#B3AEA4',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  goalText: {
    color: 'black',
  },
});