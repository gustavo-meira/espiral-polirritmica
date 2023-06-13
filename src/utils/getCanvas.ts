const configureCanvas = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
};

export const getCanvas = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas');

  if (!canvas) throw new Error('Canvas not found');

  configureCanvas(canvas);

  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Context not found');

  return [canvas, ctx];
};
