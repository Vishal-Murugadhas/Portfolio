// Generates elegant on-brand SVG data URIs (1040x800) for achievement cards
// Near-black gradient (#090909 -> #120e1a), subtle violet radial bloom, mono text, hairline border

export function generateAchievementPlaceholder(
  title: string,
  subtitle: string,
  year: string
): string {
  // Escape for XML
  const cleanTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanSubtitle = subtitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanYear = year.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="800" viewBox="0 0 1040 800">
  <defs>
    <radialGradient id="bloom" cx="75%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#af50ff" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#140b24" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#090909" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#15151b" />
      <stop offset="100%" stop-color="#090909" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="1040" height="800" fill="url(#bg)" />
  <!-- Bloom -->
  <rect width="1040" height="800" fill="url(#bloom)" />
  
  <!-- Outer hairline frame -->
  <rect x="24" y="24" width="992" height="752" rx="16" fill="none" stroke="rgba(247,249,250,0.12)" stroke-width="1" />
  
  <!-- Top meta -->
  <text x="64" y="88" fill="#828384" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="500" letter-spacing="3">ACHIEVEMENT / RECORD</text>
  <text x="976" y="88" text-anchor="end" fill="#af50ff" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="600" letter-spacing="2">${cleanYear}</text>
  
  <!-- Divider -->
  <line x1="64" y1="120" x2="976" y2="120" stroke="rgba(247,249,250,0.08)" stroke-width="1" />
  
  <!-- Center content -->
  <text x="64" y="440" fill="#f7f9fa" font-family="'Inter', sans-serif" font-size="52" font-weight="300" letter-spacing="-1">${cleanTitle}</text>
  <text x="64" y="510" fill="#828384" font-family="'Inter', sans-serif" font-size="28" font-weight="400">${cleanSubtitle}</text>
  
  <!-- Bottom stamp -->
  <line x1="64" y1="670" x2="976" y2="670" stroke="rgba(247,249,250,0.08)" stroke-width="1" />
  <text x="64" y="720" fill="#474747" font-family="'JetBrains Mono', monospace" font-size="16" letter-spacing="2">VISHAL MURUGADHAS · SVNIT SURAT</text>
  <circle cx="964" cy="714" r="5" fill="#af50ff" opacity="0.8" />
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
