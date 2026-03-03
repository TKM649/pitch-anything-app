/* ==========================================================
   PITCH ANYTHING — Interactive Learning App
   JavaScript: Initialization & Core Variables
   ========================================================== */

'use strict';

// ===== STORAGE KEY =====
const STORAGE_KEY = 'pitchAnything_progress';

// ===== DOM REFERENCES =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const DOM = {
    // Splash
    splashScreen:     $('#splashScreen'),
    startBtn:         $('#startLearningBtn'),

    // App shell
    app:              $('#app'),
    sidebar:          $('#sidebar'),
    sidebarOverlay:   $('#sidebarOverlay'),
    menuToggle:       $('#menuToggle'),
    mainContent:      $('#mainContent'),

    // Progress
    progressPercent:  $('#progressPercent'),
    progressFill:     $('#progressFill'),
    progressDetail:   $('#progressDetail'),
    mobileProgress:   $('#mobileProgress'),

    // Navigation
    chapterNav:       $('#chapterNav'),
    resetBtn:         $('#resetProgressBtn'),

    // Feedback
    toastContainer:   $('#toastContainer'),
    confettiCanvas:   $('#confettiCanvas'),
};

// ===== APP STATE =====
const state = {
    currentChapter: null,   // index of active chapter (0-based)
    completed: [],          // array of completed chapter indices
    quizScores: {},         // { chapterIndex: { score, total } }
    sidebarOpen: false,     // mobile sidebar toggle
};

// ===== CHAPTER COLORS (match CSS --ch1 through --ch8) =====
const CHAPTER_COLORS = [
    '#6366f1', // Ch 1 — indigo
    '#ec4899', // Ch 2 — pink
    '#f59e0b', // Ch 3 — amber
    '#10b981', // Ch 4 — emerald
    '#3b82f6', // Ch 5 — blue
    '#8b5cf6', // Ch 6 — violet
    '#ef4444', // Ch 7 — red
    '#06b6d4', // Ch 8 — cyan
];

