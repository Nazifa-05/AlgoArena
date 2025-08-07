import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function Compiler() {
  const [code, setCode] = useState("// write your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setOutput("Running...");
    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.REACT_APP_JUDGE_API_59a5f341f4msh78188f3a3df3fa4p1774afjsnc721ccca70af,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            stdin: input,
            language_id: 54, // C++
          }),
        }
      );

      const data = await response.json();
      setOutput(data.stdout || data.stderr || data.compile_output || "No output");
    } catch (error) {
      console.error(error);
      setOutput("Error: Failed to run code.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        fontFamily: "monospace",
      }}
    >
      {/* Left: Editor */}
      <div style={{ width: "70%", padding: "20px" }}>
        <h2>Online Compiler</h2>
        <Editor
          height="80vh"
          language="cpp"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      {/* Right: Input/Output */}
      <div style={{ width: "30%", padding: "20px", backgroundColor: "#111" }}>
        <h3>Enter Input</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input here..."
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444",
            padding: "10px",
          }}
        />

        <button
          onClick={handleRun}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Run
        </button>

        <h3 style={{ marginTop: "20px" }}>Output</h3>
        <pre
          style={{
            backgroundColor: "#000",
            color: "#0f0",
            padding: "10px",
            height: "250px",
            overflowY: "auto",
            border: "1px solid #333",
          }}
        >
          {output}
        </pre>
      </div>
    </div>
  );
}

export default Compiler;
