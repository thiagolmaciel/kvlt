export function LoginWireframe() {
  const nodes: [number, number][] = [
    [60, 70], [190, 30], [340, 90], [480, 40],
    [40, 210], [170, 190], [300, 230], [440, 180], [560, 130],
    [90, 350], [230, 330], [370, 370], [500, 320], [610, 260],
    [50, 490], [190, 470], [330, 500], [460, 460], [580, 400],
    [110, 630], [260, 620], [400, 640], [530, 590],
    [70, 770], [220, 780], [360, 800], [490, 740],
    [140, 900], [300, 920], [440, 880],
  ];

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7], [3, 8],
    [4, 5], [5, 6], [6, 7], [7, 8],
    [4, 9], [5, 10], [6, 11], [7, 12], [8, 13],
    [9, 10], [10, 11], [11, 12], [12, 13],
    [9, 14], [10, 15], [11, 16], [12, 17], [13, 18],
    [14, 15], [15, 16], [16, 17], [17, 18],
    [14, 19], [15, 20], [16, 21], [17, 22],
    [19, 20], [20, 21], [21, 22],
    [19, 23], [20, 24], [21, 25], [22, 26],
    [23, 24], [24, 25], [25, 26],
    [23, 27], [24, 28], [25, 29],
    [27, 28], [28, 29],
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 650 950"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        maskImage: "linear-gradient(to right, black 0%, black 55%, transparent 92%)",
        WebkitMaskImage: "linear-gradient(to right, black 0%, black 55%, transparent 92%)",
      }}
      preserveAspectRatio="xMinYMid slice"
    >
      <g className="animate-wire-drift">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke="white"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 4 === 0 ? 3 : 2}
            fill="white"
            className="animate-wire-twinkle"
            style={{ animationDelay: `${(i % 7) * 0.5}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
