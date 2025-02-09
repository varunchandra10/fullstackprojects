# Code-visualizer - Phase 1

Code-visualizer is a web-based tool designed to help users write, execute, and debug Python code with an intuitive interface. This repository contains the implementation of **Phase 1**, which focuses on basic functionality and user experience enhancements.

## Table of Contents
1. [Features](#features)
2. [Directory Structure](#directory-structure)
3. [How to Clone and Use](#how-to-clone-and-use)
4. [Documents](#documents)
5. [All Features](#all-features)
<!-- 5. [Future Enhancements](#future-enhancements) -->

---

## Features
|         **Phase 1**     ||
|-------------|------------|
| **Code Execution** |  Write Python code in the editor and execute it with a single click or keyboard shortcut (`Ctrl+Enter`).|
| **Dynamic Theme Switching** | Choose from multiple themes (e.g., `default`, `material-darker`, `monokai`, `dracula`) to customize the editor's appearance.|
| **Error Highlighting** | Errors in the code are highlighted in the editor, making debugging easier. |
| **Line Wrapping** | Long lines of code wrap automatically for better readability.|
| **Placeholder Text** | A placeholder ("Write your Python code here...") appears in the editor when it’s empty.|
| **Clear Button** | Clear both the editor and output area with a single click |
| **File Upload** | Upload `.py` files and load their content into the editor.|
| **Download Button** | Download the current code as a `.py` file.|
| **Character/Line Counter** | Track the number of characters and lines in the editor.|
| **Improved Error Messages** | User-friendly error messages are displayed in the output area.|

---

## Directory Structure
The project is organized as follows:
```
python-tutor/
│
├── app.py # Backend (Flask server)
├── templates/
│ └── index.html # Frontend (HTML + CSS + JavaScript)
└── static/
├── css/
│ └── styles.css # Styling for the UI
└── js/
└── script.js # JavaScript for interactivity

```
---

## How to Clone and Use
To clone and use this project, follow these steps:

### Prerequisites
1. **Python**: Ensure Python is installed on your system. You can download it from [python.org](https://www.python.org/).
2. **pip**: Install `pip` if it’s not already installed.
3. **Git**: Install Git from [git-scm.com](https://git-scm.com/).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/python-tutor.git
   cd python-tutor
   ```
2. **Install Depndencies**:

   Install <a href="https://flask.palletsprojects.com/en/stable/">`Flask`</a> using <a href="https://packaging.python.org/en/latest/tutorials/installing-packages/"> `pip` </a>:
   ```bash
   pip install flask
   ```
3. **Run the Application**:

   Start Flask server
   ```bash
   python app.py
   ```
4. **Access the APP**:

   Open your browser and navigate to 
   ```bash
   http://127.0.0.1:5000/
   ```

## Documents
Below are links to relevant documentation for the tools and libraries used in this project:

- Flask Documentation : `https://flask.palletsprojects.com/`
- CodeMirror Documentation : `https://codemirror.net/doc/manual.html`
- CodeMirror Themes : `https://codemirror.net/demo/theme.html`
- Python subprocess Module : `https://docs.python.org/3/library/subprocess.html`
- Python ast Module : `https://docs.python.org/3/library/ast.html`

## All Features

| Feature    | Description    |
|-------------|------------|
| **Code Editor** | Syntax-highlighted editor with line numbers and auto-indentation. | 
|**Dynamic Theme Switching** | Switch between multiple CodeMirror themes. | 
| **Keyboard Shortcuts** | Run code using `Ctrl+Enter`. | 
|**Error Highlighting** | Highlight lines with errors in the editor. | 
|**Line Wrapping** | Automatically wrap long lines for better readability. | 
| **Placeholder Text** | Placeholder text guides new users. | 
|**Clear Button** | Clear the editor and output area. | 
|**File Upload** | Upload `.py` files to load code into the editor. | 
| **Download Button** | Download the current code as a`.py` file. | 
|**Character/Line Counter** | Display the number of characters and lines in the editor. | 
| **Improved Error Messages** | Format backend errors for better readability.. | 




