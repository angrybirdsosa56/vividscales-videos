import {Easing, interpolate} from 'remotion';

export const launch = {width: 1080, height: 1920, fps: 30, durationInFrames: 150};
// Signal color sampled from the supplied logo's transparent cutout at (800,450).
export const colors = {
  background: '#0a100e', surface: '#131c18', stroke: '#2e3c33',
  white: '#f2efe7', muted: '#9aa89e', faint: '#526258', green: '#02c065',
};
export const timing = {
  message: 29, calendar: 43, task: 57, convergence: 63,
  logo: 82, wordmark: 90, tagline: 99, hold: 111,
};
export const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const out = (p: number) => 1 - Math.pow(1 - p, 4);
export const smooth = (p: number) => Easing.bezier(0.65, 0, 0.25, 1)(p);

// Arc-length sampled quadratic paths: the moving dot and stroke share one clock.
type Point = [number, number];
const makeRoute = (start: Point, elbow: Point, control: Point, corner: Point, end: Point) => {
  const points: Point[] = [start, elbow];
  for (let i = 1; i <= 40; i++) {
    const t = i / 40;
    points.push([(1-t)**2*elbow[0]+2*(1-t)*t*control[0]+t*t*corner[0],
      (1-t)**2*elbow[1]+2*(1-t)*t*control[1]+t*t*corner[1]]);
  }
  points.push(end);
  const lengths = [0];
  for (let i = 1; i < points.length; i++) lengths.push(lengths[i-1] + Math.hypot(points[i][0]-points[i-1][0], points[i][1]-points[i-1][1]));
  return {
    d: `M${start} L${elbow} Q${control} ${corner} L${end}`,
    point: (p: number): Point => {
      const length = p * lengths[lengths.length-1];
      let i = 1;
      while (i < lengths.length-1 && lengths[i] < length) i++;
      const t = (length-lengths[i-1])/(lengths[i]-lengths[i-1]);
      return [points[i-1][0]+(points[i][0]-points[i-1][0])*t, points[i-1][1]+(points[i][1]-points[i-1][1])*t];
    },
  };
};
export const routes = [
  makeRoute([320, 870], [320, 996], [320, 1030], [354, 1030], [560, 1030]),
  makeRoute([765, 1160], [765, 1271], [765, 1305], [731, 1305], [560, 1305]),
];
