import Ember from 'ember';

export default Ember.Component.extend({
  elementId : 'word-worksheet',
  classNames : ['col-md-12'],

  init(){
    this._super(...arguments);
  },

  click(evt){
    let target = evt.target,
        sibling = target.parentElement.childNodes;

    if(target.tagName === 'A'){
      evt.preventDefault();
    }
  }
});
