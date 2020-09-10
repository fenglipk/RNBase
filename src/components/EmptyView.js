import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { Images } from '../theme/images';
import {
  reallySize,
  titleHeight,
  deviceHeight,
  deviceWidth
} from '../utils/Global';

// eslint-disable-next-line react/prefer-stateless-function
export default class EmptyView extends Component {
  render() {
    const { textTip, martopY } = this.props;
    return (
      <View
        style={{
          flex: 1,
          height: deviceHeight - titleHeight * 2,
          width: deviceWidth,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: martopY
        }}
      >
        <Image
          source={Images.app_empty}
          // style={{ width: reallySize(208), height: reallySize(182) }}
          resizeMode="contain" // 'cover', 'contain', 'stretch', 'repeat', 'center'
        />
        <Text
          style={{
            marginTop: reallySize(32),
            color: '#999',
            fontSize: reallySize(13),
          }}
        >
          {textTip || '暂无数据'}
        </Text>
      </View>
    );
  }
}
