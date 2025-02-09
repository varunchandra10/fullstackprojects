// Initialize CodeMirror
const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    lineNumbers: true,
    mode: 'python',
    theme: 'default', // Default theme
    indentUnit: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    lineWrapping: true, // Enable line wrapping
    placeholder: "Write your Python code here...", // Placeholder text
});

// Theme Selector
document.getElementById('theme-selector').addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    codeEditor.setOption('theme', selectedTheme); // Change the theme dynamically
});

// File Upload
document.getElementById('file-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            codeEditor.setValue(e.target.result); // Load file content into the editor
        };
        reader.readAsText(file);
    }
});

// Download Button
document.getElementById('download-button').addEventListener('click', () => {
    const code = codeEditor.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.py'; // File name
    a.click();
    URL.revokeObjectURL(url);
});

// Clear Button
document.getElementById('clear-button').addEventListener('click', () => {
    codeEditor.setValue(''); // Clear the editor
    document.getElementById('output').textContent = ''; // Clear the output
    clearErrorHighlights(); // Remove error highlights
});

// Keyboard Shortcut (Ctrl+Enter)
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
        runCode();
    }
});

// Run Button
document.getElementById('run-button').addEventListener('click', async () => {
    validateCode();
    await runCode();
});

// Function to Validate Code
function validateCode() {
    const code = codeEditor.getValue();
    fetch('/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        if (!data.valid) {
            alert(`Syntax Error: ${data.error}`);
        }
    });
}

// Function to Run Code
async function runCode() {
    const code = codeEditor.getValue(); // Get the code from CodeMirror
    const outputDiv = document.getElementById('output');

    // Clear previous output and remove error highlights
    outputDiv.innerHTML = 'Running...';
    clearErrorHighlights();

    try {
        const response = await fetch('/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        const result = await response.json();

        if (result.error) {
            const formattedError = result.error.replace(/\n/g, '<br>'); // Replace newlines with <br>
            outputDiv.innerHTML = `Error:<br>${formattedError}`;
            highlightErrorLine(result.error); // Highlight the error line
        } else {
            outputDiv.textContent = result.output || 'No output';
        }
    } catch (error) {
        outputDiv.textContent = `An error occurred: ${error.message}`;
    }
}

// Highlight Error Line
function highlightErrorLine(error) {
    const lineNumberMatch = error.match(/line (\d+)/); // Extract line number from error message
    if (lineNumberMatch) {
        const lineNumber = parseInt(lineNumberMatch[1], 10) - 1; // Convert to zero-based index
        codeEditor.addLineClass(lineNumber, 'background', 'error-line'); // Add a CSS class to highlight the line
    }
}

// Clear Error Highlights
function clearErrorHighlights() {
    const lines = codeEditor.lineCount();
    for (let i = 0; i < lines; i++) {
        codeEditor.removeLineClass(i, 'background', 'error-line');
    }
}

// Update Character/Line Counter
function updateCounter() {
    const code = codeEditor.getValue();
    const charCount = code.length;
    const lineCount = code.split('\n').length;
    document.getElementById('counter').textContent = `Characters: ${charCount} | Lines: ${lineCount}`;
}

// Update counter on changes
codeEditor.on('change', updateCounter);
updateCounter(); // Initialize counter