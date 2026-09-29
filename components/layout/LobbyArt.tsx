/**
 * Flat hotel-lobby illustration in the brand palette. Used as the footer banner image
 * until a real photo is placed at /public/images/footer/hotel.jpg (see Footer.tsx).
 * Decorative only.
 */

const C = {
  wall: "#efede6",
  wallLight: "#f7f6f2",
  trim: "#d3cdbb",
  floor: "#e6dfd0",
  glass: "#dcebea",
  teal: "#00787d",
  tealDark: "#005458",
  tealMid: "#66aeb1",
  tealPale: "#b2d6d8",
  brass: "#d6b47a",
  brassDark: "#7a5c24",
  brassSoft: "#f1e6d1",
  ink: "#171717",
  slate: "#1d2a37",
  silhouette: "#2a3a46",
  leaf: "#2f7d5b",
  leafDark: "#235e44",
} as const;

/** Path for a rectangle with a semicircular top (windows, doorway). */
function arch(x: number, y: number, w: number, h: number) {
  const r = w / 2;
  return `M${x} ${y + h} V${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h} Z`;
}

function Pendant({ x, cord }: { x: number; cord: number }) {
  return (
    <g>
      <circle cx={x} cy={cord + 34} r={34} fill={C.brass} opacity={0.1} />
      <line x1={x} y1={0} x2={x} y2={cord} stroke={C.slate} strokeWidth={2} />
      <path d={`M${x - 28} ${cord + 24} A28 24 0 0 1 ${x + 28} ${cord + 24} Z`} fill={C.brass} />
      <ellipse cx={x} cy={cord + 26} rx={9} ry={5} fill="#fff3d0" />
    </g>
  );
}

