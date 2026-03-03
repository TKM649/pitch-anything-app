const fs = require('fs');
let appJs = fs.readFileSync('c:/Users/hp/Documents/APPS/js/app.js', 'utf8');

// We will inject the new Chapter 1.
// Since finding the exact bounds of Chapter 1 with regex is tricky, we can do it by finding 'title: '\''The Method'\'',' and the start of Chapter 2.
const startMarker = "    // --- Chapter 1 ---\n    {";
const endMarker = "    // --- Chapter 2 ---\n    {";

const ch1Content = \    // --- Chapter 1 ---
    {
        title: 'The Method',
        subtitle: 'Pitching kyun fail hoti hai aur STRONG method kaise fix karta hai.',
        icon: 'fas fa-bullseye',
        sections: [
            {
                type: 'text',
                title: '<i class="fas fa-exclamation-triangle"></i> Pitching Mein Problem Kya Hai?',
                content: \
                    <p>Zyada tar log galat tarike se pitch karte hain. Wo information dump karte hain, logic-heavy slides use karte hain, aur phir sochte hain ki audience paanch minute baad kyun so gayi.</p>
                    <p>Oren Klaff ne discover kiya ki <strong>pitching procedure ke baare mein nahi hai — yeh brain science hai</strong>. Problem yeh hai: Aapka message aapke modern, smart neocortex mein banta hai, lekin listener ka primitive <strong>crocodile brain (magarmach brain)</strong> usse receive karta hai — jo bohot brutally filter karta hai aur almost sab kuch ignore kar deta hai.</p>
                    <p>Croc brain ko aapki spreadsheets se koi matlab nahi. Usse chahiye <strong>novelty (nayi cheezein), danger signals, aur high-contrast information</strong>. Agar aapki pitch croc brain ka filter pass nahi karti, toh brain ke decision-making parts tak pahunchti hi nahi.</p>
                \
            },
            {
                type: 'examples',
                title: '<i class="fas fa-book-open"></i> Real-Life Examples (Author Ki Taraf Se)',
                items: [
                    { title: 'Airport Deal', desc: 'Oren ne ek complex financial presentation ki jagah ek emotional story sunai. Usne data (neocortex) trigger karne ke bajaye pehle croc brain ko novelty se engage kiya aur  raise kiye.' },
                    { title: 'The Apple Pitch', desc: 'Sunk cost aur data features ke bare me bolne ke bajaye, Oren ne curiosity gap create kiya. "Main yaha tumhe ek aur software bechne nahi aaya..." Novelty ne croc-brain ko active kar diya.' },
                    { title: 'Information Dump Fail', desc: 'Ek start-up ne 80 slides ki PPT banayi apne algorithm ke bare me. 10 mins me VCs phone dekhne lag gaye. Kyu? Kyuki Croc Brain ko complexity pasand nahi aati, usne "ignore" mode on kar diya.' },
                    { title: 'The Defiance Move', desc: 'Ek billionaire investor ne Oren ki pitch ko ignore karke paper padhna shuru kar diya. Oren ne pitch roki, paper liya aur fenk diya. Billionaire suddenly engaged ho gaya. (High contrast/Novelty)' },
                    { title: 'Time Frame Control', desc: 'Buyer ne kaha "Bas 10 minute bache hain." Oren ne reply kiya "Mera time bhi important hai, mere paas sirf 8 minute hain decison ke liye." Isse Oren ka status aur power dono regain ho gaye.' },
                    { title: 'Boring vs Danger', desc: 'Oren ne samjhaya: Apni pitch ko aisa mat banao ki samne wala safe feel kare (Boring = Sleep). Pitch me thodi urgency aur risk involve karo (FOMO) taaki unka Croc Brain alert ho jaye.' }
                ]
            },
            {
                type: 'brain',
                title: '<i class="fas fa-brain"></i> Teen Brain Layers — Har Layer Pe Click Karo',
                layers: [
                    {
                        name: 'Neocortex',
                        cssClass: 'neocortex',
                        shortDesc: 'Problem-solving aur reasoning',
                        detail: 'Neocortex brain ka sabse evolved hissa hai. Yeh complex thinking, language, logic, logic, aur abstract reasoning handle karta hai. Yahan AAP apni pitch banate ho.'
                    },
                    {
                        name: 'Midbrain',
                        cssClass: 'midbrain',
                        shortDesc: 'Meaning aur social context',
                        detail: 'Midbrain cheezon ka matlab aur social situations decide karta hai. Yeh puchta hai: "Mere liye iska kya matlab hai? Social context kya hai?"'
                    },
                    {
                        name: 'Crocodile Brain',
                        cssClass: 'croc',
                        shortDesc: 'Survival — fight, flight, ya ignore',
                        detail: 'Croc brain gatekeeper hai. Yeh simple rules pe chalta hai: ignore karo, bhaago, ya lado. Agar aapki pitch boredom trigger karti hai, toh croc brain isse code karta hai "na threat hai, na interesting" aur filter kar deta hai.'
                    }
                ]
            },
            {
                type: 'steps',
                title: '<i class="fas fa-list-ol"></i> STRONG Method — 6 Steps',
                steps: [
                    { icon: 'fas fa-crosshairs', label: 'S — Set the Frame (Frame Set Karo)', desc: 'Har social encounter mein frames collide hote hain. Aapko APNA frame set karna hai.' },
                    { icon: 'fas fa-clock', label: 'T — Tell the Story (Kahani Sunao)', desc: 'Ek compelling kahani sunao jismein tension aur intrigue ho taaki croc brain engaged rahe.' },
                    { icon: 'fas fa-bolt', label: 'R — Reveal the Intrigue (Raaz Dikhao)', desc: 'Information gaps create karo jo audience ko aage jhukne par majboor kare. Novelty croc brain active karta hai.' },
                    { icon: 'fas fa-hand-paper', label: 'O — Offer the Prize (Khud Ko Prize Banao)', desc: 'Apne aap ko prize position karo, minnat karne wala nahi.' },
                    { icon: 'fas fa-anchor', label: 'N — Nail the Hook Point (Hook Jam Do)', desc: 'Hot cognition frames stack karo taaki audience emotionally decide kare.' },
                    { icon: 'fas fa-handshake', label: 'G — Get the Deal (Deal Pakdo)', desc: 'Bina needy hue close karo. Sahi waqt par withdraw karo.' }
                ]
            },
            {
                type: 'scenario',
                title: '<i class="fas fa-theater-masks"></i> Quick Scenario',
                prompt: 'Aap investors ke room mein pitch kar rahe ho. Ek apna phone nikal ke scroll karne lagta hai. Aap kya karoge?',
                options: [
                    { text: 'Zyada zor se bolo aur aur data add karo attention wapas laane ke liye.', correct: false },
                    { text: 'Ignore karo — kuch log aise hi hote hain.', correct: false },
                    { text: 'Ek achanak pattern interrupt introduce karo novelty ke saath taaki croc brain wapas engage ho.', correct: true },
                    { text: 'Politely kaho phone rakh do.', correct: false },
                ],
                correctIndex: 2,
                feedbackCorrect: 'Bilkul sahi! Croc brain ko novelty chahiye. Pattern interrupt attention wapas jhatke se laata hai.',
                feedbackWrong: 'Sahi nahi hai. Croc brain already tune out ho chuka hai. Aapko pattern interrupt chahiye.'
            },
            {
                type: 'flipcards',
                title: '<i class="fas fa-clone"></i> Key Concepts — Tap Karke Flip Karo',
                cards: [
                    { front: 'Croc Brain', icon: 'fas fa-dragon', back: 'Gatekeeper. Primitive brain jo har message filter karta hai. Agar boring ya complex hai, toh croc brain usse maar deta hai.' },
                    { front: 'Frame', icon: 'fas fa-border-all', back: 'Ek mental structure duniya ko dekhne ka. Jiska frame jeeta, woh interaction control karta hai.' },
                    { front: 'Novelty', icon: 'fas fa-star', back: 'Croc brain ki kamzori. Nayi aur alag info survival-mode filtering ko todne ke liye best hai.' },
                    { front: 'STRONG', icon: 'fas fa-fist-raised', back: 'Set the frame, Tell the story, Reveal intrigue, Offer the prize, Nail the hook, Get the deal.' },
                ]
            },
        ],
        quiz: {
            title: 'MEGA QUIZ: Chapter 1 (20 Questions)',
            questions: [
                { question: 'Pitch fail hone ka sabse bada reason kya hai?', options: ['Kam data', 'Neocortex se croc brain ka mismatch', 'Kharab product', 'High price'], correct: 1, explanation: 'Aapka message aapke neocortex me banta hai, par receiver ka croc brain use filter kar deta hai.' },
                { question: 'STRONG ka "S" kya hai?', options: ['Set the deal', 'Set the Frame', 'Sell product', 'Share info'], correct: 1, explanation: 'S matlab Set the Frame. Framing decide karta hai interaction kon control karega.' },
                { question: 'Croc brain ko kya attract karta hai?', options: ['Spreadsheets', 'Complexity', 'Novelty aur High Contrast', 'Numbers'], correct: 2, explanation: 'Croc brain nayi aur surprising cheezo ki taraf attract hota hai (Novelty).' },
                { question: 'Brain ka gatekeeper kon hai?', options: ['Neocortex', 'Midbrain', 'Cerebellum', 'Croc Brain'], correct: 3, explanation: 'Croc Brain sabse pehle information receive karke use filter karta hai.' },
                { question: 'Croc brain ke 3 options kya hain?', options: ['Read, Write, Learn', 'Ignore, Run, Fight', 'Analyze, Think, Decide', 'Wait, Watch, Buy'], correct: 1, explanation: 'Croc brain ya to ignore karta hai, fight karta hai, ya run karta hai.' },
                { question: 'Konsa brain part complex logic handle karta hai?', options: ['Neocortex', 'Midbrain', 'Croc Brain', 'Spinal Cord'], correct: 0, explanation: 'Neocortex sabse evolved part hai jo analysis karta hai.' },
                { question: 'Oren Klaff ki approach kis science par based hai?', options: ['Computer Science', 'Neurofinance', 'Astrophysics', 'Biology'], correct: 1, explanation: 'Ye tarika Neurofinance par aadharit hai - financial decisions brain kaise leta hai.' },
                { question: 'Pitching procedure nahi hai, balki kya hai?', options: ['Luck', 'Magic', 'Brain Science', 'Art'], correct: 2, explanation: 'Klaff kahta hai pitching pura brain science ka khel hai.' },
                { question: 'STRONG ka "G" kya hai?', options: ['Get out', 'Get the Deal', 'Go home', 'Gain info'], correct: 1, explanation: 'G matlab "Get the Deal" (bina needy hue).' },
                { question: 'Midbrain ka kya role hai?', options: ['Logic', 'Survival', 'Social Context aur Meaning', 'Breathing'], correct: 2, explanation: 'Midbrain social context read karta hai (iske piche kya motive hai).' },
                { question: 'Audience agar bore ho rahi hai to unka Croc Brain kya sochega?', options: ['Threat!', 'Ignore!', 'Interesting!', 'Invest!'], correct: 1, explanation: 'Boring info matlab "no threat, no novelty" isliye ignore.' },
                { question: 'Frame kaun control karta hai?', options: ['Jiska frame sabse strong hota hai', 'Speaker', 'Listener', 'Dono'], correct: 0, explanation: 'Frames jab collide hote hain to strong frame dominate karta hai.' },
                { question: 'Pitch ko interesting kaise banayein?', options: ['Aur data dalo', 'Slides padho', 'Tension aur Intrigue dalo', 'Slow bolo'], correct: 2, explanation: 'Tension aur kahani se Croc brain focus karta hai.' },
                { question: 'Information Dump se kya faida hota hai?', options: ['Audience khush hoti hai', 'Investor paise deta hai', 'Croc brain bore hota hai (Koi faida nahi)', 'Time bachta hai'], correct: 2, explanation: 'Info dump se croc brain filter on kar deta hai, pitch dead ho jati hai.' },
                { question: 'Pitch humesha small kyu honi chahiye?', options: ['Time nahi hota', 'Attention window chhoti hoti hai', 'Easy hai', 'Rules hain'], correct: 1, explanation: 'Brain ki active attention span jaldi girne lagti hai.' },
                { question: '"Prize" banne ka kya fayda hota hai?', options: ['Ghamand dikhta hai', 'Audience appreciate karti hai', 'Dono party equal hoti hain', 'Target apke liye qualify karne ki koshish karta hai'], correct: 3, explanation: 'Unhe feel hota hai ki unhe aapko earn karna padega.' },
                { question: 'Hot cognition ka matlab?', options: ['Logical analysis', 'Spreadsheet math', 'Emotional aur fast decision', 'Gusse me sochna'], correct: 2, explanation: 'Hot cognition tab hota hai jab target emotionally decide kar leta hai: Mujhe ye chahiye!' },
                { question: 'Agar prospect phone chalane lage to best move?', options: ['Gussa karo', 'Ignore', 'Pattern interrupt (Novelty) use karo', 'Wait karo'], correct: 2, explanation: 'Pattern interrupt se unka dhyan forcibly wapas laya jata hai.' },
                { question: 'STRONG me "R" kya hai?', options: ['Reveal the intrigue', 'Read the room', 'Return format', 'Run fast'], correct: 0, explanation: 'Reveal the intrigue: curiosity aur raaz dikhana.' },
                { question: 'Pitch hamesha kis brain part ko present karni chahiye?', options: ['Neocortex', 'Midbrain', 'Croc brain', 'Logic Center'], correct: 2, explanation: 'Kyunki har incoming data pehle Croc brain se gujarta hai.' }
            ]
        }
    },
    // --- Chapter 2 ---\n    {;

let startIndex = appJs.indexOf(startMarker);
let endIndex = appJs.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    appJs = appJs.substring(0, startIndex) + ch1Content + appJs.substring(endIndex + endMarker.length - 28);
    fs.writeFileSync('c:/Users/hp/Documents/APPS/js/app.js', appJs);
    console.log("Chapter 1 replaced with MEGA content!");
} else {
    console.log("Could not find markers.", startIndex, endIndex);
}