// ===== CHAPTER DATA =====
// Each chapter: { title, subtitle, icon, sections[], quiz }
// Sections support types: text, steps, flipcards, scenario, comparison, brain, dialogue, takeaways
const CHAPTERS = [
    // --- Chapter 1 ---
    {
        title: 'The Method',
        subtitle: 'Pitching kyun fail hoti hai aur STRONG method kaise fix karta hai.',
        icon: 'fas fa-bullseye',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-exclamation-triangle"></i> Pitching Mein Problem Kya Hai?',
                content: `
                    <p>Zyada tar log galat tarike se pitch karte hain. Wo information dump karte hain, logic-heavy slides use karte hain, aur phir sochte hain ki audience paanch minute baad kyun so gayi.</p>
                    <p>Oren Klaff ne discover kiya ki <strong>pitching procedure ke baare mein nahi hai — yeh brain science hai</strong>. Problem yeh hai: Aapka message aapke modern, smart neocortex mein banta hai, lekin listener ka primitive <strong>crocodile brain (magarmach brain)</strong> usse receive karta hai — jo bohot brutally filter karta hai aur almost sab kuch ignore kar deta hai.</p>
                    <p>Croc brain ko aapki spreadsheets se koi matlab nahi. Usse chahiye <strong>novelty (nayi cheezein), danger signals, aur high-contrast information</strong>. Agar aapki pitch croc brain ka filter pass nahi karti, toh brain ke decision-making parts tak pahunchti hi nahi.</p>
                `
            },
            {
                type: 'brain',
                title: '<i class="fas fa-brain"></i> Teen Brain Layers — Har Layer Pe Click Karo',
                layers: [
                    {
                        name: 'Neocortex',
                        cssClass: 'neocortex',
                        shortDesc: 'Problem-solving aur reasoning',
                        detail: 'Neocortex brain ka sabse evolved hissa hai. Yeh complex thinking, language, logic, aur abstract reasoning handle karta hai. Yahan AAP apni pitch banate ho — lekin yeh woh jagah NAHI hai jahan audience pehle process karti hai. Sender (neocortex) aur receiver (croc brain) ke beech ka mismatch — yahi #1 reason hai pitches fail hone ka.'
                    },
                    {
                        name: 'Midbrain',
                        cssClass: 'midbrain',
                        shortDesc: 'Meaning aur social context',
                        detail: 'Midbrain cheezon ka matlab aur social situations decide karta hai. Yeh puchta hai: "Mere liye iska kya matlab hai? Social context kya hai?" Agar aapka message croc brain se guzar jaye, toh midbrain usse significance assign karta hai. Yeh survival instincts aur higher-order thought ke beech ka bridge hai.'
                    },
                    {
                        name: 'Crocodile Brain',
                        cssClass: 'croc',
                        shortDesc: 'Survival — fight, flight, ya ignore',
                        detail: 'Croc brain gatekeeper hai. Yeh 5 million saal se hai aur simple rules pe chalta hai: ignore karo, bhaago, ya lado. Yeh strong, basic emotions generate karta hai. Agar aapki pitch boredom ya complexity trigger karti hai, toh croc brain isse code karta hai "na threat hai, na interesting" aur filter kar deta hai PEHLE se hi — brain ke higher functions tak pahunchne se pehle.'
                    }
                ]
            },
            {
                type: 'text',
                title: '<i class="fas fa-key"></i> Sabse Zaroori Insight',
                content: `
                    <p><strong>Aap apni pitch apne neocortex mein banate ho, lekin audience usse apne croc brain mein receive karti hai.</strong></p>
                    <p>Yeh fundamental mismatch hai jo zyada tar pitches fail karata hai. Succeed karne ke liye aapko ek aisa method chahiye jo pehle croc brain se seedha baat kare — aur phir aapke big idea ko upar neocortex tak jaane de analytical processing ke liye.</p>
                `
            },
            {
                type: 'steps',
                title: '<i class="fas fa-list-ol"></i> STRONG Method — 6 Steps',
                steps: [
                    {
                        icon: 'fas fa-crosshairs',
                        label: 'S — Set the Frame (Frame Set Karo)',
                        desc: 'Har social encounter mein frames collide hote hain. Aapko APNA frame set karna hai taaki narrative shuru se aapke control mein rahe.'
                    },
                    {
                        icon: 'fas fa-clock',
                        label: 'T — Tell the Story (Kahani Sunao)',
                        desc: 'Ek compelling kahani sunao jismein tension aur intrigue ho taaki croc brain engaged rahe. Kahaniyaan analytical filters ko bypass karti hain.'
                    },
                    {
                        icon: 'fas fa-bolt',
                        label: 'R — Reveal the Intrigue (Raaz Dikhao)',
                        desc: 'Information gaps create karo jo audience ko aage jhukne par majboor kare. Novelty aur curiosity croc brain ke "ignore" response ko hara dete hain.'
                    },
                    {
                        icon: 'fas fa-hand-paper',
                        label: 'O — Offer the Prize (Khud Ko Prize Banao)',
                        desc: 'Apne aap ko prize position karo, supplicant (minnat karne wala) nahi. Audience ko feel hona chahiye ki unhe AAPKE liye qualify karna hai.'
                    },
                    {
                        icon: 'fas fa-anchor',
                        label: 'N — Nail the Hook Point (Hook Jam Do)',
                        desc: 'Hot cognition frames stack karo (desire, tension, time pressure) taaki audience emotionally decide kare, analytically nahi.'
                    },
                    {
                        icon: 'fas fa-handshake',
                        label: 'G — Get the Deal (Deal Pakdo)',
                        desc: 'Bina needy hue close karo. Sahi waqt par withdraw karo taaki target deal ke peeche bhaage, tum nahi.'
                    }
                ]
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Quick Scenario',
                prompt: 'Aap investors ke room mein 5 minute se pitch kar rahe ho. Unme se ek apna phone nikal ke scroll karne lagta hai. Aap kya karoge?',
                options: [
                    { text: 'Zyada zor se bolo aur aur data add karo attention wapas laane ke liye.', correct: false },
                    { text: 'Ignore karo — kuch log aise hi hote hain.', correct: false },
                    { text: 'Ek achanak pattern interrupt introduce karo novelty ke saath taaki croc brain wapas engage ho.', correct: true },
                    { text: 'Politely kaho phone rakh do.', correct: false },
                ],
                correctIndex: 2,
                feedbackCorrect: 'Bilkul sahi! Croc brain ko novelty chahiye. Pattern interrupt — ek surprising statement, tone mein shift, ya unexpected visual — attention wapas jhatke se laata hai. Aur data dena problem aur bura banata hai.',
                feedbackWrong: 'Sahi nahi hai. Croc brain already tune out ho chuka hai. Aur data, ignore karna, ya confrontation — koi bhi root cause fix nahi karega. Aapko <strong>pattern interrupt</strong> chahiye — kuch novel aur unexpected jo croc brain ke attention filters ko wapas engage kare.'
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Key Concepts — Tap Karke Flip Karo',
                cards: [
                    { front: 'Croc Brain', icon: 'fas fa-dragon', back: '<strong>Gatekeeper.</strong> Primitive brain jo har message filter karta hai. Agar boring ya complex hai, toh croc brain usse maar deta hai neocortex ke dekhne se pehle.' },
                    { front: 'Frame', icon: 'fas fa-border-all', back: '<strong>Ek mental structure</strong> duniya ko dekhne ka. Har meeting mein frames collide hote hain. Sirf ek frame bachta hai — jiska frame jeeta, woh interaction control karta hai.' },
                    { front: 'Novelty', icon: 'fas fa-star', back: '<strong>Croc brain ki kamzori.</strong> Jo naya aur alag hai usse ignore nahi kar sakta. Novelty aapka primary weapon hai survival-mode filtering ko todne ke liye.' },
                    { front: 'STRONG', icon: 'fas fa-fist-raised', back: '<strong>Set the frame, Tell the story, Reveal intrigue, Offer the prize, Nail the hook, Get the deal.</strong> Neurofinance-based pitching ka 6-step method.' },
                ]
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 1 Ke Key Takeaways',
                items: [
                    'Aapki pitch neocortex mein banti hai lekin croc brain mein receive hoti hai — yeh gap bridge karo.',
                    'Croc brain ke teen responses hain: ignore, run, ya fight. Boring = ignored.',
                    'Novelty, tension, aur high-contrast information croc brain ka filter bypass karti hai.',
                    'STRONG method aapko step-by-step framework deta hai pitch karne ka — brain jaise actually kaam karta hai waise.',
                    'Frame control foundation hai — jo frame control karta hai, woh conversation control karta hai.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 1 Quiz',
            questions: [
                {
                    question: 'Listener SABSE PEHLE aapki pitch kahan process karta hai?',
                    options: ['Neocortex', 'Midbrain', 'Crocodile brain', 'Prefrontal cortex'],
                    correct: 2,
                    explanation: 'Har incoming message sabse pehle crocodile brain — sabse primitive filter — pe lagti hai. Agar yeh pass nahi hota, toh neocortex kabhi evaluate hi nahi karta.'
                },
                {
                    question: 'STRONG mein "S" ka kya matlab hai?',
                    options: ['Start the conversation', 'Set the Frame', 'Show the data', 'Sell the idea'],
                    correct: 1,
                    explanation: '"S" ka matlab hai Set the Frame. Framing sabse pehla aur sabse critical step hai — yeh decide karta hai ki interaction kaun control karega.'
                },
                {
                    question: 'Croc brain ki sabse badi kamzori kya hai jo pitcher exploit kar sakta hai?',
                    options: ['Detailed analysis', 'Emotional appeals', 'Novelty', 'Authority'],
                    correct: 2,
                    explanation: 'Croc brain jo novel hai usse ignore nahi kar sakta. Nayi, unexpected, high-contrast information hamesha filter ke through nikal jaati hai.'
                },
                {
                    question: 'Klaff ke according zyada tar pitches kyun fail hoti hain?',
                    options: [
                        'Slides kam hain',
                        'Pitcher ka neocortex listener ke croc brain ko bhejta hai — yeh mismatch hai',
                        'Bad product market fit',
                        'Presentation bohot short hai'
                    ],
                    correct: 1,
                    explanation: 'Fundamental mismatch: aap apna message advanced neocortex se banate ho, lekin listener usse primitive croc brain se receive karta hai, jo complexity aur boredom ko filter kar deta hai.'
                },
                {
                    question: 'In mein se konsa croc brain ka default response NAHI hai?',
                    options: ['Ignore karo', 'Deeply analyze karo', 'Bhaago', 'Lado'],
                    correct: 1,
                    explanation: 'Croc brain deep analysis nahi karta — woh neocortex ka kaam hai. Croc brain milliseconds mein decide karta hai: ignore, run, ya fight.'
                },
            ]
        },
    },
    // --- Chapter 2 ---
    {
        title: 'Frame Control',
        subtitle: 'Jiska frame jeeta, wohi jeeta. Apna frame set aur hold karna seekho.',
        icon: 'fas fa-chess-king',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-chess"></i> Frame Kya Hai?',
                content: `
                    <p>Ek <strong>frame</strong> ek mental structure hai jo decide karta hai aap duniya ko kaise dekhte ho — aur duniya aapko kaise dekhti hai. Har insaan apna frame har interaction mein laata hai. Jab do log milte hain, unke frames collide hote hain, aur sirf ek bach sakta hai.</p>
                    <p>Frames ko lenses samjho. Jis insaan ke lens se sab dekhte hain, woh <strong>interaction control karta hai</strong>. Agar aap apna frame kho dete ho, toh audience, deal, aur authority sab kho dete ho.</p>
                    <p>Frame control aggressive hone ke baare mein nahi hai. Yeh <strong>apni position mein itna pakka hone ke baare mein hai</strong> ki doosre naturally aapka perspective adopt kar lein.</p>
                `
            },
            {
                type: 'comparison',
                title: '<i class="fas fa-columns"></i> Kamzor Frame vs. Mazboot Frame',
                colBad: {
                    header: '<i class="fas fa-thumbs-down"></i> Kamzor Frame',
                    items: [
                        'Doosre insaan ke agenda pe react karta hai',
                        'Approval aur validation dhundhta hai',
                        'Har objection ka defensively jawaab deta hai',
                        'Buyer ko rules set karne deta hai',
                        'Bohot zyada bolta hai, permission ke liye sunta hai',
                    ]
                },
                colGood: {
                    header: '<i class="fas fa-thumbs-up"></i> Mazboot Frame',
                    items: [
                        'Pehle moment se agenda set karta hai',
                        'Certainty aur self-assurance project karta hai',
                        'Objections ko irrelevant bana ke reframe karta hai',
                        'Interaction ke rules khud define karta hai',
                        'Authority se bolta hai, strategically sunta hai',
                    ]
                }
            },
            {
                type: 'steps',
                title: '<i class="fas fa-shield-alt"></i> 4 Major Frames Jo Aapko Milenge',
                steps: [
                    {
                        icon: 'fas fa-gavel',
                        label: '1. Power Frame',
                        desc: 'Authority figures (CEOs, investors) use karte hain. Environment, body language, aur wait karwa ke dominance signal karte hain. Isko counter karo <strong>power-busting frame</strong> se — chhoti chhoti defiance ki harkatein jo unki authority deny karein.'
                    },
                    {
                        icon: 'fas fa-clock',
                        label: '2. Time Frame',
                        desc: '"Mere paas sirf 15 minute hain." Yeh frame pressure dene ke liye design kiya gaya hai. Counter karo <strong>time khud own karke</strong>: "Theek hai, mere paas bhi sirf 12 minute hain." Ab TUM clock control kar rahe ho.'
                    },
                    {
                        icon: 'fas fa-chart-bar',
                        label: '3. Analyst Frame',
                        desc: 'Koi technical details se pitch derail karta hai: "IRR kya hai?" Yeh tumhe tumhari narrative se nikal ke unke analytical frame mein kheench leta hai. Counter karo <strong>intrigue frame</strong> se — ek compelling story se redirect karo.'
                    },
                    {
                        icon: 'fas fa-trophy',
                        label: '4. Prize Frame',
                        desc: 'Sabse powerful reframe. Buyer ko jeetne ki koshish karne ki jagah, <strong>khud ko prize position karo</strong>. Unse qualify karne bolo: "Main choosy hoon ki kis ke saath kaam karta hoon."'
                    }
                ]
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Frame Collision Scenario',
                prompt: 'Aap meeting mein jaate ho. Investor apne laptop se upar nahi dekhta, 30 second khada rakhta hai, phir bolta hai: "10 minute hain. Shuru karo." Woh konsa frame chala raha hai, aur aap kaise respond karoge?',
                options: [
                    { text: 'Unka time ke liye shukriya karo aur jaldi jaldi slides dikhao.', correct: false },
                    { text: 'Bolo "Actually, mere paas 8 minute hain, toh dekhte hain yeh fit hai ya nahi" — phir calmly baith jao.', correct: true },
                    { text: 'Gussa ho jao aur unki rudeness pe confront karo.', correct: false },
                    { text: 'Fauran pitching shuru karo 10 minute ka best use karne ke liye.', correct: false },
                ],
                correctIndex: 1,
                feedbackCorrect: 'Perfect! Woh <strong>power frame + time frame</strong> combo chala raha hai. Time khud own karke ("Mere paas 8 minute hain") aur calmly baith ke, aap uska frame deny karte ho bina confrontation ke. Signal: Main supplicant nahi hoon — main prize hoon.',
                feedbackWrong: 'Woh <strong>power frame + time frame</strong> chala raha hai. Jaldi karna, gussa hona, ya comply karna — sab mein uska frame jeetta hai. Sahi move hai <strong>time wapas own karo</strong> ("Mere paas 8 minute hain") aur <strong>power play deny karo</strong> calmly apni terms pe baith ke.'
            },
            {
                type: 'dialogue',
                title: '<i class="fas fa-comments"></i> Analyst Frame Counter — Action Mein',
                lines: [
                    { speaker: 'Investor', who: 'them', text: '"Ruko. Risk-adjusted return profile kya hai? Sensitivity analysis walk through karo."' },
                    { speaker: 'Aap', who: 'you', text: '"Behtareen sawal — aur exactly yahi Goldman ke quants bhi atak gaye the. Batata hoon jab unhone numbers tod ke dekhe toh kya hua…"' },
                    { speaker: 'Investor', who: 'them', text: '"Achha, kya hua?"' },
                    { speaker: 'Aap', who: 'you', text: '"Unhe ek cheez mili jo expect nahi thi — lekin us par baad mein aata hoon. Pehle, yeh samjho yeh market ABHI kyun move ho raha hai…"' },
                    { speaker: 'Narrator', who: 'them', text: '(Aapne usse uske analyst frame se nikal ke APNE intrigue frame mein le aaye. Ab woh aapki narrative follow kar raha hai.)' },
                ]
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Frame Arsenal — Tap Karke Flip Karo',
                cards: [
                    { front: 'Power-Busting Frame', icon: 'fas fa-bolt', back: '<strong>Authority moves deny karo.</strong> Chhoti, playful defiance ki harkatein. Power displays pe react karne se mana karo. "Nice office, pakka pichle bande ne impress karne ki bohot koshish ki hogi."' },
                    { front: 'Intrigue Frame', icon: 'fas fa-magic', back: '<strong>Analyst frame ka counter.</strong> Ek chhoti, compelling narrative se redirect karo. Spreadsheets se nikal ke story mein le aao. Curiosity calculation ko hara deti hai.' },
                    { front: 'Time Frame', icon: 'fas fa-hourglass-half', back: '<strong>Clock khud own karo.</strong> "Mera 15 minute mein hard stop hai." Jab aap time control karte ho, urgency aur scarcity control karte ho.' },
                    { front: 'Prize Frame', icon: 'fas fa-gem', back: '<strong>Tum prize ho.</strong> Dynamic flip karo — UNSE pucho woh kyun kaam karna chahte hain. "Main apne deals ke baare mein choosy hoon. Mujhe convince karo."' },
                    { front: 'Moral Authority', icon: 'fas fa-balance-scale', back: '<strong>Jab frames challenge hon tab use karo.</strong> "Main sirf woh deals karta hoon jahan dono side jeete. Agar yeh nahi chalega toh koi baat nahi." Yeh unassailable hai.' },
                ]
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 2 Ke Key Takeaways',
                items: [
                    'Har interaction ek frame collision hai — sirf ek frame dominate kar sakta hai.',
                    '4 opposition frames: Power, Time, Analyst, Prize. Har ek ko counter karna seekho.',
                    'Power-busting = chhoti, calm defiance ki harkatein (aggression nahi).',
                    'Intrigue frame har baar analyst frame ko harata hai — story spreadsheet pe bhaari.',
                    'Prize frame tumhara ultimate weapon hai: "Main catch hoon, chaser nahi."',
                    'Frame control effortless lagta hai. Agar forced lage, toh already haar gaye.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 2 Quiz',
            questions: [
                {
                    question: 'Meeting mein jab do frames collide hote hain toh kya hota hai?',
                    options: ['Dono frames merge ho jaate hain', 'Sirf ek frame bachta hai — mazboot wala jeetta hai', 'Frames ek dusre ko cancel kar dete hain', 'Topic badal jaata hai'],
                    correct: 1,
                    explanation: 'Frames merge ya coexist nahi karte. Har collision mein ek doosre ko absorb karta hai. Jiska frame jeeta woh poore interaction ki dynamic control karta hai.'
                },
                {
                    question: 'Investor bolta hai "Tumhare paas 5 minute hain." Woh konsa frame use kar raha hai?',
                    options: ['Analyst frame', 'Prize frame', 'Time frame', 'Moral authority frame'],
                    correct: 2,
                    explanation: 'Yeh classic time frame hai — pressure create karne, dominance establish karne, aur tumhe reactive, rushed position mein daalne ke liye designed hai.'
                },
                {
                    question: 'Analyst frame ko kaise counter karte ho?',
                    options: ['Aur detailed data do', 'Intrigue frame use karo — story se redirect karo', 'Unse bolo analytical hona band karo', 'Lambi presentation do'],
                    correct: 1,
                    explanation: 'Unke terms pe analysis mein engage hona matlab unka frame jeeta. Counter karo intrigue frame se — ek narrative jo curiosity create kare aur unhe wapas tumhare world mein kheenche.'
                },
                {
                    question: 'Prize frame kya hai?',
                    options: [
                        'Deal jeetne ke liye kam price offer karna',
                        'Khud ko sabse valuable party position karna — unhe tumhare liye qualify karna padega',
                        'Audience ko prizes dena',
                        'Prize-winning track record dikhana'
                    ],
                    correct: 1,
                    explanation: 'Prize frame buyer-seller dynamic flip karta hai. Tum deal chase karne ki jagah khud ko scarce, valuable resource position karte ho jo unhe earn karna padega.'
                },
                {
                    question: 'Power-busting sabse achha describe hota hai kaise?',
                    options: [
                        'Aggression aur confrontation',
                        'Chhoti, calm defiance ki harkatein jo doosre ki power displays deny karein',
                        'Conflict avoid karne ke liye authority ko maan lena',
                        'Unki power display ko aur bade display se match karna'
                    ],
                    correct: 1,
                    explanation: 'Power-busting subtle hai — ek witty remark, react karne se mana, calm composure maintain karna. Yeh aggression nahi hai; yeh confident nonchalance hai jo signal karta hai tum unke rules se nahi kheloge.'
                },
            ]
        },
    },
    // --- Chapter 3 ---
    {
        title: 'Status',
        subtitle: 'Apna situational status elevate karo taaki attention aur respect mile.',
        icon: 'fas fa-crown',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-user-tie"></i> Do Tarah Ka Status',
                content: `
                    <p>Zyada tar log sochte hain status fixed hai — ya toh important ho ya nahi. Klaff kehta hai nahi. Woh do bilkul alag type distinguish karta hai:</p>
                    <ul>
                        <li><strong>Global Status</strong> — tumhara overall social position: wealth, title, fame. Jaldi badalna mushkil hai.</li>
                        <li><strong>Situational Status (Local Status)</strong> — woh status jo tumhare paas hai <em>is room mein, abhi is waqt</em>. Yeh minutes mein elevate ho sakta hai specific techniques se.</li>
                    </ul>
                    <p>Tumhe billionaire hone ki zaroorat nahi pitch karne ke liye. Tumhe chahiye <strong>high situational status</strong>. Woh aata hai frame control, domain expertise, aur is moment mein khud ko kaise carry karte ho usse.</p>
                `
            },
            {
                type: 'comparison',
                title: '<i class="fas fa-columns"></i> Global vs. Situational Status',
                colBad: {
                    header: '<i class="fas fa-globe"></i> Global Status',
                    items: [
                        'Wealth, fame, position pe based hai',
                        'Build karne mein saalon lagte hain',
                        'Moment mein badalna mushkil hai',
                        'Room ke liye hamesha relevant nahi hota',
                        'Actually tumhare against bhi kaam kar sakta hai (intimidation)',
                    ]
                },
                colGood: {
                    header: '<i class="fas fa-map-marker-alt"></i> Situational Status',
                    items: [
                        'Expertise aur frame control pe based hai',
                        'Minutes mein elevate ho sakta hai',
                        'Puri tarah tumhare control mein hai abhi',
                        'Pitch context ke liye directly relevant hai',
                        'Deal-making ke liye sahi dynamic create karta hai',
                    ]
                }
            },
            {
                type: 'steps',
                title: '<i class="fas fa-arrow-up"></i> Situational Status Kaise Elevate Karo',
                steps: [
                    {
                        icon: 'fas fa-door-open',
                        label: '1. Room Entry Own Karo',
                        desc: 'Dab ke mat jaao. Purpose ke saath enter karo. Space ko APNE hisaab se arrange karo. Chair hataao, baith ne ki jagah khade raho, room ko physically command karo.'
                    },
                    {
                        icon: 'fas fa-ban',
                        label: '2. Unke Power Rituals Deny Karo',
                        desc: 'Jab wait karwayein, chup chaap mat baitho. Time visibly use karo — call lo, khade ho ke notes review karo. Jab bolein "Deck dikhao," bolo "Ek minute — pehle context set karta hoon."'
                    },
                    {
                        icon: 'fas fa-star',
                        label: '3. Domain Expertise Flash Karo',
                        desc: 'Domain ka deep, insider knowledge dikhao. Data dump nahi — ek sharp insight jo signal kare "Main yeh duniya tumse behtar jaanta hoon." Yeh instantly tumhara status badha deta hai.'
                    },
                    {
                        icon: 'fas fa-hand-paper',
                        label: '4. Sahi Moment Pe Withdraw Karo',
                        desc: 'Jab interest peak pe ho, thoda peechhe hato: "Mujhe nahi lagta yeh sahi fit hai." Yeh loss aversion trigger karta hai aur status dynamic ulta kar deta hai — ab WOH tumhe chase karte hain.'
                    }
                ]
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Status Scenario',
                prompt: 'Tum ek major VC firm mein pitch ke liye jaate ho. Receptionist tumhe ek chhoti side room mein bitha deta hai aur bolta hai partners "jab time milega tab milenge." 20 minute ho gaye. Sabse high-status move kya hai?',
                options: [
                    { text: 'Politely wait karo — woh busy aur important log hain.', correct: false },
                    { text: 'Uthke receptionist ke paas jaao aur bolo "Meri ek aur meeting hai — unhe bata do ki main 10 minute aur de sakta hoon."', correct: true },
                    { text: 'Zor se apne assistant ko call karo taaki sunein ki tum kitne important ho.', correct: false },
                    { text: 'Gusse mein fauran nikal jaao.', correct: false },
                ],
                correctIndex: 1,
                feedbackCorrect: 'Bilkul sahi! Tum composure maintain karte ho, time own karte ho, aur scarcity create karte ho — sab bina aggression ke. Yeh tumhara situational status elevate karta hai by showing tumhe apne time ki utni hi value hai jitni unke time ki.',
                feedbackWrong: 'Passive wait karna low status signal karta hai. Fake phone calls transparent hain. Gusse mein jaana bridges burn karta hai. Best move hai calmly APNA time own karo: "Main 10 minute aur de sakta hoon." Polite hai, firm hai, aur high-status hai.'
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Status Techniques — Tap Karke Flip Karo',
                cards: [
                    { front: 'Local Star Power', icon: 'fas fa-star', back: '<strong>Local expert bano.</strong> Kisi bhi room mein, jis insaan ke paas sabse deep situational knowledge hai woh attention command karta hai. Global fame nahi chahiye — YEH deal, YEH market, YEH moment sabse behtar jaano.' },
                    { front: 'Status Tip', icon: 'fas fa-lightbulb', back: '<strong>Kabhi impress karne ki koshish mat karo.</strong> Impress karna low-status behavior hai. Instead, interesting bano, knowledgeable bano, aur UNHE apne tarike se impressed hone do.' },
                    { front: 'The Pull-Back', icon: 'fas fa-hand-point-left', back: '<strong>Jab interest peak pe ho tab withdraw karo.</strong> "Mujhe nahi lagta hum aapke liye sahi fit hain." Yeh counterintuitive move loss aversion trigger karta hai aur status dynamic tumhare favor mein flip karta hai.' },
                    { front: 'Beta Trap', icon: 'fas fa-exclamation-triangle', back: '<strong>Beta trap se bachke raho.</strong> Wait karwana, chhoti chair dena, interrupt karna — yeh sab tumhe low-status beta position mein daalne ke liye designed hai. Pehchano aur har ek refuse karo.' },
                ]
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 3 Ke Key Takeaways',
                items: [
                    'Global status fixed hai; situational status fluid hai aur tumhare control mein hai.',
                    'Status elevate karo domain expertise, frame control, aur time ownership se.',
                    'Kabhi impress karne ki koshish mat karo — yeh low status signal karta hai. Casually excellent bano.',
                    'Pull-back move loss aversion trigger karta hai aur power dynamic ulta kar deta hai.',
                    'Beta traps pehchano (chhoti chairs, lambe waits, interruptions) aur refuse karo.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 3 Quiz',
            questions: [
                {
                    question: 'Global aur situational status mein kya farq hai?',
                    options: [
                        'Koi farq nahi hai',
                        'Global fixed hai (wealth, fame); situational moment mein elevate ho sakta hai',
                        'Global temporary hai; situational permanent hai',
                        'Global skill ke baare mein hai; situational paiso ke baare mein hai'
                    ],
                    correct: 1,
                    explanation: 'Global status (wealth, title, fame) ko jaldi badalna mushkil hai. Situational status context-dependent hai aur minutes mein elevate ho sakta hai frame control aur domain expertise se.'
                },
                {
                    question: 'Pitch mein konsa behavior LOW status signal karta hai?',
                    options: ['Time constraints set karna', 'Domain expertise flash karna', 'Audience ko hard impress karne ki koshish karna', 'Peak interest pe withdraw karna'],
                    correct: 2,
                    explanation: 'Impress karne ki koshish fundamentally low-status behavior hai — yeh signal karta hai ki tumhe unki approval chahiye. High-status log bina koshish kiye interesting hote hain.'
                },
                {
                    question: '"Beta trap" kya hai?',
                    options: [
                        'Arguments mein ek logical fallacy',
                        'Environmental cues jo tumhe low-status position mein daalne ke liye designed hain',
                        'Ek tarah ka financial instrument',
                        'Deals close karne ki negotiation technique'
                    ],
                    correct: 1,
                    explanation: 'Beta traps deliberate setups hain — chhoti chairs, lambe waits, interruptions, cramped side room — jo tumhe lower-status party establish karne ke liye designed hain baat shuru hone se pehle.'
                },
                {
                    question: '"Pull-back" technique kab use karni chahiye?',
                    options: ['Bilkul shuru mein', 'Jab tumhara interest khatam ho raha ho', 'Jab unka interest peak pe ho', 'Kabhi nahi — bohot risky hai'],
                    correct: 2,
                    explanation: 'Pull-back peak interest pe sabse achha kaam karta hai. "Mujhe nahi lagta yeh aapke liye sahi hai" high engagement ke dauran loss aversion trigger karta hai aur woh tumhe chase karne lagte hain.'
                },
                {
                    question: '"Domain expertise flash" karne ka sabse achha tarika kya hai?',
                    options: [
                        '50-slide data deck present karo',
                        'Ek sharp insider insight do jo deep knowledge signal kare',
                        'Apni saari credentials aur degrees list karo',
                        'Public sources se statistics quote karo'
                    ],
                    correct: 1,
                    explanation: 'Ek precise insider insight signal karta hai ki tum is domain ko DEEPLY jaante ho. Data dump ulta kaam karta hai — croc brain bore hota hai aur signal jaata hai ki tum prove karne ki zyada koshish kar rahe ho.'
                },
            ]
        },
    },
    // --- Chapter 4 ---
    {
        title: 'Apna Big Idea Pitch Karo',
        subtitle: 'Ek 20-minute pitch craft karo jo hook kare, hold kare, aur convert kare.',
        icon: 'fas fa-lightbulb',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-stopwatch"></i> 20-Minute Rule',
                content: `
                    <p>Attention ek limited resource hai. Research dikhata hai ki <strong>focused attention 20 minute ke baad dramatically gir jaati hai</strong>. Yeh suggestion nahi hai — yeh neuroscience hai.</p>
                    <p>Klaff ka rule: <strong>tumhara pitch 20 minute ya usse kam hona chahiye</strong>. Koi exception nahi. Agar tum apna big idea 20 minute mein explain nahi kar sakte, toh tumhe yeh achhe se samajh nahi aaya.</p>
                    <p>20 minute ek precise structure mein break hote hain jo brain ke attention cycle ke SAATH kaam karne ke liye designed hai, uske against nahi.</p>
                `
            },
            {
                type: 'steps',
                title: '<i class="fas fa-layer-group"></i> 4-Phase Pitch Structure',
                steps: [
                    {
                        icon: 'fas fa-door-open',
                        label: 'Phase 1: Introduce Yourself & Big Idea (5 min)',
                        desc: 'Resume se shuru mat karo. <strong>"Why Now?"</strong> narrative se shuru karo: duniya mein kya badla hai jo is idea ko urgent aur inevitable banaata hai? Aise frame karo: "Un [target] ke liye, jinhe [problem] hai, mera idea [solution] hai jo [key benefit] deta hai. [Alternatives] ke contrary, hum [unique differentiator] hain."'
                    },
                    {
                        icon: 'fas fa-chart-line',
                        label: 'Phase 2: Budget & Secret Sauce Explain Karo (10 min)',
                        desc: 'Financial picture simply dikhao — spreadsheet marathon nahi. Phir apna <strong>secret sauce</strong> reveal karo: tumhara unfair advantage kya hai? Patent? Relationship? Proprietary method? Yeh woh cheez hai jo competition ko irrelevant bana deti hai.'
                    },
                    {
                        icon: 'fas fa-handshake',
                        label: 'Phase 3: Deal Offer Karo (3 min)',
                        desc: 'Specific bano: kya offer kar rahe ho aur kya chahte ho? "$2M for 15% equity" bolo, "Hum strategic investors dhundh rahe hain" nahi. Vagueness deals marti hai. Specificity confidence signal karti hai.'
                    },
                    {
                        icon: 'fas fa-layer-group',
                        label: 'Phase 4: Frames Stack Karo & Hot Cognition Create Karo (2 min)',
                        desc: 'Desire frames stack karo (intrigue, prize, time constraint, moral authority) taaki emotional, fast decision trigger ho. End karo scarcity se: "Hum round do hafton mein close kar rahe hain."'
                    }
                ]
            },
            {
                type: 'text',
                title: '<i class="fas fa-bolt"></i> "Why Now?" Frame',
                content: `
                    <p>Sabse powerful opening tumhare baare mein nahi hai — yeh <strong>duniya mein kya badla hai</strong> uske baare mein hai. Teen forces har opportunity create karti hain:</p>
                    <ul>
                        <li><strong>Economic forces</strong> — interest rates, market shifts, new regulations, supply changes</li>
                        <li><strong>Social forces</strong> — behavioral trends, demographic shifts, cultural movements</li>
                        <li><strong>Technology forces</strong> — new platforms, breakthroughs, cost curve changes</li>
                    </ul>
                    <p>Jab tum dikhao ki powerful forces <em>ABHI converge ho rahi hain</em> ek window of opportunity create karne ke liye, tumhara idea inevitable lagta hai — speculative nahi. Croc brain sochta hai: <strong>"Agar abhi act nahi kiya, toh miss ho jayega."</strong></p>
                `
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Pitch Opening Scenario',
                prompt: 'Tum investors ko ek naya fintech product pitch kar rahe ho. Konsi opening line "Why Now?" framework best follow karti hai?',
                options: [
                    { text: '"Hi, main John hoon, mere paas banking mein 15 saal ka experience hai aur aaj main aapko humara amazing product dikhana chahta hoon."', correct: false },
                    { text: '"Teen forces abhi converge ho rahi hain: new EU banking regulations 90 din mein live ho rahi hain, 40% millennials ne traditional banks chhod diye hain, aur AI costs is saal 80% gir gayi hain. Humara product bilkul isi intersection pe baitha hai."', correct: true },
                    { text: '"Humare product mein great features hain. Main har ek walk through karwa deta hoon."', correct: false },
                    { text: '"Global fintech market $300 billion ki hai. Yeh raha humara 50-slide deck."', correct: false },
                ],
                correctIndex: 1,
                feedbackCorrect: 'Perfect! Tumne economic (EU regulations), social (millennial behavior), aur technology (AI costs) forces use ki hain urgency aur inevitability create karne ke liye. Croc brain ab sochta hai: "Yeh ABHI ho raha hai, mujhe dhyan dena chahiye."',
                feedbackWrong: 'Resumes, feature lists, aur market-size slides neocortex pitches hain jo croc brain bore karte hain. "Why Now?" frame converging forces (economic, social, technology) use karke urgency create karta hai — tumhara idea inevitable lagta hai, optional nahi.'
            },
            {
                type: 'dialogue',
                title: '<i class="fas fa-comments"></i> Big Idea Introduction Formula',
                lines: [
                    { speaker: 'Formula', who: 'them', text: '"Un [target customers] ke liye jo [current alternatives] se dissatisfied hain, humara idea/product ek [new category] hai jo [key problem-solving capability] provide karta hai."' },
                    { speaker: 'Example', who: 'you', text: '"Un mid-market CFOs ke liye jo manual reconciliation mein doob rahe hain, humara platform ek AI-powered finance brain hai jo month-end close 12 din se ghataa ke 2 din kar deta hai."' },
                    { speaker: 'Formula', who: 'them', text: '"[Existing competition] ke contrary, humara idea/product [key differentiator] hai."' },
                    { speaker: 'Example', who: 'you', text: '"Quickbooks ya SAP ke contrary, hum machine learning use karte hain jo har transaction se actually smarter hoti jaati hai — koi consultants nahi, koi customization fees nahi, kabhi nahi."' },
                ]
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Pitch Components — Tap Karke Flip Karo',
                cards: [
                    { front: 'Why Now?', icon: 'fas fa-clock', back: '<strong>Teen converging forces:</strong> economic, social, aur technological changes jo opportunity ka window create karti hain. Yeh tumhara idea inevitable feel karata hai, speculative nahi.' },
                    { front: 'Secret Sauce', icon: 'fas fa-flask', back: '<strong>Tumhara unfair advantage.</strong> Tumhare paas kya hai jo koi aur easily replicate nahi kar sakta? Patent, key relationship, proprietary technology, ya unique market position.' },
                    { front: 'The Offer', icon: 'fas fa-file-contract', back: '<strong>Devastatingly specific bano.</strong> "$2M for 15% equity with 12-month milestone plan." Vagueness = uncertainty = croc brain bolta hai nahi.' },
                    { front: '20-Min Rule', icon: 'fas fa-hourglass-end', back: '<strong>Attention 20 minute ke baad mar jaati hai.</strong> Agar pitch lamba hai, toh neuroscience se lad rahe ho. Ruthlessly trim karo. Agar 20 min mein nahi bol sakte, toh samjhe nahi ho.' },
                ]
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 4 Ke Key Takeaways',
                items: [
                    'Har pitch 20 minute se kam rakkho — attention ek finite neurological resource hai.',
                    '"Why Now?" se open karo teen converging forces use karke: economic, social, technology.',
                    'Big Idea introduction formula use karo: Un [target] ke liye jinhe [problem] hai, hum [solution] hain [competition] ke contrary.',
                    'Secret sauce reveal karo — woh unfair advantage jo competition ko irrelevant bana de.',
                    'Offer mein specific bano. "$2M for 15%" beats "Hum strategic partners dhundh rahe hain."',
                    'End mein frames stack karo hot cognition aur emotional decision-making trigger karne ke liye.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 4 Quiz',
            questions: [
                {
                    question: 'Klaff 20-minute pitch maximum pe kyun insist karta hai?',
                    options: [
                        'Yeh ek common business convention hai',
                        'Attention 20 minute ke baad dramatically gir jaati hai — yeh brain science hai',
                        'Investors hamesha busy hote hain',
                        'Scheduling easy ho jaati hai'
                    ],
                    correct: 1,
                    explanation: 'Neuroscience research dikhata hai ki focused attention lagbhag 20 minute ke baad significantly degrade hoti hai. Usse zyada pitch karna matlab biology se ladna — aur biology hamesha jeetti hai.'
                },
                {
                    question: '"Why Now?" framework mein teen forces konsi hain?',
                    options: [
                        'People, Process, Technology',
                        'Supply, Demand, Price',
                        'Economic, Social, Technology',
                        'Past, Present, Future'
                    ],
                    correct: 2,
                    explanation: '"Why Now?" frame teen converging forces dikhata hai — economic, social, aur technological — jo tumhare big idea ke liye ek urgent window of opportunity create karti hain.'
                },
                {
                    question: 'Pitch mein "secret sauce" kya hota hai?',
                    options: [
                        'Ek clever marketing slogan',
                        'Tumhara unfair advantage jo competitors easily replicate nahi kar sakte',
                        'Product ka sabse mehenga feature',
                        'End mein reveal hone wala ek secret'
                    ],
                    correct: 1,
                    explanation: 'Secret sauce tumhara unique, hard-to-replicate advantage hai — patent, proprietary technology, key relationship, ya unique market position jo competition ko irrelevant bana de.'
                },
                {
                    question: 'Deal offer kaise phrase karna chahiye?',
                    options: [
                        '"Hum strategic partners dhundh rahe hain"',
                        '"Humein grow hone mein help chahiye"',
                        '"$2M for 15% equity with clear milestones"',
                        '"Jo aapko fair lage"'
                    ],
                    correct: 2,
                    explanation: 'Specificity confidence signal karti hai aur uncertainty reduce karti hai. Croc brain ko ambiguity pasand nahi. "$2M for 15%" jaisa precise ask hamesha vague language se strong hota hai.'
                },
                {
                    question: 'Pitch ke pehle 5 minute kis pe focus hone chahiye?',
                    options: [
                        'Personal background aur resume',
                        'Detailed product demo',
                        '"Why Now?" narrative aur Big Idea introduction',
                        'Market size statistics'
                    ],
                    correct: 2,
                    explanation: 'Pehle 5 minute mein croc brain ko hook karna hai "Why Now?" narrative se — konsi powerful forces converge ho rahi hain jo yeh opportunity create kar rahi hain — uske baad crisp Big Idea introduction.'
                },
            ]
        },
    },
    // --- Chapter 5 ---
    {
        title: 'Frame Stacking & Hot Cognitions',
        subtitle: 'Desire frames stack karo aur hot cognitions trigger karo decisions drive karne ke liye.',
        icon: 'fas fa-layer-group',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-fire"></i> Hot Cognition vs. Cold Cognition',
                content: `
                    <p>Brain do fundamentally alag tarike se decisions leta hai:</p>
                    <ul>
                        <li><strong>Cold Cognition</strong> — analytical, slow, spreadsheet-driven. "Isko ghar le ke sochta hoon." Yeh deal-making ka DUSHMAN hai. Jab target cold cognition mein chala jaata hai, tumhara momentum khatam.</li>
                        <li><strong>Hot Cognition</strong> — emotional, fast, intuitive. "Mujhe yeh chahiye. Kaise karenge?" YAHAN deals close hoti hain. Hot cognition desire, excitement, aur time pressure se driven hota hai.</li>
                    </ul>
                    <p>Pitcher ke taur pe tumhara kaam hai <strong>hot cognition create karo aur cold cognition rok do</strong>. Yeh tum karte ho frames stack karke.</p>
                `
            },
            {
                type: 'steps',
                title: '<i class="fas fa-layer-group"></i> Frame Stack — 4 Layers',
                steps: [
                    {
                        icon: 'fas fa-fire',
                        label: 'Layer 1: Intrigue Frame',
                        desc: 'Ek compelling, personal narrative sunao jismein tension ho aur ek unresolved element. Brain NAHI disengage kar sakta ek open story loop se. "Batata hoon kya hua jab humne yeh Google ko present kiya — lekin pehle…"'
                    },
                    {
                        icon: 'fas fa-gem',
                        label: 'Layer 2: Prize Frame',
                        desc: 'Khud ko aur apni deal ko prize position karo. "Hamare paas teen groups interested hain, aur honestly, hum selective ho rahe hain ki kisko partner banayein." Ab UNHE tumhare liye qualify karna padega.'
                    },
                    {
                        icon: 'fas fa-clock',
                        label: 'Layer 3: Time Frame',
                        desc: 'Real scarcity aur time pressure introduce karo. "Yeh round 15 taareekh ko close ho raha hai. Uske baad, terms badal jayengi." Urgency cold cognition rok deta hai — "ghar le ke sochne" ka time nahi hai.'
                    },
                    {
                        icon: 'fas fa-balance-scale',
                        label: 'Layer 4: Moral Authority Frame',
                        desc: 'Unassailable closer. "Hum sirf woh deals karte hain jahan sab jeeten. Agar yeh dono sides ke liye sahi nahi lagta, toh koi baat nahi." Yeh integrity aur confidence signal karta hai — argue karna impossible hai.'
                    }
                ]
            },
            {
                type: 'comparison',
                title: '<i class="fas fa-columns"></i> Hot vs. Cold Cognition',
                colBad: {
                    header: '<i class="fas fa-snowflake"></i> Cold Cognition (Bachke Raho)',
                    items: [
                        '"Sochta hoon iske baare mein aur get back karta hoon"',
                        'Detailed analytical review mode',
                        'Competitors ke saath spreadsheet comparisons',
                        'Decision committee ko defer',
                        'Momentum marta hai — deal thand padh jaati hai',
                    ]
                },
                colGood: {
                    header: '<i class="fas fa-fire-alt"></i> Hot Cognition (Yeh Create Karo)',
                    items: [
                        '"Mujhe andar chahiye — next steps kya hain?"',
                        'Emotional excitement aur desire',
                        'Miss hone ka darr (FOMO)',
                        'Decision room mein hi hota hai',
                        'Momentum deal close tak le jaata hai',
                    ]
                }
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Frame Stacking in Action',
                prompt: 'Tumne pitch deliver ki aur investor bolta hai: "Interesting hai. Main apni team ke saath numbers run karta hoon aur agle mahine circle back karta hoon." Woh cold cognition mein ja raha hai. Deal hot rakhne ke liye frames kaise re-stack karoge?',
                options: [
                    { text: '"Sure, apna time lo! Yeh raha data room link saari spreadsheets ke saath."', correct: false },
                    { text: '"Samajh gaya. Lekin bata doon — yeh round 10 din mein close ho raha hai, do major groups pehle se due diligence mein hain, aur honestly, hum apni cap table ke baare mein selective hain. Agar timing nahi bani, toh koi baat nahi."', correct: true },
                    { text: '"Please zyada mat ruko! Humein yeh investment sach mein chahiye."', correct: false },
                    { text: '"Theek hai, agle mahine follow up karta hoon phir."', correct: false },
                ],
                correctIndex: 1,
                feedbackCorrect: 'Textbook frame stack! Time frame ("10 din mein close"), prize frame ("do groups DD mein, hum selective hain"), aur moral authority ("koi baat nahi"). Tumne urgency aur scarcity create ki bina needy hue.',
                feedbackWrong: 'Spreadsheets bhejne se cold cognition feed hoti hai. Begging neediness signal karti hai. Wait karne pe agree karna momentum khatam karta hai. Sahi move time frame (deadline), prize frame (aur log chahte hain), aur moral authority (no pressure) stack karta hai hot cognition trigger karne ke liye.'
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Hot Cognition Triggers — Tap Karke Flip Karo',
                cards: [
                    { front: 'Desire', icon: 'fas fa-heart', back: '<strong>Unhe CHAHNE do.</strong> Upside ki vivid picture paint karo. Emotional brain ko appeal karo — data se nahi, vision, exclusivity, aur narrative se.' },
                    { front: 'Tension', icon: 'fas fa-bolt', back: '<strong>Push-pull dynamics create karo.</strong> "Yeh bohot bada ho sakta hai — lekin sirf sahi partner ke saath." Tension croc brain ko alert aur engaged rakhta hai.' },
                    { front: 'Time Pressure', icon: 'fas fa-hourglass-half', back: '<strong>Real scarcity, real deadlines.</strong> "Round Friday close ho raha hai." Kabhi fake mat karo — lekin hamesha apni deals ko genuine time constraints ke saath structure karo.' },
                    { front: 'Novelty', icon: 'fas fa-star', back: '<strong>Unexpected detail.</strong> Ek surprising fact ya twist do jo audience ne expect nahi kiya tha. Novelty attention clock reset karta hai aur croc-brain filtering rokta hai.' },
                ]
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 5 Ke Key Takeaways',
                items: [
                    'Hot cognition (emotional, fast) deals close karta hai. Cold cognition (analytical, slow) deals maarta hai.',
                    '4 frames sequence mein stack karo: intrigue → prize → time → moral authority.',
                    'Time pressure "sochta hoon" ke khilaf sabse best weapon hai.',
                    'Prize frame dynamic flip karta hai: woh tumhare liye qualify karte hain, ulta nahi.',
                    'Moral authority unassailable closer hai — fairness ke against koi argue nahi kar sakta.',
                    'Scarcity kabhi fake mat karo — deals ko genuine deadlines ke saath structure karo.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 5 Quiz',
            questions: [
                {
                    question: '"Hot cognition" kya hai?',
                    options: [
                        'Ek detailed analytical review process',
                        'Emotional, fast, desire-driven decision making',
                        'Ek tarah ki brainstorming technique',
                        'Jab room ka temperature zyada ho'
                    ],
                    correct: 1,
                    explanation: 'Hot cognition tab hota hai jab brain emotion, desire, aur urgency ke basis pe decide karta hai — cold analysis ki jagah. Yeh woh state hai jahan deals actually close hoti hain.'
                },
                {
                    question: 'Frames stack karne ka sahi order kya hai?',
                    options: [
                        'Prize → Time → Moral → Intrigue',
                        'Time → Prize → Intrigue → Moral',
                        'Intrigue → Prize → Time → Moral Authority',
                        'Moral → Intrigue → Prize → Time'
                    ],
                    correct: 2,
                    explanation: 'Stack build hota hai: intrigue attention hook karta hai, prize dynamic flip karta hai, time urgency create karta hai, aur moral authority integrity se seal karta hai. Har layer pichli wali ko reinforce karti hai.'
                },
                {
                    question: '"Isko ghar le ke sochta hoon" kya signal karta hai?',
                    options: ['High interest', 'Cold cognition', 'Hot cognition', 'Guaranteed deal'],
                    correct: 1,
                    explanation: 'Yeh cold cognition ka classic sign hai — target emotional engagement se analytical mode mein shift ho gaya. Jab yeh hota hai, momentum marta hai aur deals rarely close hoti hain.'
                },
                {
                    question: 'Moral authority frame "unassailable" kyun hai?',
                    options: [
                        'Aggressive language use karta hai',
                        'Consequences ki dhamki deta hai',
                        'Fairness aur integrity ke against koi argue nahi kar sakta',
                        'Deal ke true terms hide karta hai'
                    ],
                    correct: 2,
                    explanation: '"Hum sirf woh deals karte hain jahan sab jeeten" pe attack karna impossible hai. Yeh confidence, integrity signal karta hai, aur manipulation ka koi perception nahi rehta.'
                },
                {
                    question: 'Time pressure ke saath kya KABHI nahi karna chahiye?',
                    options: [
                        'Pitch ke end mein use karna',
                        'Aur interested parties mention karna',
                        'Fake scarcity ya artificial deadlines banana',
                        'Round ke liye clear closing date set karna'
                    ],
                    correct: 2,
                    explanation: 'Fake scarcity trust fauran destroy karti hai. Deals ko genuine deadlines aur real competing interest ke saath structure karo. Authenticity time frame ke kaam karne ke liye essential hai.'
                },
            ]
        },
    },
    // --- Chapter 6 ---
    {
        title: 'Neediness Khatam Karo',
        subtitle: 'Koi cheez deal utni jaldi nahi maarti jitni neediness. Isko eliminate karo.',
        icon: 'fas fa-shield-alt',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-skull-crossbones"></i> Neediness: Deal Killer',
                content: `
                    <p><strong>Neediness kisi bhi pitch mein #1 deal killer hai.</strong> Jis moment audience ko lagta hai ki tumhe unki zaroorat unse zyada hai, tumhara status collapse ho jaata hai, frame toot jaata hai, aur croc brain tumhe low-value flag kar deta hai.</p>
                    <p>Neediness sirf paiso ke baare mein nahi hai. Yeh aise dikhti hai:</p>
                    <ul>
                        <li>Bohot zyada bolna aur over-explain karna</li>
                        <li>Saamne wale ki har baat se agree karna</li>
                        <li>Bohot frequently ya eagerly follow up karna</li>
                        <li>Bas close karne ke liye bad terms accept karna</li>
                        <li>Pitch ke dauran approval ya validation dhundhna</li>
                    </ul>
                    <p>Klaff ka core law: <strong>"Kuch mat chaho. Apni achhi cheezein dikhao. Sahi moment pe withdraw karo."</strong></p>
                `
            },
            {
                type: 'steps',
                title: '<i class="fas fa-tools"></i> 3-Step Neediness Elimination Formula',
                steps: [
                    {
                        icon: 'fas fa-crosshairs',
                        label: '1. Kuch Mat Chaho',
                        desc: 'Har pitch mein outcome se genuine detachment ke saath jaao. Deal CHAHTE ho, lekin ZAROORAT nahi hai. Yeh trick nahi hai — apni life aur pipeline aise structure karo ki koi ek deal tumhari success define na kare.'
                    },
                    {
                        icon: 'fas fa-eye',
                        label: '2. Sirf Wohi Karo Jo Achhe Se Aata Hai',
                        desc: 'Unka agenda mat chase karo. Apne zone of excellence mein raho. Jab deep expertise aur genuine passion se operate karte ho, neediness gaayab ho jaati hai kyunki tum share kar rahe ho — sell nahi.'
                    },
                    {
                        icon: 'fas fa-door-open',
                        label: '3. Sahi Moment Pe Withdraw Karo',
                        desc: 'Jab interest high ho, peechhe hato. "Mujhe pura bharosa nahi yeh sahi fit hai — sochte hain dono sides ke liye makes sense ya nahi." Yeh loss aversion trigger karta hai aur chase dynamic reverse karta hai.'
                    }
                ]
            },
            {
                type: 'comparison',
                title: '<i class="fas fa-columns"></i> Needy vs. Non-Needy Behavior',
                colBad: {
                    header: '<i class="fas fa-thumbs-down"></i> Needy Signs',
                    items: [
                        '"Humein sach mein aapke saath kaam karna achha lagega"',
                        'Har point over-explain aur justify karna',
                        'Har objection pe fauran agree karna',
                        'Meeting ke baad 5 baar follow up karna',
                        '"Bas check kar raha tha — koi update?"',
                        'Deal alive rakhne ke liye bad terms accept karna',
                    ]
                },
                colGood: {
                    header: '<i class="fas fa-thumbs-up"></i> Non-Needy Signals',
                    items: [
                        '"Dekhte hain yeh dono sides ke liye fit hai ya nahi"',
                        'Apni value ek baar clearly state karo, phir aage badho',
                        'Objections ko reframe karo ya calmly disagree karo',
                        'Ek follow-up new value ke saath, phir silence',
                        '"Humare aur bhi conversations chal rahi hain"',
                        'Bad terms se bina hesitation walk away karo',
                    ]
                }
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Neediness Test',
                prompt: 'Strong pitch ke baad, investor bolta hai: "Interesting hai, lekin valuation ke baare mein sure nahi hoon. 40% neeche aa sakte ho?" Tumhe yeh deal payroll ke liye chahiye. Kya karoge?',
                options: [
                    { text: '"Bilkul! Jo aapke liye kaam kare. Hum sab pe flexible hain."', correct: false },
                    { text: '"Interest appreciate karta hoon. Valuation hamari traction aur teen aur groups jo discussions mein hain unhe reflect karta hai. Main sahi partner sahi terms pe dhundhna prefer karunga rather than force fit. Dono sochte hain."', correct: true },
                    { text: '"Please, humein sach mein yeh investment chahiye. 20% pe compromise kar sakte hain?"', correct: false },
                    { text: '"Lo ya chhodo. Price price hai."', correct: false },
                ],
                correctIndex: 1,
                feedbackCorrect: 'Excellent! Tumne interest acknowledge kiya, value restate ki (traction + competing interest), aur phir gracefully withdraw kiya. Na neediness, na aggression — bas calm confidence aur walk away karne ki willingness.',
                feedbackWrong: 'Fauran cave hona desperation signal karta hai. Begging ultimate needy behavior hai. Aggressive hona relationship burn karta hai. Sahi move <strong>calm confidence</strong> dikhata hai: deal karna achha lagega, lekin kisi bhi cost pe nahi, aur alternatives hain.'
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Anti-Neediness Toolkit — Tap Karke Flip Karo',
                cards: [
                    { front: 'The Walk-Away', icon: 'fas fa-walking', back: '<strong>Sabse powerful weapon.</strong> Deal se walk away karne ki willingness non-neediness ka single strongest signal hai. Agar walk away nahi kar sakte, toh already haar chuke ho.' },
                    { front: 'Pipeline Abundance', icon: 'fas fa-stream', back: '<strong>Kabhi ek deal pe depend mat karo.</strong> Hamesha multiple deals, conversations, aur options play mein rakkho. Jab abundance hai, neediness naturally gaayab ho jaati hai.' },
                    { front: 'The Departure Line', icon: 'fas fa-quote-right', back: '<strong>"Lagta hai dono ke paas sochne ko bohot kuch hai."</strong> Yeh polite withdrawal signal karta hai tum UNHE bhi evaluate kar rahe ho jaise woh tumhe kar rahe hain. Powerful aur dignified.' },
                    { front: 'Validation Trap', icon: 'fas fa-exclamation-triangle', back: '<strong>Mid-pitch kabhi approval mat maango.</strong> "Samajh aa raha hai?" "Follow kar rahe ho?" Yeh phrases insecurity chillati hain. Apna point bolo aur aage badho.' },
                ]
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 6 Ke Key Takeaways',
                items: [
                    'Neediness #1 deal killer hai — status collapse karta hai aur frame todta hai.',
                    'Formula: Kuch mat chaho → Apni achhi cheezein dikhao → Sahi moment pe withdraw karo.',
                    'Walk away karne ki willingness value ka sabse strong signal hai.',
                    'Pipeline abundance build karo taaki kabhi single deal pe depend na ho.',
                    'Mid-pitch kabhi validation mat maango ("Samajh aa raha hai?").',
                    'Calm confidence + graceful withdrawal > aggression ya compliance.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 6 Quiz',
            questions: [
                {
                    question: 'Klaff ke mutaabiq, #1 deal killer kya hai?',
                    options: ['Bad product', 'Poor slides', 'Neediness', 'High pricing'],
                    correct: 2,
                    explanation: 'Neediness — yeh sense ki tumhe deal unse zyada chahiye — tumhara status collapse karta hai, frame todta hai, aur croc brain ka "low-value" filter trigger karta hai.'
                },
                {
                    question: 'Neediness eliminate karne ke teen steps kya hain?',
                    options: [
                        'Ask, Negotiate, Close',
                        'Kuch mat chaho, Apni achhi cheezein dikhao, Sahi moment pe withdraw karo',
                        'Research, Present, Follow up',
                        'Prepare, Pitch, Pray'
                    ],
                    correct: 1,
                    explanation: 'Klaff ka formula: (1) Kuch mat chaho — true detachment, (2) Apni strengths pe focus karo — excellence se operate karo, (3) Peak interest pe withdraw karo — loss aversion trigger karo.'
                },
                {
                    question: 'Pitch ke dauran konsa phrase AVOID karna chahiye?',
                    options: [
                        '"Yeh raha jo hum table pe laate hain"',
                        '"Samajh aa raha hai?"',
                        '"Traction dikhata hoon"',
                        '"Round do hafton mein close hota hai"'
                    ],
                    correct: 1,
                    explanation: '"Samajh aa raha hai?" ek validation-seeking phrase hai jo insecurity signal karti hai. Yeh kehti hai: "Mujhe jo abhi bola uspe confidence nahi hai — please reassure karo." Apna point bolo aur aage badho.'
                },
                {
                    question: 'Walk away karna sabse powerful negotiation tool kyun hai?',
                    options: [
                        'Saamne wale ko punish karta hai',
                        'Signal karta hai tumhare paas alternatives hain aur is specific deal ki zaroorat nahi',
                        'Saamne wale ko confuse karta hai',
                        'Hamesha zyada paisa offer karwata hai'
                    ],
                    correct: 1,
                    explanation: 'Walk away karne ki willingness non-neediness ka ultimate signal hai. Communicate karta hai: mujhe isme value dikhti hai, lekin mere paas aur options hain. Yeh loss aversion trigger karta hai aur power dynamic rebalance karta hai.'
                },
                {
                    question: 'Natural non-neediness kaise build karte ho?',
                    options: [
                        'Confident acting practice karo',
                        'Hamesha multiple deals aur conversations pipeline mein rakkho',
                        'Anti-neediness scripts memorize karo',
                        'Kabhi enthusiasm mat dikhao'
                    ],
                    correct: 1,
                    explanation: 'Genuine non-neediness pipeline abundance se aati hai. Jab tumhare paas multiple real options hain, toh naturally calm confidence project hoti hai — yeh acting nahi hai, real alternatives ka result hai.'
                },
            ]
        },
    },
    // --- Chapter 7 ---
    {
        title: 'Case Study: Airport Deal',
        subtitle: 'Har concept ko action mein dekho ek real $6M deal pitch ke saath.',
        icon: 'fas fa-plane',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-book-open"></i> Setup',
                content: `
                    <p>Oren Klaff ek <strong>$6 million deal pitch karne ki kahani sunata hai — ek private airport terminal refurbish aur operate karne ke liye</strong>. Yeh case study book ke har concept ko ek high-stakes, real-world narrative mein saath laati hai.</p>
                    <p>Deal mein ek major airport authority ko convince karna tha ki woh unke group ko ek underused private terminal develop karne ke rights de. Competition mein well-funded, established firms theen jinke deep political connections the.</p>
                    <p>Chalte hain step by step kaise Klaff ne STRONG method ka har element use kiya aise deal jeetne ke liye jo usse jeetni nahi chahiye thi.</p>
                `
            },
            {
                type: 'steps',
                title: '<i class="fas fa-route"></i> STRONG Method Applied',
                steps: [
                    {
                        icon: 'fas fa-crosshairs',
                        label: 'S — Frame Set Karo',
                        desc: 'Klaff airport authority boardroom mein gaya jahan senior executives the jo ek aur boring contractor pitch expect kar rahe the. Usne fauran prize frame set kiya: "Hum projects ke baare mein choosy hain. Batata hoon YAHI kyun select hua." Frames set: power + prize.'
                    },
                    {
                        icon: 'fas fa-clock',
                        label: 'T — Kahani Sunao',
                        desc: 'Spreadsheets ki jagah, usne ek doosre shehar mein similar deal ki kahani sunaai — kaise ek bhula hua terminal ek profit center mein badla jo municipality ka proudest showcase ban gaya. Narrative ne croc brain ko engaged rakha.'
                    },
                    {
                        icon: 'fas fa-bolt',
                        label: 'R — Intrigue Reveal Karo',
                        desc: 'Usne ek unexpected twist diya: "Jo baat is room mein kisi ko nahi pata woh yeh hai ki teen airlines ne pehle se interest dikhaya hai is terminal ko use karne mein AGAR sahi development partner mile." Yeh real, verified information thi — novelty bomb.'
                    },
                    {
                        icon: 'fas fa-hand-paper',
                        label: 'O — Prize Offer Karo',
                        desc: 'Usne apni team ko selective prize position kiya: "Humne is saal do similar deals isliye reject ki kyunki municipalities serious nahi theen. Hum sirf un partners ke saath kaam karte hain jo decisively move karte hain." Ab authority ko prove karna tha ki WOH worthy hain.'
                    },
                    {
                        icon: 'fas fa-anchor',
                        label: 'N — Hook Point Nail Karo',
                        desc: 'Frame stack: time pressure ("Hamari team Q2 tak committed hai — uske baad hum aur jagah allocated hain"), social proof ("airlines wait kar rahi hain"), aur moral authority ("Hum aisi deal chahte hain jo community ke liye kaam kare, sirf investors ke liye nahi").'
                    },
                    {
                        icon: 'fas fa-handshake',
                        label: 'G — Deal Le Lo',
                        desc: 'Deal maangne ki jagah, Klaff withdraw ho gaya: "Lagta hai dono ke paas sochne ko bohot kuch hai. Agar timing ban jaaye toh phir baat karte hain." Authority ne agle din usse call kiya process accelerate karne ke liye. Usne deal apni terms pe close ki.'
                    }
                ]
            },
            {
                type: 'dialogue',
                title: '<i class="fas fa-comments"></i> Pitch Ke Key Moments',
                lines: [
                    { speaker: 'Authority CEO', who: 'them', text: '"Humne is hafte 8 presentations dekhi hain. Tumhare paas 20 minute hain. Shuru karo."' },
                    { speaker: 'Klaff', who: 'you', text: '"Appreciate karta hoon. Actually mujhe sirf 15 chahiye. Lekin pehle — bata sakte hain Terminal C ke liye Davis Group ka 2019 wala proposal ka kya hua?"' },
                    { speaker: 'Authority CEO', who: 'them', text: '"...Tumhe yeh kaise pata? Woh internal tha."' },
                    { speaker: 'Klaff', who: 'you', text: '"Main apna homework karta hoon. Woh fail hua kyunki unke paas pehle se airline commitments nahi the. Hamare paas hain. Batata hoon is baar kya alag hai."' },
                    { speaker: 'Narrator', who: 'them', text: '(Domain expertise + intrigue frame. Ab CEO ka poora dhyan uske paas hai — croc brain fully engaged hai.)' },
                ]
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Tum Kya Karte?',
                prompt: 'Presentation ke beech mein, airport authority ka CFO interrupt karta hai: "Ruko. Iska IRR kya hai? Passenger throughput ke liye kya assumptions use kar rahe ho?" Woh tumhe analyst frame mein kheench raha hai. Kaise respond karoge?',
                options: [
                    { text: 'Apni spreadsheet kholke har assumption line by line walk through karo.', correct: false },
                    { text: '"Great question — hamari team ke quants bhi isi par obsess kar rahe the. Lekin batata hoon unhone kya find kiya jo sabko surprise kar gaya, aur isne poori deal structure badal di…"', correct: true },
                    { text: '"IRR 22% hai. Next question."', correct: false },
                    { text: '"Mere paas aaj woh numbers nahi hain."', correct: false },
                ],
                correctIndex: 1,
                feedbackCorrect: 'Perfect intrigue frame counter! Tumne question acknowledge kiya, curiosity create ki ("sabko kya surprise kiya"), aur usse wapas APNI narrative mein pull kiya. Analyst frame neutralize ho gaya uski concern ignore kiye bina.',
                feedbackWrong: 'Har assumption walk through karna analyst frame ko surrender karna hai. Seedha number attention hold nahi karta. Numbers nahi hain bolna credibility khatam karta hai. Analyst frame ko <strong>intrigue frame</strong> se counter karo — ek story hook jo concern ka answer tumhari narrative ke andar de.'
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Case Study Lessons — Tap Karke Flip Karo',
                cards: [
                    { front: 'Preparation = Status', icon: 'fas fa-search', back: '<strong>Klaff ko 2019 ki failed deal ka pata tha.</strong> Us ek insider detail ne domain expertise flash ki aur uska situational status fauran sabse upar ho gaya.' },
                    { front: 'Story > Spreadsheet', icon: 'fas fa-book', back: '<strong>Usne doosre transformed terminal ki kahani sunaai.</strong> Jab competitors data se lead kar rahe the, Klaff ne narrative se croc brain engage kiya. Same facts, alag delivery — drastically alag result.' },
                    { front: 'Withdrawal = Power', icon: 'fas fa-door-open', back: '<strong>"Agar timing bane toh phir baat karte hain."</strong> Close push karne ki jagah, woh withdraw ho gaya. Authority ne usse chase kiya. Non-neediness action mein.' },
                    { front: 'Sab Kuch Stack Karo', icon: 'fas fa-layer-group', back: '<strong>Har frame use hua:</strong> power-busting, intrigue, prize, time, moral authority — sequence mein layered. Airport authority ne poora STRONG method experience kiya bina jaane.' },
                ]
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 7 Ke Key Takeaways',
                items: [
                    'Real-world success ke liye SAARE methods saath use karne padte hain — frames, status, pitch structure, frame stacking, aur non-neediness.',
                    'Deep preparation (insider knowledge) domain expertise flash karke situational status raise karne ka sabse fast tarika hai.',
                    'Narrative hamesha data ko harati hai. Croc brain stories se engage hota hai, spreadsheets se nahi.',
                    'Strength pe withdraw karo — UNHE deal chase karne do. Kabhi neediness ki position se close mat karo.',
                    'STRONG method tab bhi kaam karta hai jab tum underdog ho bigger, better-funded opponents ke against.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 7 Quiz',
            questions: [
                {
                    question: 'Klaff ne airport authority meeting mein apna frame kaise set kiya?',
                    options: [
                        'Detailed spreadsheet present ki',
                        'Apne group ko selective prize position kiya — UNHONE yeh project choose kiya',
                        'Competitors se kam price offer kiya',
                        'Political connections laaye'
                    ],
                    correct: 1,
                    explanation: 'Klaff ne shuru se prize frame use kiya: "Hum projects ke baare mein choosy hain" — fauran apni team ko valuable, selective party position kiya hungry vendor ki jagah.'
                },
                {
                    question: 'Pitch mein Klaff ka "novelty bomb" kya tha?',
                    options: [
                        'Surprise low price',
                        'Reveal karna ki airlines ne pehle se interest dikhaaya tha',
                        'Viral video dikhana',
                        'Celebrity partner laana'
                    ],
                    correct: 1,
                    explanation: 'Usne verified inside information drop ki: teen airlines ne interest dikhaya tha. Yeh novel, unexpected thi, aur authority ke liye deal ka calculus badal diya — classic croc brain engagement.'
                },
                {
                    question: 'Klaff ne CFO ke analyst-frame interruption ko kaise handle kiya?',
                    options: [
                        'Spreadsheet kholke comply kiya',
                        'Bola "Mere paas woh numbers nahi hain"',
                        'Intrigue frame use kiya — compelling narrative hook se redirect kiya',
                        'CFO ko completely ignore kiya'
                    ],
                    correct: 2,
                    explanation: 'Usne analyst frame ko intrigue frame se counter kiya: concern acknowledge ki jabki ek story hook create kiya jo CFO ko wapas uski narrative mein pull kare. Analyst frame neutralized.'
                },
                {
                    question: 'Klaff ne deal kaise close ki?',
                    options: [
                        'Contract maanga aur hard push kiya',
                        'Badi discount offer ki',
                        'Gracefully withdraw hua — aur authority ne agle din call kiya',
                        'Competitor airport pe jaane ki dhamki di'
                    ],
                    correct: 2,
                    explanation: 'Classic non-needy close. Woh withdraw hua: "Agar timing bane toh phir baat karte hain." Chase na karke, usne loss aversion trigger kiya. Authority ne USSE call kiya accelerate karne ke liye.'
                },
                {
                    question: 'Klaff ki preparation ka key advantage kya tha?',
                    options: [
                        'Financial data memorize kiya tha',
                        'Insider details jaanta tha (failed 2019 deal) jo domain expertise flash kare',
                        'Competition se zyada slides the',
                        '100 baar pitch practice ki'
                    ],
                    correct: 1,
                    explanation: 'Failed internal Davis Group proposal ke baare mein jaanna Klaff ka situational status instantly elevate kar gaya. Signal: "Main yeh duniya deeply jaanta hoon" — sabse powerful status move.'
                },
            ]
        },
    },
    // --- Chapter 8 ---
    {
        title: 'Game Mein Utro',
        subtitle: 'STRONG method se aaj hi pitching shuru karne ka tumhara action plan.',
        icon: 'fas fa-rocket',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-flag-checkered"></i> Theory Se Action Tak',
                content: `
                    <p>Tumhare paas ab complete Pitch Anything toolkit hai. Lekin action ke bina knowledge sirf entertainment hai. Klaff ka final message clear hai: <strong>game mein utro</strong>.</p>
                    <p>Pitching ek skill hai — aur kisi bhi skill ki tarah, yeh <strong>deliberate practice</strong> se better hoti hai. Pehli kuch baar ladkhadaoge. Frames collapse honge. Needy feel karoge. Yeh normal hai. Amateurs aur professionals mein farq talent nahi — <strong>reps</strong> hain.</p>
                    <p>Yeh raha tumhara action plan STRONG method fauran use karne ke liye.</p>
                `
            },
            {
                type: 'steps',
                title: '<i class="fas fa-clipboard-list"></i> Tumhara 7-Day Action Plan',
                steps: [
                    {
                        icon: 'fas fa-calendar-day',
                        label: 'Day 1-2: Apni Current Pitch Audit Karo',
                        desc: 'Khud ko apni current pitch deliver karte hue record karo. Dekho. Kahan analytical ho rahe ho jab intrigue create karni chahiye? Kahan approval dhundh rahe ho? Har needy behavior likh lo.'
                    },
                    {
                        icon: 'fas fa-pen',
                        label: 'Day 3: "Why Now?" Frame Se Rewrite Karo',
                        desc: 'Teen converging forces identify karo (economic, social, technology) jo tumhara idea ABHI urgent banaati hain. Big Idea intro formula se nayi opening likho. Time karo — 5 minute se kam rakho.'
                    },
                    {
                        icon: 'fas fa-chess',
                        label: 'Day 4: Frame Control Practice Karo',
                        desc: 'Aaj teen real conversations mein frame awareness practice karo. Notice karo jab doosre frames set karte hain. Ek power-busting move aur ek intrigue frame try karo. Pitch hona zaruri nahi — koi bhi conversation chalegi.'
                    },
                    {
                        icon: 'fas fa-fire',
                        label: 'Day 5: Frame Stack Build Karo',
                        desc: 'Apna intrigue frame (story hook), prize frame ("hum kyun selective hain"), time frame (real deadlines), aur moral authority statement likh lo. Sequence yaad karo.'
                    },
                    {
                        icon: 'fas fa-users',
                        label: 'Day 6: Partner Ke Saath Rehearse Karo',
                        desc: 'Kisi ko pakdo jo hostile investor play kare. Unse power plays, analyst questions, aur time pressure se interrupt karwao. Practice karo jab tak counters natural lage, scripted nahi.'
                    },
                    {
                        icon: 'fas fa-rocket',
                        label: 'Day 7: Real Pitch Deliver Karo',
                        desc: 'Real meeting book karo. Poora STRONG method deliver karo. Perfection ka aim mat karo — execution ka aim karo. Ho sake toh record karo. Review karo aur iterate karo.'
                    }
                ]
            },
            {
                type: 'text',
                title: '<i class="fas fa-brain"></i> Mindset Shift',
                content: `
                    <p>Is book se sabse bada change technique nahi hai — yeh ek <strong>mindset shift</strong> hai. Zyada tar log meetings mein yeh soch ke jaate hain:</p>
                    <p><em>"Inhe achha lagoon. Yeh haan bol dein. Mujhe yeh deal chahiye."</em></p>
                    <p>Pitch Anything ke baad, tumhe yeh soch ke jaana chahiye:</p>
                    <p><strong>"Mere paas kuch valuable hai. Dekhte hain WOH qualify karte hain ya nahi. Agar nahi — mere paas aur options hain."</strong></p>
                    <p>Yeh shift — chaser se prize, needy se abundant, reactive se frame-setter — yahi cheez top 1% deal-makers ko baaki sabse alag karti hai.</p>
                `
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Master Principles — Tap Karke Flip Karo',
                cards: [
                    { front: 'Pehle Croc Brain', icon: 'fas fa-brain', back: '<strong>Hamesha croc brain ko pitch karo.</strong> Agar tumhara message primitive filter pass nahi karta, neocortex kabhi dekhega hi nahi. Novelty, tension, aur high-contrast information tumhari keys hain.' },
                    { front: 'Frame = Control', icon: 'fas fa-chess-king', back: '<strong>Jiska frame, uski conversation.</strong> Frame jaldi set karo, pressure mein hold karo, aur kabhi kisi aur ke frame ko bina fight ke submit mat karo.' },
                    { front: 'Prize Bano', icon: 'fas fa-gem', back: '<strong>Kabhi chase mat karo.</strong> Khud ko scarce, valuable resource position karo. Unse tumhare liye qualify karwao. Prize frame business ka sabse powerful reframe hai.' },
                    { front: 'Neediness Khatam Karo', icon: 'fas fa-shield-alt', back: '<strong>Kuch mat chaho. Excellent bano. Withdraw karo.</strong> Walk away karne ki willingness kisi bhi negotiation mein value ka single strongest signal hai.' },
                    { front: 'Theory Se Zyada Reps', icon: 'fas fa-dumbbell', back: '<strong>Knowledge power nahi hai — practice hai.</strong> Ek real-world pitch yeh book 10 baar padhne se zyada sikhati hai. Game mein utro. Iterate karo. Improve karo.' },
                ]
            },
            {
                type: 'comparison',
                title: '<i class="fas fa-columns"></i> Pitch Anything Se Pehle vs. Baad Mein',
                colBad: {
                    header: '<i class="fas fa-thumbs-down"></i> Pehle',
                    items: [
                        'Data aur slides se lead karte the',
                        'Audience ko frame set karne dete the',
                        '45+ minute tak baat karte the',
                        'Deal desperately chase karte the',
                        'Room se approval dhundhte the',
                        'Sochte the pitches kyun convert nahi hote',
                    ]
                },
                colGood: {
                    header: '<i class="fas fa-thumbs-up"></i> Baad Mein',
                    items: [
                        '"Why Now?" narrative se lead karte ho',
                        'Minute one se frame set aur control karte ho',
                        'Tight 20-minute pitch deliver karte ho',
                        'Khud ko prize position karte ho',
                        'Calm, abundant confidence project karte ho',
                        'STRONG method se deals close karte ho',
                    ]
                }
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Final Scenario: Full STRONG',
                prompt: 'Kal ek major prospect ke saath meeting hai. Jo kuch seekha hai usse use karke, konsi preparation sequence sahi hai?',
                options: [
                    { text: '60-slide deck banao har data point ke saath, 3 ghante rehearse karo, aur best hope karke jaao.', correct: false },
                    { text: 'Unki duniya research karo (insider knowledge), 3 forces ke saath "Why Now?" opening likho, power/time/analyst plays ke liye frame counters prepare karo, frame stack plan karo (intrigue→prize→time→moral authority), aur pull-back close practice karo.', correct: true },
                    { text: 'Wing it karo — spontaneity confidence dikhata hai. Bas business cards le jaao.', correct: false },
                    { text: 'Advance mein 20-page proposal bhejo aur meeting use karo questions answer karne ke liye.', correct: false },
                ],
                correctIndex: 1,
                feedbackCorrect: 'Yahi hai poora STRONG method preparation form mein: insider research (status), "Why Now?" opening (pitch structure), frame counters (frame control), frame stack (hot cognition), aur pull-back close (non-neediness). Tum ready ho.',
                feedbackWrong: 'Data dumps, wing karna, aur pre-sent proposals sab STRONG test fail karte hain. Sahi preparation matlab: insider research, "Why Now?" opening, frame counters, planned frame stack (intrigue → prize → time → moral authority), aur non-needy close strategy.'
            },
            {
                type: 'takeaways',
                title: '<i class="fas fa-check-double"></i> Chapter 8 Ke Key Takeaways',
                items: [
                    'Practice ke bina knowledge entertainment hai. Fauran game mein utro.',
                    '7-day action plan follow karo: audit, rewrite, frames practice, stack build, rehearse, deliver.',
                    'Sabse bada shift: chaser se prize, needy se abundant, reactive se frame-setter.',
                    'Ek real pitch book 10 baar padhne se zyada sikhati hai.',
                    'STRONG method master karo: Set frame, Tell story, Reveal intrigue, Offer prize, Nail hook, Get deal.',
                    'Tumhare paas ab har tool hai. Baaki sirf execution hai.',
                ]
            },
        ],
        quiz: {
            title: 'Chapter 8 Quiz',
            questions: [
                {
                    question: 'Klaff ka final message book mein kya hai?',
                    options: [
                        'Pitching pe aur books padho',
                        'Pitch coach hire karo',
                        'Game mein utro — real-world execution se practice karo',
                        'Kabhi pitch karne se pehle slides perfect karo'
                    ],
                    correct: 2,
                    explanation: '"Game mein utro." Klaff emphasize karta hai ki pitching ek performance skill hai — yeh sirf deliberate real-world practice se improve hoti hai, aur reading ya theorizing se nahi.'
                },
                {
                    question: 'Is book ke baad sahi mindset shift kya hai?',
                    options: [
                        'Confidence se humility',
                        'Chaser se prize, needy se abundant',
                        'Selling se consulting',
                        'Pitching se presenting'
                    ],
                    correct: 1,
                    explanation: 'Core shift: deals chase karna band karo aur prize bano. Neediness ko abundance se replace karo. React karne ki jagah frames set karo.'
                },
                {
                    question: 'Action plan ke Day 1 mein kya karna chahiye?',
                    options: [
                        'Real pitch deliver karo',
                        'Frame stack build karo',
                        'Apni current pitch record aur audit karo needy behaviors ke liye',
                        'STRONG acronym yaad karo'
                    ],
                    correct: 2,
                    explanation: 'Improve karne se pehle awareness chahiye. Apni current pitch record aur audit karne se pata chalta hai kahan analytical, approval-seeking, ya needy ho rahe ho — fix karne ka pehla step.'
                },
                {
                    question: 'Ek real pitch book 10 baar padhne se behtar kyun hai?',
                    options: [
                        'Books useless hain',
                        'Real pitches muscle memory build karti hain aur dikhati hain pressure mein kya actually kaam karta hai',
                        'Reading bohot slow hai',
                        'Log books properly kabhi nahi padhte'
                    ],
                    correct: 1,
                    explanation: 'Pitching ek performance skill hai. Sports ya music ki tarah, asli learning live execution mein hoti hai — pata chalta hai kya kaam karta hai, kya nahi, aur real pressure mein kaise adapt karna hai.'
                },
                {
                    question: 'Complete STRONG acronym kya hai?',
                    options: [
                        'Set, Think, Resolve, Offer, Negotiate, Go',
                        'Start, Tell, Reveal, Optimize, Network, Grow',
                        'Set the frame, Tell the story, Reveal intrigue, Offer the prize, Nail the hook, Get the deal',
                        'Sell, Target, Reach, Outperform, Notify, Gain'
                    ],
                    correct: 2,
                    explanation: 'Set the frame, Tell the story, Reveal the intrigue, Offer the prize, Nail the hook point, Get the deal — neurofinance-based pitching ka complete STRONG method.'
                },
            ]
        },
    },
];

