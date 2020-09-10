import React, { Component } from 'react';
import {
  View, Modal, ActivityIndicator, DeviceEventEmitter
} from 'react-native';
import { Provider } from '@ant-design/react-native';
import Router from '../router';

export default class Boot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('showLoading', (show) => {
      if (show) {
        this.setState({ modalVisible: true });
      } else {
        this.setState({ modalVisible: false });
      }
    });
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('showLoading');
  }

  render() {
    return (
      <Provider>
        <Modal
          visible={this.state.modalVisible}
          animationType="none"
          transparent
          onRequestClose={this.onClose}
        >
          <View style={{
            justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)'
          }}
          >
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        </Modal>
        <Router />
      </Provider>
    );
  }
}
