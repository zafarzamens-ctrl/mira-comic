/* ---------- Drawing helpers (all SVG, comic style) ---------- */
const S = '#000';
const sw = 'stroke="#000" stroke-width="3" stroke-linejoin="round"';

const svg = (inner, vb = '0 0 400 300') =>
  `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

const rect = (x, y, w, h, fill, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

function rays(cx, cy, color, n = 24, r = 600, op = 0.18) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a1 = (i / n) * Math.PI * 2, a2 = a1 + Math.PI / n;
    d += `<polygon points="${cx},${cy} ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} ${cx + r * Math.cos(a2)},${cy + r * Math.sin(a2)}" fill="${color}" opacity="${op}"/>`;
  }
  return d;
}

function speedLines(x1, x2, y1, y2, n = 10, color = '#fff') {
  let d = '';
  for (let i = 0; i < n; i++) {
    const y = y1 + ((y2 - y1) * i) / n + (i % 3) * 5;
    const l = 40 + ((i * 37) % 80);
    const x = x1 + ((x2 - x1) * ((i * 53) % 100)) / 100;
    d += `<line x1="${x}" y1="${y}" x2="${x + l}" y2="${y}" stroke="${color}" stroke-width="2.5" opacity=".7"/>`;
  }
  return d;
}

function lamp(x, y, s = 1) {
  return `<g class="lamp">
    <circle cx="${x}" cy="${y - 92 * s}" r="${46 * s}" fill="url(#glow)"/>
    <rect x="${x - 2.5 * s}" y="${y - 90 * s}" width="${5 * s}" height="${90 * s}" fill="#222" stroke="#000" stroke-width="1.5"/>
    <circle cx="${x}" cy="${y - 94 * s}" r="${8 * s}" fill="#fff6a8" stroke="#000" stroke-width="2"/>
  </g>`;
}

function plain(horizon = 170, withLamps = true) {
  let d = rect(0, 0, 400, 300, '#0b0b14');
  d += `<ellipse cx="80" cy="${horizon - 10}" rx="120" ry="26" fill="#000" opacity=".8"/>`;
  d += `<ellipse cx="330" cy="${horizon - 20}" rx="110" ry="22" fill="#14141f"/>`;
  d += `<polygon points="0,${horizon} 400,${horizon} 400,300 0,300" fill="#1c1c26"/>`;
  [-300, -150, -20, 90, 200, 310, 420, 550, 700].forEach(x => {
    d += `<line x1="200" y1="${horizon}" x2="${x}" y2="300" stroke="#ffd23f" stroke-width="2.5" opacity=".8"/>`;
  });
  [horizon + 12, horizon + 30, horizon + 56, horizon + 92].forEach(y => {
    d += `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#ffd23f" stroke-width="2" opacity=".55"/>`;
  });
  if (withLamps) {
    d += lamp(120, horizon + 4, .5) + lamp(280, horizon + 4, .5);
    d += lamp(60, horizon + 40, .85) + lamp(340, horizon + 40, .85);
    d += lamp(10, horizon + 110, 1.4) + lamp(395, horizon + 110, 1.4);
  }
  return d;
}

function faceFeatures(mask, o = {}) {
  const eyeCol = o.eye || '#000';
  if (mask) {
    return `<ellipse cx="-6" cy="-3" rx="2.4" ry="3" fill="${eyeCol}"/><ellipse cx="6" cy="-3" rx="2.4" ry="3" fill="${eyeCol}"/>
      <path d="M-10 4 Q0 18 10 4 Z" fill="#fff" stroke="#000" stroke-width="2"/>
      <path d="M-6 6 L6 6" stroke="#000" stroke-width="1"/>`;
  }
  return `<ellipse cx="-6" cy="-3" rx="2.4" ry="3" fill="${eyeCol}"/><ellipse cx="6" cy="-3" rx="2.4" ry="3" fill="${eyeCol}"/>
    <path d="M-5 8 L5 8" stroke="#000" stroke-width="2" stroke-linecap="round"/>`;
}

