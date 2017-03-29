import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

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

    copy(){
      let editor = Ember.$('#blank-editor').get(0),
          $msg = Ember.$('#blank-msg');

      window.getSelection().removeAllRanges();

      if (document.selection) {
          var range = document.body.createTextRange();
          range.moveToElementText(editor);
          range.select();
      } else if (window.getSelection) {
          var range = document.createRange();
          range.selectNode(editor);
          window.getSelection().addRange(range);
      }

      if ( document.execCommand( 'copy' ) ) {
        $msg.show();
        setTimeout(function(){$msg.fadeOut();}, 1000);

      } else {
          alert(t('blank.converter.failed'));
      }
    },

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
