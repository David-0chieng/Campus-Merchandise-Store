/**
 * SPH Logo Component
 * Renders the SPH "sph / CLOCK IT!" logo as clean SVG
 * Usage: <SphLogo className="..." height={40} dark={false} />
 */
const SphLogo = ({ height = 40, dark = true, className = '' }) => {
  const fg = dark ? '#111111' : '#ffffff';
  const circleFill = dark ? '#111111' : '#ffffff';
  const circleStroke = dark ? '#ffffff' : '#111111';
  const innerText = dark ? '#ffffff' : '#111111';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 80"
      height={height}
      className={className}
      aria-label="SPH — Clock It!"
      role="img"
    >
      {/* Outer circle */}
      <circle cx="40" cy="40" r="37" fill={circleFill} />
      {/* Inner ring */}
      <circle cx="40" cy="40" r="31" fill="none" stroke={circleStroke} strokeWidth="2" />
      {/* S glyph */}
      <text
        x="40"
        y="55"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="38"
        fontWeight="bold"
        fontStyle="italic"
        fill={innerText}
        transform="rotate(-8 40 40)"
      >
        S
      </text>

      {/* sph wordmark */}
      <text
        x="93"
        y="50"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="36"
        fontWeight="bold"
        fontStyle="italic"
        fill={fg}
      >
        sph
      </text>

      {/* CLOCK IT! tagline */}
      <text
        x="128"
        y="67"
        textAnchor="middle"
        fontFamily="'Arial', sans-serif"
        fontSize="9"
        fontWeight="700"
        letterSpacing="3.5"
        fill={fg}
      >
        CLOCK IT!
      </text>
    </svg>
  );
};

export default SphLogo;
