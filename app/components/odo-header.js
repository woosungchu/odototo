import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames : ['navbar navbar-default'],
  attributeBindings: ['style'],
  style : "background-color:#36a3fa;color:white;"
});
