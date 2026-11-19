"""Build src/data/gazette-issues.json from the local Gazette PDF archive.

Usage: python3 scripts/build-gazette-index.py ~/Desktop/gazette_dataset

Expects <dataset>/<year>/Gazette_Issue_<n>.pdf. Page counts come from
macOS Spotlight (mdls), falling back to pdfinfo.
"""
import json, re, subprocess, sys
from pathlib import Path

# Processing state per year, from the thesis prototype record.
SEARCHABLE = {2025}  # OCR'd, embedded, searchable in the prototype
OCR_ONLY = {2024}    # OCR done, not yet loaded into search

def pages(pdf: Path) -> int:
    out = subprocess.run(["mdls", "-raw", "-name", "kMDItemNumberOfPages", str(pdf)],
                         capture_output=True, text=True).stdout.strip()
    if out.isdigit():
        return int(out)
    info = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True).stdout
    m = re.search(r"^Pages:\s+(\d+)", info, re.M)
    return int(m.group(1)) if m else 0

def main(root: Path):
    issues = []
    for year_dir in sorted(p for p in root.iterdir() if p.is_dir() and p.name.isdigit()):
        year = int(year_dir.name)
        state = "searchable" if year in SEARCHABLE else "ocr" if year in OCR_ONLY else "image"
        for pdf in sorted(year_dir.glob("Gazette_Issue_*.pdf"),
                          key=lambda p: int(re.search(r"(\d+)", p.stem).group(1))):
            n = int(re.search(r"(\d+)", pdf.stem).group(1))
            issues.append([year, n, pages(pdf), state])
    out = Path(__file__).resolve().parent.parent / "src/data/gazette-issues.json"
    out.write_text(json.dumps({
        "fields": ["year", "issue", "pages", "state"],
        "issues": issues,
    }, separators=(",", ":")))
    total = sum(i[2] for i in issues)
    print(f"{len(issues)} issues, {total} pages -> {out}")

if __name__ == "__main__":
    main(Path(sys.argv[1]).expanduser())
