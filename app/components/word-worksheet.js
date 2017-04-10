import Ember from 'ember';

export default Ember.Component.extend({
  printer : Ember.inject.service(),

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
  },

  actions :{
    print(){
      let content = Ember.$('.tab-content div.tab-pane.active').get(0);

      this.get('printer').printout(content);
    }
  }

});
