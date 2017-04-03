import Ember from 'ember';

export default Ember.Component.extend({
  inputs: [],//[{word:'',answer:''},{word:'',answer:''}]

  addInput(data){
    let inputs = this.get('inputs'),
        record = data || {word:'',answer:''};

    inputs.pushObject(record);
  },

  init(){
    this._super(...arguments);
    let inputs = this.get('inputs'),
        index = inputs.length;

    // for(let i = index; i < 3; i++)
        this.addInput();
  },

  actions : {
    addrow(idx){
      let inputs = this.get('inputs'),
          div = document.getElementById('word-input'),
          li = div.getElementsByTagName("li")[idx],
          input = li.getElementsByTagName("input"),
          data = null;

      data= {
        word:input[0].value,
        answer:input[1].value
      };

      this.addInput(data);
    },//addrow

    removerow(idx){
      let inputs = this.get('inputs');

      inputs.removeObject(inputs[idx]);
    }//removerow
  }
});
