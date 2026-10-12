import { useEffect, useRef, useState } from "react";

const translations = {
  "en-IN": {
    title: "How can I help you?",
    subtitle: "Find essential services using text, voice, or your preferred display settings.",
    searchLabel: "Search for a service",
    searchPlaceholder: 'Try "Where is the clinic?"',
    searchButton: "Search",
    speak: "Speak your request",
    listen: "Listen to status",
    settings: "Accessibility settings",
    textSize: "Text size",
    highContrast: "High contrast",
    contrastDescription: "Increase visual contrast.",
    turnOnContrast: "Turn on high contrast",
    turnOffContrast: "Turn off high contrast",
    speechLanguage: "Speech language",
    speechDescription: "Used for speech input and output.",
    languageNote: "Voice availability depends on your browser and device.",
    services: "Essential services",
    searchPrompt: "Enter a service name or question to search.",
    welcome: "Welcome to AccessMate. Search for a service or choose a service card."
  },
  "hi-IN": {
    title: "मैं आपकी कैसे मदद कर सकता हूँ?",
    subtitle: "टेक्स्ट, आवाज़ या अपनी पसंदीदा डिस्प्ले सेटिंग्स से ज़रूरी सेवाएँ खोजें।",
    searchLabel: "सेवा खोजें",
    searchPlaceholder: 'पूछें "क्लिनिक कहाँ है?"',
    searchButton: "खोजें",
    speak: "अपना अनुरोध बोलें",
    listen: "स्थिति सुनें",
    settings: "सुलभता सेटिंग्स",
    textSize: "टेक्स्ट का आकार",
    highContrast: "हाई कॉन्ट्रास्ट",
    contrastDescription: "दृश्य स्पष्टता बढ़ाएँ।",
    turnOnContrast: "हाई कॉन्ट्रास्ट चालू करें",
    turnOffContrast: "हाई कॉन्ट्रास्ट बंद करें",
    speechLanguage: "बोलने की भाषा",
    speechDescription: "बोलकर इनपुट और आउटपुट के लिए उपयोग होती है।",
    languageNote: "आवाज़ की उपलब्धता आपके ब्राउज़र और डिवाइस पर निर्भर करती है।",
    services: "ज़रूरी सेवाएँ",
    searchPrompt: "खोजने के लिए सेवा का नाम या सवाल लिखें।",
    welcome: "AccessMate में आपका स्वागत है। सेवा खोजें या सेवा कार्ड चुनें।"
  },
  "ta-IN": {
    title: "நான் உங்களுக்கு எப்படி உதவலாம்?",
    subtitle: "உரை, குரல் அல்லது உங்களுக்கு விருப்பமான காட்சி அமைப்புகள் மூலம் அத்தியாவசிய சேவைகளைக் கண்டறியுங்கள்.",
    searchLabel: "சேவையைத் தேடுங்கள்",
    searchPlaceholder: '"மருத்துவமனை எங்கே?" என்று முயற்சிக்கவும்',
    searchButton: "தேடு",
    speak: "உங்கள் கோரிக்கையைப் பேசுங்கள்",
    listen: "நிலையைச் செவிமடுக்கவும்",
    settings: "அணுகல்தன்மை அமைப்புகள்",
    textSize: "எழுத்து அளவு",
    highContrast: "உயர் மாறுபாடு",
    contrastDescription: "காட்சி மாறுபாட்டை அதிகரிக்கவும்.",
    turnOnContrast: "உயர் மாறுபாட்டை இயக்கவும்",
    turnOffContrast: "உயர் மாறுபாட்டை அணைக்கவும்",
    speechLanguage: "பேச்சு மொழி",
    speechDescription: "குரல் உள்ளீடு மற்றும் வெளியீட்டிற்குப் பயன்படும்.",
    languageNote: "குரல் வசதி உங்கள் உலாவி மற்றும் சாதனத்தைப் பொறுத்தது.",
    services: "அத்தியாவசிய சேவைகள்",
    searchPrompt: "தேடுவதற்கு சேவையின் பெயரை அல்லது கேள்வியை உள்ளிடவும்.",
    welcome: "AccessMate-க்கு வரவேற்கிறோம். ஒரு சேவையைத் தேடுங்கள் அல்லது சேவை அட்டையைத் தேர்ந்தெடுங்கள்."
  }
};


