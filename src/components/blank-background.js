import React from 'react';

import {
  View, StyleSheet, Text, Image, TouchableOpacity, Dimensions
} from 'react-native';
import Loading from './loading';
import theme from '../theme';
import { Images } from '../theme/images';

const tip = listStatus => (listStatus == 2 ? '网络异常，点击刷新' : '暂无数据，点击刷新');

export default ({ listStatus, onRefresh }) => (
  <View style={styles.container}>
    {
      listStatus == 3 && <Loading />
    }
    {
      listStatus != 3 && (
      <TouchableOpacity style={styles.touchView} onPress={onRefresh}>
        <Image style={styles.image} source={Images.app_empty} resizeMode="stretch" />
        <Text style={styles.tip}>{ tip(listStatus) }</Text>
      </TouchableOpacity>
      )
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.containerBg
  },
  touchView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tip: {
    fontSize: theme.normalFontSize,
    color: 'black'
  },
  image: {
    marginBottom: 10,
    width: 150,
    height: 200
  }
});