// ===== UTILITY HELPERS =====

/** Save progress to localStorage */
function saveProgress() {
    const data = {
        currentChapter: state.currentChapter,
        completed: state.completed,
        quizScores: state.quizScores,
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save progress:', e);
    }
}

/** Load progress from localStorage */
function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (Array.isArray(data.completed)) state.completed = data.completed;
        if (data.quizScores) state.quizScores = data.quizScores;
        if (typeof data.currentChapter === 'number') state.currentChapter = data.currentChapter;
    } catch (e) {
        console.warn('Could not load progress:', e);
    }
}

/** Show a toast notification */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}

/** Simple confetti burst on the canvas */
function launchConfetti() {
    const canvas = DOM.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 6 + 3,
        dx: (Math.random() - 0.5) * 16,
        dy: (Math.random() - 0.5) * 16 - 4,
        color: CHAPTER_COLORS[Math.floor(Math.random() * CHAPTER_COLORS.length)],
        gravity: 0.15,
        opacity: 1,
    }));

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        pieces.forEach((p) => {
            p.x += p.dx;
            p.y += p.dy;
            p.dy += p.gravity;
            p.opacity -= 0.008;
            if (p.opacity > 0) {
                alive = true;
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        ctx.globalAlpha = 1;
        if (alive && frame < 200) {
            frame++;
            requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    draw();
}

/** Calculate overall progress percentage */
function getProgressPercent() {
    return Math.round((state.completed.length / CHAPTERS.length) * 100);
}

/** Update all progress UI elements */
function updateProgressUI() {
    const pct = getProgressPercent();
    DOM.progressPercent.textContent = `${pct}%`;
    DOM.mobileProgress.textContent = `${pct}%`;
    DOM.progressFill.style.width = `${pct}%`;
    DOM.progressDetail.textContent = `${state.completed.length} / ${CHAPTERS.length} chapters complete`;
}

// ===== SIDEBAR TOGGLE (mobile) =====
function openSidebar() {
    state.sidebarOpen = true;
    DOM.sidebar.classList.add('open');
    DOM.sidebarOverlay.classList.add('visible');
}

function closeSidebar() {
    state.sidebarOpen = false;
    DOM.sidebar.classList.remove('open');
    DOM.sidebarOverlay.classList.remove('visible');
}

// ==========================================================
//  RENDERING — Sidebar Navigation
// ==========================================================

/** Build the sidebar chapter list */
function renderChapterNav() {
    DOM.chapterNav.innerHTML = CHAPTERS.map((ch, i) => {
        const isActive    = i === state.currentChapter;
        const isCompleted = state.completed.includes(i);
        let cls = 'chapter-nav-item';
        if (isActive)    cls += ' active';
        if (isCompleted) cls += ' completed';

        return `
            <div class="${cls}" data-chapter="${i}">
                <div class="ch-nav-num" style="background:${CHAPTER_COLORS[i]}">${i + 1}</div>
                <div class="ch-nav-check"><i class="fas ${isCompleted ? 'fa-check' : 'fa-circle'}"></i></div>
                <div class="ch-nav-text">
                    <div class="ch-nav-title">${ch.title}</div>
                    <div class="ch-nav-sub">${ch.sections.length} sections · ${ch.quiz ? ch.quiz.questions.length + ' quiz sawaal' : 'Koi quiz nahi'}</div>
                </div>
            </div>`;
    }).join('');

    // Click handlers
    DOM.chapterNav.querySelectorAll('.chapter-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.chapter, 10);
            navigateToChapter(idx);
            closeSidebar();
        });
    });
}

