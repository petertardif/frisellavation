import React from 'react';	
import { ScrollView, StyleSheet } from 'react-native';	
import ListToDo75Hard from '../components/ToDoList75Hard';

export default function LinksScreen() {	
  return (	
    <ScrollView style={styles.container}>	
      <ListToDo75Hard /> 
    </ScrollView>	
  );	
}	

LinksScreen.navigationOptions = {	
  title: '75 Hard',	
};	

const styles = StyleSheet.create({	
  container: {	
    flex: 1,	
    paddingTop: 15,	
    backgroundColor: '#fff',	
  },	
});