export const dynamic = "force-static";
export const contentType = "image/svg+xml";
export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#172554"/>
          <stop offset="50%" stop-color="#1e40af"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <circle cx="600" cy="180" r="60" fill="rgba(255,255,255,0.15)"/>
      <circle cx="600" cy="180" r="24" fill="#ffffff"/>
      <text x="600" y="310" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="96" font-weight="800" fill="#ffffff" text-anchor="middle">创无限</text>
      <text x="600" y="390" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="40" font-weight="500" fill="rgba(255,255,255,0.92)" text-anchor="middle">为创业项目提供免费二级域名与托管空间</text>
      <text x="600" y="460" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="28" font-weight="400" fill="rgba(255,255,255,0.72)" text-anchor="middle">cwxian.com</text>
    </svg>
  `;

  return new Response(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
