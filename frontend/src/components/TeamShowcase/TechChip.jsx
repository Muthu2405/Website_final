"use client";
import { useEffect, useState } from "react";
const techColors = {
  Python: "#3776AB",
  Django: "#092E20",
  "REST API": "#FF6B35",
  PostgreSQL: "#336791",
  MySQL: "#4479A1",
  Docker: "#2496ED",
  AWS: "#FF9900",
  Redis: "#DC382D",
  Git: "#F05032",
  Linux: "#FCC624",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  "Next.js": "#ffffff",
  "Tailwind CSS": "#06B6D4",
  Figma: "#F24E1E",
  WebGL: "#990000",
  GraphQL: "#E10098",
  "Framer Motion": "#BB4B96",
  "Node.js": "#339933",
  Go: "#00ADD8",
  Kubernetes: "#326CE5",
  MongoDB: "#47A248",
  Terraform: "#7B42BC",
  "CI/CD": "#00D4FF",
  PyTorch: "#EE4C2C",
  TensorFlow: "#FF6F00",
  LangChain: "#1C3A5F",
  "OpenAI API": "#10A37F",
  FastAPI: "#009688",
  Pinecone: "#3B82F6",
  MLflow: "#0194E2",
  Framer: "#BB4B96",
  "After Effects": "#9999FF",
  Lottie: "#00DDB3",
  Protopie: "#FF5C00",
  Zeplin: "#FDBD39",
  Spline: "#0D76FC",
  Rive: "#FF3E3E"
};
function TechChip({ tech, index, visible }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShow(true), index * 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShow(false), (8 - index) * 40);
      return () => clearTimeout(t);
    }
  }, [visible, index]);
  const color = techColors[tech] || "#00D4FF";
  return <div
    className="chip-glow"
    style={{
      opacity: show ? 1 : 0,
      transform: show ? "scale(1)" : "scale(0.6)",
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 6px",
      borderRadius: "3px",
      border: `1px solid ${color}44`,
      background: `${color}18`,
      fontSize: "8px",
      color: color === "#ffffff" ? "#e0e0e0" : color,
      fontFamily: "monospace",
      fontWeight: 600,
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
      boxShadow: show ? `0 0 6px ${color}33` : "none"
    }}
  >
      {tech}
    </div>;
}
export {
  TechChip as default
};
