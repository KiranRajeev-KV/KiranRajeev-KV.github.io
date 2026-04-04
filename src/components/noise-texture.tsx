export function NoiseTexture() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}
