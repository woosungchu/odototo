import Ember from 'ember';

export default Ember.Controller.extend({
  image:null,
  actions:{
    upload(evt){
      // alert('change');
      const reader = new FileReader();
      const file = event.target.files[0];
      let imageData;
      console.log(file)

      // Note: reading file is async
      reader.onload = () => {
        imageData = reader.result;
        this.set('image', imageData);

        // additional logics as you wish
      };

      if (file) {
        let result = reader.readAsDataURL(file);
        console.log('result')
        console.log(result)
      }
    }//end upload
  }
});
