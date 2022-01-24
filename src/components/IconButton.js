import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';

export function IconButton({name, style, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <BackIcon name={name} size={35} color={'blue'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
