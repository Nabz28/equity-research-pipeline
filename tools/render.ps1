# Render a deck to PNGs and a PDF through PowerPoint COM, then build contact sheets.
#
#   powershell -ExecutionPolicy Bypass -File render.ps1 "$HOME\Downloads\ACME_Deck.pptx"
#
# Why COM and not a converter: the PDF a reader opens is then the same file I inspected,
# and the PNGs show exactly what PowerPoint does with my autofit assumptions.
# See ../docs/08-deck-pipeline.md.

param(
  [Parameter(Mandatory = $true)][string]$Pptx,
  [string]$OutDir = "",
  [int]$Width = 1600,
  [int]$Height = 900
)

$Pptx = (Resolve-Path $Pptx).Path
if ([string]::IsNullOrEmpty($OutDir)) {
  $OutDir = Join-Path (Split-Path $Pptx) ("out_" + [IO.Path]::GetFileNameWithoutExtension($Pptx))
}
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$pdf = [IO.Path]::ChangeExtension($Pptx, ".pdf")

$app = New-Object -ComObject PowerPoint.Application
try {
  # WithWindow:$false fails on some builds; opening normally is more reliable.
  $deck = $app.Presentations.Open($Pptx, $true, $false, $false)
  Write-Output ("slides: " + $deck.Slides.Count)

  $i = 1
  foreach ($slide in $deck.Slides) {
    $png = Join-Path $OutDir ("slide{0:d2}.png" -f $i)
    $slide.Export($png, "PNG", $Width, $Height)
    $i++
  }

  # 32 = ppSaveAsPDF
  $deck.SaveAs($pdf, 32)
  $deck.Close()
  Write-Output ("pngs: " + $OutDir)
  Write-Output ("pdf:  " + $pdf)
}
finally {
  $app.Quit()
  [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($app)
}

# Contact sheets, four slides each, so the whole deck can be eyeballed in three images.
$sheet = @'
import glob, os, sys
from PIL import Image
d = sys.argv[1]
files = sorted(glob.glob(os.path.join(d, "slide*.png")))
per, cols = 4, 2
for n in range(0, len(files), per):
    chunk = files[n:n + per]
    ims = [Image.open(f) for f in chunk]
    w, h = ims[0].size
    rows = (len(ims) + cols - 1) // cols
    sheet = Image.new("RGB", (w * cols, h * rows), (0, 0, 0))
    for i, im in enumerate(ims):
        sheet.paste(im, ((i % cols) * w, (i // cols) * h))
    out = os.path.join(d, "sheet%d.png" % (n // per + 1))
    sheet.resize((sheet.width // 2, sheet.height // 2)).save(out)
    print(out)
'@
$tmp = Join-Path $env:TEMP "contact_sheet.py"
Set-Content -Path $tmp -Value $sheet -Encoding utf8
python $tmp $OutDir