const SERVICES = [
  {
    id: "clinic",
    name: "Campus clinic",
    category: "Health",
    icon: "✚",
    location: "Student Services Building, Ground Floor",
    hours: "Monday–Friday, 9:00 AM–5:00 PM",
    details: "For urgent or emergency medical help, contact your local emergency service.",
    keywords: ["clinic", "hospital", "doctor", "medical", "health", "medicine"]
  },
  {
    id: "library",
    name: "Library",
    category: "Study",
    icon: "▤",
    location: "Central Academic Block, Level 1",
    hours: "Monday–Saturday, 8:00 AM–8:00 PM",
    details: "Ask library staff about accessible formats and assistance.",
    keywords: ["library", "books", "study", "reading"]
  },
  {
    id: "help",
    name: "Student help desk",
    category: "Support",
    icon: "?",
    location: "Administration Block, Reception",
    hours: "Monday–Friday, 9:30 AM–4:30 PM",
    details: "Use this desk for general campus information and student support.",
    keywords: ["help", "support", "desk", "admin", "administration", "contact"]
  },
  {
    id: "accessible",
    name: "Accessible facilities",
    category: "Facilities",
    icon: "↗",
    location: "Ask the campus help desk for verified accessible-route information.",
    hours: "Contact the help desk during its listed opening hours.",
    details: "Facility and route details in this prototype are sample information. Confirm access arrangements with the campus.",
    keywords: ["accessible", "accessibility", "wheelchair", "ramp", "toilet", "washroom", "facility", "facilities", "disabled"]
  }
];


function findServices(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const translatedKeywords = {
    clinic: [
      "clinic", "hospital", "doctor", "medical", "health", "medicine",
      "क्लिनिक", "अस्पताल", "डॉक्टर", "दवाखाना", "चिकित्सा", "स्वास्थ्य","क्लीनिक",
      "மருத்துவமனை", "மருத்துவர்", "மருத்துவம்", "கிளினிக்"
    ],
    library: [
      "library", "books", "study", "reading",
      "पुस्तकालय", "किताब", "किताबें", "पढ़ाई",
      "நூலகம்", "புத்தகம்", "படிப்பு"
    ],
    help: [
      "help", "support", "desk", "admin", "administration", "contact",
      "मदद", "सहायता", "सहायता केंद्र", "प्रशासन",
      "உதவி", "ஆதரவு", "நிர்வாகம்"
    ],
    accessible: [
      "accessible", "accessibility", "wheelchair", "ramp", "toilet",
      "washroom", "facility", "facilities", "disabled",
      "सुलभ", "दिव्यांग", "व्हीलचेयर", "रैंप", "शौचालय",
      "அணுகல்தன்மை", "சக்கர நாற்காலி", "சாய்வுதளம்", "கழிப்பறை"
    ]
  };

  return SERVICES.filter(service => {
    const keywords = [
      ...service.keywords,
      service.name.toLowerCase(),
      ...(translatedKeywords[service.id] || [])
    ];

    return keywords.some(word => q.includes(word));
  });
}