// ==========================================================
//  RENDERING — Section Builders
// ==========================================================

/** Render a text section */
function renderTextSection(sec) {
    return `
        <div class="section-card">
            <div class="section-title">${sec.title}</div>
            <div class="section-content">${sec.content}</div>
        </div>`;
}

/** Render a steps section */
function renderStepsSection(sec) {
    const stepsHTML = sec.steps.map((s, i) => `
        <div class="step-item">
            <div class="step-icon" style="background:${CHAPTER_COLORS[state.currentChapter]}; color:white;">
                <i class="${s.icon}"></i>
            </div>
            <div class="step-content">
                <h4>${s.label}</h4>
                <p>${s.desc}</p>
            </div>
        </div>`).join('');

    return `
        <div class="section-card">
            <div class="section-title">${sec.title}</div>
            <div class="steps-list">${stepsHTML}</div>
        </div>`;
}

/** Render a flip-cards section */
function renderFlipcardsSection(sec) {
    const cardsHTML = sec.cards.map((c, i) => `
        <div class="flipcard" onclick="this.classList.toggle('flipped')">
            <div class="flipcard-inner">
                <div class="flipcard-front" style="background:linear-gradient(135deg, ${CHAPTER_COLORS[state.currentChapter]}, ${CHAPTER_COLORS[(state.currentChapter + 1) % 8]})">
                    <i class="${c.icon}"></i>
                    <h4>${c.front}</h4>
                    <span class="flip-hint">Flip karne ke liye tap karo</span>
                </div>
                <div class="flipcard-back">
                    ${c.back}
                </div>
            </div>
        </div>`).join('');

    return `
        <div class="section-card">
            <div class="section-title">${sec.title}</div>
            <div class="flipcard-grid">${cardsHTML}</div>
        </div>`;
}

