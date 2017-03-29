import Ember from 'ember';

export default Ember.Component.extend({

  click(evt){
    let target = evt.target,
        spaces = null;

    if(target.tagName === 'SPAN'){
      spaces = (new Array(target.outerText.length + 1)).join('  ');
      // target.outerText = '['+ ' '.repeat(2*target.outerText.length) +']'; // not supported IE
      target.outerText = '['+ spaces + ']';
    }
  },

  actions: {
    convert(){
      let $textarea = Ember.$('textarea'),
          $editor = Ember.$('#blank-editor');

      $textarea.prop('disabled',true);
      $editor.html(
        $textarea.val()
          .replace(/([!('"]|\S)+[^\s\., !?'")]/g, function(word){
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
