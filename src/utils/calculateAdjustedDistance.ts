import { settings } from '../main';

export const calculateAdjustedDistance = (numberOfLoops: number, elapsedTime: number) => {
  const velocity = settings.oneLoop * numberOfLoops / settings.durationLoops;
  const distance = Math.PI + (elapsedTime * velocity);
  const modDistance = distance % settings.maxAngle;
  const adjustedDistance = modDistance >= Math.PI ? modDistance : settings.maxAngle - modDistance;

  return adjustedDistance;
};
