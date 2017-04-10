import Ember from 'ember';

export default Ember.Component.extend({
  inputs: [],//[{word:'',answer:''},{word:'',answer:''}]

  init(){
    this._super(...arguments);
  },

  willRender(){
    this._super(...arguments);
    let inputs = this.get('inputs'),
        last = inputs[inputs.length-1];

    //init or last element is empty
    if(!last || last.word || last.answer){
      this.addInput();
    }
  },

  didRender(){
    this._super(...arguments);
    let lis = document.getElementById('word-input')
                    .getElementsByTagName("li"),
        input = input = lis[lis.length-1].getElementsByTagName("input")[0];

    input.focus();
  },

  yield(){
    let inputs = this.get('inputs'),
        outputs = inputs.slice(),//shallow copy
        output = null;

    //validate check
    for(let i = 0 ; i < outputs.length; i++){
        output = outputs[i];
        if(!output.word && !output.answer){
          outputs.splice(i,1);
        }
    }

    this.set('outputs',outputs);
  },//end yield

  sync(){
    let lis = document.getElementById('word-input')
                    .getElementsByTagName("li"),
        inputs = this.get('inputs'),
        arr = [],
        input,data;

    for(let i = 0; i < lis.length; i++){
      input = lis[i].getElementsByTagName("input");
      data ={word:'',answer:''};

      data.word = input[0].value;
      data.answer = input[1].value;

      arr.push(data);
    }

    inputs.setObjects(arr);
    this.yield();
  },

  addInput(data){
    let inputs = this.get('inputs'),
        record = data || {word:'',answer:''};

    inputs.pushObject(record);
  },

  keyPress(evt) {
    if (evt.which === 13) {
      this.sync();
    }
  },

  actions : {
    addrow(){
      this.sync();
    },//addrow

    removerow(idx){
      let inputs = this.get('inputs');

      inputs.removeObject(inputs[idx]);
      this.yield();
    }//removerow

  }
});
