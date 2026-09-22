// --- Fortune Levels ---

export type FortuneLevel =
  | "daikichi"   // 大吉
  | "chukichi"   // 中吉
  | "shokichi"   // 小吉
  | "suekichi"   // 末吉
  | "kyo"        // 凶
  | "daikyo";    // 大凶

export const fortuneLevels = {
  daikichi: {
    jp: "大吉",
    romaji: "Dai-kichi",
    en: "Great Blessing",
  },
  chukichi: {
    jp: "中吉",
    romaji: "Chū-kichi",
    en: "Middle Blessing",
  },
  shokichi: {
    jp: "小吉",
    romaji: "Shō-kichi",
    en: "Small Blessing",
  },
  suekichi: {
    jp: "末吉",
    romaji: "Sue-kichi",
    en: "Future Blessing",
  },
  kyo: {
    jp: "凶",
    romaji: "Kyō",
    en: "Misfortune",
  },
  daikyo: {
    jp: "大凶",
    romaji: "Dai-kyō",
    en: "Great Misfortune",
  },
} as const;

export const fortuneOpenings: Record<FortuneLevel, string> = {
  daikichi: "The way before you is bright; move with gratitude.",
  chukichi: "Good things are growing; tend them patiently.",
  shokichi: "A small blessing arrives through steady care.",
  suekichi: "What is slow to bloom may still flourish in time.",
  kyo: "The path is clouded; proceed with care and patience.",
  daikyo: "Pause and seek steadier ground before you move ahead.",
};


// --- Weighted Distribution (realistic) ---

const weights: Record<FortuneLevel, number> = {
  daikichi: 8,
  chukichi: 20,
  shokichi: 25,
  suekichi: 20,
  kyo: 6,
  daikyo: 1,
};

// --- Domains (Shrine-style abstraction) ---

export type FortuneDomain =
  | "aspiration"   // 願望
  | "relationships" // 縁
  | "path"          // 道
  | "fortune"       // 運
  | "balance";      // 調

export const domains: Record<
  FortuneDomain,
  {
    jp: string;
    en: string;
    description: string;
    lines: Record<"good" | "neutral" | "bad", string[]>;
  }
