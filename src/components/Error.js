import React from 'react';
import {StyleSheet, Text} from 'react-native';

export function Error({error}) {
  return <Text style={styles.text}>{error}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
});
