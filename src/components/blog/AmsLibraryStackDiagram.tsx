import {
  brandColors,
  diagramContainerClassName,
  diagramContainerStyle,
} from "@/lib/brandTheme";

type Pillar = {
  x: number;
  lines: string[];
  role: string;
  accent: string;
};

const pillars: Pillar[] = [
  {
    x: 48,
    lines: ["pll_toolbox"],
    role: "Clocks / CDR",
    accent: brandColors.blue,
  },
  {
    x: 268,
    lines: ["data_converter_", "toolbox"],
    role: "ADC / DAC lanes",
    accent: "#22c55e",
  },
  {
    x: 488,
    lines: ["inductive_", "peaking"],
    role: "Passives / peaking",
    accent: brandColors.orange,
  },
  {
    x: 708,
    lines: ["irdrop_solver"],
    role: "Chip + package PDN",
    accent: "#a78bfa",
  },
];

/**
 * Architecture stack for the AMS blog: ceiling → platform → primary pillar
 * (serial_link_tools + learning strategies) → complementary library pillars.
 * Pitch-adjacent visual language adapted to the site dark theme.
 */
const AmsLibraryStackDiagram = () => {
  const W = 920;
  const H = 640;

  return (
    <figure className="my-8">
      <div
        className={diagramContainerClassName}
        style={diagramContainerStyle}
        role="img"
        aria-label="AMS library architecture: ams_platform on top, serial_link_tools as primary pillar with learning strategies, complementary libraries as supporting pillars"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-w-3xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="ams-stack-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={brandColors.blue} />
            </marker>
          </defs>

          <rect
            x="48"
            y="28"
            width="824"
            height="44"
            rx="6"
            fill={brandColors.surfaceMuted}
            stroke={brandColors.border}
            strokeWidth="1"
          />
          <text
            x="460"
            y="48"
            textAnchor="middle"
            fill={brandColors.textDimOnDark}
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.4"
          >
            CEILING
          </text>
          <text
            x="460"
            y="64"
            textAnchor="middle"
            fill={brandColors.textMutedOnDark}
            fontSize="13"
          >
            Agents and designers attach here — propose, not autopilot
          </text>

          <rect
            x="120"
            y="92"
            width="680"
            height="78"
            rx="8"
            fill={brandColors.blueMuted}
            stroke={brandColors.blue}
            strokeWidth="2"
          />
          <text
            x="460"
            y="118"
            textAnchor="middle"
            fill={brandColors.textDimOnDark}
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.2"
          >
            PLATFORM
          </text>
          <text
            x="460"
            y="142"
            textAnchor="middle"
            fill={brandColors.textOnDark}
            fontSize="20"
            fontWeight="600"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            ams_platform
          </text>
          <text
            x="460"
            y="162"
            textAnchor="middle"
            fill={brandColors.textMutedOnDark}
            fontSize="13"
          >
            API · oracle · named target · improve loop
          </text>

          <line
            x1="460"
            y1="170"
            x2="460"
            y2="208"
            stroke={brandColors.blue}
            strokeWidth="2"
            markerEnd="url(#ams-stack-arrow)"
          />
          <text
            x="478"
            y="198"
            fill={brandColors.blue}
            fontSize="12"
            fontWeight="500"
          >
            leverages
          </text>

          <rect
            x="120"
            y="214"
            width="680"
            height="168"
            rx="8"
            fill={brandColors.surface}
            stroke={brandColors.blue}
            strokeWidth="1.5"
          />
          <text
            x="140"
            y="238"
            fill={brandColors.textDimOnDark}
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.2"
          >
            PRIMARY PILLAR
          </text>
          <text
            x="140"
            y="262"
            fill={brandColors.textOnDark}
            fontSize="18"
            fontWeight="600"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            serial_link_tools
          </text>
          <text
            x="140"
            y="282"
            fill={brandColors.textMutedOnDark}
            fontSize="13"
          >
            Electrical / optical link world model · standards targets · maturity
            gate
          </text>

          <text
            x="140"
            y="312"
            fill={brandColors.textDimOnDark}
            fontSize="11"
            fontWeight="600"
            letterSpacing="1"
          >
            LEARNING STRATEGIES
          </text>

          {[
            { x: 140, label: "Classical", detail: "LMS / NLMS / CMA" },
            { x: 350, label: "Autoloop", detail: "verify → improve" },
            { x: 560, label: "Autoresearch", detail: "gate → plan → PR" },
          ].map((cell) => (
            <g key={cell.label}>
              <rect
                x={cell.x}
                y="322"
                width="196"
                height="46"
                rx="6"
                fill={brandColors.surfaceMuted}
                stroke={brandColors.border}
                strokeWidth="1"
              />
              <text
                x={cell.x + 98}
                y="342"
                textAnchor="middle"
                fill={brandColors.textOnDark}
                fontSize="14"
                fontWeight="600"
              >
                {cell.label}
              </text>
              <text
                x={cell.x + 98}
                y="358"
                textAnchor="middle"
                fill={brandColors.textMutedOnDark}
                fontSize="12"
              >
                {cell.detail}
              </text>
            </g>
          ))}

          <line
            x1="220"
            y1="382"
            x2="160"
            y2="430"
            stroke={brandColors.textDimOnDark}
            strokeWidth="1.5"
            markerEnd="url(#ams-stack-arrow)"
          />
          <line
            x1="360"
            y1="382"
            x2="340"
            y2="430"
            stroke={brandColors.textDimOnDark}
            strokeWidth="1.5"
            markerEnd="url(#ams-stack-arrow)"
          />
          <line
            x1="560"
            y1="382"
            x2="580"
            y2="430"
            stroke={brandColors.textDimOnDark}
            strokeWidth="1.5"
            markerEnd="url(#ams-stack-arrow)"
          />
          <line
            x1="700"
            y1="382"
            x2="760"
            y2="430"
            stroke={brandColors.textDimOnDark}
            strokeWidth="1.5"
            markerEnd="url(#ams-stack-arrow)"
          />
          <text
            x="460"
            y="410"
            textAnchor="middle"
            fill={brandColors.textDimOnDark}
            fontSize="12"
          >
            complementary libraries raise fidelity and supply real subsystems
          </text>

          <text
            x="460"
            y="448"
            textAnchor="middle"
            fill={brandColors.textDimOnDark}
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.2"
          >
            COMPLEMENTARY PILLARS
          </text>

          {pillars.map((pillar) => {
            const nameY = pillar.lines.length > 1 ? 492 : 500;
            return (
              <g key={pillar.lines.join("")}>
                <rect
                  x={pillar.x}
                  y="460"
                  width="164"
                  height="100"
                  rx="8"
                  fill={brandColors.surface}
                  stroke={pillar.accent}
                  strokeWidth="2"
                />
                <rect
                  x={pillar.x}
                  y="460"
                  width="164"
                  height="8"
                  rx="2"
                  fill={pillar.accent}
                />
                {pillar.lines.map((line, i) => (
                  <text
                    key={line}
                    x={pillar.x + 82}
                    y={nameY + i * 16}
                    textAnchor="middle"
                    fill={brandColors.textOnDark}
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  >
                    {line}
                  </text>
                ))}
                <text
                  x={pillar.x + 82}
                  y="542"
                  textAnchor="middle"
                  fill={brandColors.textMutedOnDark}
                  fontSize="12"
                >
                  {pillar.role}
                </text>
              </g>
            );
          })}

          <rect
            x="48"
            y="584"
            width="824"
            height="40"
            rx="6"
            fill={brandColors.surfaceMuted}
            stroke={brandColors.border}
            strokeWidth="1"
          />
          <text
            x="460"
            y="602"
            textAnchor="middle"
            fill={brandColors.textDimOnDark}
            fontSize="11"
            fontWeight="600"
            letterSpacing="1.2"
          >
            FOUNDATION
          </text>
          <text
            x="460"
            y="616"
            textAnchor="middle"
            fill={brandColors.textMutedOnDark}
            fontSize="13"
          >
            Encoded AMS physics and design judgment — written, not learned
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-sm text-text-tertiary">
        How the pieces stack in my head:{" "}
        <span className="font-mono text-text-secondary">ams_platform</span> on
        top,{" "}
        <span className="font-mono text-text-secondary">serial_link_tools</span>{" "}
        as the primary domain pillar, complementary libraries underneath for
        subsystems, passives, and PDN fidelity.
      </figcaption>
    </figure>
  );
};

export default AmsLibraryStackDiagram;
