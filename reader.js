/* extra scenes for the reader edition */
Object.assign(art, {
  night() {
    let d = rect(0, 0, 400, 300, '#0a0a14');
    d += `<rect x="230" y="30" width="140" height="110" fill="#0b0b14" stroke="#2ec4d6" stroke-width="6"/>`;
    d += `<line x1="300" y1="30" x2="300" y2="140" stroke="#2ec4d6" stroke-width="3"/><line x1="230" y1="85" x2="370" y2="85" stroke="#2ec4d6" stroke-width="3"/>`;
    d += lamp(265, 130, .5) + lamp(335, 130, .5);
    d += `<g transform="translate(300 85)"><circle r="0"/></g>`;
    d += rect(0, 200, 400, 100, '#1c1c26');
    d += rect(20, 170, 200, 50, '#e8e0cc', sw);
    d += rect(20, 150, 200, 30, '#6b5a3a', sw);
    d += `<ellipse cx="60" cy="165" rx="26" ry="14" fill="#f7ddd0" ${sw}/><path d="M34 160 Q60 140 86 160 Q90 175 84 178 L40 178Z" fill="#111" ${sw}/>`;
    d += `<g transform="translate(300 252)"><rect x="-26" y="-16" width="52" height="22" fill="#f4f4f4" ${sw}/></g>`;
    d += `<circle cx="340" cy="60" r="26" fill="url(#glow)"/>`;
    return svg(d);
  },
  chair() {
    let d = rect(0, 0, 400, 300, '#2a1a3a') + rays(200, 140, '#b57bff', 20, 500, .15);
    d += rect(0, 235, 400, 65, '#1c1c26');
    d += `<path d="M120 150 L290 150 L310 210 L120 210Z" fill="#3b6fa0" ${sw}/><rect x="90" y="80" width="40" height="130" rx="10" fill="#3b6fa0" ${sw}/>`;
    d += `<rect x="190" y="210" width="20" height="40" fill="#555" ${sw}/><rect x="150" y="248" width="100" height="10" fill="#333" ${sw}/>`;
    d += person(200, 150, .8, { body: '#f1c9a5', pants: '#f1c9a5' });
    d += `<ellipse cx="330" cy="215" rx="42" ry="26" fill="#b57bff" opacity=".55" ${sw}/>`;
    d += `<path d="M300 200 q10 -30 20 0" fill="none" stroke="#fff" stroke-width="3"/>`;
    return svg(d);
  },
  chase() {
    let d = plain(150) + speedLines(0, 300, 80, 280, 14);
    d += `<g class="runner">${person(240, 262, 1.5, { body: '#e63946', long: true, skin: '#f7ddd0' })}</g>`;
    d += `<g class="runner">${soldier(90, 262, 1.2)}${soldier(40, 270, 1.15)}</g>`;
    return svg(d);
  },
  bath() {
    let d = rect(0, 0, 400, 300, '#cfeaf0') + rect(0, 0, 400, 300, 'url(#dots)');
    d += `<rect x="30" y="150" width="340" height="110" rx="30" fill="#fff" ${sw}/>`;
    d += `<rect x="46" y="166" width="308" height="80" rx="22" fill="#7fd8ff" ${sw}/>`;
    d += `<path d="M120 190 Q200 160 280 190 Q300 215 270 220 L130 220 Q100 215 120 190Z" fill="#111" ${sw}/>`;
    d += `<circle cx="150" cy="170" r="20" fill="#f7ddd0" ${sw}/><circle cx="260" cy="175" r="16" fill="#f1c9a5" ${sw}/>`;
    d += `<path d="M110 210 Q130 200 150 210" fill="none" stroke="#c1121f" stroke-width="5"/>`;
    d += `<g class="lamp"><ellipse cx="200" cy="120" rx="30" ry="10" fill="#fff" opacity=".5"/><ellipse cx="240" cy="100" rx="22" ry="7" fill="#fff" opacity=".4"/></g>`;
    d += `<circle cx="70" cy="100" r="12" fill="#e63946" opacity=".6"/>`;
    return svg(d);
  },
  cellar() {
    let d = rect(0, 0, 400, 300, '#2a1c10') + rect(0, 0, 400, 300, 'url(#dots)');
    d += `<rect x="0" y="0" width="400" height="60" fill="#1c1c26"/>`;
    d += `<polygon points="130,60 270,60 330,300 70,300" fill="#0a0a0a" ${sw}/>`;
    d += `<ellipse cx="200" cy="60" rx="70" ry="12" fill="#000" ${sw}/>`;
    d += person(200, 280, 1.1, { body: '#777', skin: '#c9a380', bald: true });
    d += `<rect x="150" y="262" width="26" height="10" rx="4" fill="#f1d59f" ${sw}/>`;
    d += `<circle cx="200" cy="20" r="18" fill="url(#glow)"/>`;
    return svg(d);
  },
  wall() {
    let d = rect(0, 0, 400, 300, '#0b0b14') + rays(200, 150, '#2ec4d6', 16, 500, .12);
    d += `<rect x="40" y="40" width="320" height="220" fill="#7fd8ff" fill-opacity=".25" stroke="#2ec4d6" stroke-width="8"/>`;
    d += `<path d="M200 40 L180 110 L220 150 L190 210 L205 260" stroke="#fff" stroke-width="4" fill="none"/>`;
    d += `<path d="M180 110 L120 120 L90 170" stroke="#fff" stroke-width="3" fill="none"/>`;
    d += `<path d="M220 150 L290 140 L330 190" stroke="#fff" stroke-width="3" fill="none"/>`;
    d += person(110, 280, 1.2, { body: '#e63946', long: true, skin: '#f7ddd0' });
    d += person(290, 280, 1.2, { body: '#2a4d8f' });
    return svg(d);
  },
  lab() {
    let d = rect(0, 0, 400, 300, '#e9eef1') + rect(0, 0, 400, 300, 'url(#dots)');
    d += rect(0, 240, 400, 60, '#9fb2ba');
    d += `<rect x="30" y="40" width="180" height="200" fill="#7fd8ff" fill-opacity=".35" stroke="#555" stroke-width="5"/>`;
    d += person(110, 240, 1.4, { body: '#f4f4f4', skin: '#ccc', bald: true });
    d += `<rect x="80" y="86" width="60" height="14" fill="#ffd23f" ${sw}/>`;
    d += person(300, 280, 1.5, { body: '#8a4fa8', hair: '#111' });
    d += `<rect x="265" y="145" width="20" height="12" fill="#fff" ${sw}/>`;
    d += `<text x="330" y="60" font-size="30" font-family="Lalezar" fill="#e63946" stroke="#000" stroke-width="1.5">تست</text>`;
    return svg(d);
  },
  hallu() {
    let d = rect(0, 0, 400, 300, '#2a0a3a');
    d += rays(200, 150, '#ffd23f', 12, 500, .18) + rays(200, 150, '#2ec4d6', 12, 500, .14);
    [['#e63946',90,110,60],['#ffd23f',250,80,50],['#2ec4d6',300,200,70],['#8a4fa8',120,230,55],['#1b9e5a',200,150,40]].forEach(([c,x,y,r]) => {
      d += `<circle class="lamp" cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".6" ${sw}/>`;
    });
    d += person(200, 290, 1.5, { body: '#fff', skin: '#eee' });
    return svg(d);
  },
  smileLine() {
    let d = rect(0, 0, 400, 300, '#ffe9a8') + rect(0, 0, 400, 300, 'url(#dots)');
    d += rays(200, 150, '#fff', 18, 500, .5);
    [60, 140, 220, 300].forEach((x, i) => {
      d += `<g transform="translate(${x} 150)"><circle r="42" fill="#f7ddd0" ${sw}/>` +
        `<ellipse cx="-14" cy="-8" rx="4" ry="5" fill="#000"/><ellipse cx="14" cy="-8" rx="4" ry="5" fill="#000"/>` +
        `<path d="M-24 8 Q0 36 24 8 Q0 18 -24 8Z" fill="#fff" ${sw}/></g>`;
    });
    d += `<g transform="rotate(-6 200 40)"><text x="200" y="50" text-anchor="middle" font-size="40" font-family="Lalezar" fill="#e63946" stroke="#000" stroke-width="2.5" paint-order="stroke">ها ها ها!</text></g>`;
    return svg(d);
  }
});

