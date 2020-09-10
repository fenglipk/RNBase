
import React, { useState, useEffect } from 'react';
import {
  Text, View, Button
} from 'react-native';
import Detail from './detail';


function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Detail navigation={navigation} />
    </View>
  );
}
export default Home;
