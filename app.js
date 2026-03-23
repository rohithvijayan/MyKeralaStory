// Configuration
const CONFIG = {
    SCHEMES_URL: 'schemes.json',
    API_URL: '/api/tagline',
    CARD_ID: 'render-card',
    PREVIEW_ID: 'card-preview-container',
    CAPTURE_DELAY: 1500,
    MAX_SCHEMES: 5,
    CONTRADICTIONS: [
        {
            opposition: "The opposition claims development is only on paper.",
            ldf: "LDF has delivered ₹50,000cr+ worth of infrastructure projects through KIIFB."
        },
        {
            opposition: "They say Kerala's fiscal health is failing.",
            ldf: "Kerala remains India's primary destination for high human development and social security."
        },
        {
            opposition: "Critics claim the welfare model is unsustainable.",
            ldf: "Our welfare pensions reach 60 lakh+ citizens, the largest such network in India."
        }
    ],
    FALLBACKS: {
        tagline: "As a {identity} in Kerala, you have seen a decade of real, tangible change. The LDF government invested in you — not in promises, but in programmes that changed real lives. Whether it was the hospital that didn't turn your family away, the school that gave your child a laptop, or the pension that helped your parents live with dignity — this government showed up. Your vote on election day is a choice about whether that story continues.",
    }
};

// Application State
let state = {
    age: 30,
    identities: new Set(),
    priorities: new Set(),
    showContradiction: false,
    schemes: [],
    selectedSchemes: [],
    tagline: '',
    cardBlob: null
};

// UI Elements
const elements = {
    ageInput: document.getElementById('age-slider'),
    ageValue: document.getElementById('age-val'),
    identityPillGroup: document.getElementById('identity-pills'),
    priorityPillGroup: document.getElementById('priority-pills'),
    contradictionToggle: document.getElementById('contradiction-toggle'),
    generateBtn: document.getElementById('generate-btn'),

    inputStep: document.getElementById('input-step'),
    resultsStep: document.getElementById('result'),
    narrativeText: document.getElementById('narrative-text'),
    schemesContainer: document.getElementById('schemes-container'),

    previewContainer: document.getElementById('card-preview-container'),
    renderCard: document.getElementById('render-card'),

    downloadBtn: document.getElementById('download-btn'),
    shareBtn: document.getElementById('share-btn'),
    resetBtn: document.getElementById('reset-btn'),
    waBtn: document.getElementById('wa-share'),
    twBtn: document.getElementById('tw-share')
};

// UI Data (Sync with Template)
const identities = [
    { id: "student", label: "Student", icon: "🎓" },
    { id: "farmer", label: "Farmer", icon: "🌾" },
    { id: "worker", label: "Worker / Labour", icon: "🔨" },
    { id: "woman", label: "Woman", icon: "👩" },
    { id: "fisherfolk", label: "Fisherfolk", icon: "🎣" },
    { id: "tribal", label: "Adivasi / Tribal", icon: "🌿" },
    { id: "senior", label: "Senior Citizen", icon: "👴" },
    { id: "small_biz", label: "Small Business", icon: "🏪" },
    { id: "disabled", label: "Person with Disability", icon: "♿" },
    { id: "youth", label: "Youth / Unemployed", icon: "⚡" },
    { id: "it_pro", label: "IT / Tech Pro", icon: "💻" },
    { id: "startup", label: "Startup / Entrepreneur", icon: "🚀" }
];

const priorities = [
    { id: "health", label: "Health", icon: "❤️" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "jobs", label: "Jobs", icon: "💼" },
    { id: "housing", label: "Housing", icon: "🏠" },
    { id: "welfare", label: "Welfare", icon: "🤝" },
    { id: "infrastructure", label: "Infrastructure", icon: "🛣️" }
];

// Initialize
(async function init() {
    try {
        const response = await fetch(CONFIG.SCHEMES_URL);
        state.schemes = await response.json();

        setupPills();
        attachEventListeners();
        updateAgeUI(state.age);
    } catch (err) {
        console.error('Failed to initialize app:', err);
    }
})();

function setupPills() {
    identities.forEach(id => {
        const btn = document.createElement('div');
        btn.className = 'pill';
        btn.innerHTML = `${id.icon} ${id.label}`;
        btn.onclick = () => toggleIdentity(id.id, btn);
        elements.identityPillGroup.appendChild(btn);
    });

    priorities.forEach(p => {
        const btn = document.createElement('div');
        btn.className = 'pill';
        btn.innerHTML = `${p.icon} ${p.label}`;
        btn.onclick = () => togglePriority(p.id, btn);
        elements.priorityPillGroup.appendChild(btn);
    });
}

