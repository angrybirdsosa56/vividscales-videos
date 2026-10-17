import {useId} from 'react';

const INK = '#0a100e';
const CREAM = '#f2efe7';
const GREEN = '#02c065';

/**
 * An intentionally large, flat side elevation. The cut edge follows the front
 * wheel, so the landscaping action stays coherent when rendered or scrubbed.
 */
export const SideViewLawn = ({frame}: {frame: number}) => {
  const id = useId().replace(/:/g, '');
  const t = Math.max(0, Math.min(1, frame / 45));
  const travel = -36 + 72 * (1 - Math.pow(1 - t, 2));
  const cutEdge = 770 + travel;
  const wheelAngle = travel * 1.36;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 960 560"
      fill="none"
      role="img"
      aria-label="A large side-view lawn mower cuts the grass outside a home"
    >
      <defs>
        <clipPath id={`${id}-uncut`}>
          <rect x={cutEdge} y="350" width={Math.max(0, 960 - cutEdge)} height="210" />
        </clipPath>
        <clipPath id={`${id}-cut`}>
          <rect x="0" y="430" width={cutEdge} height="130" />
        </clipPath>
      </defs>

      {/* A single residential roofline is enough to place the work on a job. */}
      <g stroke={CREAM} strokeWidth="6" strokeLinejoin="round" opacity="0.26">
        <path d="M555 238L706 118L857 238" />
        <path d="M583 216V395H832V216" />
        <path d="M766 165V131H798V191" />
        <rect x="664" y="238" width="69" height="77" rx="2" />
        <path d="M698.5 240V313M666 277H731" />
      </g>

      {/* One restrained hedge, with a crisp silhouette and no texture noise. */}
      <path
        d="M64 423V367C64 342 83 325 108 325C120 293 158 284 183 307C209 287 245 302 249 333C276 335 291 351 291 376V423Z"
        fill="#163727"
      />
      <path d="M64 423H291" stroke="#3b604a" strokeWidth="5" />

      {/* Large blocks of color separate the finished pass from the long grass. */}
      <path d="M0 466H960V560H0Z" fill="#17452f" />
      <g clipPath={`url(#${id}-cut)`}>
        <path d="M0 466H960V560H0Z" fill={GREEN} />
        <path d="M0 509H960" stroke={INK} strokeWidth="3" opacity="0.13" />
        <path d="M0 549H960" stroke={INK} strokeWidth="3" opacity="0.13" />
        {[48, 152, 256, 360, 464, 568, 672, 776, 880].map((x) => (
          <path key={x} d={`M${x} 466V455M${x + 18} 466V459`} stroke={GREEN} strokeWidth="5" />
        ))}
      </g>
      <g clipPath={`url(#${id}-uncut)`}>
        {Array.from({length: 25}, (_, i) => {
          const x = i * 43 - 20;
          return (
            <path
              key={i}
              d={`M${x} 470L${x + 7} 438L${x + 16} 451L${x + 27} 421L${x + 30} 453L${x + 41} 437L${x + 47} 470Z`}
              fill={GREEN}
            />
          );
        })}
      </g>

      {/* The whole mower moves as one rigid 2D silhouette. */}
      <g transform={`translate(${travel} 0)`}>
        {/* Grass collector and diagonal handle read as a walk-behind mower. */}
        <path d="M448 349H337L316 423L438 431L475 390Z" fill={CREAM} />
        <path d="M337 349L316 423L438 431" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M348 370H399M341 387H394M336 404H385" stroke={INK} strokeWidth="5" opacity="0.21" />
        <path d="M478 393L312 187H259" stroke={CREAM} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M466 390L299 204" stroke="#7f9385" strokeWidth="5" strokeLinecap="round" />
        <path d="M253 187H319" stroke={INK} strokeWidth="26" strokeLinecap="round" />
        <path d="M253 187H305" stroke={CREAM} strokeWidth="14" strokeLinecap="round" />
        <path d="M306 208L318 220" stroke={GREEN} strokeWidth="9" strokeLinecap="round" />

        {/* Broad flat deck, distinct motor, and two readable wheels. */}
        <path
          d="M455 389H716C738 389 754 401 761 419L774 451H423L431 417C434 400 442 389 455 389Z"
          fill={GREEN}
          stroke={INK}
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <path d="M454 398H718" stroke={CREAM} strokeWidth="6" strokeLinecap="round" />
        <path d="M531 323H618C631 323 641 333 641 345V389H508V346C508 333 518 323 531 323Z" fill={CREAM} />
        <rect x="547" y="303" width="55" height="23" rx="7" fill={GREEN} />
        <path d="M529 347H619M529 361H619M529 375H619" stroke={INK} strokeWidth="6" />
        <path d="M645 358H672V389H645" fill={INK} stroke={GREEN} strokeWidth="6" strokeLinejoin="round" />

        {[{x: 461, r: 45}, {x: 719, r: 37}].map(({x, r}) => (
          <g key={x} transform={`translate(${x} ${466 - r})`}>
            <circle r={r} fill={INK} />
            <circle r={r - 8} stroke={CREAM} strokeWidth="5" />
            <g transform={`rotate(${wheelAngle})`} stroke={CREAM} strokeWidth="4" strokeLinecap="round">
              <path d={`M0 ${-r + 17}V-13M0 13V${r - 17}M${-r + 17} 0H-13M13 0H${r - 17}`} />
            </g>
            <circle r="8" fill={GREEN} />
          </g>
        ))}
      </g>
    </svg>
  );
};
