import type { Movie } from "@/types/movie";

// ─── Base de films MoodCiné ───────────────────────────────────────────────────
// posterUrl : remplace null par une vraie URL TMDB quand tu connectes l'API
// Format TMDB : https://image.tmdb.org/t/p/w500/{poster_path}

export const MOVIES: Movie[] = [
  // ── 1. Inspirant / Dépassement de soi ────────────────────────────────────
  {
    id: "pursuit-of-happyness",
    title: "À la recherche du bonheur",
    slug: "a-la-recherche-du-bonheur",
    originalTitle: "The Pursuit of Happyness",
    posterUrl: null,
    shortDescription:
      "Un père sans abri lutte corps et âme pour offrir un avenir à son fils et réaliser son rêve.",
    description:
      "Chris Gardner est un vendeur en difficulté qui se retrouve à la rue avec son jeune fils. Déterminé à tout changer, il décroche un stage non rémunéré dans un cabinet financier. Une histoire vraie de résilience absolue.",
    releaseYear: 2006,
    duration: 117,
    director: "Gabriele Muccino",
    genres: ["drama", "biography"],
    platforms: ["prime"],
    moodTags: ["sad", "tired", "lost"],
    emotionGoalTags: ["inspire", "cry"],
    themeTags: ["ambition", "survival", "redemption"],
    vibeTags: ["raw", "heartwarming"],
    contextTags: ["solo"],
    intensity: "intense",
    endingType: "hopeful",
    recommendationReason:
      "Pour les soirs où tu as besoin de te rappeler que les plus grandes réussites naissent des moments les plus sombres.",
    isFeatured: true,
    isActive: true,
  },

  // ── 2. Romance / Art / Mélancolie ────────────────────────────────────────
  {
    id: "la-la-land",
    title: "La La Land",
    slug: "la-la-land",
    posterUrl: null,
    shortDescription:
      "Deux rêveurs à Los Angeles, entre amour, ambition et les choix impossibles de la vie.",
    description:
      "Mia, actrice en devenir, et Sebastian, pianiste de jazz passionné, tombent amoureux dans les rues lumineuses de Los Angeles. Une ode poétique aux rêves et aux sacrifices qu'ils imposent.",
    releaseYear: 2016,
    duration: 128,
    director: "Damien Chazelle",
    genres: ["romance", "drama"],
    platforms: ["netflix", "prime"],
    moodTags: ["happy", "nostalgic", "lost"],
    emotionGoalTags: ["cry", "inspire", "drift"],
    themeTags: ["romance", "art", "ambition"],
    vibeTags: ["poetic", "whimsical", "intimate"],
    contextTags: ["solo", "couple"],
    intensity: "balanced",
    endingType: "bittersweet",
    recommendationReason:
      "Un film qui te fera rire, pleurer et rêver — souvent en même temps.",
    isFeatured: true,
    isActive: true,
  },

  // ── 3. Aventure / Fantaisie / Fun ─────────────────────────────────────────
  {
    id: "grand-budapest-hotel",
    title: "The Grand Budapest Hotel",
    slug: "the-grand-budapest-hotel",
    posterUrl: null,
    shortDescription:
      "Un concierge d'hôtel extravagant et son jeune groom vivent des aventures rocambolesques dans une Europe d'antan.",
    description:
      "M. Gustave, concierge légendaire d'un palace des années 30, se retrouve impliqué dans un meurtre et une course au trésor. Wes Anderson à son summum de style et d'humour.",
    releaseYear: 2014,
    duration: 99,
    director: "Wes Anderson",
    genres: ["comedy", "adventure"],
    platforms: ["disney", "prime"],
    moodTags: ["happy", "energetic"],
    emotionGoalTags: ["laugh", "drift"],
    themeTags: ["adventure", "friendship", "mystery"],
    vibeTags: ["quirky", "whimsical", "epic"],
    contextTags: ["solo", "couple", "friends"],
    intensity: "balanced",
    endingType: "bittersweet",
    recommendationReason:
      "Quand tu veux t'évader dans un monde où chaque plan est un tableau et chaque réplique un bijou.",
    isFeatured: false,
    isActive: true,
  },

  // ── 4. Sci-fi / Épique / Intense ─────────────────────────────────────────
  {
    id: "interstellar",
    title: "Interstellar",
    slug: "interstellar",
    posterUrl: null,
    shortDescription:
      "Un père astronaute voyage à travers les étoiles pour sauver l'humanité — et retrouver sa fille.",
    description:
      "Dans un futur proche où la Terre se meurt, Cooper rejoint une mission spatiale pour trouver une nouvelle planète habitable. Un voyage qui brise le temps, l'espace, et le cœur.",
    releaseYear: 2014,
    duration: 169,
    director: "Christopher Nolan",
    genres: ["sci-fi", "adventure"],
    platforms: ["prime", "netflix"],
    moodTags: ["energetic", "lost", "nostalgic"],
    emotionGoalTags: ["shock", "think", "cry"],
    themeTags: ["family", "survival", "identity"],
    vibeTags: ["epic", "tense", "poetic"],
    contextTags: ["solo", "couple"],
    intensity: "intense",
    endingType: "bittersweet",
    recommendationReason:
      "Pour les soirs où tu veux être complètement embarqué·e dans quelque chose de plus grand que toi.",
    isFeatured: true,
    isActive: true,
  },

  // ── 5. Poétique / Doux / Romantique ─────────────────────────────────────
  {
    id: "amelie",
    title: "Le Fabuleux Destin d'Amélie Poulain",
    slug: "amelie-poulain",
    originalTitle: "Amélie",
    posterUrl: null,
    shortDescription:
      "Une jeune femme discrète décide de changer la vie des gens autour d'elle — tout en oubliant la sienne.",
    description:
      "Amélie, serveuse parisienne fantasque, se découvre une mission : rendre les autres heureux. Mais pourra-t-elle s'autoriser à l'être elle-même ? Un chef-d'œuvre poétique et chaleureux.",
    releaseYear: 2001,
    duration: 122,
    director: "Jean-Pierre Jeunet",
    genres: ["romance", "comedy"],
    platforms: ["prime", "netflix"],
    moodTags: ["sad", "lost", "happy"],
    emotionGoalTags: ["drift", "inspire", "laugh"],
    themeTags: ["romance", "identity", "art"],
    vibeTags: ["whimsical", "poetic", "feel-good"],
    contextTags: ["solo", "couple"],
    intensity: "calm",
    endingType: "happy",
    recommendationReason:
      "Quand tu veux retrouver la magie du quotidien et croire que les petits bonheurs existent vraiment.",
    isFeatured: true,
    isActive: true,
  },

  // ── 6. Ambition / Adrénaline / Intense ──────────────────────────────────
  {
    id: "wolf-of-wall-street",
    title: "Le Loup de Wall Street",
    slug: "le-loup-de-wall-street",
    originalTitle: "The Wolf of Wall Street",
    posterUrl: null,
    shortDescription:
      "L'ascension vertigineuse et la chute spectaculaire d'un courtier en bourse sans limites.",
    description:
      "Jordan Belfort, jeune courtier ambitieux, bâtit un empire financier fondé sur la fraude, l'excès et le chaos. Scorsese à fond — drôle, choquant, inoubliable.",
    releaseYear: 2013,
    duration: 180,
    director: "Martin Scorsese",
    genres: ["biography", "drama", "comedy"],
    platforms: ["prime", "netflix"],
    moodTags: ["energetic", "happy"],
    emotionGoalTags: ["excite", "shock", "laugh"],
    themeTags: ["ambition", "society"],
    vibeTags: ["raw", "tense", "epic"],
    contextTags: ["solo", "friends"],
    intensity: "intense",
    endingType: "open",
    recommendationReason:
      "Pour les soirs où tu veux de l'énergie, du rythme et une bonne dose de chaos bien filmé.",
    isFeatured: false,
    isActive: true,
  },

  // ── 7. Feel-good / Universel / Émouvant ──────────────────────────────────
  {
    id: "forrest-gump",
    title: "Forrest Gump",
    slug: "forrest-gump",
    posterUrl: null,
    shortDescription:
      "Un homme au cœur pur traverse cinquante ans d'histoire américaine — sans jamais perdre sa bonté.",
    description:
      "Forrest Gump, un homme simple et sincère, traverse les grandes étapes de l'histoire américaine tout en cherchant l'amour de sa vie. Une saga émouvante sur la destinée et la gentillesse.",
    releaseYear: 1994,
    duration: 142,
    director: "Robert Zemeckis",
    genres: ["drama", "romance"],
    platforms: ["prime", "netflix"],
    moodTags: ["sad", "tired", "nostalgic"],
    emotionGoalTags: ["cry", "inspire", "comfort"],
    themeTags: ["friendship", "redemption", "coming-of-age"],
    vibeTags: ["heartwarming", "feel-good", "poetic"],
    contextTags: ["solo", "couple", "family"],
    intensity: "balanced",
    endingType: "bittersweet",
    recommendationReason:
      "Un film qui te rappelle que la vie, c'est comme une boîte de chocolats — et que la bonté est une force.",
    isFeatured: true,
    isActive: true,
  },

  // ── 8. Comédie romantique / Doux / Couple ────────────────────────────────
  {
    id: "when-harry-met-sally",
    title: "Quand Harry rencontre Sally",
    slug: "quand-harry-rencontre-sally",
    originalTitle: "When Harry Met Sally",
    posterUrl: null,
    shortDescription:
      "Deux amis débattent depuis dix ans si un homme et une femme peuvent vraiment être amis. La réponse les surprend.",
    description:
      "Harry et Sally se croisent, se quittent, se retrouvent sur dix ans à New York. Une comédie romantique culte, drôle et sincère, sur l'amitié qui devient amour.",
    releaseYear: 1989,
    duration: 95,
    director: "Rob Reiner",
    genres: ["romance", "comedy"],
    platforms: ["prime"],
    moodTags: ["happy", "nostalgic", "lost"],
    emotionGoalTags: ["laugh", "drift", "comfort"],
    themeTags: ["romance", "friendship"],
    vibeTags: ["feel-good", "intimate", "heartwarming"],
    contextTags: ["couple", "solo", "friends"],
    intensity: "calm",
    endingType: "happy",
    recommendationReason:
      "Le film parfait pour une soirée légère qui te laisse le sourire aux lèvres.",
    isFeatured: false,
    isActive: true,
  },

  // ── 9. Thriller / Sociétal / Choquant ────────────────────────────────────
  {
    id: "parasite",
    title: "Parasite",
    slug: "parasite",
    originalTitle: "기생충",
    posterUrl: null,
    shortDescription:
      "Une famille pauvre s'infiltre dans la vie d'une famille riche — avec des conséquences que personne n'avait prévues.",
    description:
      "La famille Kim, sans le sou, parvient à s'immiscer dans la maison luxueuse des Park. Ce qui commence comme une comédie sociale se transforme en quelque chose de bien plus sombre. Palme d'Or à Cannes.",
    releaseYear: 2019,
    duration: 132,
    director: "Bong Joon-ho",
    genres: ["thriller", "drama"],
    platforms: ["prime", "mubi"],
    moodTags: ["energetic", "stressed", "happy"],
    emotionGoalTags: ["shock", "think"],
    themeTags: ["society", "survival", "mystery"],
    vibeTags: ["dark", "tense", "raw"],
    contextTags: ["solo", "couple"],
    intensity: "intense",
    endingType: "sad",
    recommendationReason:
      "Quand tu veux un film qui te retourne complètement et dont tu parleras pendant des jours.",
    isFeatured: true,
    isActive: true,
  },

  // ── 10. Profond / Existentiel / Animation adulte ─────────────────────────
  {
    id: "soul",
    title: "Soul",
    slug: "soul",
    posterUrl: null,
    shortDescription:
      "Un musicien de jazz se retrouve dans l'antichambre de l'au-delà et découvre ce qui donne vraiment sens à une vie.",
    description:
      "Joe Gardner, professeur de musique, réalise enfin son rêve avant de se retrouver séparé de son corps. Une réflexion profonde et lumineuse de Pixar sur le sens de l'existence.",
    releaseYear: 2020,
    duration: 101,
    director: "Pete Docter",
    genres: ["animation", "drama"],
    platforms: ["disney"],
    moodTags: ["lost", "tired", "sad"],
    emotionGoalTags: ["think", "inspire", "cry"],
    themeTags: ["identity", "art", "second-chance"],
    vibeTags: ["poetic", "whimsical", "heartwarming"],
    contextTags: ["solo", "family", "couple"],
    intensity: "balanced",
    endingType: "hopeful",
    recommendationReason:
      "Pour les soirs où tu te demandes si tu vis vraiment ou si tu te contentes de passer à côté.",
    isFeatured: true,
    isActive: true,
  },

  // ── 11. Feel-good / Amitié / Universel ───────────────────────────────────
  {
    id: "intouchables",
    title: "Intouchables",
    slug: "intouchables",
    posterUrl: null,
    shortDescription:
      "Un riche aristocrate tétraplégique et son aide-soignant des quartiers populaires forment une amitié improbable et bouleversante.",
    description:
      "Philippe, riche et handicapé, engage Driss, ex-détenu sans qualification. Leur différence devient leur force. Un film français culte, drôle, émouvant et humain.",
    releaseYear: 2011,
    duration: 112,
    director: "Olivier Nakache & Éric Toledano",
    genres: ["drama", "comedy", "biography"],
    platforms: ["netflix", "prime"],
    moodTags: ["sad", "tired", "stressed"],
    emotionGoalTags: ["laugh", "inspire", "comfort"],
    themeTags: ["friendship", "redemption", "second-chance"],
    vibeTags: ["feel-good", "heartwarming", "raw"],
    contextTags: ["solo", "couple", "friends"],
    intensity: "balanced",
    endingType: "hopeful",
    recommendationReason:
      "Un film qui te réchauffe de l'intérieur et te rappelle ce que l'amitié a de plus beau.",
    isFeatured: true,
    isActive: true,
  },

  // ── 12. OVNI / Intense / Multiémotionnel ─────────────────────────────────
  {
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    slug: "everything-everywhere-all-at-once",
    posterUrl: null,
    shortDescription:
      "Une femme ordinaire découvre qu'elle peut accéder à des vies parallèles — et doit sauver l'univers en faisant sa compta.",
    description:
      "Evelyn Wang, blanchisseuse sino-américaine dépassée par la vie, se retrouve au centre d'une bataille multidimensionnelle. Un film qui fait rire, pleurer, penser — parfois dans la même seconde.",
    releaseYear: 2022,
    duration: 139,
    director: "Daniels",
    genres: ["sci-fi", "comedy", "drama"],
    platforms: ["prime"],
    moodTags: ["lost", "stressed", "tired"],
    emotionGoalTags: ["shock", "think", "cry", "laugh"],
    themeTags: ["family", "identity", "second-chance"],
    vibeTags: ["quirky", "epic", "raw", "whimsical"],
    contextTags: ["solo", "friends"],
    intensity: "intense",
    endingType: "hopeful",
    recommendationReason:
      "Pour les soirs où tu veux être complètement déstabilisé·e — mais finir avec les larmes et un sourire.",
    isFeatured: true,
    isActive: true,
  },

  // ── 13. Romance / Temps / Émotion douce ──────────────────────────────────
  {
    id: "about-time",
    title: "Il était temps",
    slug: "il-etait-temps",
    originalTitle: "About Time",
    posterUrl: null,
    shortDescription:
      "Un jeune homme découvre qu'il peut voyager dans le temps — et apprend que la vraie magie, c'est le présent.",
    description:
      "Tim découvre qu'il peut remonter le temps. Il utilise ce pouvoir pour trouver l'amour, mais comprend peu à peu que chaque instant vécu pleinement vaut plus que tous les voyages.",
    releaseYear: 2013,
    duration: 123,
    director: "Richard Curtis",
    genres: ["romance", "drama"],
    platforms: ["prime", "netflix"],
    moodTags: ["nostalgic", "happy", "sad"],
    emotionGoalTags: ["cry", "comfort", "inspire"],
    themeTags: ["romance", "family", "second-chance"],
    vibeTags: ["intimate", "heartwarming", "feel-good"],
    contextTags: ["couple", "solo", "family"],
    intensity: "calm",
    endingType: "bittersweet",
    recommendationReason:
      "Pour les soirs où tu as envie d'une histoire belle et douce qui te fait apprécier ce que tu as.",
    isFeatured: false,
    isActive: true,
  },

  // ── 14. Drame psychologique / Introspectif ───────────────────────────────
  {
    id: "good-will-hunting",
    title: "Will Hunting",
    slug: "will-hunting",
    originalTitle: "Good Will Hunting",
    posterUrl: null,
    shortDescription:
      "Un génie des mathématiques caché derrière une façade de voyou doit choisir entre sa peur et sa liberté.",
    description:
      "Will Hunting, homme de ménage à MIT, est un génie autodidacte qui se sabote lui-même. Un psy atypique (Robin Williams) va l'aider à comprendre d'où vient sa douleur. Bouleversant.",
    releaseYear: 1997,
    duration: 126,
    director: "Gus Van Sant",
    genres: ["drama"],
    platforms: ["prime", "netflix"],
    moodTags: ["lost", "stressed", "sad"],
    emotionGoalTags: ["think", "cry", "inspire"],
    themeTags: ["identity", "redemption", "friendship"],
    vibeTags: ["raw", "intimate", "poetic"],
    contextTags: ["solo", "couple"],
    intensity: "balanced",
    endingType: "hopeful",
    recommendationReason:
      "Pour les soirs où tu portes quelque chose de lourd — et que tu as besoin d'entendre que ce n'est pas ta faute.",
    isFeatured: false,
    isActive: true,
  },

  // ── 15. Comédie musicale / Fun / Entre amis ──────────────────────────────
  {
    id: "mamma-mia",
    title: "Mamma Mia !",
    slug: "mamma-mia",
    posterUrl: null,
    shortDescription:
      "La veille de son mariage, une jeune femme invite les trois hommes qui pourraient être son père. La musique d'ABBA fait le reste.",
    description:
      "Sophie rêve que son père l'accompagne à l'autel. Pour le trouver, elle invite les trois candidats depuis l'île grecque où sa mère tient un hôtel. Léger, joyeux et irrésistible.",
    releaseYear: 2008,
    duration: 108,
    director: "Phyllida Lloyd",
    genres: ["comedy", "romance"],
    platforms: ["prime", "disney"],
    moodTags: ["happy", "energetic", "nostalgic"],
    emotionGoalTags: ["laugh", "drift", "excite"],
    themeTags: ["family", "romance", "friendship"],
    vibeTags: ["feel-good", "whimsical", "heartwarming"],
    contextTags: ["friends", "family", "couple"],
    intensity: "calm",
    endingType: "happy",
    recommendationReason:
      "Pour les soirées où tu veux juste t'amuser, chanter et danser depuis ton canapé.",
    isFeatured: false,
    isActive: true,
  },

  // ── 16. Intérieur / Mélancolique / Technologie ───────────────────────────
  {
    id: "her",
    title: "Her",
    slug: "her",
    posterUrl: null,
    shortDescription:
      "Un homme solitaire tombe amoureux de son système d'exploitation. Et c'est la plus belle histoire d'amour de sa vie.",
    description:
      "Theodore, écrivain de lettres d'amour pour d'autres, vit dans une solitude douce. Il tombe amoureux de Samantha, son IA. Spike Jonze signe une méditation poignante sur la connexion humaine.",
    releaseYear: 2013,
    duration: 126,
    director: "Spike Jonze",
    genres: ["romance", "drama", "sci-fi"],
    platforms: ["prime", "mubi"],
    moodTags: ["lost", "sad", "nostalgic"],
    emotionGoalTags: ["think", "cry", "drift"],
    themeTags: ["romance", "identity", "society"],
    vibeTags: ["intimate", "poetic", "dark"],
    contextTags: ["solo"],
    intensity: "calm",
    endingType: "bittersweet",
    recommendationReason:
      "Pour les soirs seul·e où tu veux explorer ce que la connexion et la solitude ont de plus profond.",
    isFeatured: false,
    isActive: true,
  },

  // ── 17. Famille / Émotion / Animation ───────────────────────────────────
  {
    id: "coco",
    title: "Coco",
    slug: "coco",
    posterUrl: null,
    shortDescription:
      "Un petit garçon passe la nuit des morts dans le Pays des Morts pour percer le mystère de sa famille — et de la musique.",
    description:
      "Miguel rêve de devenir musicien dans une famille qui a banni la musique. Il se retrouve dans le monde des morts et découvre une vérité familiale bouleversante. Pixar à son état le plus émouvant.",
    releaseYear: 2017,
    duration: 105,
    director: "Lee Unkrich",
    genres: ["animation", "adventure"],
    platforms: ["disney"],
    moodTags: ["sad", "nostalgic", "happy"],
    emotionGoalTags: ["cry", "inspire", "comfort"],
    themeTags: ["family", "art", "identity"],
    vibeTags: ["heartwarming", "whimsical", "feel-good"],
    contextTags: ["family", "solo", "couple"],
    intensity: "balanced",
    endingType: "hopeful",
    recommendationReason:
      "Un film qui te fait pleurer toutes les larmes de ton corps — et partir avec le cœur plein de chaleur.",
    isFeatured: false,
    isActive: true,
  },

  // ── 18. Aventure intérieure / Se retrouver ───────────────────────────────
  {
    id: "secret-life-of-walter-mitty",
    title: "La Vie rêvée de Walter Mitty",
    slug: "la-vie-revee-de-walter-mitty",
    originalTitle: "The Secret Life of Walter Mitty",
    posterUrl: null,
    shortDescription:
      "Un homme qui vit dans ses rêves décide un jour de vraiment partir — et découvre que la vraie vie est encore plus belle.",
    description:
      "Walter Mitty passe ses journées à s'évader dans ses fantasmes. Quand une photo disparaît, il part la retrouver et traverse le monde pour la première fois. Un film magnifique sur l'audace de vivre.",
    releaseYear: 2013,
    duration: 114,
    director: "Ben Stiller",
    genres: ["adventure", "drama", "comedy"],
    platforms: ["prime", "netflix"],
    moodTags: ["lost", "tired", "nostalgic"],
    emotionGoalTags: ["inspire", "drift", "excite"],
    themeTags: ["adventure", "identity", "second-chance"],
    vibeTags: ["whimsical", "poetic", "epic"],
    contextTags: ["solo", "couple"],
    intensity: "balanced",
    endingType: "hopeful",
    recommendationReason:
      "Pour les soirs où tu veux te rappeler que l'aventure commence quand on arrête d'imaginer et qu'on y va.",
    isFeatured: false,
    isActive: true,
  },

  // ── 19. Action / Moral / Intense ────────────────────────────────────────
  {
    id: "dark-knight",
    title: "The Dark Knight : Le Chevalier Noir",
    slug: "the-dark-knight",
    originalTitle: "The Dark Knight",
    posterUrl: null,
    shortDescription:
      "Batman affronte le Joker, un agent du chaos qui veut prouver que tout le monde peut sombrer.",
    description:
      "Bruce Wayne doit faire face à une menace sans précédent : le Joker, un criminel qui n'a aucun plan, aucune règle et aucune limite. Le meilleur film de super-héros jamais réalisé.",
    releaseYear: 2008,
    duration: 152,
    director: "Christopher Nolan",
    genres: ["action", "thriller", "drama"],
    platforms: ["netflix", "prime"],
    moodTags: ["energetic", "stressed"],
    emotionGoalTags: ["excite", "shock", "think"],
    themeTags: ["survival", "identity", "society"],
    vibeTags: ["dark", "epic", "tense"],
    contextTags: ["solo", "friends", "couple"],
    intensity: "intense",
    endingType: "bittersweet",
    recommendationReason:
      "Pour les soirs où tu veux de l'action, de la profondeur et un méchant dont tu te souviendras toujours.",
    isFeatured: true,
    isActive: true,
  },

  // ── 20. Nostalgie / Paris / Romance ─────────────────────────────────────
  {
    id: "midnight-in-paris",
    title: "Minuit à Paris",
    slug: "minuit-a-paris",
    originalTitle: "Midnight in Paris",
    posterUrl: null,
    shortDescription:
      "Un écrivain américain se retrouve chaque nuit projeté dans le Paris des années 1920, parmi les plus grands artistes de l'Histoire.",
    description:
      "Gil Pender, scénariste en mal de sens, visite Paris avec sa fiancée et se retrouve chaque nuit transporté dans l'âge d'or de l'art. Woody Allen et une lettre d'amour à la nostalgie.",
    releaseYear: 2011,
    duration: 94,
    director: "Woody Allen",
    genres: ["comedy", "romance", "fantasy"],
    platforms: ["prime", "netflix"],
    moodTags: ["nostalgic", "happy", "lost"],
    emotionGoalTags: ["drift", "inspire", "think"],
    themeTags: ["romance", "art", "identity"],
    vibeTags: ["whimsical", "poetic", "intimate"],
    contextTags: ["couple", "solo"],
    intensity: "calm",
    endingType: "hopeful",
    recommendationReason:
      "Pour les soirs où Paris te manque et où tu veux croire que le passé avait quelque chose de magique.",
    isFeatured: false,
    isActive: true,
  },
];
