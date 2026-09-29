/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    // Force a download even where a browser ignores the anchor's `download` attribute (in-app browsers, some mobile ones).
    // Keep the filename in sync with profile.resumeFileName in lib/content.ts.
    return [
      {
        source: "/resume.pdf",
        headers: [{ key: "Content-Disposition", value: 'attachment; filename="Neeraj_Kumar_Resume.pdf"' }],
      },
    ];
  },
};

export default nextConfig;
