import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Component.extend({
  printer : Ember.inject.service(),

  lenBytes(s,b,i,c){
    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b
  },

  click(evt){
    let target = evt.target,
        spaces = null;

    if(target.tagName === 'SPAN'){
      spaces = (new Array(this.lenBytes(target.outerText) + 1)).join('&nbsp;&nbsp;');
      // target.outerText = '['+ ' '.repeat(2*target.outerText.length) +']'; // not supported IE
      target.outerHTML = '['+ spaces + ']';
    }
  },

  actions: {
    convert(){
      let $textarea = Ember.$('textarea'),
          $editor = Ember.$('#blank-editor');

      $textarea.prop('disabled',true);
      $editor.html(
        $textarea.val()
          .replace(/([^\u0000-\u007F]|\w|\.|-)+[^\s\.,!?'")]/g, function(word){
            return '<span>'+word+'</span>'
          })
          .replace(/\r?\n/, "<br/>")
      );
    },//end convert

    print(){
      let editor = Ember.$('#blank-editor').get(0);

      this.get('printer').printout(editor);
    },//end print

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
    },//end copy

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
