import _ from 'lodash';

const pass = (datas, authorities) => !_(datas).intersection(authorities).isEmpty();

const Menus = (menus, authorities) => _(menus)
  .filter(menu => (menu.authorities ? pass(menu.authorities, authorities) : true)).value();

export default {
  pass,
  Menus,
};
