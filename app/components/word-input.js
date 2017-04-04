import Ember from 'ember';

export default Ember.Component.extend({
  inputs: [],//[{word:'',answer:''},{word:'',answer:''}]

  init(){
    this._super(...arguments);
    this.addInput();
  },

  didRender(){
    this._super(...arguments);
    let lis = document.getElementById('word-input')
                    .getElementsByTagName("li"),
        input = lis[lis.length-1].getElementsByTagName("input")[0];

    input.focus();
  },

  yield(){
    let inputs = this.get('inputs'),
        quizzes = inputs.slice(),//shallow copy
        quiz = null;

    //validate check
    for(let i = 0 ; i < quizzes.length; i++){
        quiz = quizzes[i];
        if(!quiz.word && !quiz.answer){
          quizzes.splice(i,1);
        }
    }

    this.set('quizzes',quizzes);
  },//end yield

  addInput(data){
    let inputs = this.get('inputs'),
        record = data || {word:'',answer:''};

    inputs.pushObject(record);
  },

  keyPress(evt) {
    if (evt.which === 13) {
      let target = evt.target,
          input = target.parentNode.getElementsByTagName('input'),
          data = null;

      data= {
        word:input[0].value,
        answer:input[1].value
      };

      this.addInput(data);
      this.yield();
    }
  },

  actions : {
    addrow(idx){
      let inputs = this.get('inputs'),
          input = document.getElementById('word-input')
                        .getElementsByTagName("li")[idx]
                        .getElementsByTagName("input"),
          data = null;

      data= {
        word:input[0].value,
        answer:input[1].value
      };

      this.addInput(data);
      this.yield();
    },//addrow

    removerow(idx){
      let inputs = this.get('inputs');

      inputs.removeObject(inputs[idx]);
      this.yield();
    }//removerow

  }
});
