const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;

    for (let i = 0; i < 20; i++) {
      context.save();
      context.translate(cx, cy);
      context.lineWidth = i * 0.3;
      let gradient = context.createLinearGradient(0, 0, 170, 0);
      gradient.addColorStop("0", "magenta");
      gradient.addColorStop("0.5" ,"blue");
      gradient.addColorStop("1.0", "red");
      context.strokeStyle = gradient;

      context.beginPath();
      context.arc(0, 0, random.range(1, 50) * i, 0, 2 * Math.PI);
      context.stroke()
      //
      context.restore();


    }


  };
};

canvasSketch(sketch, settings);
