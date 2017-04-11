import Ember from 'ember';

export default Ember.Component.extend({
  elementId:'word-matchup',
  classNames:['container-fluid'],
  quizzes : null,

  didReceiveAttrs(){
    this._super(...arguments);
    this.shuffle();
  },

  shuffle(){
    let outputs = this.get('outputs'),
        array,cIndex,rIndex,rancur,curran;

    if(outputs && outputs.length > 0){
      array = outputs.slice(),
      cIndex= array.length;

      while (0 !== cIndex) {
        rIndex = Math.floor(Math.random() * cIndex);
        cIndex -= 1;

        rancur = {word:array[rIndex].word,answer:array[cIndex].answer};
        curran = {word:array[cIndex].word,answer:array[rIndex].answer};

        array[cIndex] = rancur;
        array[rIndex] = curran;
      }

      this.set('quizzes',array);
    }
  }//end scramble
});