function person(x, y, s = 1, o = {}) {
  const skin = o.skin || '#f1c9a5', body = o.body || '#2a4d8f', hair = o.hair || '#111';
  const hairBack = o.long
    ? `<path d="M-19 -100 Q-24 -60 -16 -48 L16 -48 Q24 -60 19 -100 Z" fill="${hair}" ${sw}/>` : '';
  const hairTop = o.bald ? '' :
    `<path d="M-18 -104 Q0 -130 18 -104 Q4 -112 -18 -104Z" fill="${hair}" ${sw}/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${hairBack}
    <rect x="-14" y="-40" width="10" height="40" fill="${o.pants || '#222'}" ${sw}/>
    <rect x="4" y="-40" width="10" height="40" fill="${o.pants || '#222'}" ${sw}/>
    <rect x="-19" y="-86" width="38" height="50" rx="7" fill="${body}" ${sw}/>
    <rect x="-27" y="-84" width="9" height="36" rx="4" fill="${body}" ${sw}/>
    <rect x="18" y="-84" width="9" height="36" rx="4" fill="${body}" ${sw}/>
    <g transform="translate(0 -100)">
      <circle r="18" fill="${skin}" ${sw}/>
      ${hairTop}
      ${faceFeatures(o.mask, o)}
    </g>
  </g>`;
}

const soldier = (x, y, s = 1) =>
  person(x, y, s, { body: '#f4f4f4', pants: '#333', mask: true, hair: '#222' });

function bigFace(cx, cy, r, o = {}) {
  const skin = o.skin || '#f1c9a5';
  let d = '';
  if (o.long) d += `<path d="M${cx - r - 14} ${cy} Q${cx - r - 20} ${cy + r * 2} ${cx - r * .6} ${cy + r * 2.2} L${cx + r * .6} ${cy + r * 2.2} Q${cx + r + 20} ${cy + r * 2} ${cx + r + 14} ${cy} Z" fill="${o.hair || '#111'}" ${sw}/>`;
  d += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.15}" fill="${skin}" ${sw}/>`;
  d += `<path d="M${cx - r} ${cy - r * .2} Q${cx} ${cy - r * 1.7} ${cx + r} ${cy - r * .2} Q${cx + r * .4} ${cy - r * .85} ${cx - r * .2} ${cy - r * .75} Q${cx - r * .7} ${cy - r * .7} ${cx - r} ${cy - r * .2}Z" fill="${o.hair || '#111'}" ${sw}/>`;
  return d;
}

