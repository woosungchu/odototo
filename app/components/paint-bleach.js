import Ember from 'ember';

export default Ember.Component.extend({
  imgsrc: null,//'assets/totoro.jpg',
  canvas:null,
  criteria:120,

  didRender(){
    this._super(...arguments);
    alert('hello');
    Ember.$('input[type=file]:eq(0)').val('assets/totoro.jpg');
  //   // this.send('upload');
  },

  actions:{
    upload(evt){
      const reader = new FileReader();
      const file = evt.target.files[0];

      let canvas = Ember.$('canvas').get(0),
          img = new Image;

      reader.onload = () => {
        this.set('imgsrc', reader.result);
        img.src = reader.result;

        canvas.width = img.width;
        canvas.height = img.height;

        this.send('gray');
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },//end upload

    gray(){
      let canvas = Ember.$('canvas').get(0),
          ctx = canvas.getContext('2d'),
          criteria = Ember.$('input[type=range]:eq(0)').val() || 120,
          img = new Image,
          imgd,pix;

      this.set('criteria',criteria);
      img.src = this.get('imgsrc');
      ctx.drawImage(img,0,0);

      imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
      pix = imgd.data;

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