function toggleIdentity(id, btn) {
    if (state.identities.has(id)) {
        state.identities.delete(id);
        btn.classList.remove('active');
    } else {
        state.identities.add(id);
        btn.classList.add('active');
    }
}

function togglePriority(id, btn) {
    if (state.priorities.has(id)) {
        state.priorities.delete(id);
        btn.classList.remove('active');
    } else {
        state.priorities.add(id);
        btn.classList.add('active');
    }
}

function attachEventListeners() {
    elements.ageInput.oninput = (e) => {
        state.age = e.target.value;
        updateAgeUI(state.age);
    };

    elements.contradictionToggle.onchange = (e) => {
        state.showContradiction = e.target.checked;
    };

    elements.generateBtn.onclick = generateStory;
    elements.downloadBtn.onclick = downloadCard;
    elements.shareBtn.onclick = shareCard;
    elements.resetBtn.onclick = resetApp;

    elements.waBtn.onclick = () => sharePlatform('whatsapp');
    elements.twBtn.onclick = () => sharePlatform('twitter');
}

function updateAgeUI(val) {
    elements.ageValue.textContent = val;
    const pct = ((val - 18) / (99 - 18)) * 100;
    elements.ageInput.style.setProperty('--pct', pct + '%');
}

async function generateStory() {
    if (state.identities.size === 0) {
        alert("Please select at least one identity.");
        return;
    }

    elements.generateBtn.disabled = true;
    elements.generateBtn.classList.add('loading');

    try {
        state.selectedSchemes = filterSchemes();
        state.tagline = await fetchTagline();

        // UI Reset for fresh results
        elements.narrativeText.textContent = '';
        elements.schemesContainer.innerHTML = '';
        elements.resultsStep.classList.remove('visible');

        // Rendering for Capture
        renderCardDOM();
        await new Promise(r => setTimeout(r, 500));
        await captureCard();

        // Show results
        elements.resultsStep.classList.add('visible');
        elements.resultsStep.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update Text
        document.getElementById('result-title').textContent = `Kerala's Promise to You, at ${state.age}`;
        const identityLabel = Array.from(state.identities).join(' & ');
        document.getElementById('result-subtitle').textContent = `As a ${identityLabel.toUpperCase()} — here's what LDF built for you`;

        // Typewriter Effect
        typeWriter(elements.narrativeText, state.tagline, 15);

        // Render Scheme Cards in Result
        renderSchemeCards();

    } catch (err) {
        console.error(err);
        alert("Generation failed. Please try again.");
    } finally {
        elements.generateBtn.disabled = false;
        elements.generateBtn.classList.remove('loading');
    }
}

function filterSchemes() {
    const scored = state.schemes.map(s => {
        let score = 0;
        state.identities.forEach(id => { if (s.tags.includes(id)) score += 3; });
        state.priorities.forEach(p => { if (s.sector.toLowerCase().includes(p.toLowerCase())) score += 2; });
        const age = parseInt(state.age);
        if (s.tags.includes('youth') && age <= 35) score += 2;
        if (s.tags.includes('senior') && age >= 60) score += 2;
        return { ...s, score };
    });

    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, CONFIG.MAX_SCHEMES);
}

async function fetchTagline() {
    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                age: state.age,
                identities: Array.from(state.identities),
                priorities: Array.from(state.priorities)
            })
        });
        const data = await response.json();
        return data.tagline || getFallbackTagline();
    } catch (e) {
        return getFallbackTagline();
    }
}

function getFallbackTagline() {
    const mainId = Array.from(state.identities)[0] || 'citizen';
    return CONFIG.FALLBACKS.tagline.replace('{identity}', mainId);
}

function typeWriter(el, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i++);
            setTimeout(type, speed);
        }
    }
    type();
}

function renderSchemeCards() {
    state.selectedSchemes.forEach((s, i) => {
        const card = document.createElement('div');
        card.className = 'scheme-card';
        card.style.animationDelay = `${0.3 + i * 0.1}s`;
        card.innerHTML = `
            <div class="year">${s.year}</div>
            <h4>${s.name}</h4>
            <p>${s.emotional}</p>
        `;
        elements.schemesContainer.appendChild(card);
    });
}