function eye(cx, cy, rx, ry, iris = '#2d9c5a') {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" ${sw}/>
    <circle cx="${cx}" cy="${cy}" r="${ry * .75}" fill="${iris}" stroke="#000" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="${ry * .35}" fill="#000"/>
    <circle cx="${cx - ry * .25}" cy="${cy - ry * .25}" r="${ry * .15}" fill="#fff"/>`;
}

function smileMask(cx, cy, w, cracks = false) {
  let d = `<path d="M${cx - w} ${cy} Q${cx} ${cy + w * .95} ${cx + w} ${cy} Q${cx} ${cy + w * .25} ${cx - w} ${cy}Z" fill="#fff" ${sw}/>`;
  for (let i = -3; i <= 3; i++) d += `<line x1="${cx + i * w / 3.4}" y1="${cy + w * .12}" x2="${cx + i * w / 3.4}" y2="${cy + w * .5}" stroke="#000" stroke-width="1.5" opacity=".6"/>`;
  if (cracks) d += `<path d="M${cx - w * 1.6} ${cy - w * 1.6} L${cx - w * .6} ${cy - w * .6} L${cx - w * .9} ${cy + w * .3} L${cx - w * .2} ${cy + w * .8}" stroke="#000" stroke-width="3" fill="none"/>
    <path d="M${cx + w * 1.6} ${cy - w * 1.3} L${cx + w * .8} ${cy - w * .4} L${cx + w * 1.1} ${cy + w * .4}" stroke="#000" stroke-width="3" fill="none"/>`;
  return d;
}

const drip = (x, y, len = 40) =>
  `<path d="M${x} ${y} q-5 ${len * .6} 0 ${len} q5 -${len * .4} 0 -${len}z" fill="#c1121f" stroke="#000" stroke-width="1.5"/>`;

/* ---------- Scenes ---------- */
const art = {
  wide() {
    return svg(plain(150) + `<g class="runner">${soldier(210, 255, .8)}${soldier(250, 262, .85)}</g>
      <ellipse cx="200" cy="150" rx="260" ry="22" fill="#000" opacity=".5"/>`);
  },

  glassHouse() {
    let d = rect(0, 0, 400, 300, '#0b0b14') + rays(200, 150, '#2ec4d6', 18, 500, .08);
    d += rect(0, 245, 400, 55, '#1c1c26');
    d += `<rect x="30" y="60" width="340" height="190" fill="#7fd8ff" fill-opacity=".22" stroke="#2ec4d6" stroke-width="6"/>`;
    d += `<line x1="145" y1="60" x2="145" y2="250" stroke="#2ec4d6" stroke-width="2" opacity=".6"/><line x1="255" y1="60" x2="255" y2="250" stroke="#2ec4d6" stroke-width="2" opacity=".6"/>`;
    d += person(80, 245, 1.05, { body: '#2a4d8f', hair: '#bbb' });
    d += person(170, 245, .95, { body: '#8a4fa8', hair: '#999', long: true });
    d += person(240, 245, 1, { body: '#2f8f5b' });
    d += person(320, 245, .98, { body: '#c1121f', long: true, skin: '#f7ddd0' });
    d += `<polygon points="50,70 90,70 40,130" fill="#fff" opacity=".35"/><polygon points="300,70 340,70 290,140" fill="#fff" opacity=".3"/>`;
    // surveillance eye
    d += `<path d="M150 28 Q200 -8 250 28 Q200 62 150 28Z" fill="#fff" ${sw}/><circle cx="200" cy="28" r="14" fill="#e63946" stroke="#000" stroke-width="3"/><circle cx="200" cy="28" r="6" fill="#000"/>`;
    return svg(d);
  },

  eyes() {
    let d = rect(0, 0, 400, 300, '#e63946') + rect(0, 0, 400, 300, 'url(#dots)') + rays(200, 150, '#000', 20, 600, .25);
    d += `<rect x="20" y="95" width="360" height="110" fill="#f1c9a5" ${sw}/>`;
    d += `<path d="M30 90 L170 80" stroke="#000" stroke-width="10" stroke-linecap="round"/><path d="M230 80 L370 90" stroke="#000" stroke-width="10" stroke-linecap="round"/>`;
    d += eye(100, 150, 50, 28, '#2d9c5a') + eye(300, 150, 50, 28, '#2d9c5a');
    d += `<circle cx="100" cy="150" r="30" fill="none"/>`;
    return svg(d);
  },

  ministry() {
    let d = rect(0, 0, 400, 300, '#cdb98a') + rect(0, 0, 400, 300, 'url(#dots)');
    d += rect(0, 220, 400, 80, '#5b4b32');
    d += rect(25, 25, 120, 40, '#fff', sw) + `<text x="85" y="52" font-size="17" font-weight="900" text-anchor="middle" font-family="Vazirmatn">وزارت تبلیغات</text>`;
    d += rect(265, 40, 110, 150, '#8aa', sw) + `<line x1="320" y1="40" x2="320" y2="190" stroke="#000" stroke-width="3"/>`;
    d += person(150, 200, 1.9, { body: '#1d3557', mask: true });
    d += rect(40, 195, 260, 50, '#7a5c36', sw);
    d += `<rect x="90" y="175" width="60" height="22" fill="#fff" ${sw}/>`;
    return svg(d);
  },

  paper() {
    let d = rect(0, 0, 400, 300, '#222') + rays(200, 150, '#ffd23f', 16, 600, .12);
    d += `<g transform="rotate(-6 200 160)">`;
    for (let i = 0; i < 3; i++) d += rect(80 + i * 6, 55 + i * 5, 240, 200, '#fff', sw);
    for (let i = 0; i < 8; i++) d += `<path d="M110 ${95 + i * 20} q20 -8 40 0 t40 0 t40 0 t30 0" stroke="#000" stroke-width="3" fill="none"/>`;
    d += `</g>`;
    d += `<path d="M20 300 Q40 230 100 240 L120 300Z" fill="#f1c9a5" ${sw}/><path d="M380 300 Q360 230 300 240 L280 300Z" fill="#f1c9a5" ${sw}/>`;
    return svg(d);
  },

  miraLips() {
    let d = rect(0, 0, 400, 300, '#f4f4f4');
    d += rect(0, 0, 400, 300, 'url(#dots)');
    d += `<path d="M-10 -10 L410 -10 L410 140 Q300 70 200 120 Q100 70 -10 140Z" fill="#000" ${sw}/>`;
    d += `<path d="M110 110 Q200 70 290 110 Q300 220 200 250 Q100 220 110 110Z" fill="#f7ddd0" ${sw}/>`;
    d += `<path d="M130 130 Q200 100 270 130" stroke="#000" stroke-width="6" fill="none"/>`;
    d += eye(160, 155, 24, 13) + eye(240, 155, 24, 13);
    d += `<path d="M170 210 Q200 200 230 210 Q200 232 170 210Z" fill="#e63946" ${sw}/>`;
    d += drip(200, 232, 14);
    return svg(d);
  },

  soldiers() {
    let d = plain(130);
    d += speedLines(0, 300, 60, 290, 22);
    d += `<g class="runner">${soldier(90, 255, 1)}${soldier(175, 250, 1.05)}${soldier(260, 258, 1)}${soldier(340, 252, 1.05)}</g>`;
    return svg(d);
  },

  machine() {
    let d = rect(0, 0, 400, 300, '#2b2d42') + rays(200, 150, '#ffd23f', 18, 500, .1);
    d += rect(0, 245, 400, 55, '#1c1c26');
    d += `<rect x="90" y="80" width="220" height="165" rx="14" fill="#ffd23f" ${sw}/>`;
    d += `<circle cx="150" cy="150" r="40" fill="#e63946" ${sw}/><circle cx="150" cy="150" r="22" fill="#fff" ${sw}/><line x1="150" y1="150" x2="168" y2="136" stroke="#000" stroke-width="4"/>`;
    d += `<rect x="215" y="105" width="75" height="40" fill="#2ec4d6" ${sw}/>`;
    ['#e63946', '#fff', '#2ec4d6', '#1b9e5a'].forEach((c, i) => {
      d += `<circle class="lamp" cx="${225 + i * 20}" cy="180" r="8" fill="${c}" ${sw}/>`;
    });
    d += `<circle cx="250" cy="220" r="10" fill="#222" ${sw}/><circle cx="215" cy="220" r="10" fill="#222" ${sw}/>`;
    d += `<g transform="rotate(10 330 90)"><text x="330" y="70" font-size="34" font-family="Lalezar" fill="#fff" stroke="#000" stroke-width="2" text-anchor="middle">؟؟</text></g>`;
    return svg(d);
  },

  toyaSpit() {
    let d = rect(0, 0, 400, 300, '#e9f4ff') + rect(0, 0, 400, 300, 'url(#dots)') + rays(120, 150, '#ffd23f', 20, 600, .3);
    d += `<path d="M60 120 Q40 260 90 280 L180 280 Q210 240 190 120Z" fill="#ffd23f" ${sw}/>`;
    d += bigFace(125, 140, 62, { hair: '#ffd23f', skin: '#f7ddd0' });
    d += `<path d="M85 110 L115 124" stroke="#000" stroke-width="8" stroke-linecap="round"/><path d="M165 110 L135 124" stroke="#000" stroke-width="8" stroke-linecap="round"/>`;
    d += eye(100, 140, 14, 9, '#2a6fdb') + eye(150, 140, 14, 9, '#2a6fdb');
    d += `<path d="M105 188 Q125 175 148 188 Q125 205 105 188Z" fill="#7a1f1f" ${sw}/>`;
    d += `<circle cx="175" cy="188" r="6" fill="#bfe8ff" ${sw}/><circle cx="195" cy="182" r="4" fill="#bfe8ff" ${sw}/><circle cx="212" cy="178" r="3" fill="#bfe8ff" ${sw}/>`;
    d += person(310, 275, 1.5, { body: '#f4f4f4', mask: true });
    return svg(d);
  },

  toyaMask() {
    let d = rect(0, 0, 400, 300, '#1a1a22') + rays(200, 150, '#e63946', 22, 600, .2);
    d += bigFace(200, 130, 85, { hair: '#ffd23f', skin: '#f7ddd0', long: true });
    d += eye(165, 115, 18, 12, '#2a6fdb') + eye(235, 115, 18, 12, '#2a6fdb');
    d += smileMask(200, 165, 45, true);
    d += `<path d="M160 128 q-6 30 -2 50" stroke="#7fd8ff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>`;
    return svg(d);
  },

  surgery() {
    let d = rect(0, 0, 400, 300, '#0e1a22') + rays(200, 40, '#fff', 14, 700, .12);
    d += `<ellipse cx="200" cy="40" rx="90" ry="22" fill="#f4f4f4" ${sw}/><ellipse cx="200" cy="60" rx="60" ry="40" fill="#fff" opacity=".4"/>`;
    d += rect(40, 235, 320, 45, '#5c7480', sw);
    d += bigFace(200, 170, 62, { skin: '#f1c9a5' });
    d += eye(178, 160, 12, 8, '#444') + eye(222, 160, 12, 8, '#444');
    d += smileMask(200, 195, 34);
    for (let i = 0; i < 10; i++) {
      const a = Math.PI + (i / 9) * Math.PI;
      d += `<line x1="${200 + 44 * Math.cos(a)}" y1="${185 - 5 + 44 * Math.sin(a) * -0.2 + 8}" x2="${200 + 55 * Math.cos(a)}" y2="${185 + 55 * Math.sin(a) * -.1 + 20}" stroke="#000" stroke-width="2"/>`;
    }
    d += drip(165, 200, 24) + drip(235, 205, 18);
    d += person(60, 290, 2.1, { body: '#bfe8ff', mask: true, skin: '#eee' });
    d += person(340, 290, 2.1, { body: '#bfe8ff', mask: true, skin: '#eee' });
    d += `<polygon points="110,175 150,200 140,208" fill="#ddd" ${sw}/>`;
    return svg(d);
  },

  boegner() {
    let d = rect(0, 0, 400, 300, '#2b2d42') + rect(0, 0, 400, 300, 'url(#dots)');
    d += rect(0, 230, 400, 70, '#1c1c26');
    d += rect(70, 170, 260, 55, '#e8e8e8', sw);
    d += bigFace(145, 175, 28, { skin: '#d9b99a', hair: '#ddd' });
    d += `<line x1="130" y1="170" x2="140" y2="170" stroke="#000" stroke-width="3"/><line x1="152" y1="170" x2="162" y2="170" stroke="#000" stroke-width="3"/>`;
    d += `<path d="M175 190 L315 190 L315 225 L170 225Z" fill="#9aa" ${sw}/>`;
    d += soldier(40, 280, 1.4) + soldier(360, 280, 1.4);
    d += `<polygon points="60,160 78,150 82,170" fill="#fff" ${sw}/>`;
    return svg(d);
  },

  miraStrong() {
    let d = rect(0, 0, 400, 300, '#f4f4f4') + rect(0, 0, 400, 300, 'url(#dots)');
    d += `<polygon points="0,0 400,0 400,300 140,300" fill="#111"/>`;
    d += bigFace(190, 140, 78, { long: true, skin: '#f7ddd0' });
    d += `<path d="M120 115 L170 120" stroke="#000" stroke-width="8" stroke-linecap="round"/><path d="M260 115 L215 120" stroke="#000" stroke-width="8" stroke-linecap="round"/>`;
    d += eye(150, 140, 20, 12) + eye(230, 140, 20, 12);
    d += `<path d="M170 200 Q190 192 212 200" stroke="#e63946" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    return svg(d);
  },

  rodec() {
    let d = rect(0, 0, 400, 300, '#ffd23f') + rect(0, 0, 400, 300, 'url(#dots)') + rays(200, 150, '#fff', 20, 600, .35);
    d += person(150, 295, 2.3, { body: '#1d3557', mask: true, hair: '#111' });
    d += `<g transform="rotate(-12 320 80)"><text x="320" y="80" font-size="46" font-family="Lalezar" fill="#fff" stroke="#000" stroke-width="3" text-anchor="middle">ها ها!</text></g>`;
    d += person(330, 295, 1.4, { body: '#8a4fa8', mask: true, long: true, hair: '#999' });
    return svg(d);
  },

  drag() {
    let d = plain(150);
    d += person(200, 262, 1.4, { body: '#c1121f', long: true, skin: '#f7ddd0' });
    d += soldier(120, 268, 1.35) + soldier(280, 268, 1.35);
    d += `<polygon points="190,120 215,75 232,110 262,85 252,125 290,130 250,150 262,190 225,160 200,198 195,160 150,175 175,140 130,120Z" fill="#ffd23f" opacity=".0"/>`;
    return svg(d);
  },

  twoFaces() {
    let d = rect(0, 0, 400, 300, '#0b0b14') + rays(200, 150, '#e63946', 24, 600, .2);
    d += bigFace(110, 140, 62, { skin: '#f1c9a5' }) + bigFace(290, 140, 62, { long: true, skin: '#f7ddd0' });
    d += eye(90, 135, 12, 9, '#444') + eye(130, 135, 12, 9, '#444');
    d += eye(270, 135, 12, 9) + eye(310, 135, 12, 9);
    d += `<path d="M95 175 Q110 168 125 175" stroke="#000" stroke-width="4" fill="none"/><path d="M275 175 Q290 168 305 175" stroke="#e63946" stroke-width="5" fill="none"/>`;
    d += `<g transform="rotate(25 60 60)"><polygon points="40,40 75,50 60,80" fill="#fff" ${sw}/></g>`;
    d += `<polygon points="330,50 365,60 345,90" fill="#fff" ${sw}/><polygon points="215,30 245,38 225,62" fill="#fff" ${sw}/>`;
    d += drip(70, 190, 40) + drip(335, 185, 50) + drip(120, 195, 28);
    return svg(d);
  },

  finale() {
    let d = rect(0, 0, 400, 300, '#050508');
    d += `<polygon points="330,0 400,0 400,70 330,70" fill="none"/>`;
    d += `<polygon points="400,40 400,230 90,262 60,235" fill="#fff" opacity=".17" class="sweep"/>`;
    d += `<polygon points="0,200 400,200 400,300 0,300" fill="#1c1c26"/>`;
    [-200, 50, 200, 350, 600].forEach(x => d += `<line x1="200" y1="200" x2="${x}" y2="300" stroke="#ffd23f" stroke-width="2" opacity=".6"/>`);
    d += `<g transform="translate(260 60)"><rect x="30" y="50" width="20" height="130" fill="#333" ${sw}/>
      <rect x="-30" y="20" width="110" height="40" fill="#555" ${sw}/><rect x="-60" y="30" width="50" height="10" fill="#222" ${sw}/>
      ${person(60, 20, .8, { body: '#f4f4f4', mask: true })}</g>`;
    d += `<g class="runner">${person(100, 282, .9, { body: '#c1121f', long: true, skin: '#f7ddd0' })}${person(150, 282, .9, { body: '#2f8f5b' })}</g>`;
    [140, 175, 205, 230].forEach((x, i) => d += `<line x1="${x + 90}" y1="${95 + i * 8}" x2="${x - 80 + i * 10}" y2="${250 + i * 5}" stroke="#ffd23f" stroke-width="3" stroke-dasharray="8 8"/>`);
    return svg(d);
  },

  end() {
    return svg(rect(0, 0, 400, 300, '#000') + rays(200, 150, '#e63946', 16, 600, .2) +
      `<text x="200" y="175" font-size="110" font-family="Lalezar" fill="#ffd23f" stroke="#000" stroke-width="6" paint-order="stroke" text-anchor="middle">پایان</text>`);
  }
};

/* ---------- Story script ---------- */
const story = [
  {
    title: 'فصل ۱ · دشت',
    panels: [
      { w: 'w6', h: 'h3', art: 'wide', cap: 'در دشت به دنیا آمدم و غیر از آن چیزی نمی‌شناسم. مربع ۸۳۷-۳۳۳-۴ شرق.',
        sfx: [{ t: 'زززز…', s: 'bottom:12px;left:18px' }],
        bubbles: [{ t: 'چراغ‌ها هرگز خاموش نمی‌شوند.', c: 'think', s: 'top:90px;right:6%' }] },
      { w: 'w3', h: 'h2', art: 'glassHouse', cap: 'خانه‌ی ما دیوارهای شفاف دارد، تا هیچ‌کس نتواند خود را از چشم دیگری پنهان کند.',
        bubbles: [{ t: 'همه می‌دانند بدی در تنهایی خفته است!', c: '', s: 'bottom:18px;left:6%' }] },
      { w: 'w3', h: 'h2', art: 'eyes', cap: 'میرا…',
        bubbles: [{ t: 'از میرا می‌ترسم… نمی‌دانم چرا.', c: 'think', s: 'bottom:16px;left:8%' }] },
    ]
  },
  {
    title: 'فصل ۲ · کاغذ',
    panels: [
      { w: 'w2', h: 'h2', art: 'ministry', cap: 'وزارت تبلیغات: تنها جایی که کاغذ دارد.',
        bubbles: [{ t: 'چه نوع تبلیغاتی؟', c: '', s: 'bottom:14px;right:6%' }] },
      { w: 'w2', h: 'h2', art: 'paper', cap: 'ده ورق کاغذ…',
        bubbles: [{ t: 'می‌خواهم از خطرات تنهایی بنویسم.', c: '', s: 'bottom:14px;left:6%' }] },
      { w: 'w2', h: 'h2', art: 'miraLips', cap: 'میرا لب‌هایش را روی کاغذ گذاشت.',
        bubbles: [{ t: 'می‌خواهی کثیف‌شان کنی؟', c: 'tl', s: 'bottom:10px;right:4%' }],
        sfx: [{ t: 'آره.', s: 'top:100px;left:12px', r: '8deg' }] },
    ]
  },
  {
    title: 'فصل ۳ · سربازان',
    panels: [
      { w: 'w4', h: 'h2', art: 'soldiers', cap: 'سربازان در دشت می‌دوند. پیراهن سفید. کفش لاستیکی. بی‌صدا.',
        sfx: [{ t: 'هیــس!', s: 'top:24px;left:20px', r: '-10deg' }],
        bubbles: [{ t: 'دنبال که می‌گردند؟', c: 'think', s: 'bottom:18px;right:8%' }] },
      { w: 'w2', h: 'h2', art: 'machine', cap: 'ماشین دوست میرا: رنگارنگ و بی‌فایده. گناه بزرگ!',
        sfx: [{ t: 'ببپ!', s: 'bottom:10px;left:14px', r: '-6deg' }] },
    ]
  },
  {
    title: 'فصل ۴ · اصلاح',
    panels: [
      { w: 'w3', h: 'h2', art: 'toyaSpit', cap: 'مدرسه. تویا را مجبور کردند…',
        bubbles: [{ t: 'تو مرا پیدا خواهی کرد، مگر نه؟', c: '', s: 'bottom:14px;right:6%' }],
        sfx: [{ t: 'تف!', s: 'top:30px;right:20px', r: '10deg' }] },
      { w: 'w3', h: 'h2', art: 'toyaMask', cap: 'او را به «خانه‌ی اصلاح» بردند و با نقابی خندان برگرداندند. لبخند به صورتش جوش خورده بود.',
        bubbles: [{ t: '…', c: 'think', s: 'bottom:16px;left:8%' }] },
      { w: 'w6', h: 'h3', art: 'surgery', cap: 'اصلاح یعنی جراحی: مغز را زیر و رو می‌کنند و نقاب را به پوست می‌دوزند.',
        bubbles: [
          { t: 'همه‌چیز رو به راه است!', c: 'shout', s: 'top:70px;left:4%' },
          { t: 'دوستتان دارم.', c: 'shout', s: 'top:70px;right:4%' }
        ] },
    ]
  },
  {
    title: 'فصل ۵ · مرگ بوئنیه',
    panels: [
      { w: 'w3', h: 'h2', art: 'boegner', cap: 'بوئنیه پیر شده بود. دیگر به درد کار نمی‌خورد. آمپول زدند.',
        bubbles: [{ t: 'تنهایی گناه است، و با این حال من تنها می‌میرم.', c: '', s: 'top:16px;right:6%' }] },
      { w: 'w3', h: 'h2', art: 'miraStrong', cap: 'میرا:',
        bubbles: [{ t: 'من دئیردر نیستم. من میرا هستم.', c: 'shout', s: 'bottom:20px;right:4%' }] },
    ]
  },
  {
    title: 'فصل ۶ · رودک',
    panels: [
      { w: 'w3', h: 'h2', art: 'rodec', cap: 'جانشین بوئنیه آمد. مردی لاغر که هرگز از لبخند دست نمی‌کشید.',
        bubbles: [{ t: 'داستان بامزه‌ای شنیده‌ام!', c: '', s: 'top:16px;left:6%' }] },
      { w: 'w3', h: 'h2', art: 'drag', cap: 'شبی که نوشته‌ها را دید…',
        sfx: [{ t: 'بام!', s: 'top:20px;right:20px', r: '8deg' }],
        bubbles: [{ t: 'ادامه می‌دهم.', c: 'think', s: 'bottom:14px;left:6%' }] },
    ]
  },
  {
    title: 'فصل ۷ · نقاب‌ها',
    panels: [
      { w: 'w6', h: 'h2', art: 'twoFaces', cap: 'نقاب‌هایمان ترک خورده بود. با درد و خون، تکه‌تکه کندیمشان.',
        sfx: [{ t: 'کررراک!', s: 'top:20px;left:50%;transform:translateX(-50%) rotate(-6deg)' }] },
      { w: 'w6', h: 'h3', art: 'finale', cap: 'دشت. بتون. قیر داغ. و فراسوی آن…',
        sfx: [{ t: 'تاتاتاتا!', s: 'bottom:16px;right:20px', r: '-8deg' }],
        bubbles: [{ t: 'بیا!', c: 'shout', s: 'top:60px;left:8%' }] },
      { w: 'w6', h: 'h1', art: 'end' },
    ]
  }
];

/* ---------- Render ---------- */
const main = document.getElementById('story');
let html = '';
story.forEach(ch => {
  html += `<div class="chapter"><span>${ch.title}</span></div><section class="page">`;
  ch.panels.forEach((p, i) => {
    const rot = ((i * 7) % 3 - 1) * 0.4;
    html += `<div class="panel ${p.w} ${p.h}" style="--r:${rot}deg">${art[p.art]()}`;
    if (p.cap) html += `<div class="cap">${p.cap}</div>`;
    (p.bubbles || []).forEach(b => {
      html += `<div class="bubble ${b.c || ''}" style="${b.s}">${b.t}</div>`;
    });
    (p.sfx || []).forEach(f => {
      html += `<div class="sfx" style="${f.s};--sr:${f.r || '-8deg'}">${f.t}</div>`;
    });
    html += `</div>`;
  });
  html += `</section>`;
});
main.innerHTML = html;

/* Hero artwork */
document.getElementById('heroArt').innerHTML = svg(
  rect(0, 0, 800, 600, '#0a0a0f') + rays(400, 300, '#ffd23f', 28, 900, .07) +
  `<polygon points="0,380 800,380 800,600 0,600" fill="#16161f"/>` +
  [-600, -300, -80, 160, 400, 640, 880, 1100, 1400].map(x => `<line x1="400" y1="380" x2="${x}" y2="600" stroke="#ffd23f" stroke-width="3" opacity=".5"/>`).join('') +
  [120, 300, 500, 680].map((x, i) => lamp(x, 390 + (i % 2) * 20, 1.2 + (i % 2) * .3)).join('') +
  `<g transform="translate(-80 -60) scale(1.3)" opacity=".9">${soldier(120, 480, 1.6)}</g>` +
  `<g transform="translate(300 -70) scale(1.3)" opacity=".9">${soldier(480, 480, 1.6)}</g>`,
  '0 0 800 600'
);

/* Reveal on scroll */
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.panel').forEach(p => io.observe(p));
