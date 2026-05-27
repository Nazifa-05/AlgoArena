# AlgoArena - Online Coding Compiler & Web Editor

AlgoArena is a browser-based coding platform that allows users to write, edit, and execute code directly from the browser. The platform supports multiple programming languages and provides an interactive development experience powered by Monaco Editor (the editor used in VS Code).

The project also includes support for HTML, CSS, JavaScript, and complete web project rendering, making it suitable for learning, experimentation, and rapid code testing.

---

## 🚀 Features

* 🧑‍💻 Monaco Editor (VS Code Editor) integration
* 🌍 Multi-language support

  * C
  * C++
  * Java
  * Python
  * HTML
  * CSS
  * JavaScript
  * Complete Web Projects (HTML + CSS + JS + jQuery)
* ⚡ Execute code directly from the browser
* 📋 Copy output to clipboard
* 🗑️ Clear output functionality
* 🔄 Reset code to language starter templates
* 📝 Built-in starter templates for supported languages
* ⌨️ Run code using Ctrl + Enter keyboard shortcut
* 📊 Real-time code statistics (Lines & Characters)
* ⏱️ Last execution timestamp display
* 🚫 Prevent multiple executions while code is running
* 🔐 Login and Signup pages
* ⚛️ React-based responsive user interface

---

## 🛠️ Technologies Used

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* React Router DOM
* Monaco Editor

### Backend / Server

* Node.js
* Express.js
* Body Parser
* CORS

### API & Utilities

* Axios
* RapidAPI Integration

### Deployment

* GitHub Pages

---

## 📁 Project Structure

```text
AlgoArena/
│
├── login.html
├── signup.html
├── index.html
├── style.css
│
├── images/
│
├── auth-app/
│
└── online_compiler/
    ├── package.json
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   └── components/
    └── build/
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/AlgoArena.git
cd AlgoArena
```

### 2. Install Dependencies

```bash
cd online_compiler
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `online_compiler` directory:

```env
REACT_APP_RAPIDAPI_KEY=your_api_key_here
```

### 4. Start Development Server

```bash
npm start
```

Application will run at:

```text
http://localhost:3000
```

---

## 🖥️ Usage

1. Launch the application.
2. Select a programming language.
3. Write or edit code in the editor.
4. Execute code using:

   * Run Button
   * Ctrl + Enter Shortcut
5. View execution results in the output panel.
6. Copy, clear, or reset code when needed.

---

## 📊 Editor Utilities

The editor provides several productivity features:

* Copy Output
* Clear Output
* Reset Code
* Starter Templates
* Code Statistics
* Execution Timestamp
* Keyboard Shortcuts
* Execution Protection During Running

---

## 📦 Production Build

Generate an optimized production build:

```bash
npm run build
```

Build files will be created inside the `build/` directory.

---

## 🚀 Deployment

Deploy using GitHub Pages:

```bash
npm run deploy
```

---

## 👨‍💻 Author

Developed and maintained by **Nazifa**.

---

## 📜 License

This project is licensed under the MIT License.
