import {useId} from 'react';

type LandscapeProps = {
  frame: number;
  complete?: boolean;
  compact?: boolean;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/**
 * A deliberately flat, plan-view garden. The green mowing pass is revealed by
 * the mower's position, so the action stays frame-accurate when scenes scrub.
 */
export const Landscape = ({
  frame,
  complete = false,
  compact = false,
}: LandscapeProps) => {
  const id = useId().replace(/:/g, '');
  const progress = complete
    ? clamp(frame / 77)
    : ((Math.max(frame, 0) % 250) / 250);
  const mowerX = 130 + progress * 680;
  const mowerOpacity = complete ? 1 - clamp((frame - 79) / 10) : 1;
  const passWidth = complete && frame >= 79 ? 788 : mowerX - 52;
  const wheelRotation = (frame * 4) % 360;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 920 360"
      fill="none"
      role="img"
      aria-label="An electric lawn mower makes one precise pass across a landscaped lawn"
    >
      <defs>
        <clipPath id={`${id}-lawn`}>
          <rect x="52" y="43" width="816" height="248" rx="31" />
        </clipPath>
        <clipPath id={`${id}-pass`}>
          <rect x="64" y="184" width={Math.max(0, passWidth)} height="50" rx="4" />
        </clipPath>
      </defs>

      {/* An exact, single-weight curb sets the geometry of the whole garden. */}
      <rect x="40" y="31" width="840" height="272" rx="43" fill="#101c16" />
      <rect x="46" y="37" width="828" height="260" rx="37" stroke="#395146" strokeWidth="2" />
      <g clipPath={`url(#${id}-lawn)`}>
        <rect x="52" y="43" width="816" height="248" fill="#173d2b" />
        {[0, 1, 2, 3, 4].map((stripe) => (
          <rect
            key={stripe}
            x="52"
            y={43 + stripe * 50}
            width="816"
            height="25"
            fill="#1c4831"
          />
        ))}

        {/* A subtly rougher lane becomes a clean, exact green stripe. */}
        <rect x="64" y="184" width="788" height="50" fill="#224b32" />
        {!compact && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tuft) => (
          <path
            key={tuft}
            d={`M${100 + tuft * 68} 213 l-4 -7 m4 7 l3 -10 m-3 10 l7 -4`}
            stroke="#3b6141"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        ))}
        <g clipPath={`url(#${id}-pass)`}>
          <rect x="64" y="184" width="788" height="50" fill="#02c065" fillOpacity="0.36" />
          <path d="M64 185H852M64 233H852" stroke="#02c065" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M64 197H852M64 221H852" stroke="#52d88d" strokeOpacity="0.08" strokeWidth="1" />
        </g>

        {/* The plant bed belongs to the layout; it never floats or moves. */}
        <path d="M640 43H837Q868 43 868 74V127H711Q682 127 670 101Z" fill="#10291d" />
        <path d="M640 43L670 101Q682 127 711 127H868" stroke="#395146" strokeWidth="2" />
        {[717, 773, 829].map((x, index) => (
          <g key={x} transform={`translate(${x} ${index === 1 ? 77 : 82})`}>
            <circle r="22" fill="#214e34" />
            <path d="M0 13V-10M0 3C-14 3-16-7-16-7C-4-8 0-2 0 3ZM0-3C13-3 15-13 15-13C3-13 0-9 0-3Z" stroke="#648367" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        ))}

        {!compact && (
          <g stroke="#47714b" strokeWidth="1.6" strokeLinecap="round" opacity="0.75">
            <path d="M100 91l-3-6m3 6 4-9M115 101l3-7M612 265l-3-7m3 7 4-9M629 273l3-7" />
          </g>
        )}
      </g>

      {/* Simple paving at the base anchors the illustration as a designed site. */}
      <path d="M83 315H837" stroke="#293c32" strokeWidth="1.5" strokeLinecap="round" />
      {!compact && [0, 1, 2, 3, 4, 5, 6, 7, 8].map((paver) => (
        <path key={paver} d={`M${132 + paver * 82} 305V325`} stroke="#293c32" strokeWidth="1.5" strokeLinecap="round" />
      ))}

      {/* Orthographic mower: two rails, four wheels, deck and circular motor. */}
      <g transform={`translate(${mowerX} 209)`} opacity={mowerOpacity}>
        <path d="M-15-18H-48Q-56-18-56-10V10Q-56 18-48 18H-15" stroke="#aab4a9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-53-18V18" stroke="#0a100e" strokeWidth="7" strokeLinecap="round" />

        {[-1, 1].map((side) => (
          <g key={side}>
            <rect x="-21" y={side < 0 ? -39 : 25} width="16" height="14" rx="4" fill="#09120d" stroke="#6f8275" strokeWidth="1.5" />
            <rect x="21" y={side < 0 ? -37 : 25} width="13" height="12" rx="3.5" fill="#09120d" stroke="#6f8275" strokeWidth="1.5" />
            <path d={`M-16 ${side * 32}h6M25 ${side * 31}h5`} stroke="#9aa89e" strokeWidth="1.5" strokeLinecap="round" opacity={0.55 + Math.sin(wheelRotation * Math.PI / 180) * 0.15} />
          </g>
        ))}

        <path d="M-20-24H23Q37-24 39-12L42 12Q43 24 28 26H-20Q-28 26-28 17V-15Q-28-24-20-24Z" fill="#02c065" stroke="#0a100e" strokeWidth="3" />
        <path d="M-18-20H23Q30-20 32-15" stroke="#88e9ae" strokeWidth="2" strokeLinecap="round" />
        <path d="M36-11L38 11" stroke="#006e3c" strokeWidth="3" strokeLinecap="round" />
        <circle cx="4" cy="1" r="17" fill="#0e2016" stroke="#007b43" strokeWidth="2" />
        <circle cx="4" cy="1" r="11" fill="#1c3625" />
        <path d="M-2-3H10M-2 1H10M-2 5H10" stroke="#628b6b" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="-22" y="-9" width="7" height="20" rx="2" fill="#006b3a" />
      </g>
    </svg>
  );
};