/* ---------- Reader ---------- */
const readerEl = document.getElementById('reader');
let rh = '';
STORY.forEach((s, idx) => {
  if (s.c) rh += `<div class="chapter"><span>${s.c}</span></div>`;
  const paras = s.t.trim().split('\n').map(x => x.trim()).filter(Boolean);
  const body = paras.map(p => {
    if (p.startsWith('—')) return `<p class="say">${p.replace(/^—\s*/, '')}</p>`;
    return `<p>${p}</p>`;
  }).join('');
  const fn = art[s.a] || art.wide;
  if (s.a === 'end') {
    rh += `<section class="rpage rend"><div class="rart end">${fn()}</div></section>`;
  } else {
    rh += `<section class="rpage ${idx % 2 ? 'flip' : ''}">
      <div class="rart">${fn()}</div>
      <div class="rtext">${body}</div>
    </section>`;
  }
});
readerEl.innerHTML = rh;

const ioR = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); ioR.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.rpage').forEach(p => ioR.observe(p));

/* Tabs */
const tabFull = document.getElementById('tabFull'), tabSum = document.getElementById('tabSum');
const storyEl = document.getElementById('story');
tabFull.onclick = () => {
  readerEl.classList.remove('hidden'); storyEl.classList.add('hidden');
  tabFull.classList.add('on'); tabSum.classList.remove('on');
};
tabSum.onclick = () => {
  storyEl.classList.remove('hidden'); readerEl.classList.add('hidden');
  tabSum.classList.add('on'); tabFull.classList.remove('on');
  document.querySelectorAll('#story .panel').forEach(p => p.classList.add('show'));
};
