import Ember from 'ember';

export default Ember.Controller.extend({
  imgsrc:null,
  canvas:null,

  black(imgData){
    let canvas = Ember.$('canvas').get(0),
        img = new Image,
        ctx = canvas.getContext('2d');

    img.src = imgData
    canvas.width = canvas.height = img.width;
    ctx.drawImage(img,0,0);

    let imgd = ctx.getImageData(0, 0, canvas.width, canvas.height),
        pix = imgd.data;

    for (let i = 0, n = pix.length; i <n; i += 4) {
        let r = pix[i],
            g = pix[i+1],
            b = pix[i+2],
            L = r * 299/1000 + g * 587/1000 + b * 114/1000;

        // If its white then change it
        if(L < 120){
          pix[i] = pix[i+1] = pix[i+2] = 0; //black
        }else{
          pix[i] = pix[i+1] = pix[i+2] = 255; //white
        }
    }

    ctx.putImageData(imgd,0,0);
  },

  actions:{
    upload(evt){
      const reader = new FileReader();
      const file = event.target.files[0];
      let imgData = null;

      reader.onload = () => {
        imgData = reader.result;
        this.set('imgsrc', imgData);
        this.black(imgData);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }//end upload
  }//end actions
});
