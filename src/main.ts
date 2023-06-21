import './style.css';
import { calculateAdjustedDistance } from './utils/calculateAdjustedDistance';
import { calculateLineColor } from './utils/calculateLineColor';
import { calculateNextImpactTime } from './utils/calculateNextImpactTime';
import { getCanvas } from './utils/getCanvas';

const [canvas, ctx] = getCanvas();

const canvasLinesHeight = canvas.height * 0.9;
const canvasCenter = { x: canvas.width * 0.5, y: canvas.height * 0.5 };

const ONE_MINUTE_IN_SECONDS = 60;

export const settings = {
  backgroundColor: '#16161A',
  maxAngle: 2 * Math.PI,
  totalLoops: 90,
  durationLoops: ONE_MINUTE_IN_SECONDS * 15,
  oneLoop: 2 * Math.PI,
  startTime: new Date().getTime(),
  line: {
    color: '#FFFFFE',
    width: 6,
    timeHasColor: 3000,
    start: {
      x: canvas.width * 0.1,
      y:canvasLinesHeight,
    },
    end: {
      x: canvas.width * 0.9,
      y: canvasLinesHeight,
    },
  },
  arcColor: {
    colorLess: '#5C5C5C',
  },
};

const arcColors = [
  '#FF0000', // Vermelho
  '#FF7F00', // Laranja
  '#FFFF00', // Amarelo
  '#00FF00', // Verde
  '#0000FF', // Azul
  '#4B0082', // Anil
  '#8B00FF', // Violeta
  '#9400D3', // Roxo
  '#800080', // Magenta
  '#FF1493', // Rosa
  '#FF69B4', // Rosa claro
  '#FFC0CB', // Rosa bebê
  '#FFD700', // Ouro
  '#FFA500', // Laranja escuro
  '#FF8C00', // Laranja escuro 2
  '#FF4500', // Laranja intenso
  '#32CD32', // Verde limão
  '#00FF7F', // Verde intenso
  '#00CED1', // Azul turquesa
  '#87CEEB', // Azul claro
  '#ADD8E6',  // Azul bebê
].map((color, i) => {
  const numberOfLoops = settings.oneLoop * (settings.totalLoops - i);
  const velocity = numberOfLoops / settings.durationLoops;

  const nextImpactTime = calculateNextImpactTime(settings.startTime, velocity);

  return {
    color,
    velocity,
    nextImpactTime,
    lastImpactTime: 0,
  };
});

const draw = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - settings.startTime) / 1000;

  ctx.fillStyle = settings.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const lineLength = settings.line.end.x - settings.line.start.x;
  const firstArcRadius = lineLength * 0.05;

  const spacing = (lineLength / 2 - firstArcRadius) / arcColors.length;
  
  arcColors.forEach((arcColor, i) => {
    const {
      color,
      nextImpactTime,
      lastImpactTime,
      velocity,
    } = arcColor;
    const adjustedDistance = calculateAdjustedDistance(settings.totalLoops - i, elapsedTime);

    ctx.lineWidth = settings.line.width;
    const arcRadius = firstArcRadius + (spacing * i);
    ctx.strokeStyle = color;
    ctx.strokeStyle = settings.arcColor.colorLess;
    calculateLineColor(ctx, lastImpactTime, color);
    ctx.beginPath();
    ctx.arc(canvasCenter.x, canvasLinesHeight, arcRadius, Math.PI, 2 * Math.PI);
    ctx.stroke();

    // draw each circle
    ctx.fillStyle = settings.line.color;
    ctx.beginPath();

    if (currentTime >= nextImpactTime) {
      arcColors[i].lastImpactTime = nextImpactTime;
      arcColors[i].nextImpactTime = calculateNextImpactTime(nextImpactTime, velocity);
    }
  
    const x = canvasCenter.x + arcRadius * Math.cos(adjustedDistance);
    const y = canvasLinesHeight + arcRadius * Math.sin(adjustedDistance);
    ctx.arc(x, y, lineLength * 0.0065, 0, 2 * Math.PI);
    ctx.fill();
  });

  ctx.strokeStyle = settings.line.color;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(settings.line.start.x, settings.line.start.y);
  ctx.lineTo(settings.line.end.x, settings.line.end.y);
  ctx.stroke();

  requestAnimationFrame(draw);
};

draw();