/** Render a scenario section */
function renderScenarioSection(sec, sectionIdx) {
    const id = `scenario-${state.currentChapter}-${sectionIdx}`;
    const letters = ['A', 'B', 'C', 'D'];
    const optsHTML = sec.options.map((o, i) => `
        <div class="scenario-option" data-idx="${i}" data-scenario="${id}">
            <span class="option-letter">${letters[i]}</span>
            <span>${o.text}</span>
        </div>`).join('');

    return `
        <div class="section-card">
            <div class="scenario-box">
                <div class="scenario-header"><i class="fas fa-theater-masks"></i> Interactive Scenario</div>
                <div class="scenario-body">
                    <div class="scenario-prompt">${sec.prompt}</div>
                    <div class="scenario-options" id="${id}">${optsHTML}</div>
                    <div class="scenario-feedback-area" id="${id}-feedback"></div>
                </div>
            </div>
        </div>`;
}

/** Render a comparison section */
function renderComparisonSection(sec) {
    const badItems  = sec.colBad.items.map(t => `<li>${t}</li>`).join('');
    const goodItems = sec.colGood.items.map(t => `<li>${t}</li>`).join('');

    return `
        <div class="section-card">
            <div class="section-title">${sec.title}</div>
            <div class="comparison-table">
                <div class="comparison-col bad">
                    <div class="comparison-col-header">${sec.colBad.header}</div>
                    <div class="comparison-col-body"><ul>${badItems}</ul></div>
                </div>
                <div class="comparison-col good">
                    <div class="comparison-col-header">${sec.colGood.header}</div>
                    <div class="comparison-col-body"><ul>${goodItems}</ul></div>
                </div>
            </div>
        </div>`;
}

