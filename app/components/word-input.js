import Ember from 'ember';

export default Ember.Component.extend({
  inputs: [],//[{word:'',answer:''},{word:'',answer:''}]

  yield(){
    let inputs = this.get('inputs'),
        outputs = inputs.slice();

    this.set('outputs',outputs);
  },//end yield

  keyPress(evt) {
    if (evt.which === 13) {
      this.send('addrow');
    }
  },

  actions : {
    addrow(){
      let inputs = this.get('inputs'),
          quiz = document.getElementById('word-input')
                        .getElementsByTagName("input"),
          data = null;

      data = {
        word:quiz[0].value,
        answer:quiz[1].value
      };

      //refresh
      quiz[0].value = "";
      quiz[1].value = "";

      inputs.pushObject(data);
      this.yield();
      quiz[0].focus();
      
    },//addrow

    removerow(idx){
      let inputs = this.get('inputs');

      inputs.removeObject(inputs[idx]);
      this.yield();
    }//removerow

  }
});
