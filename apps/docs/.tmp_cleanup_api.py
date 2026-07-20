#!/usr/bin/env python3
"""Fix merged API table rows, split escaped pipes, and wrap defaults."""

import re
from pathlib import Path

TARGET_DIRS = [
    "multi-select", "slider", "pill", "unstyled-button", "splitter",
    "hover-card", "ring-progress", "pie-chart", "chip", "funnel-chart",
    "overflow-list", "sparkline", "file-input", "stepper", "radar-chart",
    "table", "carousel", "background-image", "combobox", "theme-icon"
]

BASE = Path("/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/docs/components")


def should_wrap(val: str) -> bool:
    val = val.strip()
    if val == "—":
        return False
    if val.startswith("`") and val.endswith("`"):
        return False
    if val in ("true", "false"):
        return True
    if re.fullmatch(r"\d+(\.\d+)?", val):
        return True
    if re.fullmatch(r"'[^']+'", val):
        return True
    if re.fullmatch(r"\[\]", val):
        return True
    return False


def split_row(line: str):
    """Split a markdown table row by unescaped pipes."""
    parts = []
    current = ""
    i = 0
    while i < len(line):
        if line[i] == "\\" and i + 1 < len(line) and line[i + 1] == "|":
            current += "\\|"
            i += 2
        elif line[i] == "|":
            parts.append(current)
            current = ""
            i += 1
        else:
            current += line[i]
            i += 1
    parts.append(current)
    return [p.strip() for p in parts]


def build_row(parts):
    """Build a table row string from split parts (list of 6: '', c1, c2, c3, c4, '')."""
    if len(parts) != 6:
        return None
    # Wrap default value if needed (parts[-2] is the default column)
    default = parts[-2]
    if should_wrap(default):
        parts[-2] = f"`{default}`"
    return "| " + " | ".join(parts[1:-1]) + " |"


def fix_line(line: str) -> list[str]:
    """Fix a potentially corrupted API table line into one or more clean rows."""
    # Fix split escaped pipes produced by earlier faulty edits
    line = line.replace(" \\ | ", " \\| ")
    line = line.replace(" \\ |", " \\|")

    stripped = line.strip()
    if not stripped.startswith("|"):
        return [line]

    parts = split_row(stripped)
    # A valid single row has 6 parts: ['', c1, c2, c3, c4, '']
    if len(parts) == 6:
        row = build_row(parts)
        if row is None:
            return [line]
        return [row]

    if len(parts) < 6:
        return [line]

    # Multiple rows merged; group into chunks of 6.
    rows = []
    i = 0
    while i < len(parts):
        # Each row starts with an empty part (leading pipe).
        # If current part is not empty, prepend an empty part for this row.
        if parts[i] != "":
            chunk = [""] + parts[i : i + 5]
            i += 5
        else:
            chunk = parts[i : i + 6]
            i += 6
        if len(chunk) >= 5:
            # Ensure we have 6 parts by padding with empty strings if needed.
            while len(chunk) < 6:
                chunk.append("")
            row = build_row(chunk)
            if row:
                rows.append(row)
    return rows if rows else [line]


def process_file(path: Path) -> tuple[int, int]:
    content = path.read_text(encoding="utf-8")
    lines = content.splitlines(keepends=True)
    in_api = False
    fixed_lines = 0
    wrapped = 0
    new_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped == "## API {#api}":
            in_api = True
        elif in_api and stripped.startswith("## "):
            in_api = False

        if in_api and stripped.startswith("|") and not stripped.startswith("|---"):
            out_lines = fix_line(line)
            if len(out_lines) > 1 or out_lines[0].strip() != stripped:
                fixed_lines += 1
            # Count wrapped defaults by comparing old default with new
            new_lines.extend(out_lines)
            # Add newline if original line had it and we're outputting multiple lines
            if len(out_lines) > 1 and line.endswith("\n"):
                for k in range(len(out_lines) - 1):
                    new_lines[-(len(out_lines) - k)] += "\n"
        else:
            new_lines.append(line)

    # Normalize: ensure each line ends with newline if not last
    final_lines = []
    for i, ln in enumerate(new_lines):
        if i < len(new_lines) - 1 and not ln.endswith("\n"):
            ln += "\n"
        final_lines.append(ln)

    new_content = "".join(final_lines)
    if new_content != content:
        path.write_text(new_content, encoding="utf-8")
    return fixed_lines, wrapped


if __name__ == "__main__":
    total_fixed = 0
    for name in TARGET_DIRS:
        path = BASE / name / "index.zh-CN.md"
        if path.exists():
            fixed, _ = process_file(path)
            total_fixed += fixed
            print(f"{name}: {fixed} fixed lines")
        else:
            print(f"{name}: NOT FOUND")
    print(f"Total fixed lines: {total_fixed}")
