// --- Fortune Levels ---

export type FortuneLevel =
  | "daikichi"   // 大吉
  | "chukichi"   // 中吉
  | "shokichi"   // 小吉
  | "suekichi"   // 末吉
  | "kyo"        // 凶
  | "daikyo";    // 大凶

export const fortuneLevels = {
  daikichi: { jp: "大吉", en: "Great Blessing" },
  chukichi: { jp: "中吉", en: "Middle Blessing" },
  shokichi: { jp: "小吉", en: "Small Blessing" },
  suekichi: { jp: "末吉", en: "Future Blessing" },
  kyo: { jp: "凶", en: "Misfortune" },
  daikyo: { jp: "大凶", en: "Great Misfortune" },
} as const;

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
      good: ["What you seek will come sooner than expected."],
      neutral: ["It will not come quickly. Patience is required."],
      bad: ["Release this desire. It leads away from balance."],
    },
  },
  relationships: {
    jp: "縁",
    en: "Relationships",
    description: "Love, friendship, encounters, waiting for someone",
    lines: {
      good: ["A sincere connection will form naturally."],
      neutral: ["Do not rush bonds. Time reveals intent."],
      bad: ["Distance now prevents greater trouble later."],
    },
  },
  path: {
    jp: "道",
    en: "Path",
    description: "Work, study, direction, decisions",
    lines: {
      good: ["Stay the middle path. Progress is steady."],
      neutral: ["Adjust your direction slightly."],
      bad: ["Forcing forward will invite resistance."],
    },
  },
  fortune: {
    jp: "運",
    en: "Fortune",
    description: "Money, prosperity, opportunities, losses",
    lines: {
      good: ["Small gains accumulate into stability."],
      neutral: ["Avoid excess. Preserve what you have."],
      bad: ["Loss comes from carelessness."],
    },
  },
  balance: {
    jp: "調",
    en: "Balance",
    description: "Health, rest, conflict, inner state",
    lines: {
      good: ["Your condition improves with restraint."],
      neutral: ["Rest restores what effort consumes."],
      bad: ["Ignoring imbalance worsens the outcome."],
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

