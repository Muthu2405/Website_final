with open(r'D:\website\project\public\full.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<!-- ── TEAM ── -->' in line:
        start_idx = i
    if start_idx != -1 and '<!-- ── SERVICES (CAROUSEL) ── -->' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx]
    new_lines.append('        <!-- ── TEAM ── -->\n')
    new_lines.append('        <section id="team" class="section-padding bg-[#0b0e17]/30" style="position: relative; min-height: 800px;">\n')
    new_lines.append('            <div id="team-showcase-root" style="width: 100%; height: 100%; position: absolute; inset: 0;"></div>\n')
    new_lines.append('            <script type="module" src="/src/main-team.jsx"></script>\n')
    new_lines.append('        </section>\n\n')
    new_lines.extend(lines[end_idx:])
    with open(r'D:\website\project\public\full.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print('Replaced section.')
else:
    print(f'Failed to find section. Start: {start_idx}, End: {end_idx}')
