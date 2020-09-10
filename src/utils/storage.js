import AsyncStorage from '@react-native-community/async-storage';

const clear = async () => AsyncStorage.clear();

const get = async (key, defaultValue = null) => {
  const v = await AsyncStorage.getItem(key);
  return v !== null ? JSON.parse(v) : defaultValue;
};

const set = async (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

const remove = async key => AsyncStorage.removeItem(key);

const multiGet = async (...keys) => AsyncStorage.multiGet([...keys]).then((stores) => {
  const data = {};
  stores.forEach((result, i, store) => {
    data[store[i][0]] = JSON.parse(store[i][1]);
  });
  return data;
});

const multiRemove = async (...keys) => AsyncStorage.multiRemove([...keys]);

export default {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
};
