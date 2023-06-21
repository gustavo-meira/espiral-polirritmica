export const calculateNextImpactTime = (currentImpactTime: number, velocity: number) => {
  return currentImpactTime + (Math.PI / velocity) * 1000;
};
