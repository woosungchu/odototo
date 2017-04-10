import Ember from 'ember';

export default Ember.Component.extend({
  elementId:'word-scramble',
  classNames:['container-fluid'],
  quizzes : null,

  didReceiveAttrs(){
    this._super(...arguments);
    this.scramble();
  },

  scramble(){
    let outputs = this.get('outputs'),
        array,currentIndex,temporaryValue,randomIndex;

    if(outputs && outputs.length > 1){
      array = outputs.slice(),
      currentIndex= array.length;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      this.set('quizzes',array);
    }
  }//end scramble

});
