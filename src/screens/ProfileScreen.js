import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const ProfileScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20}}>ProfileScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
