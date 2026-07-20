#!/usr/bin/env python3
"""Fix merged API table rows and wrap unwrapped defaults."""

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
    """Split a markdown table row by unescaped pipes (\\| is kept in cells)."""
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
    """Build a clean 4-column table row from split parts."""
    if len(parts) < 6:
        return None
    # parts: ['', prop, desc, type..., default, '']
    prop = parts[1]
    desc = parts[2]
    default = parts[-2]
    # Combine middle cells into type column, escaping any bare pipes
    type_cells = parts[3:-2]
    type_col = " \\| ".join(type_cells)
    if should_wrap(default):
        default = f"`{default}`"
    return f"| {prop} | {desc} | {type_col} | {default} |"


def fix_line(line: str) -> list[str]:
    """Fix a potentially corrupted API table line into one or more clean rows."""
    stripped = line.strip()
    if not stripped.startswith("|"):
        return [line]

    parts = split_row(stripped)

    # Single row
    if len(parts) == 6:
        row = build_row(parts)
        return [row] if row else [line]

    if len(parts) < 6:
        return [line]

    # Multiple rows merged or a row with unescaped pipes in type column.
    # Group into chunks where each chunk represents one row.
    rows = []
    i = 0
    while i < len(parts):
        # Each row begins with an empty string (leading pipe separator).
        if parts[i] != "":
            # Missing leading empty part, prepend it.
            chunk = [""] + parts[i : i + 5]
            i += 5
        else:
            chunk = parts[i : i + 6]
            i += 6
        # Pad if needed
        while len(chunk) < 6:
            chunk.append("")
        row = build_row(chunk)
        if row:
            rows.append(row)
    return rows if rows else [line]


def process_file(path: Path) -> int:
    content = path.read_text(encoding="utf-8")
    lines = content.splitlines(keepends=True)
    in_api = False
    changed = 0
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
                changed += 1
            # Preserve newlines
            for k, out in enumerate(out_lines):
                if k < len(out_lines) - 1:
                    new_lines.append(out + "\n")
                else:
                    new_lines.append(out)
        else:
            new_lines.append(line)

    # Normalize line endings
    final_lines = []
    for i, ln in enumerate(new_lines):
        if i < len(new_lines) - 1 and not ln.endswith("\n"):
            ln += "\n"
        final_lines.append(ln)

    new_content = "".join(final_lines)
    if new_content != content:
        path.write_text(new_content, encoding="utf-8")
    return changed


if __name__ == "__main__":
    total = 0
    for name in TARGET_DIRS:
        path = BASE / name / "index.zh-CN.md"
        if path.exists():
            n = process_file(path)
            total += n
            print(f"{name}: {n} changed lines")
        else:
            print(f"{name}: NOT FOUND")
    print(f"Total changed lines: {total}")
