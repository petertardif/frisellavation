import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default function ListToDo75Hard() {
  const [items, setItems] = useState([
    { name: 'I exercised twice  for 45 minutes — one session was outdoors.', checked: false },
    { name: 'I followed a diet with no cheat meals or alcohol.', checked: false },
    { name: 'I drank a gallon of water.', checked: false },
    { name: 'I read 10 pages of a non-fiction entrepreneur book.', checked: false },
    { name: 'I took a progress pic.', checked: false },
  ]);

  const handleCompletedItem = item => {
    const newItems = items.map(itm => {
      if (itm === item) {
        itm.checked = !itm.checked;
      }
      return itm;
    });
    setItems(newItems);
  };

  return (
    <>
      <Text>Daily 75 Hard List</Text>
        <View>
          {items.map((item, i) => (
            <ScrollView key={i}>
              <Text
                style={ item.checked ? styles.crossout : null }
              >
                {item.name}
              </Text>
              <Button title='Complete' onClick={() => handleCompletedItem(item)} type='button'>
                Completed
              </Button>
            </ScrollView>
          ))}
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  crossout: {
    textDecorationLine: 'line-through',
  }
})