function renderCardDOM() {
    const mainId = Array.from(state.identities)[0] || 'citizen';
    const headline = `A KERALA FOR EVERY <span>${mainId.toUpperCase()}</span>`;

    const schemesHTML = state.selectedSchemes.map((s, i) => {
        const yearDisplay = (s.year && !String(s.year).includes('Not specified')) ? `(${s.year})` : '';
        return `
            <div class="scheme-row">
                <div class="scheme-num">${String(i + 1).padStart(2, '0')}</div>
                <div class="scheme-details">
                    <h3>${s.name} ${yearDisplay}</h3>
                    <p>${s.emotional}</p>
                </div>
            </div>
        `;
    }).join('');

    const voterProfileHTML = `<p class="voter-profile">PROFILE: <strong>${Array.from(state.identities).join(' • ').toUpperCase()}</strong> | AGE: <strong>${state.age}</strong></p>`;

    const cardContentHTML = `
        <div class="panel">
            <div class="story-card-content">
                <div class="card-header">
                    <div class="card-logo">★</div>
                    <div class="card-tag">MY KERALA STORY</div>
                </div>
                
                <h1 class="card-headline">${headline}</h1>
                <p class="card-ai-tagline">"${state.tagline.substring(0, 180)}${state.tagline.length > 180 ? '...' : ''}"</p>
                
                <div class="card-schemes-list">
                    ${schemesHTML}
                </div>

                <div class="card-footer">
                    ${voterProfileHTML}
                    <p class="card-url">LDF.KERALA</p>
                </div>
            </div>
        </div>
    `;

    const randomContra = CONFIG.CONTRADICTIONS[Math.floor(Math.random() * CONFIG.CONTRADICTIONS.length)];
    const contraPanelHTML = state.showContradiction ? `
        <div class="panel-divider"></div>
        <div class="panel contra-panel">
            <div class="contradiction-header">The Rebuttal</div>
            <div class="contra-box opposition-box">
                <span class="contra-label">THEY SAY</span>
                <p class="contra-text">"${randomContra.opposition}"</p>
            </div>
            <div class="contra-box ldf-box">
                <span class="contra-label">WE DELIVERED</span>
                <p class="contra-text">"${randomContra.ldf}"</p>
            </div>
            <div class="card-footer" style="margin-top: auto">
                <p class="card-url" style="font-size: 40px">VICTORY FOR TRUTH</p>
            </div>
        </div>
    ` : '';

    elements.renderCard.className = `story-card ${state.showContradiction ? 'dual-panel' : ''}`;
    elements.renderCard.innerHTML = `
        <div class="card-panels">
            ${cardContentHTML}
            ${contraPanelHTML}
        </div>
    `;
}

async function captureCard() {
    const isDual = state.showContradiction;
    const width = isDual ? 2160 : 1080;

    const canvas = await html2canvas(elements.renderCard, {
        width: width,
        height: 1350,
        scale: 1,
        useCORS: true,
        backgroundColor: '#0d0204'
    });

    elements.previewContainer.innerHTML = '';
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    elements.previewContainer.appendChild(canvas);

    canvas.toBlob(blob => {
        state.cardBlob = blob;
    }, 'image/png');
}

function downloadCard() {
    if (!state.cardBlob) return;
    const url = URL.createObjectURL(state.cardBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LDF_Story_Card_${Date.now()}.png`;
    a.click();
}

async function shareCard() {
    if (!state.cardBlob) return;
    const file = new File([state.cardBlob], 'my_kerala_story.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: 'My Kerala Story',
                text: 'See how the LDF government has shaped my life! #MyKeralaStory #LDF'
            });
        } catch (err) {
            console.error('Share failed:', err);
        }
    } else {
        alert("Native sharing not supported. Please download and share manually.");
    }
}

function sharePlatform(platform) {
    const text = encodeURIComponent("Check out my Kerala Story with LDF! #MyKeralaStory");
    const url = encodeURIComponent("https://keralastory.online");
    let shareUrl = '';
    switch (platform) {
        case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`; break;
        case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
    }
    window.open(shareUrl, '_blank');
}

function resetApp() {
    state.identities.clear();
    state.priorities.clear();
    state.cardBlob = null;
    state.tagline = '';
    state.age = 30;

    elements.ageInput.value = 30;
    updateAgeUI(30);
    elements.contradictionToggle.checked = false;
    state.showContradiction = false;

    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));

    elements.resultsStep.classList.remove('visible');
    setTimeout(() => {
        elements.resultsStep.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
}
