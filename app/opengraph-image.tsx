import { ImageResponse } from "next/og";

// Edge runtime avoids the Node font file lookup that fails to build on Windows.
export const runtime = "edge";
export const alt = "Neeraj Kumar, Full Stack Developer (MERN)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card shown when the link is shared on LinkedIn, WhatsApp, Slack and similar.
const OpengraphImage = () =>
  new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#F5F0E4",
        color: "#221F1A",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ fontSize: 40, color: "#B0502F" }}>Hello, I&apos;m</div>
      <div style={{ fontSize: 110, fontWeight: 800, lineHeight: 1.05 }}>Neeraj Kumar</div>
      <div style={{ fontSize: 46, color: "#B0502F", marginTop: 12 }}>Full Stack Developer, MERN</div>
      <div style={{ fontSize: 30, color: "#5B564A", marginTop: 36 }}>
        RBAC platforms, secure APIs and dashboards. Karachi, PK.
      </div>
    </div>,
    size
  );

export default OpengraphImage;
