"""Package an editable, self-contained project without caches or generated videos."""
from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]
output=root/'out/vividscales-ad/VividScales-30s-Remotion-Source.zip'
files=[root/name for name in ['package.json','package-lock.json','tsconfig.json','remotion.config.ts','.npmrc','.gitignore','AGENTS.md','README.md','README-Launch.md']]
for folder in ['src','public','scripts','docs']:
 files.extend(p for p in (root/folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
output.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as archive:
 for path in files: archive.write(path,Path('vividscales-videos')/path.relative_to(root))
with zipfile.ZipFile(output) as archive:
 assert archive.testzip() is None
 print(output, len(archive.namelist()), 'files')