export function LobbyArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={1200} height={392} fill={C.wall} />
      <rect y={384} width={1200} height={8} fill="#d9d3c3" />
      <rect y={392} width={1200} height={168} fill={C.floor} />
      <g stroke="#000" strokeOpacity={0.05} strokeWidth={1.5}>
        {[-300, -100, 100, 300, 500, 700, 900, 1100, 1300, 1500].map((x) => (
          <line key={x} x1={600} y1={392} x2={x} y2={560} />
        ))}
        <line x1={0} y1={430} x2={1200} y2={430} />
        <line x1={0} y1={478} x2={1200} y2={478} />
        <line x1={0} y1={532} x2={1200} y2={532} />
      </g>
      <polygon points="70,392 220,392 330,560 150,560" fill="#fff" opacity={0.35} />
      <polygon points="270,392 420,392 530,560 350,560" fill="#fff" opacity={0.28} />

      {[70, 270].map((x) => (
        <g key={x}>
          <path d={arch(x, 80, 150, 312)} fill={C.glass} stroke={C.trim} strokeWidth={7} />
          <g stroke={C.trim} strokeWidth={4}>
            <line x1={x + 75} y1={80} x2={x + 75} y2={392} />
            <line x1={x} y1={230} x2={x + 150} y2={230} />
            <line x1={x} y1={320} x2={x + 150} y2={320} />
          </g>
          <path d={arch(x + 12, 96, 54, 120)} fill="#fff" opacity={0.35} />
        </g>
      ))}

      <Pendant x={560} cord={70} />
      <Pendant x={650} cord={92} />
      <Pendant x={740} cord={70} />

      <rect x={545} y={132} width={210} height={84} rx={6} fill={C.tealDark} />
      <rect x={553} y={140} width={194} height={68} rx={3} fill="none" stroke={C.brass} strokeWidth={1.5} />
      <circle cx={610} cy={172} r={20} fill={C.brass} />
      <path
        d="M646 190 C664 160 684 206 704 176 S730 166 740 178"
        fill="none"
        stroke={C.tealPale}
        strokeWidth={5}
        strokeLinecap="round"
      />

      <rect x={912} y={84} width={96} height={20} rx={10} fill="#111214" />
      <text
        x={960}
        y={98}
        textAnchor="middle"
        fontSize={11}
        letterSpacing="0.06em"
        fill={C.brass}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontWeight: 600 }}
      >
        Restaurant
      </text>
      <path d={arch(890, 112, 120, 280)} fill={C.brassSoft} stroke={C.trim} strokeWidth={8} />
      <circle cx={935} cy={190} r={24} fill={C.brass} opacity={0.2} />
      <circle cx={965} cy={190} r={24} fill={C.brass} opacity={0.2} />
      <line x1={935} y1={120} x2={935} y2={180} stroke={C.slate} strokeWidth={1.5} />
      <line x1={965} y1={120} x2={965} y2={180} stroke={C.slate} strokeWidth={1.5} />
      <circle cx={935} cy={186} r={7} fill="#fff3d0" />
      <circle cx={965} cy={186} r={7} fill="#fff3d0" />
      {[915, 968].map((x) => (
        <g key={x}>
          <rect x={x} y={328} width={30} height={4} rx={2} fill={C.slate} />
          <rect x={x + 13} y={332} width={4} height={54} fill={C.slate} />
          <rect x={x - 8} y={340} width={6} height={46} rx={3} fill={C.brassDark} />
          <rect x={x + 32} y={340} width={6} height={46} rx={3} fill={C.brassDark} />
        </g>
      ))}

      <line x1={1030} y1={250} x2={1030} y2={392} stroke={C.slate} strokeWidth={3} />
      <ellipse cx={1030} cy={392} rx={14} ry={4} fill={C.slate} />
      <polygon points="1008,250 1052,250 1044,218 1016,218" fill={C.brassSoft} stroke={C.brass} strokeWidth={1.5} />

      <polygon points="470,440 860,440 940,522 392,522" fill={C.tealPale} opacity={0.7} />
      <polygon points="486,450 844,450 912,512 420,512" fill="none" stroke={C.tealMid} strokeWidth={2} opacity={0.8} />

      <ellipse cx={650} cy={396} rx={170} ry={8} fill="#000" opacity={0.08} />
      <path d="M610 290 Q610 256 650 256 Q690 256 690 290 Z" fill={C.silhouette} />
      <circle cx={650} cy={236} r={16} fill={C.silhouette} />

      <rect x={500} y={304} width={300} height={88} fill={C.tealDark} />
      <rect x={516} y={318} width={268} height={56} rx={4} fill={C.teal} />
      <g stroke="#fff" strokeOpacity={0.12} strokeWidth={2}>
        {Array.from({ length: 12 }, (_, i) => 532 + i * 22).map((x) => (
          <line key={x} x1={x} y1={322} x2={x} y2={370} />
        ))}
      </g>
      <rect x={500} y={380} width={300} height={6} fill={C.brass} />
      <rect x={488} y={284} width={324} height={20} rx={5} fill={C.wallLight} stroke={C.trim} strokeWidth={2} />

      <rect x={532} y={281} width={32} height={3} rx={1.5} fill={C.brassDark} />
      <path d="M537 281 A11 10 0 0 1 559 281 Z" fill={C.brass} />
      <circle cx={548} cy={269} r={3} fill={C.brass} />

      <rect x={731} y={278} width={8} height={7} fill={C.slate} />
      <rect x={720} y={283} width={30} height={3} rx={1.5} fill={C.slate} />
      <rect x={698} y={230} width={74} height={50} rx={5} fill={C.ink} />
      <rect x={704} y={236} width={62} height={38} rx={3} fill={C.tealMid} />
      <g stroke="#fff" strokeOpacity={0.85} strokeWidth={3} strokeLinecap="round">
        <line x1={712} y1={247} x2={752} y2={247} />
        <line x1={712} y1={256} x2={744} y2={256} />
        <line x1={712} y1={265} x2={734} y2={265} />
      </g>

      <ellipse cx={1108} cy={396} rx={92} ry={7} fill="#000" opacity={0.09} />
      <rect x={1040} y={306} width={140} height={54} rx={20} fill={C.teal} />
      <rect x={1030} y={340} width={160} height={44} rx={14} fill="#0a8b90" />
      <rect x={1022} y={322} width={30} height={64} rx={14} fill={C.tealDark} />
      <rect x={1168} y={322} width={30} height={64} rx={14} fill={C.tealDark} />
      <line x1={1110} y1={344} x2={1110} y2={380} stroke="#000" strokeOpacity={0.15} strokeWidth={2} />
      <rect x={1060} y={330} width={26} height={26} rx={6} fill={C.brass} transform="rotate(-8 1073 343)" />
      <rect x={1040} y={384} width={6} height={10} fill={C.slate} />
      <rect x={1174} y={384} width={6} height={10} fill={C.slate} />

      <ellipse cx={50} cy={396} rx={32} ry={6} fill="#000" opacity={0.09} />
      <ellipse cx={50} cy={276} rx={12} ry={54} fill={C.leaf} />
      <ellipse cx={30} cy={300} rx={10} ry={42} fill={C.leafDark} transform="rotate(-30 30 300)" />
      <ellipse cx={70} cy={300} rx={10} ry={42} fill={C.leaf} transform="rotate(30 70 300)" />
      <ellipse cx={42} cy={312} rx={8} ry={30} fill={C.leaf} transform="rotate(-58 42 312)" />
      <ellipse cx={58} cy={312} rx={8} ry={30} fill={C.leafDark} transform="rotate(58 58 312)" />
      <path d="M24 344 H76 L68 395 H32 Z" fill={C.slate} />

      <ellipse cx={378} cy={474} rx={62} ry={7} fill="#000" opacity={0.1} />
      <rect x={326} y={420} width={40} height={54} rx={6} fill={C.brass} />
      <rect x={326} y={436} width={40} height={4} fill={C.brassDark} opacity={0.5} />
      <rect x={340} y={408} width={12} height={12} rx={3} fill="none" stroke={C.brassDark} strokeWidth={3} />
      <circle cx={334} cy={478} r={4} fill={C.slate} />
      <circle cx={358} cy={478} r={4} fill={C.slate} />
      <rect x={362} y={408} width={16} height={62} rx={6} fill={C.slate} />
      <rect x={382} y={408} width={16} height={62} rx={6} fill={C.slate} />
      <rect x={356} y={318} width={48} height={100} rx={20} fill={C.teal} />
      <circle cx={380} cy={296} r={18} fill={C.silhouette} />
      <line x1={400} y1={338} x2={428} y2={366} stroke={C.teal} strokeWidth={13} strokeLinecap="round" />
      <rect x={422} y={350} width={14} height={24} rx={3} fill={C.ink} />
      <rect x={424.5} y={353} width={9} height={16} rx={1.5} fill={C.tealMid} />
    </svg>
  );
}
