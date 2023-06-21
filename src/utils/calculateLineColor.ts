import { settings } from '../main';
import { lerpColor } from './lerpColor';

export const calculateLineColor = (ctx: CanvasRenderingContext2D, impactTime: number, lineColor: string) => {
  if(impactTime === 0) return;
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - impactTime;
  const percentagePassed = elapsedTime / settings.line.timeHasColor;
  
  if (percentagePassed <= 1) ctx.strokeStyle = lerpColor(lineColor, settings.arcColor.colorLess, percentagePassed);
  else ctx.strokeStyle = settings.arcColor.colorLess;
};