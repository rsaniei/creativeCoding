const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

		const num = 6;
    const a = 2 * Math.PI / 6;
    const r = 50;
    context.translate(-50, 0)
    context.beginPath();
    drawGrid(context, width + 100, height + 100, num, a, r);
    context.closePath();
    context.stroke();
}

};

canvasSketch(sketch, settings);
function drawGrid(context, width, height, num, a, r) {
  for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
    for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
      drawHexagon(context, x, y, r, a);
    }
  }
}

function drawHexagon(context, x, y, r, a) {
  context.beginPath();
  for (let i = 0; i < 6; i++) {
    context.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
  }
  context.closePath();
  context.stroke();
}
