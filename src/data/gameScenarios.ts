export interface Scenario {
  id: number;
  text: string;
  yesPercent: number;
  aiVerdict: string;
  reasoning: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    text: "your partner deletes entire text conversations with a 'purely platonic' coworker because they 'didn't want you to get the wrong idea'?",
    yesPercent: 86,
    aiVerdict: "💔 BORDERLINE / INTENTIONAL CONCEALMENT",
    reasoning: "Hiding normal conversations indicates a conscious awareness that the interactions cross boundaries or require mitigation, introducing a lack of transparency that erodes trust."
  },
  {
    id: 2,
    text: "your partner regularly likes their ex-partner's gym selfie uploads from 3 years ago during late-night browsing sessions?",
    yesPercent: 62,
    aiVerdict: "⚠️ MICRO-CHEATING / ACTIVE SEEKING",
    reasoning: "Liking years-old photos requires active digging, which signals lingering curiosity or validation-seeking outside the core relationship. Borderline but emotionally messy."
  },
  {
    id: 3,
    text: "your partner has a dedicated 'work spouse' with whom they share deep emotional complaints about your relationship?",
    yesPercent: 78,
    aiVerdict: "💔 EMOTIONAL INFIDELITY",
    reasoning: "Outsourcing relationship conflict and emotional intimacy to a third party creates an alliance that excludes the partner, forming a classic emotional breach of contract."
  },
  {
    id: 4,
    text: "your partner uses ChatGPT to generate highly romantic, deep love letters and poems to write in your anniversary cards?",
    yesPercent: 29,
    aiVerdict: "🤷 LAZY ETHICS (Not Cheating)",
    reasoning: "While lack of effort is disappointing, outsourcing writing blocks to an LLM isn't romantic betrayal; it's just poor copywriter execution. Verdict: Not cheating, but highly unoriginal."
  },
  {
    id: 5,
    text: "your partner maintains a secret second Instagram account solely to look at attractive local profiles without affecting their main feed algorithm?",
    yesPercent: 73,
    aiVerdict: "💔 DISHONEST PARTITIONING",
    reasoning: "The intentional partition of online presence to conceal attention-spending habits from a partner is fundamentally deceptive. The algorithm is innocent; the motive is not."
  }
];
