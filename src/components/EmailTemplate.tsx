import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        padding: "20px",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>
        📩 New Contact Request
      </h1>
      <p>You’ve received a new message through your portfolio website.</p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          background: "#f9f9f9",
        }}
      >
        <p>
          <strong>From:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Message:</strong>
        </p>
        <blockquote
          style={{
            margin: "10px 0",
            padding: "10px",
            borderLeft: "4px solid #0070f3",
            background: "#fff",
          }}
        >
          {message}
        </blockquote>
      </div>

      <p style={{ marginTop: "20px", fontSize: "12px", color: "#777" }}>
        This message was automatically sent from your portfolio contact form.
      </p>
    </div>
  );
}
