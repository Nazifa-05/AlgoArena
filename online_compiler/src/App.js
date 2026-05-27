import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const languageOptions = {
  c: { name: "C", id: 50, monacoLang: "c" },
  cpp: { name: "C++", id: 54, monacoLang: "cpp" },
  python: { name: "Python", id: 71, monacoLang: "python" },
  java: { name: "Java", id: 62, monacoLang: "java" },
  html: { name: "HTML", id: null, monacoLang: "html" },
  css: { name: "CSS", id: null, monacoLang: "css" },
  javascript: { name: "JavaScript", id: null, monacoLang: "javascript" },
  web: { name: "Web Project (HTML+CSS+JS+JQuery)", id: null, monacoLang: null },
};

const codeTemplates = {
  c: `#include <stdio.h>

int main() {
    printf("Hello World");
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`,

  python: `print("Hello World")`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,

  javascript: `console.log("Hello World");`,

  html: `<h1>Hello World</h1>`,

  css: `h1 {
  color: red;
}`,
};

function Compiler() {
  const [mode, setMode] = useState("cpp");
  const [code, setCode] = useState("// write your code here");
  const [htmlCode, setHtmlCode] = useState("<h1>Hello, world!</h1>");
  const [cssCode, setCssCode] = useState("h1 { color: red; }");
  const [jsCode, setJsCode] = useState("console.log('Hello!');");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCompiledCode = async () => {
    setIsRunning(true);
    setOutput("Running...");
    const lang = languageOptions[mode];

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "59a5f341f4msh78188f3a3df3fa4p1774afjsnc721ccca70af", // 🔑 ADD YOUR API KEY HERE
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            stdin: input,
            language_id: lang.id,
          }),
        },
      );

      const data = await response.json();
      setOutput(
        data.stdout || data.stderr || data.compile_output || "No output",
      );
    } catch (err) {
      console.error(err);
      setOutput("Error: Failed to run code.");
    } finally {
      setIsRunning(false);
    }
  };

  const runRenderedCode = () => {
    let content = "";

    if (mode === "html") {
      content = code;
    } else if (mode === "css") {
      content = `<style>${code}</style>`;
    } else if (mode === "javascript") {
      content = `<script>${code}<\/script>`;
    } else if (mode === "web") {
      content = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${cssCode}</style>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}<\/script>
          </body>
        </html>
      `;
    }

    setOutput(content);
  };

  const handleRun = () => {
    if (
      (mode !== "web" && !code.trim()) ||
      (mode === "web" && !htmlCode.trim() && !cssCode.trim() && !jsCode.trim())
    ) {
      setOutput("Please enter code before execution.");
      return;
    }

    const lang = languageOptions[mode];

    if (lang.id === null) {
      runRenderedCode();
    } else {
      runCompiledCode();
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("Output copied successfully!");
    } catch (err) {
      alert("Failed to copy output");
    }
  };

  const clearOutput = () => {
    setOutput("");
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
        <h2>Online Compiler & Web Editor</h2>

        <select
          value={mode}
          onChange={(e) => {
            const selectedMode = e.target.value;
            setMode(selectedMode);

            if (codeTemplates[selectedMode]) {
              setCode(codeTemplates[selectedMode]);
            }
          }}
          style={{ marginBottom: "10px", padding: "6px", fontSize: "16px" }}
        >
          {Object.entries(languageOptions).map(([key, lang]) => (
            <option key={key} value={key}>
              {lang.name}
            </option>
          ))}
        </select>

        {mode === "web" ? (
          <>
            <h4>HTML</h4>
            <Editor
              height="20vh"
              language="html"
              theme="vs-dark"
              value={htmlCode}
              onChange={(v) => setHtmlCode(v || "")}
            />
            <h4>CSS</h4>
            <Editor
              height="20vh"
              language="css"
              theme="vs-dark"
              value={cssCode}
              onChange={(v) => setCssCode(v || "")}
            />
            <h4>JavaScript</h4>
            <Editor
              height="20vh"
              language="javascript"
              theme="vs-dark"
              value={jsCode}
              onChange={(v) => setJsCode(v || "")}
            />
          </>
        ) : (
          <>
            <Editor
              height="75vh"
              language={languageOptions[mode].monacoLang}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
            />

            <div
              style={{
                marginTop: "10px",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              Lines: {code.split("\n").length} | Characters: {code.length}
            </div>
          </>
        )}
      </div>

      {/* Right: Input/Output */}
      <div style={{ width: "30%", padding: "20px", backgroundColor: "#111" }}>
        {/* Input only for compiled languages */}
        {languageOptions[mode].id !== null && (
          <>
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
          </>
        )}

        <button
          onClick={handleRun}
          disabled={isRunning}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: isRunning ? "#666" : "#007bff",
            border: "none",
            color: "#fff",
            cursor: isRunning ? "not-allowed" : "pointer",
          }}
        >
          {isRunning ? "Running..." : "Run"}
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <h3>Output</h3>

          <button
            onClick={copyOutput}
            style={{
              padding: "5px 10px",
              backgroundColor: "#28a745",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Copy Output
          </button>

          <button
            onClick={clearOutput}
            style={{
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "4px",
              marginLeft: "10px",
            }}
          >
            Clear Output
          </button>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            height: "250px",
            overflowY: "auto",
            border: "1px solid #333",
          }}
        >
          {mode === "html" ||
          mode === "css" ||
          mode === "javascript" ||
          mode === "web" ? (
            <iframe
              srcDoc={output}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Output"
            />
          ) : (
            <pre
              style={{
                backgroundColor: "#000",
                color: "#0f0",
                padding: "10px",
              }}
            >
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default Compiler;
