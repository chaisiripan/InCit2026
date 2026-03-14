import os
import re

directory = r'd:\Incit2026\Web\incit2026'

new_sponsored_section = '''        <!-- Sponsored Section -->
        <section id="sponsors"
            style="padding: 4rem 0; background-color: #fff; text-align: center; border-top: 1px solid #eee;">
            <div class="container">
                <div class="section-title">
                    <h2 style="font-size: 2rem;">Sponsored InCIT 2026</h2>
                </div>
                <div
                    style="display: flex; justify-content: center; align-items: center; width: 100%; overflow: hidden; padding-top: 2rem;">
                    <div style="display: inline-flex; align-items: center; justify-content: center;">
                        <img src="img/IEEE.png" alt="IEEE Logo" style="height: 300px; width: auto; max-width: 800px; object-fit: contain; mix-blend-mode: multiply; filter: contrast(1.1) drop-shadow(0 6px 12px rgba(0,0,0,0.1)); image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; transform: translateZ(0); transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.1) translateZ(0)'" onmouseout="this.style.transform='scale(1) translateZ(0)'">
                    </div>
                </div>
            </div>
        </section>'''

pattern = re.compile(r'<!-- Sponsored Section -->\s*<section id="sponsors".*?</section>', re.DOTALL)

count = 0
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '<!-- Sponsored Section -->' in content:
            new_content = pattern.sub(new_sponsored_section, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")
                count += 1

print(f"Total files updated: {count}")
