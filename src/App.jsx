import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

function ChatBox({ title, bgColor, itemColor, borderColor, useLayout }) {
  const [messages, setMessages] = useState(
    Array.from({ length: 20 }, (_, i) => `Message ${i + 1}`)
  );
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // Pick effect based on prop
  const EffectHook = useLayout ? useLayoutEffect : useEffect;

  EffectHook(() => {
    if (!useLayout) {
      // Simulate slow paint for useEffect to see jump
      const timer = setTimeout(scrollToBottom, 300);
      return () => clearTimeout(timer);
    }
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{ flex: 1, border: `1px solid ${borderColor}`, marginRight: "1rem" }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <div
        ref={containerRef}
        style={{
          height: "200px",
          overflowY: "auto",
          padding: "8px",
          background: bgColor
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              margin: "8px 0",
              height: "40px",
              background: itemColor
            }}
          >
            {msg}
          </div>
        ))}
      </div>
      <button onClick={() => setMessages(prev => [...prev, `Message ${prev.length + 1}`])}>
        Add Message
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      <ChatBox
        title="useEffect (Jumps)"
        bgColor="#ffe5e5"
        itemColor="#ffcccc"
        borderColor="red"
        useLayout={false}
      />
      <ChatBox
        title="useLayoutEffect (No Jump)"
        bgColor="#e5ffe5"
        itemColor="#ccffcc"
        borderColor="green"
        useLayout={true}
      />
    </div>
  );
}