export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("Welcome to AccessMate. Search for a service or choose a service card.");
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [language, setLanguage] = useState("en-IN");
  const t = translations[language] || translations["en-IN"];
  const recognitionRef = useRef(null);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale-factor", String(fontScale / 100));
  }, [fontScale]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort?.();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function searchServices(value = query) {
    const cleaned = value.trim();

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

    if (!cleaned) {
      setResults([]);
      setMessage("Enter a service name or question to search.");
      return;
    }

    const found = findServices(cleaned);
    setResults(found);

    if (found.length) {
      const names = found.map(s => s.name).join(", ");
      setMessage(`Found ${found.length} matching service${found.length > 1 ? "s" : ""}: ${names}.`);
    } else {
      setMessage("Sorry, I couldn't find a matching service. Try clinic, library, help desk, or accessible facilities.");
    }
  }


  function openService(service) {
    setQuery(service.name);
    setResults([service]);
    setMessage(
      `${service.name}. Location: ${service.location}. Hours: ${service.hours}. ${service.details}`
    );

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }


  function speak(text = message) {
    setVoiceError("");
    if (!("speechSynthesis" in window)) {
      setVoiceError("Spoken output is not supported in this browser. You can still read the result on screen.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function startVoiceSearch() {
    setVoiceError("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError("Voice input isn't supported in this browser. Type your request in the search box instead. Try Chrome on your laptop.");
      return;
    }

    recognitionRef.current?.abort?.();
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setListening(true);
      setVoiceError("Listening. Speak your request now.");
    };
    recognition.onresult = event => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setQuery(transcript);
      setListening(false);
      setVoiceError("");
      searchServices(transcript);
    };
    recognition.onerror = (event) => {
      console.error("AccessMate speech error:", event.error);
      setVoiceError(`Voice input error: ${event.error}. Please type your request.`);
      setListening(false);
    };
    recognition.onend = () => setListening(false);

    try {
      recognition.start();
    } catch {
      setListening(false);
      setVoiceError("Couldn't start voice input. Please try again or type your request.");
    }
  }

  function stopListening() {
    recognitionRef.current?.stop?.();
    setListening(false);
    setVoiceError("Voice input stopped.");
  }

  const appClass = highContrast ? "app high-contrast" : "app";

  return (
    <div className={appClass} style={{ "--font-scale": `${fontScale}%` }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <div className="brand-mark" aria-hidden="true">A</div>
        <div className="brand-copy">
          <p className="eyebrow">ACCESSIBLE SERVICES ASSISTANT</p>
          <h1>AccessMate</h1>
        </div>
        <span className="demo-pill">Prototype</span>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="welcome-heading">
          <p className="eyebrow hero-eyebrow">INFORMATION, YOUR WAY</p>
          <h2 id="welcome-heading">{t.title}</h2>
          <p className="hero-copy">{t.subtitle}</p>

          <form className="search-form" onSubmit={event => { event.preventDefault(); searchServices(); }}>
            <label htmlFor="service-search">{t.searchLabel}</label>
            <div className="search-row">
              <input
                id="service-search"
                ref={searchRef}
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                autoComplete="off"
              />
              <button className="primary-button" type="submit">{t.searchButton}</button>
            </div>
          </form>

          <div className="voice-actions" aria-label="Voice controls">
            <button className="voice-button" type="button" onClick={listening ? stopListening : startVoiceSearch}>
              <span aria-hidden="true">{listening ? "■" : "🎙"}</span>
              {listening ? "Stop listening" : "Speak your request"}
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => speak(t.welcome)}
            >
              <span aria-hidden="true">🔊</span> Listen to status
            </button>
          </div>
          {voiceError && <p className="inline-note" role="status">{voiceError}</p>}
        </section>

        <section className="accessibility-panel" aria-labelledby="accessibility-heading">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">PERSONALISE</p>
              <h2 id="accessibility-heading">{t.settings}</h2>
            </div>
          </div>
          <div className="settings-grid">
            <div className="setting-card">
              <span className="setting-icon" aria-hidden="true">Aa</span>
              <div className="setting-content">
                <h3>{t.textSize}</h3>
                <p>Current size: {fontScale}%</p>
                <div className="button-pair">
                  <button type="button" className="small-button" onClick={() => setFontScale(v => Math.max(85, v - 10))} aria-label="Decrease text size" disabled={fontScale <= 85}>A−</button>
                  <button type="button" className="small-button" onClick={() => setFontScale(v => Math.min(140, v + 10))} aria-label="Increase text size" disabled={fontScale >= 140}>A+</button>
                  <button type="button" className="small-button" onClick={() => setFontScale(100)}>Reset</button>
                </div>
              </div>
            </div>
            <div className="setting-card">
              <span className="setting-icon" aria-hidden="true">◐</span>
              <div className="setting-content">
                <h3>{t.highContrast}</h3>
                <p>{t.contrastDescription}</p>
                <button
                  type="button"
                  className={highContrast ? "toggle-button is-on" : "toggle-button"}
                  aria-pressed={highContrast}
                  onClick={() => setHighContrast(v => !v)}
                >
                  {highContrast ? "Turn off high contrast" : "Turn on high contrast"}
                </button>
              </div>
            </div>
            <div className="setting-card">
              <span className="setting-icon" aria-hidden="true">文</span>
              <div className="setting-content">
                <h3>{t.speechLanguage}</h3>
                <p>{t.speechDescription}</p>
                <label className="visually-hidden" htmlFor="speech-language">Speech language</label>
                <select id="speech-language" value={language} onChange={event => setLanguage(event.target.value)}>
                  <option value="en-IN">English (India)</option>
                  <option value="hi-IN">Hindi (India)</option>
                  <option value="ta-IN">Tamil (India)</option>
                </select>
                <p className="small-note">Voice availability depends on your browser and device. Interface text currently remains in English.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" aria-labelledby="services-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">QUICK ACCESS</p>
              <h2 id="services-heading">{t.services}</h2>
            </div>
            <p className="section-caption">Choose a card to see details.</p>
          </div>
          <div className="service-grid">
            {SERVICES.map(service => (
              <button className="service-card" type="button" key={service.id} onClick={() => openService(service)}>
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
                <span className="service-category">{service.category}</span>
                <span className="service-name">{service.name}</span>
                <span className="service-link">View details <span aria-hidden="true">→</span></span>
              </button>
            ))}
          </div>
        </section>

        <section
          ref={resultsRef}
          className="results-section"
          aria-labelledby="results-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR SEARCH</p>
              <h2 id="results-heading">Results</h2>
            </div>
            {results.length > 0 && <button className="text-button" type="button" onClick={() => { setResults([]); setMessage("Results cleared. Search for another service."); }}>Clear results</button>}
          </div>

          <p className="status-message" role="status" aria-live="polite" aria-atomic="true">{message}</p>

          {results.length > 0 && (
            <div className="result-list">
              {results.map(service => (
                <article className="result-card" key={service.id}>
                  <div className="result-top">
                    <span className="result-icon" aria-hidden="true">{service.icon}</span>
                    <div>
                      <p className="service-category">{service.category}</p>
                      <h3>{service.name}</h3>
                    </div>
                  </div>
                  <dl className="details-list">
                    <div><dt>Location</dt><dd>{service.location}</dd></div>
                    <div><dt>Hours</dt><dd>{service.hours}</dd></div>
                    <div><dt>More information</dt><dd>{service.details}</dd></div>
                  </dl>
                  <button type="button" className="secondary-button" onClick={() => speak(`${service.name}. Location: ${service.location}. Hours: ${service.hours}. ${service.details}`)}>🔊 Read this result aloud</button>
                </article>
              ))}
            </div>
          )}
          <p className="demo-disclaimer">Demo notice: service names, locations and hours are illustrative sample data. Verify all details before using this for real services.</p>
        </section>
      </main>

      <footer className="site-footer">
        <p><strong>AccessMate</strong> · Designed to make digital information easier to access.</p>
        <p>Prototype aligned to selected accessibility practices; not a BIS certification or conformance claim.</p>
      </footer>
    </div>
  );
}
