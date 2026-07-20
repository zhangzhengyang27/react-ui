#!/usr/bin/env python3
"""Wrap unwrapped boolean/string/number/array defaults in API tables."""

import re
from pathlib import Path

TARGET_DIRS = [
    "multi-select", "slider", "pill", "unstyled-button", "splitter",
    "hover-card", "ring-progress", "pie-chart", "chip", "funnel-chart",
    "overflow-list", "sparkline", "file-input", "stepper", "radar-chart",
    "table", "carousel", "background-image", "combobox", "theme-icon"
]

BASE = Path("/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/docs/components")

# Match a default value that should be wrapped.
# We intentionally do NOT wrap values that are already wrapped or are `—`.
WRAP_RE = re.compile(r"^(.*\|)\s*(—|true|false|\d+(\.\d+)?|'[^']+'|\[[^\]]*\])\s*\|?$")

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

def wrap_default(line: str) -> str:
    """Wrap the last column of a 4-column markdown table row if needed."""
    if not line.strip().startswith("|"):
        return line
    parts = [p.strip() for p in line.split("|")]
    # parts like ['', 'prop', 'desc', 'type', 'default', '']
    if len(parts) < 5:
        return line
    default = parts[-2]
    if should_wrap(default):
        parts[-2] = f"`{default}`"
        return "| " + " | ".join(parts[1:-1]) + " |"
    return line

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
            new_line = wrap_default(line)
            if new_line != line:
                changed += 1
            new_lines.append(new_line)
        else:
            new_lines.append(line)

    if changed:
        path.write_text("".join(new_lines), encoding="utf-8")
    return changed

if __name__ == "__main__":
    total = 0
    for name in TARGET_DIRS:
        path = BASE / name / "index.zh-CN.md"
        if path.exists():
            n = process_file(path)
            total += n
            print(f"{name}: {n} changes")
        else:
            print(f"{name}: NOT FOUND")
    print(f"Total: {total}")
