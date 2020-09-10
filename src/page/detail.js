import React, { Component } from 'react';
import {
  StyleSheet, View, ScrollView, TouchableWithoutFeedback, Text,
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { produce } from 'immer';
import theme from '../theme';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: '配料班',
          code: 'plb',
          checked: true,
          items:
          [{ name: '原铝耗用', code: '001', routeName: 'YLHY' },
            { name: '辅料耗用', code: '002', routeName: 'FLHY' },
            { name: '工艺记录', code: '003', routeName: 'GJJL' }],
        },
        {
          name: '合金班',
          code: 'hjb',
          checked: false,
          items: [{ name: '工艺操作', code: '004', routeName: 'GongYiCaoZuo' },
            { name: '工艺参数', code: '005', routeName: 'GongYiCanShu' },
            { name: '生产情况', code: '006', routeName: 'ShengChanQK' },
            { name: '生产意见', code: '007', routeName: 'ShengChanYJ' }],
        },
      ],
    };
  }

  // 初始化
  componentDidMount() {
    this.initDatas();
  }

  initDatas = async () => {

  }

  titleChange = (v) => {
    const tabs = this.state.tabs.map(it => ({
      ...it,
      checked: it.code === v.code,
    }));
    this.setState(produce(draft => {
      draft.tabs = tabs;
    }));
  }

  itemClick = (v) => {
    const params = {
      item: v,
    };
    this.props.navigation.navigate('List', params);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', margin: 8 }}>
          {
            this.state.tabs.map((v, index) => (
              <TouchableWithoutFeedback onPress={() => this.titleChange(v)} key={index}>
                <View style={[styles.titleContainer, { backgroundColor: v.checked ? 'white' : 'rgba(219,219,219,0.52)' }]}>
                  <Text style={{ color: v.checked ? '#4f6fe3' : 'white' }}>{v.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View>
            {
              this.state.tabs.find(v => v.checked).items.map((v, index) => (
                <TouchableWithoutFeedback onPress={() => this.itemClick(v)} activeOpacity={0.8}>
                  <View style={[styles.itemContainer, { borderRadius: 2, borderWidth: 1, borderColor: 'rgba(219,219,219,0.52)' }]}>
                    <View style={styles.itemLeftContainer}>
                      <Text style={{ color: 'white' }}>{v.name}</Text>
                    </View>
                    <View style={styles.itemRightContainer}>
                      <TouchableWithoutFeedback
                        onPress={() => {}}
                        activeOpacity={0.8}
                      >
                        <Icon
                          name="right"
                          size={22}
                          color="white"
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: theme.primary,
  },
  itemContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    padding: 8,
    margin: 8,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLeftContainer: {
  },
  itemMiddleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  itemRightContainer: {
    paddingLeft: 20,
  },
});

export default Detail;
