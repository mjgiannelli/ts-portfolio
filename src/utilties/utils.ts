export const W = 'w';
export const A = 'a';
export const S = 's';
export const D = 'd';
export const SHIFT = 'shift';
export const DIRECTIONS = [W, A, S, D];

export class KeyDisplay {
  map: Map<string, HTMLDivElement> = new Map();

  constructor() {
    const w: HTMLDivElement = document.createElement('div');
    const a: HTMLDivElement = document.createElement('div');
    const s: HTMLDivElement = document.createElement('div');
    const d: HTMLDivElement = document.createElement('div');
    const shift: HTMLDivElement = document.createElement('div');

    this.map.set(W, w);
    this.map.set(A, a);
    this.map.set(S, s);
    this.map.set(D, d);
    this.map.set(SHIFT, shift);

    this.map.forEach((v, k) => {
      v.style.color = 'blue';
      v.style.fontSize = '50px';
      v.style.fontWeight = '800';
      v.style.position = 'absolute';
      v.textContent = k;
    });

    this.updatePosition();

    this.map.forEach((v, _) => {
      document.body.append(v);
    });
  }

  public updatePosition() {
    const w = this.map.get(W);
    const a = this.map.get(A);
    const s = this.map.get(S);
    const d = this.map.get(D);
    const shift = this.map.get(SHIFT);

    if (w) w.style.top = `${window.innerHeight - 150}px`;
    if (a) a.style.top = `${window.innerHeight - 100}px`;
    if (s) s.style.top = `${window.innerHeight - 100}px`;
    if (d) d.style.top = `${window.innerHeight - 100}px`;
    if (shift) shift.style.top = `${window.innerHeight - 100}px`;

    if (w) w.style.left = `${300}px`;
    if (a) a.style.left = `${200}px`;
    if (s) s.style.left = `${300}px`;
    if (d) d.style.left = `${400}px`;
    if (shift) shift.style.left = `${50}px`;
  }

  public down(key: string) {
    const element = this.map.get(key.toLowerCase());
    if (element) {
      element.style.color = 'red';
    }
  }

  public up(key: string) {
    const element = this.map.get(key.toLowerCase());
    if (element) {
      element.style.color = 'blue';
    }
  }
}

// Validate email function with TypeScript type annotation
export function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Format title function with TypeScript type annotation
export function formatTitle(title: string): string {
  const titleArray = title.split('-');
  const newTitleArray: string[] = [];

  for (let i = 0; i < titleArray.length; i++) {
    newTitleArray.push(capitalizeFirstLetter(titleArray[i]));
  }

  const formattedTitle = newTitleArray.join(' ');

  return formattedTitle;
}

// Capitalize first letter function with TypeScript type annotation
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
