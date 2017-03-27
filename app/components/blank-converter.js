import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    convert(){
      let $textarea = Ember.$('textarea'),
          $editor = Ember.$('#blank-editor');

      $textarea.prop('disabled',true);
      $editor.text($textarea.val());

    },//end convert

    cancel(){
      let $textarea = Ember.$('textarea'),
          $editor = Ember.$('#blank-editor');

      $textarea.prop('disabled',false);
      $editor.html('');
    }//end cancel
  }
});