/** Render a brain diagram section */
function renderBrainSection(sec) {
    const layersHTML = sec.layers.map((l, i) => `
        <div class="brain-layer ${l.cssClass}" data-brain="${i}">
            <h4>${l.name}</h4>
            <p>${l.shortDesc}</p>
        </div>`).join('');

    return `
        <div class="section-card">
            <div class="section-title">${sec.title}</div>
            <div class="brain-diagram" id="brainDiagram">${layersHTML}</div>
            <div id="brainDetail" class="brain-detail" style="display:none;"></div>
        </div>`;
}

/** Render a dialogue section */
function renderDialogueSection(sec) {
    const linesHTML = sec.lines.map(l => `
        <div class="dialogue-line">
            <span class="dialogue-speaker ${l.who}">${l.speaker}:</span>
            <span>${l.text}</span>
        </div>`).join('');

    return `
        <div class="section-card">
            <div class="section-title">${sec.title}</div>
            <div class="dialogue-box">${linesHTML}</div>
        </div>`;
}

/** Render a takeaways section */
function renderTakeawaysSection(sec) {
    const itemsHTML = sec.items.map(t => `
        <li class="takeaway-item">
            <span class="takeaway-check"><i class="fas fa-check"></i></span>
            <span>${t}</span>
        </li>`).join('');

    return `
        <div class="section-card">
            <div class="section-title">${sec.title}</div>
            <ul class="takeaway-list">${itemsHTML}</ul>
        </div>`;
}

