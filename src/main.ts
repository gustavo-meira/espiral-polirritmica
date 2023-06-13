import './style.css';
import { getCanvas } from './utils/getCanvas';

const [canvas, ctx] = getCanvas();

const canvasLinesHeight = canvas.height * 0.9;
const canvasCenter = { x: canvas.width * 0.5, y: canvas.height * 0.5 };

const ONE_MINUTE_IN_SECONDS = 60;

const settings = {
  backgroundColor: '#16161A',
  line: {
    color: '#FFFFFE',
    start: {
      x: canvas.width * 0.1,
      y:canvasLinesHeight,
    },
    end: {
      x: canvas.width * 0.9,
      y: canvasLinesHeight,
    },
  },
};

const arcColors = [
  '#EAAFC8',
  '#E3AAC6',
  '#DCA5C4',
  '#D6A0C2',
  '#CF9BC0',
  '#C896BE',
  '#C291BC',
  '#BB8DBB',
  '#B488B9',
  '#AE83B7',
  '#A77EB5',
  '#A079B3',
  '#9A74B1',
  '#936FAF',
  '#8C6BAE',
  '#8666AC',
  '#7F61AA',
  '#785CA8',
  '#7257A6',
  '#6B52A4',
  '#654EA3',
];

const startTime = new Date().getTime();

const draw = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;

  ctx.fillStyle = settings.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = settings.line.color;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(settings.line.start.x, settings.line.start.y);
  ctx.lineTo(settings.line.end.x, settings.line.end.y);
  ctx.stroke();
  
  const lineLength = settings.line.end.x - settings.line.start.x;
  const firstArcRadius = lineLength * 0.05;

  const spacing = (lineLength / 2 - firstArcRadius) / arcColors.length;

  arcColors.forEach((arcColor, i) => {
    ctx.lineWidth = 4;
    const arcRadius = firstArcRadius + (spacing * i);
    ctx.strokeStyle = arcColor;
    ctx.beginPath();
    ctx.arc(canvasCenter.x, canvasLinesHeight, arcRadius, Math.PI, 2 * Math.PI);
    ctx.stroke();

    // draw each circle
    ctx.fillStyle = settings.line.color;
    ctx.beginPath();
    const maxAngle = 2 * Math.PI;
    const oneFullLoop = 2 * Math.PI;
    const numberOfLoops = 90 - i;
    const allLoopsTime = ONE_MINUTE_IN_SECONDS * 15;
    const velocity = oneFullLoop * numberOfLoops / allLoopsTime;
    const distance = Math.PI + (elapsedTime * velocity);
    const modDistance = distance % maxAngle;
    const adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance;
  
    const x = canvasCenter.x + arcRadius * Math.cos(adjustedDistance);
    const y = canvasLinesHeight + arcRadius * Math.sin(adjustedDistance);
    ctx.arc(x, y, lineLength * 0.0065, 0, 2 * Math.PI);
    ctx.fill();
  });


  requestAnimationFrame(draw);
};

draw();
