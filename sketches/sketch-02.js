const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const degToRad = (degrees)=>{
  return (degrees/180 * Math.PI)

}
const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5; //center of the circle
    const cy = height * 0.5; // center of the circle

    // const cx = 0; //center of the circle
    // const cy = 0;
    const w = width * 0.01;
    const h = height* 0.1;

    const num = 40;
    const radius = width * 0.35;
    let x, y;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360/num);
      const angle = slice * i;

      x =  radius * Math.sin(angle);
      y = radius * Math.cos(angle);
      context.save(); //save the current state of the context
      context.translate(cx + x, cy + y)
      // context.translate(x, y); // change the origin (0,0) of the rectangle
      context.rotate(-angle) // rotate the rect by -angle degree
      context.scale(random.range(0.1,2), random.range(0.2, 0.5)) //x,y

      context.fillStyle = 'black';
      context.beginPath();
      context.rect(-w * 0.5, random.range(0,-h * 0.5), w, h);
      context.fill();
      context.restore()

      context.save();
      context.translate(cx, cy);
      context.rotate(angle);
      context.lineWidth = random.range(5,20);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();
      context.restore()

    }

  }
};

canvasSketch(sketch, settings);