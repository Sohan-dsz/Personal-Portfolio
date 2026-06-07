#!/usr/bin/env bash
# Generates placeholder project screenshot images (JPG) used by the Projects
# carousel. These are branded mockups meant to be replaced with real
# screenshots later (drop files in public/projects/ with the same names).
set -euo pipefail

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/projects"
mkdir -p "$OUT_DIR"
TMP="$(mktemp -d)"

W=1280
H=800

# slug|title|subtitle|c1|c2
PROJECTS=(
  "emobhaava|EmoBhaava|Kannada Sentiment & Sarcasm NLP|#a855f7|#22d3ee"
  "healthmate|HealthMate|Multimodal AI Health Companion|#22d3ee|#10b981"
  "alzheimers-classification|Alzheimer's Classification|MRI Deep Learning Pipeline|#8b5cf6|#a855f7"
  "salesforce-crm|Salesforce CRM Solution|Automation & Dashboards|#00d4ff|#14b8a6"
  "baja-saeindia|BAJA SAEINDIA Project|Off-road Vehicle Engineering|#f59e0b|#ef4444"
)

# Layout variants per screenshot index (1..3)
labels=("Overview" "Details" "Analytics")

esc() { echo "$1" | sed 's/&/\&amp;/g'; }

gen_svg() {
  local title="$1" subtitle="$2" c1="$3" c2="$4" idx="$5" label="$6"
  local te se le
  te="$(esc "$title")"; se="$(esc "$subtitle")"; le="$(esc "$label")"

  # Build variant body
  local body=""
  if [ "$idx" = "1" ]; then
    # Dashboard: sidebar + 3 stat cards + 2 panels
    body+='<rect x="64" y="200" width="240" height="520" rx="20" fill="#ffffff" opacity="0.05"/>'
    for r in 0 1 2 3; do
      body+="<rect x=\"88\" y=\"$((232 + r*70))\" width=\"192\" height=\"40\" rx=\"10\" fill=\"#ffffff\" opacity=\"0.07\"/>"
    done
    for c in 0 1 2; do
      body+="<rect x=\"$((344 + c*290))\" y=\"200\" width=\"260\" height=\"150\" rx=\"20\" fill=\"url(#card)\" opacity=\"0.18\"/>"
      body+="<rect x=\"$((368 + c*290))\" y=\"232\" width=\"120\" height=\"22\" rx=\"6\" fill=\"#ffffff\" opacity=\"0.5\"/>"
      body+="<rect x=\"$((368 + c*290))\" y=\"276\" width=\"170\" height=\"40\" rx=\"8\" fill=\"#ffffff\" opacity=\"0.18\"/>"
    done
    body+='<rect x="344" y="384" width="550" height="336" rx="20" fill="#ffffff" opacity="0.05"/>'
    body+='<rect x="924" y="384" width="292" height="336" rx="20" fill="#ffffff" opacity="0.05"/>'
  elif [ "$idx" = "2" ]; then
    # Detail: big hero panel + list rows
    body+='<rect x="64" y="200" width="700" height="520" rx="24" fill="url(#card)" opacity="0.16"/>'
    body+='<circle cx="180" cy="320" r="64" fill="#ffffff" opacity="0.18"/>'
    body+='<rect x="280" y="280" width="360" height="28" rx="8" fill="#ffffff" opacity="0.55"/>'
    body+='<rect x="280" y="324" width="420" height="20" rx="6" fill="#ffffff" opacity="0.25"/>'
    body+='<rect x="104" y="430" width="620" height="16" rx="6" fill="#ffffff" opacity="0.18"/>'
    body+='<rect x="104" y="466" width="600" height="16" rx="6" fill="#ffffff" opacity="0.18"/>'
    body+='<rect x="104" y="502" width="560" height="16" rx="6" fill="#ffffff" opacity="0.18"/>'
    for r in 0 1 2 3; do
      body+="<rect x=\"804\" y=\"$((200 + r*132))\" width=\"412\" height=\"108\" rx=\"16\" fill=\"#ffffff\" opacity=\"0.06\"/>"
      body+="<circle cx=\"858\" cy=\"$((254 + r*132))\" r=\"26\" fill=\"url(#card)\" opacity=\"0.5\"/>"
      body+="<rect x=\"900\" y=\"$((236 + r*132))\" width=\"180\" height=\"18\" rx=\"6\" fill=\"#ffffff\" opacity=\"0.45\"/>"
      body+="<rect x=\"900\" y=\"$((266 + r*132))\" width=\"260\" height=\"14\" rx=\"6\" fill=\"#ffffff\" opacity=\"0.2\"/>"
    done
  else
    # Analytics: chart bars + line + legend
    body+='<rect x="64" y="200" width="760" height="520" rx="24" fill="#ffffff" opacity="0.05"/>'
    local bx
    local heights=(180 320 240 380 300 420 260 360)
    for i in 0 1 2 3 4 5 6 7; do
      local hgt=${heights[$i]}
      bx=$((112 + i*88))
      body+="<rect x=\"$bx\" y=\"$((680 - hgt))\" width=\"52\" height=\"$hgt\" rx=\"10\" fill=\"url(#card)\" opacity=\"0.7\"/>"
    done
    body+='<polyline points="138,520 226,440 314,470 402,360 490,400 578,300 666,340 754,260" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="4"/>'
    body+='<rect x="864" y="200" width="352" height="520" rx="24" fill="#ffffff" opacity="0.05"/>'
    for r in 0 1 2 3; do
      body+="<circle cx=\"904\" cy=\"$((256 + r*90))\" r=\"12\" fill=\"url(#card)\"/>"
      body+="<rect x=\"930\" y=\"$((246 + r*90))\" width=\"240\" height=\"16\" rx=\"6\" fill=\"#ffffff\" opacity=\"0.3\"/>"
    done
  fi

  cat > "$TMP/img.svg" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="$W" height="$H" viewBox="0 0 $W $H">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e1a"/>
      <stop offset="100%" stop-color="#10081f"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="$c1"/>
      <stop offset="100%" stop-color="$c2"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="0%" r="80%">
      <stop offset="0%" stop-color="$c1" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="$c1" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="$W" height="$H" fill="url(#bg)"/>
  <rect width="$W" height="$H" fill="url(#glow)"/>
  <!-- window chrome -->
  <rect x="32" y="28" width="$((W-64))" height="$((H-56))" rx="28" fill="#ffffff" opacity="0.03"/>
  <circle cx="80" cy="84" r="9" fill="#ef4444"/>
  <circle cx="112" cy="84" r="9" fill="#f59e0b"/>
  <circle cx="144" cy="84" r="9" fill="#22c55e"/>
  <rect x="200" y="70" width="880" height="28" rx="14" fill="#ffffff" opacity="0.06"/>
  <line x1="32" y1="128" x2="$((W-32))" y2="128" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>
  <!-- header text -->
  <text x="64" y="172" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff">$te</text>
  <text x="$((W-64))" y="172" text-anchor="end" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="$c1">$le &#183; $idx / 3</text>
  $body
  <text x="64" y="772" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="20" fill="#ffffff" fill-opacity="0.45">$se</text>
</svg>
SVG
}

for entry in "${PROJECTS[@]}"; do
  IFS='|' read -r slug title subtitle c1 c2 <<< "$entry"
  for idx in 1 2 3; do
    label="${labels[$((idx-1))]}"
    gen_svg "$title" "$subtitle" "$c1" "$c2" "$idx" "$label"
    rsvg-convert -w "$W" -h "$H" "$TMP/img.svg" -o "$TMP/img.png"
    convert "$TMP/img.png" -quality 88 "$OUT_DIR/${slug}-${idx}.jpg"
    echo "generated ${slug}-${idx}.jpg"
  done
done

rm -rf "$TMP"
echo "Done. Images in $OUT_DIR"
