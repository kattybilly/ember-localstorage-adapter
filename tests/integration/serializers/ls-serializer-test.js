import setupStore from 'dummy/tests/helpers/store';
import Ember from 'ember';
import FIXTURES from 'dummy/tests/helpers/fixtures';

import {module, test} from 'qunit';

import DS from 'ember-data';

const run = Ember.run;

let env, store, registry, List, Item, Order, Hours, Person;

module('integration/serializers/ls-serializer - LSSerializer', {
  beforeEach() {
    localStorage.setItem('LSAdapter', JSON.stringify(FIXTURES));

    List = DS.Model.extend({
      name: DS.attr('string'),
      done: DS.attr('boolean'),
      items: DS.hasMany('item', {async: true})
    });

    Item = DS.Model.extend({
      name: DS.attr('string'),
      list: DS.belongsTo('list', {async: true})
    });

    Order = DS.Model.extend({
      name: DS.attr('string'),
      b: DS.attr('boolean'),
      hours: DS.hasMany('hour', {async: true})
    });

    Hour = DS.Model.extend({
      name: DS.attr('string'),
      amount: DS.attr('number'),
      order: DS.belongsTo('order', {async: true})
    });

    Person = DS.Model.extend({
      name: DS.attr('string'),
      birthdate: DS.attr('date')
    });

    env = setupStore({
      list: List,
      item: Item,
      order: Order,
      hour: Hour,
      person: Person,
      adapter: LSAdapter
    });
    store = env.store;
    registry = env.registry;
  },

  afterEach() {
    run(store, 'destroy');
  }
});