> = {
  aspiration: {
    jp: "願望",
    en: "Aspiration",
    description: "Wishes, goals, intentions",
    lines: {
      good: [
        "What you seek will come sooner than expected.",
        "A long-held wish begins to take shape.",
        "A small beginning will lead to a worthy result.",
        "Ask with a clear heart; the way will open.",
        "Your steady efforts are nearing their reward.",
        "The answer you await will bring encouragement.",
        "An unexpected kindness helps your wish along.",
        "The right opportunity appears when you are ready to act.",
        "What seemed distant is now within reach.",
        "A sincere intention finds favorable ground.",
        "Take the next step with confidence and gratitude.",
      ],
      neutral: [
        "It will not come quickly. Patience is required.",
        "Your wish may be granted in a different form.",
        "Wait until the purpose of your wish is clear.",
        "A modest step serves you better than a grand promise.",
        "Keep working quietly; the season has not yet turned.",
        "Seek advice before committing yourself.",
        "The path is open, though progress will be gradual.",
        "One part of your wish is ready; the rest needs time.",
        "Do not mistake a delay for a refusal.",
        "Set aside what is needless and try again.",
        "Make room for an answer you did not expect.",
      ],
      bad: [
        "Release this desire. It leads away from balance.",
        "A wish pursued in haste will bring regret.",
        "The present course will not yield what you seek.",
        "Step back before making a costly promise.",
        "Do not force an answer that has not arrived.",
        "What you desire now may burden you later.",
        "A hidden obstacle calls for a change of plans.",
        "Put this wish aside until your judgment is clearer.",
        "The time is unfavorable for a bold request.",
        "Guard against wanting more than you can carry.",
        "Let one door close before seeking another.",
      ],
    },
  },
  relationships: {
    jp: "縁",
    en: "Relationships",
    description: "Love, friendship, encounters, waiting for someone",
    lines: {
      good: [
        "A sincere connection will form naturally.",
        "A warm reply comes from an unexpected place.",
        "Speak honestly and affection will deepen.",
        "A new meeting brings lasting goodwill.",
        "An old friendship is ready to be renewed.",
        "The person you await will bring welcome news.",
        "A small act of care strengthens a precious bond.",
        "Mutual trust grows when you give it time.",
        "A misunderstanding clears through gentle words.",
        "Good company will steady your heart.",
        "A kind introduction opens a happy connection.",
      ],
      neutral: [
        "Do not rush bonds. Time reveals intent.",
        "Listen carefully before offering your answer.",
        "The person you await may be delayed.",
        "A quiet conversation will say more than a grand gesture.",
        "Give a strained bond some room to breathe.",
        "Friendship grows best without demands.",
        "An old misunderstanding needs patient attention.",
        "Meet others as they are, not as you hope they will be.",
        "A message may come after you stop watching for it.",
        "Kindness is welcome, but keep your boundaries clear.",
        "Allow trust to be earned a little at a time.",
      ],
      bad: [
        "Distance now prevents greater trouble later.",
        "Harsh words may linger longer than you expect.",
        "Do not place your trust in a hurried promise.",
        "An expected meeting may fail to happen.",
        "A one-sided bond will drain your strength.",
        "Step away from gossip before it reaches you.",
        "Seeking agreement at any cost will bring unrest.",
        "A familiar face may not offer sound counsel.",
        "Let a difficult conversation wait until anger passes.",
        "Protect your peace where respect is absent.",
        "Do not pursue someone who has asked for distance.",
      ],
    },
  },
  path: {
    jp: "道",
    en: "Path",
    description: "Work, study, direction, decisions",
    lines: {
      good: [
        "Stay the middle path. Progress is steady.",
        "Your careful work will be noticed.",
        "A difficult lesson soon becomes a useful skill.",
        "The road ahead clears as you begin.",
        "A sound decision brings steady progress.",
        "A helpful guide appears at the right time.",
        "Continue your studies; they will bear fruit.",
        "A journey started with preparation goes well.",
        "The task before you is smaller than it seems.",
        "Your persistence will open a new path.",
        "Choose the honest route and proceed without fear.",
      ],
      neutral: [
        "Adjust your direction slightly.",
        "Review the details before setting out.",
        "Progress comes through practice, not speed.",
        "An uncertain route becomes clearer with advice.",
        "Finish what is near before reaching farther.",
        "A change of plans may serve you well.",
        "Take time to learn what the next step requires.",
        "Keep your pace; others need not set it for you.",
        "A pause now will prevent wasted effort.",
        "The first attempt may teach more than it achieves.",
        "A patient answer is better than a quick choice.",
      ],
      bad: [
        "Forcing forward will invite resistance.",
        "A shortcut may lead you away from your goal.",
        "Do not travel an unfamiliar road without preparation.",
        "A decision made in anger will be hard to mend.",
        "Set aside the plan that depends on luck alone.",
        "Carelessness in small matters may delay the whole task.",
        "Wait before accepting a burden you cannot sustain.",
        "A promising offer deserves closer examination.",
        "Do not mistake motion for progress.",
        "This is a poor time to abandon steady work.",
        "Turn back from a course that has already shown its cost.",
      ],
    },
  },
  fortune: {
    jp: "運",
    en: "Fortune",
    description: "Money, prosperity, opportunities, losses",
    lines: {
      good: [
        "Small gains accumulate into stability.",
        "A modest opportunity will prove worthwhile.",
        "Careful saving brings welcome ease.",
        "An overlooked resource becomes useful again.",
        "A fair exchange benefits both sides.",
        "Good news arrives through steady work.",
        "What was lent in kindness returns in time.",
        "A small expense leads to lasting value.",
        "Your patience with money brings relief.",
        "A timely offer opens a useful door.",
        "Prosperity grows where you tend what you already have.",
      ],
      neutral: [
        "Avoid excess. Preserve what you have.",
        "A small gain is possible; keep expectations modest.",
        "Check the terms before making an exchange.",
        "Save a little now for an uncertain day.",
        "An opportunity is real, though its reward is limited.",
        "Spend on what is needed and wait on the rest.",
        "Keep clear accounts to avoid later confusion.",
        "A delayed payment calls for patience.",
        "Share fairly, and harmony will follow.",
        "The sure path is slower than the tempting one.",
        "Make use of what you have before seeking more.",
      ],
      bad: [
        "Loss comes from carelessness.",
        "A tempting bargain may carry a hidden cost.",
        "Do not lend what you cannot afford to lose.",
        "Guard your belongings while traveling.",
        "An impulsive purchase will bring little comfort.",
        "Delay a risky venture until the facts are clear.",
        "A promise of easy gain should be questioned.",
        "Neglected expenses may gather quickly.",
        "Avoid an exchange made under pressure.",
        "Keep your plans modest until conditions improve.",
        "What is misplaced may take time to recover.",
      ],
    },
  },
  balance: {
    jp: "調",
    en: "Balance",
    description: "Health, rest, conflict, inner state",
    lines: {
      good: [
        "Your condition improves with restraint.",
        "A calmer rhythm restores your strength.",
        "Peace returns after an honest conversation.",
        "A good habit begins with one small choice.",
        "Time outdoors will lift a heavy mood.",
        "An old worry starts to loosen its hold.",
        "A gentle routine brings renewed steadiness.",
        "Your home grows quieter through patient care.",
        "A season of recovery is beginning.",
        "Make space for rest and your spirits will rise.",
        "A measured response will settle a dispute.",
      ],
      neutral: [
        "Rest restores what effort consumes.",
        "Keep a steady rhythm and avoid needless strain.",
        "A quiet day may do more than a busy one.",
        "Speak about a worry before it grows.",
        "Attend to small signs of tiredness.",
        "Balance returns through ordinary care.",
        "Let an old grievance pass without feeding it.",
        "Make time for both duty and ease.",
        "A brief pause will help you see clearly.",
        "Do not carry every concern alone.",
        "Gentle persistence serves you better than force.",
      ],
      bad: [
        "Ignoring imbalance worsens the outcome.",
        "Pride may turn a small conflict into a lasting one.",
        "Exhaustion will cloud an important choice.",
        "Do not let resentment guide your words.",
        "A neglected concern needs your attention now.",
        "Too many obligations will scatter your strength.",
        "Step away before anger settles in.",
        "A restless mind needs fewer demands today.",
        "Do not sacrifice rest to keep every promise.",
        "An unsettled home calls for patient repair.",
        "Seek support before a burden becomes too heavy.",
      ],
    },
  },
};


// --- Logic ---

function fortuneType(level: FortuneLevel): "good" | "neutral" | "bad" {
  if (level === "daikichi" || level === "chukichi") return "good";
  if (level === "shokichi" || level === "suekichi") return "neutral";
  return "bad";
}

export function drawFortune(): FortuneLevel {
  const pool = Object.entries(weights);
  const total = pool.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;

  for (const [level, w] of pool) {
    r -= w;
    if (r <= 0) return level as FortuneLevel;
  }
  return "chukichi";
}

export type GeneratedFortune = {
  level: FortuneLevel;
  domains: Record<FortuneDomain, string>;
};

export function generateFortune(level: FortuneLevel): GeneratedFortune {
  const type = fortuneType(level);

  const domainsResult: Partial<Record<FortuneDomain, string>> = {};

  (Object.keys(domains) as FortuneDomain[]).forEach((key) => {
    const domain = domains[key];
    const options = domain.lines[type];
    domainsResult[key] =
      options[Math.floor(Math.random() * options.length)];
  });

  return {
    level,
    domains: domainsResult as Record<FortuneDomain, string>,
  };
}

