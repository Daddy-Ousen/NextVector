import os
import shutil
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

output_dir = Path("public/brand")
output_dir.mkdir(parents=True, exist_ok=True)

# Common SVG Mark
SVG_MARK = """<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="nvEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="60%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="nvCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#0891B2" />
    </linearGradient>
    <filter id="nvGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#10B981" flood-opacity="0.5" />
    </filter>
  </defs>
  <g filter="url(#nvGlow)">
    <rect x="14" y="18" width="15" height="64" rx="3.5" fill="url(#nvEmerald)" />
    <path d="M 27 18.5 C 28.5 17.5 30.8 17.8 32 19.5 L 53 58 L 53 79.5 C 53 81.5 51 83 49 82.5 L 43.5 81 C 42 80.5 40.8 79 40 77.5 L 22 30 C 21 28 21.8 25 24 23.5 Z" fill="url(#nvEmerald)" opacity="0.95" />
    <path d="M 51 18.5 C 52.8 17.2 55.2 17.2 57 18.5 L 87.5 46.5 C 89.5 48.2 89.5 51.8 87.5 53.5 L 57 81.5 C 55.2 82.8 52.8 82.8 51 81.5 L 47 77.5 C 45.2 75.8 45.2 73 47 71.2 L 69.5 50 L 47 28.8 C 45.2 27 45.2 24.2 47 22.5 Z" fill="url(#nvCyan)" />
    <circle cx="70.5" cy="50" r="4.2" fill="#09090B" stroke="#38BDF8" stroke-width="2.2" />
    <circle cx="70.5" cy="50" r="1.6" fill="#34D399" />
  </g>
</svg>"""

