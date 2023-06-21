const hexToRGB = (hex: string): number[] => {
  const normalizedHex = hex.replace(/^#/, '');
  const r = parseInt(normalizedHex.substring(0, 2), 16);
  const g = parseInt(normalizedHex.substring(2, 4), 16);
  const b = parseInt(normalizedHex.substring(4, 6), 16);
  return [r, g, b];
};

const rgbToHex = (rgb: number[]): string => {
  const [r, g, b] = rgb;
  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const lerpColor = (color1: string, color2: string, percentage: number): string => {
  const rgb1 = hexToRGB(color1);
  const rgb2 = hexToRGB(color2);

  const lerpedColor = rgb1.map((component1, index) => {
    const component2 = rgb2[index];
    const lerpedComponent = component1 + (component2 - component1) * percentage;
    return Math.round(lerpedComponent);
  });

  return rgbToHex(lerpedColor);
};
