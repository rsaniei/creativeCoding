const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const degToRad = (degrees)=>{
  return (degrees/180 * Math.PI)

}
const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true
};

const sketch = ({ context, width, height }) => {

  context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5; //center of the circle
    const cy = height * 0.5; // center of the circle

    // const cx = 0; //center of the circle
    // const cy = 0;
    const w = width * 0.008;
    const h = height* random.range(0.1, 0.5);

    const num = 60;
    const radius = width * 0.25;
    let x, y;
  const circles = [];
  const rects = [];
    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360/num);
      const angle = slice * i;
      const offset = random.range(0.7, 1.4)
      x =  radius * Math.sin(angle) * offset;
      y = radius * Math.cos(angle) * offset;

      circles.push(new Circle(cx, cy, radius, angle, slice));
      rects.push(new Rect(cx, cy, x, y, angle, w, h, radius));
    }

  return ({ context, width, height }) => {

    context.clearRect(0,0, width, height)
    rects.forEach(rect=>{
      rect.update();
      rect.draw(context);
    })
    circles.forEach(circle => {

       circle.update();
       circle.draw(context);
    })



  }
};

canvasSketch(sketch, settings);


class Rect{
  constructor(cx, cy, x, y, angle, w, h, radius){
    this.cx = cx;
    this.cy = cy;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.w = w;
    this.h = h;
    this.scale = {
      x:random.range(0.1,2),
      y:random.range(0.2, 0.5)
    }
    this.vel = {
      x: 10,
      y: 10
    }
    this.radius = radius;
  }
  update(){

    if(this.y < this.cy -70)
    {
    // this.x -= 1;
    this.y += 20;}

  }
  draw(context ){
    context.save(); //save the current state of the context
      context.translate(this.cx +this.x , this.cy + this.y)
      // context.translate(x, y); // change the origin (0,0) of the rectangle
      context.rotate(-this.angle) // rotate the rect by -angle degree
      context.scale(this.scale.x, this.scale.y) //x,y

      context.strokeStyle = 'purple';
      context.lineWidth = this.lineWidth;
      context.shadowBlur = 20;
      context.shadowColor = 'purple';
      context.fillStyle = 'pink';

      context.beginPath();
      // random.range(0,-this.h * 0.5)
      context.rect(-this.w * 0.5,-this.h * 0.5 , this.w, this.h);
      context.fill();
      context.restore()
  }
}
class Circle{
  constructor(cx, cy, radius, angle, slice){
    this.cx = cx;
    this.cy = cy;
    this.radius = radius * random.range(0.3, 1.7);
    this.angle = angle;
    this.slice = slice;

    this.vel = this.slice * random.range(-0.01, 0.08);
    this.startingAngle = this.slice * random.range(1, -8);
    this.endingAngle = this.slice * random.range(1, 5);
    this.lineWidth = random.range(3,10);

  }

  draw(context){

    context.save();

      context.translate(this.cx, this.cy);
      context.rotate(this.angle);

      context.strokeStyle = 'purple';
      context.lineWidth = this.lineWidth;
      context.shadowBlur = 20;
      context.shadowColor = 'purple';

      context.beginPath();
      context.arc(0, 0, this.radius , this.startingAngle, this.endingAngle);
      context.stroke();
      context.restore()
  }

  update(){
    this.startingAngle -= this.vel;
    this.endingAngle -= this.vel;

  }


}