/** Render examples section */
function renderExamplesSection(sec) {
    const itemsHTML = sec.items.map(ex => '<div class="example-card"><h4><i class="fas fa-bookmark"></i> ' + ex.title + '</h4><p>' + ex.desc + '</p></div>').join("");
    return '<div class="section-card"><div class="section-title">' + sec.title + '</div><div class="examples-grid">' + itemsHTML + '</div></div>';
}

/** Dispatch section rendering by type */
function renderSection(sec, idx) {
    switch (sec.type) {
        case 'text':       return renderTextSection(sec);
        case 'examples':   return renderExamplesSection(sec);
        case 'steps':      return renderStepsSection(sec);
        case 'flipcards':  return renderFlipcardsSection(sec);
        case 'scenario':   return renderScenarioSection(sec, idx);
        case 'comparison': return renderComparisonSection(sec);
        case 'brain':      return renderBrainSection(sec);
        case 'dialogue':   return renderDialogueSection(sec);
        case 'takeaways':  return renderTakeawaysSection(sec);
        default:           return `<div class="section-card"><p>Unknown section type: ${sec.type}</p></div>`;
    }
}

// ==========================================================
//  RENDERING — Quiz Engine
// ==========================================================

function renderQuiz(quiz, chapterIdx) {
    if (!quiz) return '';
    const qLen = quiz.questions.length;
    return `
        <div class="quiz-container" id="quizContainer">
            <div class="quiz-header">
                <div class="quiz-header-left"><i class="fas fa-clipboard-check"></i> ${quiz.title}</div>
                <div class="quiz-header-right" id="quizProgress">Sawaal 1 / ${qLen}</div>
            </div>
            <div class="quiz-body" id="quizBody">
                <!-- rendered dynamically -->
            </div>
        </div>`;
}

