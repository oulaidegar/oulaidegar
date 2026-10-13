export type RecommendationCategory =
  | "youtube-channels"
  | "youtube-videos"
  | "articles"
  | "websites"
  | "books"
  | "cinema"
  | "poetry"
  | "creators";

export interface RecommendationItem {
  id: string;
  title: string;
  category: RecommendationCategory;
  categoryLabel: string;
  creator?: string;
  handle?: string;
  subscribers?: string;
  url: string;
  youtubeId?: string; // For embedding YouTube video
  description: string;
  personalNote?: string;
  tags: string[];
  year?: string;
  language?: string;
  featured?: boolean;
}

export const CATEGORIES: { id: RecommendationCategory | "all"; label: string; iconName?: string }[] = [
  { id: "all", label: "All Curations" },
  { id: "youtube-channels", label: "YouTube Channels" },
  { id: "youtube-videos", label: "Videos" },
  { id: "articles", label: "Essays & Articles" },
  { id: "websites", label: "Websites & Tools" },
  { id: "books", label: "Books" },
  { id: "cinema", label: "Cinema & Docs" },
  { id: "poetry", label: "Poetry & Text" },
  { id: "creators", label: "Creators" },
];

export const recommendations: RecommendationItem[] = [
  // =========================================================================
  // 1. YOUTUBE CHANNELS (Supplied by user)
  // =========================================================================
  {
    id: "yt-3blue1brown",
    title: "3Blue1Brown",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Grant Sanderson",
    handle: "@3blue1brown",
    subscribers: "6.2M",
    url: "https://www.youtube.com/@3blue1brown",
    youtubeId: "aircAruvnKk", // Chapter 1 Deep Learning neural networks
    description:
      "Visual explanations of higher mathematics, linear algebra, calculus, and neural network foundations. Sanderson's animated geometry turns abstract mathematical intuition into tangible, spatial experiences.",
    tags: ["mathematics", "neural-networks", "animation", "pedagogy"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-arte",
    title: "ARTE",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "ARTE France & Deutschland",
    handle: "@arte",
    subscribers: "5.08M",
    url: "https://www.youtube.com/@arte",
    description:
      "La plateforme culturelle européenne. Histoire, sciences, culture pop, reportages d'investigations et documentaires complets : prendre le temps de comprendre le monde avec rigueur et profondeur audiovisuelle.",
    tags: ["documentary", "culture", "geopolitics", "europe", "investigation"],
    language: "FR",
    featured: true,
  },
  {
    id: "yt-artificially-aware",
    title: "Artificially Aware",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@ArtificiallyAware",
    subscribers: "200K",
    url: "https://www.youtube.com/@ArtificiallyAware",
    description:
      "A symbiotic entity exploring the vast landscapes of philosophical wonderland. Delves into pieces that spark foundational questions on consciousness, epistemology, and the human condition in the machine age.",
    tags: ["philosophy", "consciousness", "mind", "speculative"],
    language: "EN",
  },
  {
    id: "yt-astrosam-2",
    title: "AstroSam 2",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@AstroSam2",
    subscribers: "10.1K",
    url: "https://www.youtube.com/@AstroSam2",
    description:
      "Low-key programming streams, technical experiments, and smaller off-topic creative computing builds documented with raw curiosity.",
    tags: ["programming", "creative-coding", "tinkering", "live-dev"],
    language: "EN",
  },
  {
    id: "yt-astrum-extra",
    title: "Astrum Extra",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@astrumextra",
    subscribers: "326K",
    url: "https://www.youtube.com/@astrumextra",
    description:
      "Astrophysics deep-dives, planetary science explorations, and extended ambient cosmic compilations designed for contemplative listening.",
    tags: ["astronomy", "space", "ambient", "science"],
    language: "EN",
  },
  {
    id: "yt-beau-miles",
    title: "Beau Miles",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Beau Miles",
    handle: "@BeauMiles",
    subscribers: "876K",
    url: "https://www.youtube.com/@BeauMiles",
    youtubeId: "EvT5XS7j-Dc", // A Mile an Hour
    description:
      "Filmmaker, polytechnic teacher, and oddball adventurer running secret marathons, paddling through forgotten rivers, fixing heritage sheds, and finding profound existential poetry in local topography.",
    tags: ["storytelling", "adventure", "craft", "existential", "nature"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-blank-on-blank",
    title: "Blank on Blank",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "David Gerlach & Patrick Smith",
    handle: "@BlankonblankOrg",
    subscribers: "482K",
    url: "https://www.youtube.com/@BlankonblankOrg",
    youtubeId: "48_O107h-lE", // Kurt Vonnegut
    description:
      "Famous Names. Lost Interviews. New animated shorts by Quoted Studios. Reanimates forgotten magnetic tape recordings of authors, musicians, and thinkers with kinetic, evocative hand-drawn illustration.",
    tags: ["archives", "interviews", "animation", "history", "cultural-memory"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-bonsai-releaf",
    title: "Bonsai Releaf",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@BonsaiReleaf",
    subscribers: "445K",
    url: "https://www.youtube.com/@BonsaiReleaf",
    description:
      "Making big videos about little trees. Meditative, cinematographic chronicles of patience, horticultural discipline, wiring, and botanical sculpture over multi-year horizons.",
    tags: ["bonsai", "craft", "cinematography", "patience", "botany"],
    language: "EN",
  },
  {
    id: "yt-dammit-jeff",
    title: "Dammit Jeff",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Jeff",
    handle: "@DammitJeff",
    subscribers: "548K",
    url: "https://www.youtube.com/@DammitJeff",
    description:
      "Hardware teardowns, reverse-engineering, circuit repairs, and idiosyncratic electronics modifications that celebrate the tactile right-to-repair spirit.",
    tags: ["hardware", "electronics", "right-to-repair", "tinkering"],
    language: "EN",
  },
  {
    id: "yt-design-theory",
    title: "Design Theory",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "John Mauriello",
    handle: "@Design.Theory",
    subscribers: "806K",
    url: "https://www.youtube.com/@Design.Theory",
    description:
      "Industrial designer and former CCA professor examining how industrial form, ergonomics, and aesthetic ideologies shape cultural behavior and social psychology.",
    tags: ["design", "industrial-design", "culture", "materiality", "semiotics"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-dwarkesh-patel",
    title: "Dwarkesh Patel",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Dwarkesh Patel",
    handle: "@DwarkeshPatel",
    subscribers: "1.44M",
    url: "https://www.youtube.com/@DwarkeshPatel",
    description:
      "Uncompromising, relentlessly prepared long-form interviews with leading computer scientists, historians, and founders exploring artificial intelligence trajectory, industrial capacity, and intellectual history.",
    tags: ["ai", "interviews", "history", "technology", "long-form"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-ed-pratt",
    title: "Ed Pratt",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Ed Pratt",
    handle: "@EdPratt",
    subscribers: "591K",
    url: "https://www.youtube.com/@EdPratt",
    description:
      "Documenting a solo unicycle expedition across the globe and canoeing the River Thames source-to-sea. Human endurance grounded in modest, humorous self-recording.",
    tags: ["travel", "endurance", "adventure", "filmmaking"],
    language: "EN",
  },
  {
    id: "yt-ethoslab",
    title: "EthosLab",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@EthosLab",
    subscribers: "2.66M",
    url: "https://www.youtube.com/@EthosLab",
    description:
      "One of the longest-running, calmest masterclasses in emergent sandbox engineering, computational logic (redstone), and architectural play on the web.",
    tags: ["gaming", "computational-logic", "engineering", "nostalgia"],
    language: "EN",
  },
  {
    id: "yt-fern",
    title: "fern",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Simplicissimus & hoog",
    handle: "@fern-tv",
    subscribers: "5.58M",
    url: "https://www.youtube.com/@fern-tv",
    description:
      "Armchair investigative visual essays dissecting obscure historical anomalies, macroeconomic shifts, digital scams, and systemic political phenomena.",
    tags: ["investigation", "documentary", "geopolitics", "economics"],
    language: "EN",
  },
  {
    id: "yt-fouloscopie",
    title: "Fouloscopie",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Mehdi Moussaïd",
    handle: "@Fouloscopie",
    subscribers: "570K",
    url: "https://www.youtube.com/@Fouloscopie",
    description:
      "La science du comportement des foules : paniques, mouvements collectifs, propagation de rumeurs, réseaux et intelligence collective, par un chercheur en sciences cognitives à l'Institut Max Planck.",
    tags: ["cognitive-science", "crowds", "collective-intelligence", "networks"],
    language: "FR",
    featured: true,
  },
  {
    id: "yt-hitomi-mochizuki",
    title: "Hitomi Mochizuki",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Hitomi Mochizuki",
    handle: "@HitomiMochizuki222",
    subscribers: "1.3M",
    url: "https://www.youtube.com/@HitomiMochizuki222",
    description:
      "A cinematic, gentle digital safe space documenting inner emotional landscapes, somatic awareness, ethical vegan living, and intentional stillness amidst algorithmic noise.",
    tags: ["mindfulness", "cinematography", "introspection", "slow-living"],
    language: "EN",
  },
  {
    id: "yt-hoog",
    title: "Hoog",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@hoog-youtube",
    subscribers: "1.15M",
    url: "https://www.youtube.com/@hoog-youtube",
    description:
      "Visual investigative essays on tech company collapses, venture capital market mechanics, industrial infrastructure, and speculative market bubbles.",
    tags: ["technology", "business", "startups", "infrastructure"],
    language: "EN",
  },
  {
    id: "yt-horses",
    title: "Horses",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Michael Sorensen",
    handle: "@HorsesOnYT",
    subscribers: "1.6M",
    url: "https://www.youtube.com/@HorsesOnYT",
    description:
      "Literary video essays on cultural dread, modern loneliness, film semiotics, and psychological crisis written with exceptional narrative restraint.",
    tags: ["video-essays", "cinema", "psychology", "literature"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-les-artisans-de-demain",
    title: "Les Artisans de Demain",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Camille & Illiès",
    handle: "@lesartisansdedemain",
    subscribers: "481K",
    url: "https://www.youtube.com/@lesartisansdedemain",
    description:
      "Explorations du monde à travers des récits visuels humanistes, de la photographie grand format et des documentaires célébrant l'artisanat ancestral et la résilience écologique.",
    tags: ["artisans", "documentary", "photography", "travel", "culture"],
    language: "FR",
  },
  {
    id: "yt-lets-talk-religion",
    title: "Let's Talk Religion",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Filip Holm",
    handle: "@LetsTalkReligion",
    subscribers: "1.08M",
    url: "https://www.youtube.com/@LetsTalkReligion",
    description:
      "Academic, rigorous, and deeply respectful historical inquiries into world religions, Sufism, Islamic philosophy, Gnosticism, and comparative mysticism from primary scholarly sources.",
    tags: ["religion", "islamic-studies", "philosophy", "mysticism", "history"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-mina-le",
    title: "Mina Le",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Mina Le",
    handle: "@gremlita",
    subscribers: "1.83M",
    url: "https://www.youtube.com/@gremlita",
    description:
      "Fashion history, costume semiotics, and pop-cultural criticism exploring what our aesthetic garments reveal about gender, power, and cinematic identity.",
    tags: ["fashion", "costume", "cinema", "cultural-studies"],
    language: "EN",
  },
  {
    id: "yt-mr-beat",
    title: "Mr. Beat",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Matt Beat",
    handle: "@iammrbeat",
    subscribers: "1.43M",
    url: "https://www.youtube.com/@iammrbeat",
    description:
      "Civic history educator analyzing landmark Supreme Court decisions, presidential politics, geography, and systemic constitutional dilemmas.",
    tags: ["history", "civics", "jurisprudence", "geography"],
    language: "EN",
  },
  {
    id: "yt-neo",
    title: "neo",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@neoexplains",
    subscribers: "3.05M",
    url: "https://www.youtube.com/@neoexplains",
    description:
      "Highly produced cartographic and architectural mini-documentaries on international border disputes, transit networks, and urban megaprojects.",
    tags: ["geopolitics", "maps", "urbanism", "infrastructure"],
    language: "EN",
  },
  {
    id: "yt-nerdwriter1",
    title: "Nerdwriter1",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Evan Puschak",
    handle: "@Nerdwriter1",
    subscribers: "3.24M",
    url: "https://www.youtube.com/@Nerdwriter1",
    youtubeId: "1oXb41p26-0", // Edward Hopper
    description:
      "The definitive pioneer of the video essay form, unpacking composition, rhyme, brushstrokes, rhythm, and structural intention across painting, film, and poetry.",
    tags: ["art", "film-analysis", "video-essays", "semiotics", "criticism"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-peter-santenello",
    title: "Peter Santenello",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Peter Santenello",
    handle: "@PeterSantenello",
    subscribers: "4.31M",
    url: "https://www.youtube.com/@PeterSantenello",
    description:
      "GoPro ethnographic fieldwork providing unvarnished, empathetic access into subcultures ignored or flattened by polarized corporate broadcast news.",
    tags: ["ethnography", "subcultures", "human-condition", "documentary"],
    language: "EN",
  },
  {
    id: "yt-real-engineering",
    title: "Real Engineering",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Brian McManus",
    handle: "@RealEngineering",
    subscribers: "5.12M",
    url: "https://www.youtube.com/@RealEngineering",
    description:
      "Exhaustive technical analyses of aerospace thermodynamics, structural mechanics, semiconductor lithography, and sovereign clean energy systems.",
    tags: ["engineering", "aerospace", "materials-science", "energy"],
    language: "EN",
  },
  {
    id: "yt-recurse-center",
    title: "Recurse Center",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@RecurseCenter",
    subscribers: "9.77K",
    url: "https://www.youtube.com/@RecurseCenter",
    description:
      "The retreat where curious programmers recharge and grow in NYC. Demonstrations of volitional learning, building compilers from scratch, and generous open-source pedagogy.",
    tags: ["programming", "pedagogy", "hackers", "open-source"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-saxsquatch",
    title: "Saxsquatch",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@Saxsquatch-music",
    subscribers: "356K",
    url: "https://www.youtube.com/@Saxsquatch-music",
    description:
      "Soulful tenor saxophone improvisation looped in the mossy Appalachian woods by a sasquatch. An unadulterated joyful collision of internet absurdity and true musical musicianship.",
    tags: ["music", "saxophone", "performance", "improv"],
    language: "EN",
  },
  {
    id: "yt-soft-white-underbelly",
    title: "Soft White Underbelly",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Mark Laita",
    handle: "@SoftWhiteUnderbelly",
    subscribers: "7.12M",
    url: "https://www.youtube.com/@SoftWhiteUnderbelly",
    description:
      "Uncompromising, stationary monochrome portraits and interviews with disenfranchised Americans—addicts, sex workers, survivors, and outcasts on Skid Row. A visceral historical archive of structural vulnerability.",
    tags: ["interviews", "portraiture", "human-condition", "archive", "social-crisis"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-the-dick-cavett-show",
    title: "The Dick Cavett Show",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Dick Cavett",
    handle: "@TheDickCavettShow",
    subscribers: "391K",
    url: "https://www.youtube.com/@TheDickCavettShow",
    description:
      "Gold-standard long-form television conversations spanning 35+ years: Baldwin, Mailer, Davis, Hitchcock, Ali, and Hepburn in candid, unscripted intellectual clashes.",
    tags: ["interviews", "intellectual-history", "broadcasting", "archives"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-the-mizrahi-perspective",
    title: "The Mizrahi Perspective",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Alon Mizrahi",
    handle: "@alon_mizrahi",
    subscribers: "31.7K",
    url: "https://www.youtube.com/@alon_mizrahi",
    description:
      "Unflinching political commentary and cultural essays challenging colonial paradigms, nationalism, and Western media narratives surrounding West Asia and Palestine.",
    tags: ["politics", "decolonial", "essays", "middle-east"],
    language: "EN",
  },
  {
    id: "yt-tomz",
    title: "Tomz",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    handle: "@Tomz",
    subscribers: "29.3K",
    url: "https://www.youtube.com/@Tomz",
    description:
      "Poetic, low-fi travel chronicles exploring landscapes, quiet streets, and solitary paths through tactile visual pacing.",
    tags: ["travel", "cinematography", "film", "vlog"],
    language: "EN",
  },
  {
    id: "yt-van-neistat",
    title: "Van Neistat",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Van Neistat",
    handle: "@vanneistat",
    subscribers: "649K",
    url: "https://www.youtube.com/@vanneistat",
    youtubeId: "F3z0FwW5X48", // Rule of the Red Ball
    description:
      "The Spirited Man: meditative meditations on repair, tactile tools, analog systems, creative discipline, and the philosophy of making things by hand in an ephemeral digital culture.",
    tags: ["craft", "making", "philosophy", "filmmaking", "analog"],
    language: "EN",
    featured: true,
  },
  {
    id: "yt-welch-labs",
    title: "Welch Labs",
    category: "youtube-channels",
    categoryLabel: "YouTube Channel",
    creator: "Stephen Welch",
    handle: "@WelchLabs",
    subscribers: "911K",
    url: "https://www.youtube.com/@WelchLabs",
    description:
      "Visually stunning, step-by-step mathematical foundations of artificial intelligence, computer vision, and complex numbers built from first principles.",
    tags: ["ai", "machine-learning", "mathematics", "visualization"],
    language: "EN",
    featured: true,
  },

  // =========================================================================
  // 2. YOUTUBE VIDEOS (Interactive Embedded Media)
  // =========================================================================
  {
    id: "vid-hopper",
    title: "How Edward Hopper Storytells",
    category: "youtube-videos",
    categoryLabel: "Video Essay",
    creator: "Nerdwriter1",
    url: "https://www.youtube.com/watch?v=1oXb41p26-0",
    youtubeId: "1oXb41p26-0",
    description:
      "An exquisite breakdown of Edward Hopper's 'Excursion into Philosophy' and 'Nighthawks', demonstrating how composition, shadow, and sightlines convey psychological isolation.",
    tags: ["art", "film-analysis", "edward-hopper", "painting"],
    year: "2018",
  },
  {
    id: "vid-mile-hour",
    title: "A Mile an Hour: Running a Different Kind of Marathon",
    category: "youtube-videos",
    categoryLabel: "Short Film",
    creator: "Beau Miles",
    url: "https://www.youtube.com/watch?v=EvT5XS7j-Dc",
    youtubeId: "EvT5XS7j-Dc",
    description:
      "Beau runs one mile every hour for 24 hours around his small farm, using the 50 intervening minutes of each hour to complete lingering chores, fix tools, and plant trees.",
    tags: ["storytelling", "craft", "nature", "slow-living"],
    year: "2019",
  },
  {
    id: "vid-neural-nets",
    title: "What is a Neural Network? | Chapter 1, Deep Learning",
    category: "youtube-videos",
    categoryLabel: "Pedagogy",
    creator: "3Blue1Brown",
    url: "https://www.youtube.com/watch?v=aircAruvnKk",
    youtubeId: "aircAruvnKk",
    description:
      "The definitive visual introduction to multilayer perceptrons, weights, biases, and sigmoid activations recognizing handwritten digits.",
    tags: ["neural-networks", "machine-learning", "ai-foundations"],
    year: "2017",
  },
  {
    id: "vid-vonnegut",
    title: "Kurt Vonnegut on Man vs Machine",
    category: "youtube-videos",
    categoryLabel: "Animated Archive",
    creator: "Blank on Blank",
    url: "https://www.youtube.com/watch?v=48_O107h-lE",
    youtubeId: "48_O107h-lE",
    description:
      "Kurt Vonnegut in an unearthed 1970 audio interview musing on automated labor, human dignity, and why playing an instrument badly is essential for the soul.",
    tags: ["kurt-vonnegut", "archives", "labor", "philosophy"],
    year: "2014",
  },
  {
    id: "vid-red-ball",
    title: "The Rule of the Red Ball",
    category: "youtube-videos",
    categoryLabel: "Philosophy of Making",
    creator: "Van Neistat",
    url: "https://www.youtube.com/watch?v=F3z0FwW5X48",
    youtubeId: "F3z0FwW5X48",
    description:
      "An essential essay on resisting procrastination by prioritizing physical tactile momentum—symbolized by Tom Sachs' workshop practice.",
    tags: ["craft", "making", "habits", "studio-practice"],
    year: "2021",
  },

  // =========================================================================
  // 3. ARTICLES & ESSAYS
  // =========================================================================
  {
    id: "art-monastic-web",
    title: "The Monastic Web",
    category: "articles",
    categoryLabel: "Essay",
    creator: "Robin Sloan",
    url: "https://www.robinsloan.com/notes/monastic-web/",
    description:
      "A manifesto calling for digital spaces built like scriptoria—small, patient, bounded, hand-tended, and indifferent to virality metrics.",
    tags: ["open-web", "digital-minimalism", "craft", "slow-tech"],
    year: "2021",
  },
  {
    id: "art-parable-polygon",
    title: "Parable of the Polygons: A Playable Post on Tolerant Biases",
    category: "articles",
    categoryLabel: "Interactive Simulation",
    creator: "Vi Hart & Nicky Case",
    url: "https://ncase.me/polygons/",
    description:
      "An interactive visual essay based on Thomas Schelling's segregation model, showing how mild individual preferences compound into aggregate structural inequality.",
    tags: ["interactive", "game-theory", "sociology", "simulation"],
    year: "2014",
  },
  {
    id: "art-end-of-forgetting",
    title: "The Agony of the Archive: On Cultural Embeddings & Memory Loss",
    category: "articles",
    categoryLabel: "Critical Theory",
    creator: "Yuk Hui",
    url: "https://www.e-flux.com/journal/101/273343/on-the-necessity-of-technology/",
    description:
      "Yuk Hui's cosmotechnics thesis: why non-Western technological ontologies must be defended against monotechnological hegemony.",
    tags: ["philosophy", "cosmotechnics", "cultural-data", "ai-ethics"],
    year: "2019",
  },
  {
    id: "art-arabic-nlp-limits",
    title: "Arabic NLP & Dialect Erasure in Multimodal Foundation Models",
    category: "articles",
    categoryLabel: "Technical Audit",
    creator: "Linguistic Justice Collective",
    url: "https://arxiv.org/abs/2305.03515",
    description:
      "A rigorous evaluation of tokenization costs, morphological flattening, and cultural hallucination in standard Arabic vs Levantine vernaculars.",
    tags: ["arabic-nlp", "digital-sovereignty", "linguistics", "ai-ethics"],
    year: "2023",
  },

  // =========================================================================
  // 4. WEBSITES & CIVIC TOOLS
  // =========================================================================
  {
    id: "web-monoskop",
    title: "Monoskop",
    category: "websites",
    categoryLabel: "Wiki & Archive",
    creator: "Dušan Barok",
    url: "https://monoskop.org",
    description:
      "A collaborative research wiki and digital library dedicated to the history of media art, avant-garde publications, cybernetics, and critical data humanities.",
    tags: ["digital-humanities", "media-theory", "open-access", "archives"],
  },
  {
    id: "web-low-tech",
    title: "Low-tech Magazine",
    category: "websites",
    categoryLabel: "Solar-Powered Publication",
    creator: "Kris De Decker",
    url: "https://solar.lowtechmagazine.com",
    description:
      "A solar-powered website that goes offline when the weather is overcast. Rethinks modern computational infrastructure through pre-industrial techniques and energy limits.",
    tags: ["permacomputing", "solar", "sustainable-web", "infrastructure"],
  },
  {
    id: "web-internet-archive",
    title: "Internet Archive & Wayback Machine",
    category: "websites",
    categoryLabel: "Public Archive",
    creator: "Brewster Kahle",
    url: "https://archive.org",
    description:
      "A non-profit digital library of millions of free books, movies, software, music, and billions of archived web pages defending universal access to knowledge.",
    tags: ["civic-tech", "preservation", "open-access", "public-good"],
  },
  {
    id: "web-wiby",
    title: "The Wiby Search Engine",
    category: "websites",
    categoryLabel: "Alternative Search",
    url: "https://wiby.me",
    description:
      "A search engine built specifically for the text-based, non-commercial indie web: personal homepages, hobbyist logs, and minimalist hypertext.",
    tags: ["small-web", "search", "minimalism", "indie-web"],
  },

  // =========================================================================
  // 5. BOOKS
  // =========================================================================
  {
    id: "book-atlas-ai",
    title: "Atlas of AI: Power, Politics, and the Planetary Costs of AI",
    category: "books",
    categoryLabel: "Monograph",
    creator: "Kate Crawford",
    url: "https://yalebooks.yale.edu/book/9780300209570/atlas-of-ai/",
    description:
      "Crawford shows that artificial intelligence is neither artificial nor intelligent; it is made from mineral extraction, exploited human labor, and unaccountable state classification systems.",
    tags: ["ai-ethics", "political-economy", "extractivism", "labor"],
    year: "2021",
  },
  {
    id: "book-race-after-tech",
    title: "Race After Technology: Abolitionist Tools for the New Jim Code",
    category: "books",
    categoryLabel: "Monograph",
    creator: "Ruha Benjamin",
    url: "https://www.ruhabenjamin.com/race-after-technology",
    description:
      "An incisive framework revealing how automated systems encode, reinforce, and deepen racial hierarchy under the guise of neutral technological objectivity.",
    tags: ["critical-data", "algorithmic-justice", "sociology", "abolition"],
    year: "2019",
  },
  {
    id: "book-question-tech",
    title: "The Question Concerning Technology and Other Essays",
    category: "books",
    categoryLabel: "Philosophy",
    creator: "Martin Heidegger",
    url: "https://en.wikipedia.org/wiki/The_Question_Concerning_Technology",
    description:
      "Heidegger's analysis of technology as Gestell (enframing)—a totalizing mode of revealing that reduces nature and human beings into standing-reserve (Bestand).",
    tags: ["philosophy", "technology", "ontology", "heidegger"],
    year: "1954",
  },
  {
    id: "book-orality-literacy",
    title: "Orality and Literacy: The Technologizing of the Word",
    category: "books",
    categoryLabel: "Media Ecology",
    creator: "Walter J. Ong",
    url: "https://www.routledge.com/Orality-and-Literacy/Ong/p/book/9780415538381",
    description:
      "Traces how the invention of writing rewired human consciousness, restructuring memory from acoustic mnemonics into spatial, typographical logic.",
    tags: ["media-ecology", "linguistics", "cultural-history", "writing"],
    year: "1982",
  },
  {
    id: "book-mushroom-end-world",
    title: "The Mushroom at the End of the World: On the Possibility of Life in Capitalist Ruins",
    category: "books",
    categoryLabel: "Anthropology",
    creator: "Anna Lowenhaupt Tsing",
    url: "https://press.princeton.edu/books/paperback/9780691220550/the-mushroom-at-the-end-of-the-world",
    description:
      "An account of global supply chains and ecological precarity through the matsutake mushroom, illuminating how collaborative survival emerges without grand design.",
    tags: ["anthropology", "ecology", "precarity", "assemblages"],
    year: "2015",
  },

  // =========================================================================
  // 6. CINEMA & DOCUMENTARIES
  // =========================================================================
  {
    id: "film-nostalgia-light",
    title: "Nostalgia for the Light (Nostalgia de la luz)",
    category: "cinema",
    categoryLabel: "Film",
    creator: "Patricio Guzmán",
    url: "https://www.imdb.com/title/tt1556190/",
    description:
      "In the Atacama Desert, astronomers gaze millions of light-years into the cosmos to discover the origins of time, while Chilean women search the parched earth for the bones of relatives disappeared by the Pinochet dictatorship.",
    tags: ["cinema", "chile", "astronomy", "archive", "human-rights"],
    year: "2010",
  },
  {
    id: "film-citizenfour",
    title: "Citizenfour",
    category: "cinema",
    categoryLabel: "Documentary",
    creator: "Laura Poitras",
    url: "https://www.imdb.com/title/tt4044364/",
    description:
      "A real-time, claustrophobic chronicle inside Edward Snowden's Hong Kong hotel room exposing the apparatus of global mass electronic surveillance.",
    tags: ["surveillance", "civic-tech", "privacy", "investigation"],
    year: "2014",
  },
  {
    id: "film-coded-bias",
    title: "Coded Bias",
    category: "cinema",
    categoryLabel: "Documentary",
    creator: "Shalini Kantayya & Joy Buolamwini",
    url: "https://www.codedbias.com",
    description:
      "Follows MIT Media Lab researcher Joy Buolamwini discovering facial recognition models fail on darker-skinned women, sparking the Algorithmic Justice League.",
    tags: ["ai-ethics", "facial-recognition", "bias", "civil-rights"],
    year: "2020",
  },

  // =========================================================================
  // 7. POETRY & LITERATURE
  // =========================================================================
  {
    id: "lit-darwish",
    title: "Memory for Forgetfulness (ذاكرة للنسيان)",
    category: "poetry",
    categoryLabel: "Poetry & Prose",
    creator: "Mahmoud Darwish (محمود درويش)",
    url: "https://www.ucpress.edu/book/9780520273979/memory-for-forgetfulness",
    description:
      "Written during the 1982 siege of Beirut, this prose poem interrogates the sensory architecture of exile, the ritual preparation of morning coffee under falling artillery, and the impossibility of historical amnesia.",
    tags: ["palestine", "beirut", "prose-poetry", "memory", "arabic-literature"],
    year: "1987",
  },
  {
    id: "lit-adnan",
    title: "The Arab Apocalypse (سفر الرؤيا العربي)",
    category: "poetry",
    categoryLabel: "Poetry & Drawings",
    creator: "Etel Adnan (إيتيل عدنان)",
    url: "https://postpovera.com/product/the-arab-apocalypse/",
    description:
      "A foundational graphic poem interleaving written lines with solar pictograms, piercing Arabic punctuation, and cosmic mourning during the Lebanese Civil War.",
    tags: ["poetry", "lebanon", "visual-text", "etel-adnan", "avant-garde"],
    year: "1980",
  },
  {
    id: "lit-borges-babel",
    title: "The Library of Babel (La biblioteca de Babel)",
    category: "poetry",
    categoryLabel: "Short Story",
    creator: "Jorge Luis Borges",
    url: "https://en.wikipedia.org/wiki/The_Library_of_Babel",
    description:
      "The universe as an infinite hexagon of books containing every possible combination of letters—anticipating latent space, statistical hallucination, and the despair of boundless information.",
    tags: ["borges", "combinatorics", "latent-space", "philosophy"],
    year: "1941",
  },

  // =========================================================================
  // 8. CREATORS & INDEPENDENT VOICES
  // =========================================================================
  {
    id: "cr-hitomi-ig",
    title: "@yaknowme_hitomi",
    category: "creators",
    categoryLabel: "Visual Diary",
    creator: "Hitomi Mochizuki",
    handle: "@yaknowme_hitomi",
    url: "https://www.instagram.com/yaknowme_hitomi/",
    description:
      "Still life reflections, analog film textures, and poetic meditations on somatic equilibrium and groundedness.",
    tags: ["photography", "stillness", "film-texture", "mindfulness"],
  },
  {
    id: "cr-artisans-ig",
    title: "@lesartisansdedemain",
    category: "creators",
    categoryLabel: "Documentary Photography",
    creator: "Camille & Illiès",
    handle: "@lesartisansdedemain",
    url: "https://www.instagram.com/lesartisansdedemain/",
    description:
      "Capturing master craftspeople around the Mediterranean and global south: earth architecture, weaving, clay, and ancestral toolmaking.",
    tags: ["craft", "photography", "documentary", "mediterranean"],
  },
];