# 1. Dark Theme Masthead (1600 x 400 px, 4:1 standard Substack ratio, Centered)
HTML_DARK = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1600px;
      height: 400px;
      background: #09090B;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }}
    .glow-bg {{
      position: absolute;
      width: 700px;
      height: 400px;
      background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.16) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%);
      pointer-events: none;
    }}
    .grid-lines {{
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 32px 32px;
      pointer-events: none;
    }}
    .wordmark-container {{
      display: flex;
      align-items: center;
      gap: 40px;
      z-index: 10;
    }}
    .icon-wrapper {{
      width: 124px;
      height: 124px;
      flex-shrink: 0;
      background: rgba(18, 18, 22, 0.85);
      border: 1.5px solid rgba(52, 211, 153, 0.35);
      border-radius: 28px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.7), 0 0 24px rgba(16, 185, 129, 0.25);
    }}
    .text-column {{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}
    .top-eyebrow {{
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }}
    .eyebrow-tag {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #34D399;
    }}
    .eyebrow-divider {{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #06B6D4;
    }}
    .eyebrow-edition {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #71717A;
    }}
    .brand-name {{
      font-size: 80px;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1;
      display: flex;
      align-items: center;
    }}
    .brand-name .part-next {{
      color: #FFFFFF;
      text-shadow: 0 4px 18px rgba(0,0,0,0.5);
    }}
    .brand-name .part-vector {{
      background: linear-gradient(135deg, #A7F3D0 0%, #34D399 45%, #38BDF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding-left: 2px;
    }}
    .subline {{
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #94A3B8;
      letter-spacing: 0.04em;
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .subline .bullet {{
      color: #06B6D4;
      font-size: 14px;
    }}
  </style>
</head>
<body>
  <div class="glow-bg"></div>
  <div class="grid-lines"></div>
  <div class="wordmark-container">
    <div class="icon-wrapper">
      {SVG_MARK}
    </div>
    <div class="text-column">
      <div class="top-eyebrow">
        <span class="eyebrow-tag">SUBSTACK PUBLICATION</span>
        <span class="eyebrow-divider"></span>
        <span class="eyebrow-edition">THE MORNING VECTOR</span>
      </div>
      <div class="brand-name">
        <span class="part-next">Next</span><span class="part-vector">Vector</span>
      </div>
      <div class="subline">
        <span>Frontier AI &amp; Silicon Architectures</span>
        <span class="bullet">&bull;</span>
        <span>99%+ Signal Purity</span>
        <span class="bullet">&bull;</span>
        <span>Zero Hype</span>
      </div>
    </div>
  </div>
</body>
</html>"""

# 2. Transparent Full Wordmark (Tight crop with balanced padding)
HTML_TRANSPARENT_FULL = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: transparent;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: inline-flex;
      padding: 24px 36px;
    }}
    .wordmark-container {{
      display: flex;
      align-items: center;
      gap: 32px;
    }}
    .icon-wrapper {{
      width: 110px;
      height: 110px;
      flex-shrink: 0;
      filter: drop-shadow(0 6px 18px rgba(16, 185, 129, 0.4));
    }}
    .text-column {{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}
    .top-eyebrow {{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }}
    .eyebrow-tag {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #10B981;
    }}
    .eyebrow-divider {{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #06B6D4;
    }}
    .eyebrow-edition {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #94A3B8;
    }}
    .brand-name {{
      font-size: 76px;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1;
      display: flex;
      align-items: center;
    }}
    .brand-name .part-next {{
      color: #FFFFFF;
    }}
    .brand-name .part-vector {{
      background: linear-gradient(135deg, #34D399 0%, #06B6D4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding-left: 2px;
    }}
    .subline {{
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #CBD5E1;
      letter-spacing: 0.04em;
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .subline .bullet {{
      color: #38BDF8;
      font-size: 13px;
    }}
  </style>
</head>
<body>
  <div class="wordmark-container">
    <div class="icon-wrapper">
      {SVG_MARK}
    </div>
    <div class="text-column">
      <div class="top-eyebrow">
        <span class="eyebrow-tag">SUBSTACK PUBLICATION</span>
        <span class="eyebrow-divider"></span>
        <span class="eyebrow-edition">THE MORNING VECTOR</span>
      </div>
      <div class="brand-name">
        <span class="part-next">Next</span><span class="part-vector">Vector</span>
      </div>
      <div class="subline">
        <span>Frontier AI &amp; Silicon Architectures</span>
        <span class="bullet">&bull;</span>
        <span>99%+ Signal Purity</span>
        <span class="bullet">&bull;</span>
        <span>Zero Hype</span>
      </div>
    </div>
  </div>
</body>
</html>"""

# 3. Transparent Clean Minimalist Wordmark (The Gold Standard for Substack Header)
HTML_TRANSPARENT_CLEAN = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: transparent;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: inline-flex;
      padding: 16px 24px;
    }}
    .wordmark-container {{
      display: flex;
      align-items: center;
      gap: 24px;
    }}
    .icon-wrapper {{
      width: 90px;
      height: 90px;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 16px rgba(16, 185, 129, 0.45));
    }}
    .brand-name {{
      font-size: 80px;
      font-weight: 900;
      letter-spacing: -0.045em;
      line-height: 1;
      display: flex;
      align-items: center;
    }}
    .brand-name .part-next {{
      color: #FFFFFF;
    }}
    .brand-name .part-vector {{
      background: linear-gradient(135deg, #34D399 0%, #06B6D4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding-left: 2px;
    }}
  </style>
</head>
<body>
  <div class="wordmark-container">
    <div class="icon-wrapper">
      {SVG_MARK}
    </div>
    <div class="brand-name">
      <span class="part-next">Next</span><span class="part-vector">Vector</span>
    </div>
  </div>
</body>
</html>"""

# 4. Clean Minimalist Dark Masthead (1400 x 350 px, Centered)
HTML_CLEAN = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      width: 1400px;
      height: 350px;
      background: #09090B;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }}
    .glow {{
      position: absolute;
      width: 500px;
      height: 350px;
      background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.2) 0%, transparent 65%);
      pointer-events: none;
    }}
    .container {{
      display: flex;
      align-items: center;
      gap: 32px;
      z-index: 10;
    }}
    .icon {{
      width: 96px;
      height: 96px;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 16px rgba(16, 185, 129, 0.45));
    }}
    .brand {{
      display: flex;
      flex-direction: column;
    }}
    .name {{
      font-size: 78px;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1;
      color: #FFFFFF;
    }}
    .name span {{
      background: linear-gradient(135deg, #A7F3D0 0%, #34D399 50%, #38BDF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }}
    .tagline {{
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #34D399;
      margin-top: 8px;
    }}
  </style>
</head>
<body>
  <div class="glow"></div>
  <div class="container">
    <div class="icon">
      {SVG_MARK}
    </div>
    <div class="brand">
      <div class="name">Next<span>Vector</span></div>
      <div class="tagline">Intelligence Briefing &bull; The Morning Vector</div>
    </div>
  </div>
</body>
</html>"""

# 5. Transparent Light-Mode Wordmark (For white/light publication themes)
HTML_TRANSPARENT_LIGHT = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: transparent;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: inline-flex;
      padding: 24px 36px;
    }}
    .wordmark-container {{
      display: flex;
      align-items: center;
      gap: 32px;
    }}
    .icon-wrapper {{
      width: 110px;
      height: 110px;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 14px rgba(16, 185, 129, 0.35));
    }}
    .text-column {{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}
    .top-eyebrow {{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }}
    .eyebrow-tag {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #059669;
    }}
    .eyebrow-divider {{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #0891B2;
    }}
    .eyebrow-edition {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #64748B;
    }}
    .brand-name {{
      font-size: 76px;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1;
      display: flex;
      align-items: center;
    }}
    .brand-name .part-next {{
      color: #09090B;
    }}
    .brand-name .part-vector {{
      background: linear-gradient(135deg, #059669 0%, #0891B2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding-left: 2px;
    }}
    .subline {{
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #475569;
      letter-spacing: 0.04em;
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .subline .bullet {{
      color: #0891B2;
      font-size: 13px;
    }}
  </style>
</head>
<body>
  <div class="wordmark-container">
    <div class="icon-wrapper">
      {SVG_MARK}
    </div>
    <div class="text-column">
      <div class="top-eyebrow">
        <span class="eyebrow-tag">SUBSTACK PUBLICATION</span>
        <span class="eyebrow-divider"></span>
        <span class="eyebrow-edition">THE MORNING VECTOR</span>
      </div>
      <div class="brand-name">
        <span class="part-next">Next</span><span class="part-vector">Vector</span>
      </div>
      <div class="subline">
        <span>Frontier AI &amp; Silicon Architectures</span>
        <span class="bullet">&bull;</span>
        <span>99%+ Signal Purity</span>
        <span class="bullet">&bull;</span>
        <span>Zero Hype</span>
      </div>
    </div>
  </div>
</body>
</html>"""

# 6. Transparent Light-Mode Clean Wordmark (emblem + NextVector only)
HTML_TRANSPARENT_LIGHT_CLEAN = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: transparent;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      display: inline-flex;
      padding: 16px 24px;
    }}
    .wordmark-container {{
      display: flex;
      align-items: center;
      gap: 24px;
    }}
    .icon-wrapper {{
      width: 90px;
      height: 90px;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 14px rgba(16, 185, 129, 0.35));
    }}
    .brand-name {{
      font-size: 80px;
      font-weight: 900;
      letter-spacing: -0.045em;
      line-height: 1;
      display: flex;
      align-items: center;
    }}
    .brand-name .part-next {{
      color: #09090B;
    }}
    .brand-name .part-vector {{
      background: linear-gradient(135deg, #059669 0%, #0891B2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding-left: 2px;
    }}
  </style>
</head>
<body>
  <div class="wordmark-container">
    <div class="icon-wrapper">
      {SVG_MARK}
    </div>
    <div class="brand-name">
      <span class="part-next">Next</span><span class="part-vector">Vector</span>
    </div>
  </div>
</body>
</html>"""

def build_all():
    print("Building NextVector Substack Wordmark Suite...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        
        # 1. Dark Wordmark (1600x400 @ 2x = 3200x800, centered)
        page1 = browser.new_page(viewport={"width": 1600, "height": 400}, device_scale_factor=2)
        page1.set_content(HTML_DARK)
        page1.evaluate("document.fonts.ready")
        page1.wait_for_timeout(500)
        page1.screenshot(path=str(output_dir / "nextvector-wordmark-dark.png"), omit_background=False)
        print("[OK] nextvector-wordmark-dark.png (1600x400)")
        
        # 2. Transparent Full Wordmark - Dark Mode (Locator screenshot, tightly cropped)
        page2 = browser.new_page(viewport={"width": 1400, "height": 400}, device_scale_factor=2)
        page2.set_content(HTML_TRANSPARENT_FULL)
        page2.evaluate("document.fonts.ready")
        page2.wait_for_timeout(500)
        loc2 = page2.locator(".wordmark-container")
        loc2.screenshot(path=str(output_dir / "nextvector-wordmark-transparent.png"), omit_background=True)
        print("[OK] nextvector-wordmark-transparent.png (auto-cropped)")
        
        # 3. Transparent Clean Wordmark - Dark Mode (Locator screenshot, pure emblem + name)
        page3 = browser.new_page(viewport={"width": 1200, "height": 300}, device_scale_factor=2)
        page3.set_content(HTML_TRANSPARENT_CLEAN)
        page3.evaluate("document.fonts.ready")
        page3.wait_for_timeout(500)
        loc3 = page3.locator(".wordmark-container")
        loc3.screenshot(path=str(output_dir / "nextvector-wordmark-transparent-clean.png"), omit_background=True)
        print("[OK] nextvector-wordmark-transparent-clean.png (pure logo)")

        # 4. Transparent Light Mode Full Wordmark
        page4 = browser.new_page(viewport={"width": 1400, "height": 400}, device_scale_factor=2)
        page4.set_content(HTML_TRANSPARENT_LIGHT)
        page4.evaluate("document.fonts.ready")
        page4.wait_for_timeout(500)
        loc4 = page4.locator(".wordmark-container")
        loc4.screenshot(path=str(output_dir / "nextvector-wordmark-transparent-light.png"), omit_background=True)
        print("[OK] nextvector-wordmark-transparent-light.png (light theme)")

        # 5. Transparent Light Mode Clean Wordmark
        page5 = browser.new_page(viewport={"width": 1200, "height": 300}, device_scale_factor=2)
        page5.set_content(HTML_TRANSPARENT_LIGHT_CLEAN)
        page5.evaluate("document.fonts.ready")
        page5.wait_for_timeout(500)
        loc5 = page5.locator(".wordmark-container")
        loc5.screenshot(path=str(output_dir / "nextvector-wordmark-transparent-light-clean.png"), omit_background=True)
        print("[OK] nextvector-wordmark-transparent-light-clean.png (light theme clean)")
        
        # 6. Clean Minimalist Dark Masthead (1400x350 @ 2x, centered)
        page6 = browser.new_page(viewport={"width": 1400, "height": 350}, device_scale_factor=2)
        page6.set_content(HTML_CLEAN)
        page6.evaluate("document.fonts.ready")
        page6.wait_for_timeout(500)
        page6.screenshot(path=str(output_dir / "nextvector-wordmark-clean.png"), omit_background=False)
        print("[OK] nextvector-wordmark-clean.png (1400x350)")

        browser.close()

    # 5. Process 3D Renders
    artifact_3d = Path(r"C:\Users\rhasa\.gemini\antigravity\brain\e3b4c1d2-f6e3-49fe-b7e4-81494251bdd6\nextvector_wordmark_3d_1790043255531.jpg")
    dst_3d = output_dir / "nextvector-wordmark-3d.jpg"
    dst_3d_header = output_dir / "nextvector-wordmark-3d-header.jpg"
    
    if artifact_3d.exists():
        shutil.copyfile(artifact_3d, dst_3d)
        print("[OK] nextvector-wordmark-3d.jpg copied")
        
        # 4:1 Masthead Crop centered around logo
        im = Image.open(dst_3d)
        w, h = im.size
        header_h = w // 4  # 1376 // 4 = 344
        top = int((h - header_h) / 2)
        bottom = top + header_h
        crop = im.crop((0, top, w, bottom))
        crop.save(dst_3d_header, quality=95)
        print(f"[OK] nextvector-wordmark-3d-header.jpg created ({w}x{header_h})")

    # 6. Master Vector SVGs
    svg_clean = f"""<svg viewBox="0 0 760 120" width="760" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&amp;display=swap');
      .nv-wordmark-title {{
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-weight: 900;
        font-size: 78px;
        letter-spacing: -0.04em;
      }}
    </style>
    <linearGradient id="nvEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="60%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="nvCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#0891B2" />
    </linearGradient>
    <linearGradient id="nvTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
    <filter id="nvGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#10B981" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Emblem -->
  <g transform="translate(10, 10) scale(1.0)" filter="url(#nvGlow)">
    <rect x="14" y="18" width="15" height="64" rx="3.5" fill="url(#nvEmerald)" />
    <path d="M 27 18.5 C 28.5 17.5 30.8 17.8 32 19.5 L 53 58 L 53 79.5 C 53 81.5 51 83 49 82.5 L 43.5 81 C 42 80.5 40.8 79 40 77.5 L 22 30 C 21 28 21.8 25 24 23.5 Z" fill="url(#nvEmerald)" opacity="0.95" />
    <path d="M 51 18.5 C 52.8 17.2 55.2 17.2 57 18.5 L 87.5 46.5 C 89.5 48.2 89.5 51.8 87.5 53.5 L 57 81.5 C 55.2 82.8 52.8 82.8 51 81.5 L 47 77.5 C 45.2 75.8 45.2 73 47 71.2 L 69.5 50 L 47 28.8 C 45.2 27 45.2 24.2 47 22.5 Z" fill="url(#nvCyan)" />
    <circle cx="70.5" cy="50" r="4.2" fill="#09090B" stroke="#38BDF8" stroke-width="2.2" />
    <circle cx="70.5" cy="50" r="1.6" fill="#34D399" />
  </g>

  <!-- Wordmark Text -->
  <text x="135" y="82" class="nv-wordmark-title">
    <tspan fill="#FFFFFF">Next</tspan><tspan fill="url(#nvTextGrad)">Vector</tspan>
  </text>
</svg>
"""
    (output_dir / "nextvector-wordmark.svg").write_text(svg_clean, encoding="utf-8")
    print("[OK] nextvector-wordmark.svg created")

    svg_dark = f"""<svg viewBox="0 0 1200 300" width="1200" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&amp;display=swap');
      .nv-dark-title {{
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-weight: 900;
        font-size: 78px;
        letter-spacing: -0.04em;
      }}
      .nv-dark-sub {{
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        fill: #34D399;
      }}
    </style>
    <radialGradient id="nvDarkGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#09090B" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="nvEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="60%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="nvCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#0891B2" />
    </linearGradient>
    <linearGradient id="nvTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A7F3D0" />
      <stop offset="50%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <filter id="nvGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#10B981" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="#09090B" />
  <rect width="100%" height="100%" fill="url(#nvDarkGlow)" />

  <g transform="translate(320, 100)">
    <!-- Emblem -->
    <g transform="scale(1.0)" filter="url(#nvGlow)">
      <rect x="14" y="18" width="15" height="64" rx="3.5" fill="url(#nvEmerald)" />
      <path d="M 27 18.5 C 28.5 17.5 30.8 17.8 32 19.5 L 53 58 L 53 79.5 C 53 81.5 51 83 49 82.5 L 43.5 81 C 42 80.5 40.8 79 40 77.5 L 22 30 C 21 28 21.8 25 24 23.5 Z" fill="url(#nvEmerald)" opacity="0.95" />
      <path d="M 51 18.5 C 52.8 17.2 55.2 17.2 57 18.5 L 87.5 46.5 C 89.5 48.2 89.5 51.8 87.5 53.5 L 57 81.5 C 55.2 82.8 52.8 82.8 51 81.5 L 47 77.5 C 45.2 75.8 45.2 73 47 71.2 L 69.5 50 L 47 28.8 C 45.2 27 45.2 24.2 47 22.5 Z" fill="url(#nvCyan)" />
      <circle cx="70.5" cy="50" r="4.2" fill="#09090B" stroke="#38BDF8" stroke-width="2.2" />
      <circle cx="70.5" cy="50" r="1.6" fill="#34D399" />
    </g>

    <!-- Wordmark Text -->
    <text x="135" y="70" class="nv-dark-title">
      <tspan fill="#FFFFFF">Next</tspan><tspan fill="url(#nvTextGrad)">Vector</tspan>
    </text>
    <text x="138" y="98" class="nv-dark-sub">THE MORNING VECTOR • INTELLIGENCE BRIEFING</text>
  </g>
</svg>
"""
    (output_dir / "nextvector-wordmark-dark.svg").write_text(svg_dark, encoding="utf-8")
    print("[OK] nextvector-wordmark-dark.svg created")
    print("\nAll Substack wordmarks generated successfully!")

if __name__ == "__main__":
    build_all()
