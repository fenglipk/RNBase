
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Hook from './hook';

function Message() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Hook />
    </View>
  );
}
export default Message;
