import Ember from 'ember';

export default Ember.Controller.extend({
  imgsrc:null,
  canvas:null,
  // criteria:120,

  actions:{
    upload(evt){
      const reader = new FileReader();
      const file = event.target.files[0];

      let canvas = Ember.$('canvas').get(0),
          img = new Image,
          ctx = canvas.getContext('2d'),
          imgData = null;


      reader.onload = () => {
        imgData = reader.result;
        this.set('imgsrc', imgData);

        img.src = imgData
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img,0,0);

        this.send('gray');
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },//end upload

    gray(){
      let canvas = Ember.$('canvas').get(0),
          ctx = canvas.getContext('2d'),
          imgd = ctx.getImageData(0, 0, canvas.width, canvas.height),
          pix = imgd.data,
          criteria = Ember.$('input[type=range]:eq(0)').val();
          // criteria = this.get('criteria');

          console.log(criteria);

      for (let i = 0, n = pix.length; i <n; i += 4) {
          let r = pix[i],
              g = pix[i+1],
              b = pix[i+2],
              L = r * 299/1000 + g * 587/1000 + b * 114/1000;

          // If its white then change it
          if(L < criteria){
            pix[i] = pix[i+1] = pix[i+2] = 0; //black
          }else{
            pix[i] = pix[i+1] = pix[i+2] = 255; //white
          }
      }

      ctx.putImageData(imgd,0,0);
    }//end control
  }//end actions
});
