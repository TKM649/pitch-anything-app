const fs = require('fs');

const ch1Data = `    // --- Chapter 1 ---
    {
        chapterId: 1,
        title: 'The Method',
        subtitle: 'Pitching kyun fail hoti hai aur STRONG method kaise fix karta hai.',
        icon: 'fas fa-bullseye',
        duration: '15 min read',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-exclamation-triangle"></i> Pitching Mein Problem Kya Hai?',
                content: \`
                    <p>Zyada tar log galat tarike se pitch karte hain. Wo information dump karte hain, logic-heavy slides use karte hain, aur phir sochte hain ki audience paanch minute baad kyun so gayi.</p>
                    <p>Oren Klaff ne discover kiya ki <strong>pitching procedure ke baare mein nahi hai — yeh brain science hai</strong>. Problem yeh hai: Aapka message aapke modern, smart neocortex mein banta hai, lekin listener ka primitive <strong>crocodile brain (magarmach brain)</strong> usse receive karta hai — jo bohot brutally filter karta hai aur almost sab kuch ignore kar deta hai.</p>
                    <p>Croc brain ko aapki spreadsheets se koi matlab nahi. Usse chahiye <strong>novelty (nayi cheezein), danger signals, aur high-contrast information</strong>. Agar aapki pitch croc brain ka filter pass nahi karti, toh brain ke decision-making parts tak pahunchti hi nahi.</p>
                \`
            },
            {
                type: 'examples',
                title: 'Real-Life Examples: Croc Brain in Action',
                items: [
                    { title: "VC Metting mein 'Data Dump'", desc: "Ek founder ne apne 50-page financial projections shuru mein hi dikha diye. Invester bore ho gaya kyuki 'Croc Brain' ko lagta hai 'yeh complex hai, ise reject karo'." },
                    { title: "The 'Change of Pace'", desc: "Pitch ke beech mein suddenly ek ajeeb sa unexpected sawaal puchna. Jaise 'Aapko lagta hai hum successful honge? Mujhe abhi lag raha hai nahi honge'. Croc brain turant alert ho jayega." },
                    { title: "Contrast Create Karna", desc: "Before aur After dikhana. 'Abhi humari loss $1M hai, next year $10M profit hogi'. Croc brain ko high-contrast bohot pasand hai." },
                    { title: "Surprise Element", desc: "Normal pitch deck ki jagah, ek physical prototype unke haath mein de do. Tactile feedback Croc brain ko engage karta hai." },
                    { title: "Time Constraint", desc: "'Mere paas sirf 20 minute hain, aur mujhe aapke sirf 10 minute chahiye'. Yeh scarcity create karta hai, jo Croc brain ko trigger karta hai ki 'isko dhyan se suno, time kam hai'." },
                    { title: "Humor aur Threat", desc: "Halka sa mazak jo thodi authority show kare. 'Aap chahein toh is deal ko ignore kar sakte hain, par aapke competitors ko main kal hi mil raha hu'." }
                ]
            },
            {
                type: 'framework',
                title: '<i class="fas fa-layer-group"></i> STRONG Framework',
                steps: [
                    { letter: 'S', title: 'Set the Frame', desc: 'Situation par control establish karna (Frame control hum Chapter 2 mein detail mein seekhenge).' },
                    { letter: 'T', title: 'Tell the Story', desc: 'Narrative jo listener ke emotions aur survival instincts ko engage kare.' },
                    { letter: 'R', title: 'Reveal the Intrigue', desc: 'Curiosity paida karna — sab kuch turant mat batao.' },
                    { letter: 'O', title: 'Offer the Prize', desc: 'Listener ko yeh realize karwana ki deal (app) aap hain, unka paisa nahi.' },
                    { letter: 'N', title: 'Nail the Hookpoint', desc: 'Woh moment jab unka hot cognition trigger hota hai aur wo physically aage badh aate hain.' },
                    { letter: 'G', title: 'Get the Deal', desc: 'Pitch ko close karne ke liye high status maintain karna.' }
                ]
            }
        ],
        quiz: [
            { question: "Listener SABSE PEHLE aapki pitch kahan process karta hai?", options: ["Neocortex", "Midbrain", "Croc brain", "Prefrontal cortex"], correct: 2, explanation: "Croc brain sabse purana aur primitive part hai jo nayi information ka first filter hota hai." },
            { question: "Croc brain kis type ki information ko REJECT karta hai?", options: ["High contrast", "New and novel", "Complex logic and details", "Visual threats"], correct: 2, explanation: "Croc brain complex details (like numbers) bhejte hi bore ho jata hai aur message reject kar deta hai." },
            { question: "STRONG framework mein 'S' ka matlab kya hai?", options: ["Sell the idea", "Set the Frame", "Show the money", "Seek consensus"], correct: 1, explanation: "'S' ka matlab hai Set the Frame, yani interaction ka context aur power dynamics control karna." },
            { question: "Pitch ka target audience ke brain ka kaunsa part hona chahiye (initially)?", options: ["Neocortex", "Midbrain", "Croc brain", "Prefrontal Cortex"], correct: 2, explanation: "Pehle Croc brain ka attention jeetna padta hai tabhi information aage jati hai." },
            { question: "Prizing ka main concept kya hai?", options: ["Discount dena", "Aap khud ek prize hain", "Unko bribe dena", "Saste mein deal karna"], correct: 1, explanation: "Offer the prize ka matlab hai unhe feel karana ki aap main prize hain, unka paisa nahi." },
            { question: "Croc brain ki prime job kya hai?", options: ["Math solve karna", "Survival", "Friendship banana", "Daya dikhana"], correct: 1, explanation: "Croc brain ka kaam hai threat detect karna aur survival ko ensure karna." },
            { question: "Pitching mei problem kya hai?", options: ["Zyada log logical pitch karte hai", "Kam bolte hai", "Zor se bolte hai", "Bohaut haste hai"], correct: 0, explanation: "Oren kahte hai ki log initially logical parts target karte hai jabki unhe croc brain target karna chahiye." },
            { question: "Information dump kahan fail hota hai?", options: ["Neocortex mein", "Midbrain mein", "Croc brain mein filter out hota hai", "Spinal cord mein"], correct: 2, explanation: "Croc brain complex info ko directly reject kar deta hai." },
            { question: "Croc brain ko kaise engage kar sakte ho?", options: ["High contrast se", "Detailed excel se", "Lamba speech se", "Chup rehkar"], correct: 0, explanation: "High contrast aur visuals croc brain ko jaldi pasand aate hain." },
            { question: "STRONG mein 'T' kya hai?", options: ["Take time", "Tell the Story", "Talk loudly", "Test them"], correct: 1, explanation: "T ka matlab hai Tell the story, narrative built karna." },
            { question: "Curiosity develop karne wala component kaunsa hai?", options: ["R - Reveal the Intrigue", "O - Offer Prize", "S - Set frame", "G - Get deal"], correct: 0, explanation: "Intrigue se samne wala further janne ko utsuk hota hai." },
            { question: "Neocortex kya karta hai?", options: ["First filter karta hai", "Complex data process karta hai", "Basic survival dekhta hai", "Decisions prevent karta hai"], correct: 1, explanation: "Neocortex advanced logic aur data samajhta hai, magar pehle alert hona zaruri hai." },
            { question: "Novelty (Nayi cheezein) kyun zaruri hai?", options: ["Croc brain attention deta hai", "Samajhne me mushkil hoti hai", "Yeh rule hai", "Log bore nahi honge"], correct: 0, explanation: "Novelty croc brain ko alert karti hai." },
            { question: "STRONG mein 'Hookpoint' ka matlab kya hai?", options: ["Physical touch", "Attention capture", "Deal sign", "Investment milna"], correct: 1, explanation: "Hookpoint woh pal hai jab wo aapse agree hone lagte hain aur aage jhookte hain." },
            { question: "Croc brain ke liye danger signals kyu imp hai?", options: ["Because wo survival threats dhundhta hai", "Kyuki usko maza aata hai", "Logic samajhta hai", "Kuch imp nahi hai"], correct: 0, explanation: "Survival mode active rehta hai isliye danger signals uspe asar karte hain." },
            { question: "Prizing framework mein kisko prize maante hain?", options: ["Investor ko", "Idea ko", "Aapko (Founder ko)", "Product ko"], correct: 2, explanation: "Aap khid ek prize hai jo samne wale ke paas chance hai lene ka." },
            { question: "Oren Klaff ka 'pitching' ke baare mein core insight kya tha?", options: ["It is a numbers game", "It is brain science", "It is luck", "It is about slide design"], correct: 1, explanation: "Oren ne isey brain science ka format banaya hai." },
            { question: "STRONG method mein 'G' kya hai?", options: ["Get the deal", "Go home", "Give up", "Generate leads"], correct: 0, explanation: "G ka matlab heh 'Get the deal' (deal finalise karna)." },
            { question: "Agar pitch Croc brain ko pasand na aaye toh kya hoga?", options: ["Agli stage mein jayegi", "Wo invest karenge", "Message reject ho jayega", "Croc brain band ho jayega"], correct: 2, explanation: "Message reject ho jayega aur neocortex tak jayega hi nahi." },
            { question: "Croc brain ko satisfy karne ke liye pitch kaisi honi chahiye?", options: ["Short and high contrast", "Long and detailed", "Boring and safe", "Logical and complex"], correct: 0, explanation: "Short, crisp, aur high contrast croc brain ko appeal karta hai." }
        ]
    },
`;

let appJs = fs.readFileSync('c:/Users/hp/Documents/APPS/js/app.js', 'utf8');
const startIdx = appJs.indexOf('// --- Chapter 1 ---');
const endIdx = appJs.indexOf('// --- Chapter 2 ---');

let newAppJs = appJs.substring(0, startIdx) + ch1Data + appJs.substring(endIdx);
fs.writeFileSync('c:/Users/hp/Documents/APPS/js/app.js', newAppJs, 'utf8');
console.log('Chapter 1 correctly injected!');
