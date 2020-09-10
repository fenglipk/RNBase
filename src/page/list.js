import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  NativeModules,
} from 'react-native';
import produce from 'immer';
import {
  Toast, DatePicker, Icon,
} from '@ant-design/react-native';
import moment from 'moment';
import { BlankBackground, ListFooter } from '../components';
import theme from '../theme';
import * as testService from '../services/test';

export default class QuyangList extends PureComponent {

  pageSize = 10;

  pageIndex = 1;

  constructor(props) {
    super(props);
    this.state = {
      listDatas: [],
      listStatus: 3, // 0 列表正常有数据 1 列表没有数据 2 请求失败 3 加载中
      refreshing: false,
      isMore: false,
      beginTime: new Date(),
      title: this.props.route.params.item.name,
    };
  }

  componentDidMount() {
    this.getListDatas(true);
  }

  getListDatas = async (isInit) => {
    try {
      if (isInit) {
        this.pageIndex = 1;
      }
      this.setState(produce(draft => {
        draft.listStatus = 3;
      }));
      const params = {
        status: '10',
        goodsTypId: '',
        goodsId: '',
        pageNum: this.pageIndex,
        pageSize: this.pageSize,
      };
      const rep = await testService.testPost({ params });
      if (rep.data.length > 0) {
        this.setState(produce(draft => {
          if (isInit) {
            draft.listDatas = rep.data;
          } else {
            draft.listDatas.push(...rep.data);
          }
          draft.refreshing = false;
          draft.listStatus = 0;
          this.pageIndex = this.pageIndex + 1;
          draft.total = rep.totalPage;
          draft.isMore = draft.listDatas.length < draft.total;
        }));
      } else {
        this.setState({ listStatus: 1, refreshing: false });
      }
      // Toast.show('请求成功', 3);
    } catch (error) {
      Toast.show('请求失败', 3);
      this.setState({ listStatus: 2, refreshing: false });
    }
  };

  _onEndReached = () => {
    if (!this.refreshing && this.state.isMore) {
      this.getListDatas();
    }
  };

  _renderRefresh = () => {
    this.getListDatas(true);
  };

  // 列表上拉加载没有数据时
  _renderListFooter = () => (
    (this.state.listDatas.length > 0) && <ListFooter isMore={this.state.isMore} />
  )

  itemCell = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#EFEFEF',
            padding: 10,
          }}
        >
          <Text>{item.goodsName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  onChange = value => {
    NativeModules.myBadge.saomaqiang('www.baidu.com');
    this.setState({
      beginTime: value,
    });
  };

  render() {
    const { listDatas, listStatus, refreshing } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15, justifyContent: 'center', backgroundColor: theme.primary }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="left"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 17 }}>{this.state.title}</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View style={{ padding: 10 }}>
          <DatePicker
            value={this.state.beginTime}
            mode="date"
            defaultDate={new Date()}
            minDate={new Date(2015, 7, 6)}
            maxDate={new Date(2026, 11, 3)}
            onChange={this.onChange}
            format="YYYY-MM-DD"
          >
            <TouchableOpacity>
              <Text>时间选择：{moment(this.state.beginTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </TouchableOpacity>
          </DatePicker>
        </View>
        <FlatList
          style={styles.container}
          refreshing={refreshing}
          ListEmptyComponent={<BlankBackground listStatus={listStatus} onRefresh={this._renderRefresh} />}
          data={listDatas}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._renderRefresh}
          onEndReached={this._onEndReached}
          renderItem={({ item, index }) => this.itemCell(item, index)}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.3}
          scrollEventThrottle={200}
          ListFooterComponent={this._renderListFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.containerBg,
  },
});
