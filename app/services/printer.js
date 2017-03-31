import Ember from 'ember';

export default Ember.Service.extend({

  printout(content){
    content.className += ' printing';
    window.print();
    content.className = content.className.replace('printing','');
  }
});
