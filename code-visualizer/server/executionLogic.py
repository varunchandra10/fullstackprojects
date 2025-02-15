import ast
import io
import contextlib
import traceback
import inspect
import json
import sys

def is_serializable(value):
    """Check if a value can be JSON serialized."""
    try:
        json.dumps(value)
        return True
    except (TypeError, OverflowError):
        return False

def filter_call_stack():
    """Filter out internal Flask and Werkzeug frames but keep user-defined function calls."""
    call_stack = []
    for frame_info in inspect.stack():
        frame = frame_info.frame
        if "flask" in frame_info.filename or "werkzeug" in frame_info.filename:
            continue  # Ignore Flask & Werkzeug internal calls

        frame_locals = frame.f_locals
        serializable_frame_locals = {
            k: v for k, v in frame_locals.items() if is_serializable(v)
        }

        call_stack.append({
            'function': frame_info.function,
            'locals': serializable_frame_locals,
            'lineno': frame_info.lineno,
            'filename': frame_info.filename
        })
    
    return call_stack

def trace_calls(frame, event, arg):
    """Trace function calls to capture stack frames."""
    if event == 'call':  # Track only function calls
        stack_info = {
            'function': frame.f_code.co_name,
            'lineno': frame.f_lineno,
            'filename': frame.f_code.co_filename,
            'locals': {k: v for k, v in frame.f_locals.items() if is_serializable(v)}
        }
        print(f"DEBUG TRACE: {stack_info}")  # Debugging log
    return trace_calls

def execute_code_step_by_step(code):
    """Execute Python code step by step and capture execution states."""
    try:
        tree = ast.parse(code)
        execution_states = []  # Store execution steps
        variables = {}  # Track variable states
        output_buffer = io.StringIO()  # Capture print outputs
        local_vars = {}  # Local variable storage

        sys.settrace(trace_calls)  # Enable function tracing

        for node in tree.body:
            try:
                block_code = ast.unparse(node)  # Convert AST node back to code

                with contextlib.redirect_stdout(output_buffer):
                    exec(block_code, globals(), local_vars)

                serializable_vars = {
                    k: v for k, v in local_vars.items() if is_serializable(v)
                }

                variables.update(serializable_vars)
                execution_states.append({
                    'block': block_code,
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue().strip(),
                    'error': None,
                    'call_stack': filter_call_stack()
                })

                output_buffer.truncate(0)
                output_buffer.seek(0)

            except Exception as e:
                error_message = traceback.format_exc()
                execution_states.append({
                    'block': ast.unparse(node),
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue().strip(),
                    'error': error_message,
                    'call_stack': filter_call_stack()  # Capture stack on error
                })
                break  # Stop execution on the first error

        sys.settrace(None)  # Disable tracing after execution
        return execution_states

    except Exception as e:
        return [{'error': f"An unexpected error occurred: {str(e)}"}]

