import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import { Alert, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function MotivateButton() {
  return (
    <>
      <AwesomeButton 
        stretch
        backgroundColor='red' 
        onPress={() => Alert.alert('You have been motivated!')}
      >
        Motivate Me
      </AwesomeButton>
    </>
  )
}
