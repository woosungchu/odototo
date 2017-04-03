import Ember from 'ember';

export default Ember.Component.extend({
  classNames : ['col-md-12'],

  click(evt){
    let target = evt.target,
        sibling = target.parentElement.childNodes;

    if(target.tagName === 'A'){
      evt.preventDefault();

    }
  }
});
