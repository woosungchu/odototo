import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    convert(){
      let $textarea = Ember.$('textarea'),
          $editor = Ember.$('#blank-editor');

      $textarea.prop('disabled',true);
      $editor.html(
        $textarea.val()
          .replace(/([^\u0000-\u007F]|\w)+/g, function(word){
            return '<span>'+word+'</span>'
          })
          .replace(/\r?\n/, "<br/>")
      );

    },//end convert

    cancel(){
      let $textarea = Ember.$('textarea'),
          $editor = Ember.$('#blank-editor');

      $textarea.prop('disabled',false);
      $editor.html('');
    }//end cancel
  }
});

/**
references
http://stackoverflow.com/questions/150033/regular-expression-to-match-non-english-characters/873600#873600
*/
