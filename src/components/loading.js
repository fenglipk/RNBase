import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import theme from '../theme';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={theme.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Loading;