/** Show a specific quiz question */
function showQuizQuestion(chapterIdx, qIdx) {
    const quiz = CHAPTERS[chapterIdx].quiz;
    if (!quiz) return;
    const q = quiz.questions[qIdx];
    const total = quiz.questions.length;
    const letters = ['A', 'B', 'C', 'D'];

    const quizProgress = document.getElementById('quizProgress');
    if (quizProgress) quizProgress.textContent = `Sawaal ${qIdx + 1} / ${total}`;

    const body = document.getElementById('quizBody');
    if (!body) return;

    const optsHTML = q.options.map((opt, i) => `
        <div class="quiz-option" data-qidx="${qIdx}" data-oidx="${i}">
            <span class="opt-letter">${letters[i]}</span>
            <span>${opt}</span>
        </div>`).join('');

    body.innerHTML = `
        <div class="quiz-question"><span class="q-num">Q${qIdx + 1}.</span> ${q.question}</div>
        <div class="quiz-options" id="quizOptions">${optsHTML}</div>
        <div id="quizExplanation"></div>
        <div class="quiz-nav">
            <button class="quiz-btn quiz-btn-secondary" id="quizPrev" ${qIdx === 0 ? 'disabled' : ''}>
                <i class="fas fa-arrow-left"></i> Pichla
            </button>
            <button class="quiz-btn quiz-btn-primary" id="quizNext" style="display:none;">
                ${qIdx === total - 1 ? 'Results Dekho' : 'Agla'} <i class="fas fa-arrow-right"></i>
            </button>
        </div>`;

    // Wire option clicks
    body.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => handleQuizAnswer(chapterIdx, qIdx, parseInt(opt.dataset.oidx, 10)));
    });

    // Wire nav buttons
    const prevBtn = document.getElementById('quizPrev');
    const nextBtn = document.getElementById('quizNext');
    if (prevBtn) prevBtn.addEventListener('click', () => showQuizQuestion(chapterIdx, qIdx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (qIdx === total - 1) {
            showQuizResults(chapterIdx);
        } else {
            showQuizQuestion(chapterIdx, qIdx + 1);
        }
    });
}

/** Handle a quiz answer selection */
function handleQuizAnswer(chapterIdx, qIdx, selectedIdx) {
    const q = CHAPTERS[chapterIdx].quiz.questions[qIdx];
    const isCorrect = selectedIdx === q.correct;
    const options = document.querySelectorAll(`#quizOptions .quiz-option`);

    // Track score
    if (!state.quizScores[chapterIdx]) state.quizScores[chapterIdx] = { score: 0, total: 0, answered: [] };
    const qs = state.quizScores[chapterIdx];
    if (!qs.answered.includes(qIdx)) {
        qs.answered.push(qIdx);
        qs.total++;
        if (isCorrect) qs.score++;
        saveProgress();
    }

    // Disable all options & highlight
    options.forEach(opt => {
        opt.classList.add('disabled');
        const oidx = parseInt(opt.dataset.oidx, 10);
        if (oidx === q.correct) opt.classList.add('correct-answer');
        if (oidx === selectedIdx && !isCorrect) opt.classList.add('wrong-answer');
    });

    // Show explanation
    const expDiv = document.getElementById('quizExplanation');
    if (expDiv) {
        expDiv.innerHTML = `
            <div class="quiz-explanation ${isCorrect ? 'correct' : 'wrong'}">
                <strong>${isCorrect ? '<i class="fas fa-check-circle"></i> Sahi Jawab!' : '<i class="fas fa-times-circle"></i> Bilkul nahi.'}</strong>
                ${q.explanation}
            </div>`;
    }

    // Show next button
    const nextBtn = document.getElementById('quizNext');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
}

/** Show quiz results summary */
function showQuizResults(chapterIdx) {
    const quiz = CHAPTERS[chapterIdx].quiz;
    const qs = state.quizScores[chapterIdx] || { score: 0, total: quiz.questions.length };
    const pct = Math.round((qs.score / quiz.questions.length) * 100);

    let grade, gradeClass;
    if (pct >= 90)      { grade = 'Shandar!'; gradeClass = 'excellent'; }
    else if (pct >= 70) { grade = 'Bahut Accha!';  gradeClass = 'good'; }
    else if (pct >= 50) { grade = 'Theek Hai';    gradeClass = 'okay'; }
    else                { grade = 'Aur Seekho'; gradeClass = 'poor'; }

    // Auto-complete chapter when quiz is done (any score)
    if (!state.completed.includes(chapterIdx)) {
        state.completed.push(chapterIdx);
        saveProgress();
        renderChapterNav();
        updateProgressUI();
    }

    const body = document.getElementById('quizBody');
    if (!body) return;

    const isCompleted = state.completed.includes(chapterIdx);

    body.innerHTML = `
        <div class="quiz-results">
            <div class="quiz-score-circle ${gradeClass}">
                <div class="quiz-score-num">${pct}%</div>
                <div class="quiz-score-label">${qs.score}/${quiz.questions.length}</div>
            </div>
            <h3>${grade}</h3>
            <p>Tumne ${quiz.title} mein ${quiz.questions.length} mein se ${qs.score} sahi kiye.</p>
            <p style="color:var(--accent);font-weight:600;margin-top:0.5rem;"><i class="fas fa-check-circle"></i> Chapter complete ho gaya!</p>
            <button class="quiz-btn quiz-btn-secondary" id="quizRetry"><i class="fas fa-redo"></i> Dobara Try Karo</button>
            ${state.currentChapter < CHAPTERS.length - 1 ? `<button class="quiz-btn quiz-btn-primary" id="quizNextCh" style="margin-left:0.5rem;"><i class="fas fa-arrow-right"></i> Agla Chapter</button>` : ''}
        </div>`;

    // Wire retry
    const retryBtn = document.getElementById('quizRetry');
    if (retryBtn) retryBtn.addEventListener('click', () => {
        state.quizScores[chapterIdx] = { score: 0, total: 0, answered: [] };
        saveProgress();
        showQuizQuestion(chapterIdx, 0);
    });

    // Wire next chapter
    const nextChBtn = document.getElementById('quizNextCh');
    if (nextChBtn) nextChBtn.addEventListener('click', () => {
        navigateToChapter(chapterIdx + 1);
    });

    // Confetti + toast
    launchConfetti();
    showToast(`Chapter ${chapterIdx + 1} complete ho gaya!`, 'success');
}

// ==========================================================
//  RENDERING — Full Chapter Page
// ==========================================================

/** Render the welcome/home screen */
function renderWelcome() {
    const cardsHTML = CHAPTERS.map((ch, i) => `
        <div class="welcome-ch-card" data-chapter="${i}">
            <div class="ch-num" style="color:${CHAPTER_COLORS[i]}">Chapter ${i + 1}</div>
            <div class="ch-name">${ch.title}</div>
        </div>`).join('');

    DOM.mainContent.innerHTML = `
        <div class="welcome-screen">
            <h1>Pitch Anything</h1>
            <p>Oren Klaff ka revolutionary method — presenting, persuading, aur deal jeetnay ka interactive deep-dive. Shuru karne ke liye koi chapter chuno.</p>
            <div class="welcome-chapters">${cardsHTML}</div>
        </div>`;

    DOM.mainContent.querySelectorAll('.welcome-ch-card').forEach(card => {
        card.addEventListener('click', () => {
            navigateToChapter(parseInt(card.dataset.chapter, 10));
        });
    });
}

/** Render a full chapter */
function renderChapter(idx) {
    const ch = CHAPTERS[idx];
    if (!ch) return renderWelcome();

    const color = CHAPTER_COLORS[idx];
    const sectionsHTML = ch.sections.map((sec, i) => renderSection(sec, i)).join('');
    const quizHTML = renderQuiz(ch.quiz, idx);

    // Chapter complete card (if not yet completed)
    const isCompleted = state.completed.includes(idx);
    const completeHTML = isCompleted
        ? `<div class="chapter-complete-card">
                <i class="fas fa-check-circle"></i>
                <h3>Chapter Complete Ho Gaya!</h3>
                <p>Tumne yeh chapter master kar liya. Zabardast kaam!</p>
           </div>`
        : '';

    // Nav buttons
    const prevIdx = idx - 1;
    const nextIdx = idx + 1;
    const navHTML = `
        <div class="chapter-nav-buttons">
            <button class="nav-btn" ${prevIdx < 0 ? 'disabled' : ''} id="navPrev">
                <i class="fas fa-arrow-left"></i> Pichla
            </button>
            <button class="nav-btn primary" ${nextIdx >= CHAPTERS.length ? 'disabled' : ''} id="navNext">
                Agla Chapter <i class="fas fa-arrow-right"></i>
            </button>
        </div>`;

    DOM.mainContent.innerHTML = `
        <div class="chapter-header">
            <div class="chapter-badge" style="background:${color}">
                <i class="${ch.icon}"></i> Chapter ${idx + 1}
            </div>
            <h1>${ch.title}</h1>
            <p class="subtitle">${ch.subtitle}</p>
        </div>
        ${sectionsHTML}
        ${quizHTML}
        ${completeHTML}
        ${navHTML}`;

    // Scroll to top
    DOM.mainContent.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // --- Post-render wiring ---

    // Brain diagram interactions
    const brainLayers = DOM.mainContent.querySelectorAll('.brain-layer');
    const brainDetail = document.getElementById('brainDetail');
    if (brainLayers.length && brainDetail) {
        const brainSec = ch.sections.find(s => s.type === 'brain');
        brainLayers.forEach(layer => {
            layer.addEventListener('click', () => {
                const bIdx = parseInt(layer.dataset.brain, 10);
                brainLayers.forEach(l => l.classList.remove('active'));
                layer.classList.add('active');
                brainDetail.style.display = 'block';
                brainDetail.innerHTML = `<strong>${brainSec.layers[bIdx].name}:</strong> ${brainSec.layers[bIdx].detail}`;
            });
        });
    }

    // Scenario interactions
    DOM.mainContent.querySelectorAll('.scenario-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const scenarioId = opt.dataset.scenario;
            const optIdx = parseInt(opt.dataset.idx, 10);
            const container = document.getElementById(scenarioId);
            const feedbackArea = document.getElementById(`${scenarioId}-feedback`);

            // Find the matching scenario section
            const secIdx = parseInt(scenarioId.split('-')[2], 10);
            const sec = ch.sections[secIdx];
            if (!sec) return;

            const isCorrect = optIdx === sec.correctIndex;

            // Disable all options
            container.querySelectorAll('.scenario-option').forEach(o => {
                o.classList.add('disabled');
                const oIdx = parseInt(o.dataset.idx, 10);
                if (oIdx === sec.correctIndex) o.classList.add('correct');
                if (oIdx === optIdx && !isCorrect) o.classList.add('wrong');
            });

            // Show feedback
            if (feedbackArea) {
                feedbackArea.innerHTML = `
                    <div class="scenario-feedback ${isCorrect ? 'correct' : 'wrong'}">
                        <strong>${isCorrect ? '<i class="fas fa-check-circle"></i> Sahi Jawab!' : '<i class="fas fa-times-circle"></i> Yeh best choice nahi thi.'}</strong>
                        ${isCorrect ? sec.feedbackCorrect : sec.feedbackWrong}
                    </div>`;
            }
        });
    });

    // Quiz init
    if (ch.quiz) showQuizQuestion(idx, 0);

    // Nav buttons
    const navPrev = document.getElementById('navPrev');
    const navNext = document.getElementById('navNext');
    if (navPrev) navPrev.addEventListener('click', () => navigateToChapter(prevIdx));
    if (navNext) navNext.addEventListener('click', () => navigateToChapter(nextIdx));
}

// ==========================================================
//  NAVIGATION & STATE
// ==========================================================

/** Navigate to a chapter (or welcome if null) */
function navigateToChapter(idx) {
    if (idx < 0 || idx >= CHAPTERS.length) return;
    state.currentChapter = idx;
    saveProgress();
    renderChapterNav();
    renderChapter(idx);
    updateProgressUI();
}

/** Mark a chapter as completed */
function completeChapter(idx) {
    if (!state.completed.includes(idx)) {
        state.completed.push(idx);
        saveProgress();
        showToast(`Chapter ${idx + 1} complete ho gaya!`, 'success');
        launchConfetti();
        renderChapterNav();
        updateProgressUI();
        renderChapter(idx); // re-render to show completion card
    }
}

/** Reset all progress */
function resetProgress() {
    if (!confirm('Saara progress reset karna hai? Yeh wapas nahi hoga.')) return;
    state.completed = [];
    state.quizScores = {};
    state.currentChapter = null;
    localStorage.removeItem(STORAGE_KEY);
    renderChapterNav();
    updateProgressUI();
    renderWelcome();
    showToast('Progress reset ho gaya.', 'info');
}

// ==========================================================
//  EVENT LISTENERS & BOOT
// ==========================================================

function boot() {
    // Load saved progress
    loadProgress();

    // Mobile sidebar
    DOM.menuToggle.addEventListener('click', () => {
        state.sidebarOpen ? closeSidebar() : openSidebar();
    });
    DOM.sidebarOverlay.addEventListener('click', closeSidebar);

    // Reset button
        DOM.resetBtn.addEventListener('click', resetProgress);
    if(DOM.flashcardsBtn) DOM.flashcardsBtn.addEventListener('click', renderMasterFlashcards);
    if(DOM.pitchBuilderBtn) DOM.pitchBuilderBtn.addEventListener('click', renderPitchBuilder);

    // Build sidebar nav
    renderChapterNav();
    updateProgressUI();

    // Show welcome or last chapter
    if (state.currentChapter !== null && state.currentChapter >= 0) {
        // Returning user — skip splash
        DOM.splashScreen.style.display = 'none';
        DOM.app.classList.remove('hidden');
        renderChapter(state.currentChapter);
    } else {
        // Fresh user — splash shown; on button tap go directly to Chapter 1
        DOM.startBtn.addEventListener('click', () => {
            DOM.splashScreen.classList.add('fade-out');
            setTimeout(() => {
                DOM.splashScreen.style.display = 'none';
                DOM.app.classList.remove('hidden');
                navigateToChapter(0);
            }, 600);
        }, { once: true });
    }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}

console.log('✅ app.js — Fully loaded.');
