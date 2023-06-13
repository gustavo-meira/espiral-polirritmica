export const getHTMLElement = <HTMLElement extends Element>(query: string) => {
  const element = document.querySelector<HTMLElement>(query);

  if (!element) throw new Error('HTML element not found');

  return element;
};
