// Natural Language Processing Response Generator
// Uses rule-based NLP techniques instead of LLM APIs

interface KnowledgeEntry {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

interface NLPResponse {
  text: string;
  confidence: number;
}

// Extract key entities and topics from user query
function extractKeywords(query: string): string[] {
  const normalized = query.toLowerCase();
  const words = normalized.split(/\s+/);

  // Remove common stop words
  const stopWords = new Set([
    "what",
    "when",
    "where",
    "who",
    "how",
    "why",
    "is",
    "are",
    "was",
    "were",
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "about",
    "can",
    "could",
    "would",
    "should",
    "do",
    "does",
    "did",
    "have",
    "has",
    "had",
    "tell",
    "me",
    "your",
    "you",
  ]);

  return words.filter((word) => !stopWords.has(word) && word.length > 2);
}

// Detect question type for appropriate response formatting
function detectQuestionType(query: string): string {
  const normalized = query.toLowerCase();

  if (normalized.match(/^(what|which)/)) return "what";
  if (normalized.match(/^(who|whose)/)) return "who";
  if (normalized.match(/^(when|what time)/)) return "when";
  if (normalized.match(/^(where)/)) return "where";
  if (normalized.match(/^(how|in what way)/)) return "how";
  if (normalized.match(/^(why|what.*reason)/)) return "why";
  if (normalized.match(/^(can|could|is|are|do|does)/)) return "yes_no";

  return "general";
}

// Generate natural response from knowledge entries
function synthesizeResponse(
  query: string,
  knowledgeEntries: KnowledgeEntry[]
): NLPResponse {
  if (knowledgeEntries.length === 0) {
    return {
      text: "I don't have specific information about that in my knowledge base. You might want to explore the About, Projects, Achievements, or Certificates sections of the portfolio, or try asking about education, skills, projects, or interests.",
      confidence: 0.3,
    };
  }

  const questionType = detectQuestionType(query);
  const keywords = extractKeywords(query);

  // Calculate relevance scores for each knowledge entry
  const scoredEntries = knowledgeEntries.map((entry) => {
    let score = 0;
    const entryText = `${entry.question} ${entry.answer}`.toLowerCase();

    // Score based on keyword matches
    keywords.forEach((keyword) => {
      if (entryText.includes(keyword)) {
        score += 2;
      }
    });

    // Boost score if question is similar
    const queryWords = query.toLowerCase().split(/\s+/);
    const questionWords = entry.question.toLowerCase().split(/\s+/);
    const commonWords = queryWords.filter((w) => questionWords.includes(w));
    score += commonWords.length;

    return { entry, score };
  });

  // Sort by relevance
  scoredEntries.sort((a, b) => b.score - a.score);
  const topEntries = scoredEntries.slice(0, 3);

  // Generate response based on question type and knowledge
  let response = "";
  const confidence = Math.min(0.9, 0.5 + topEntries[0].score * 0.1);

  if (topEntries.length === 1) {
    // Single answer - direct response
    response = formatSingleAnswer(topEntries[0].entry, questionType);
  } else if (
    topEntries.length > 1 &&
    topEntries[0].entry.category === topEntries[1].entry.category
  ) {
    // Multiple answers from same category - comprehensive response
    response = formatMultipleAnswers(
      topEntries.map((e) => e.entry),
      questionType
    );
  } else {
    // Multiple answers from different categories - structured response
    response = formatCategorizedAnswers(
      topEntries.map((e) => e.entry),
      questionType
    );
  }

  return { text: response, confidence };
}

// Format a single answer naturally
function formatSingleAnswer(
  entry: KnowledgeEntry,
  questionType: string
): string {
  const answer = entry.answer;

  // Add natural language connectors based on question type
  const connectors = {
    what: "",
    who: "",
    when: "",
    where: "",
    how: "",
    why: "",
    yes_no: "",
    general: "",
  };

  return `${connectors[questionType as keyof typeof connectors]}${answer}`;
}

// Format multiple related answers
function formatMultipleAnswers(
  entries: KnowledgeEntry[],
  questionType: string
): string {
  if (entries.length === 0) return "";

  const category = entries[0].category;
  let response = "";

  // Create a flowing narrative from multiple entries
  if (entries.length === 2) {
    response = `${entries[0].answer} Additionally, ${entries[1].answer
      .charAt(0)
      .toLowerCase()}${entries[1].answer.slice(1)}`;
  } else {
    response = entries[0].answer;
    for (let i = 1; i < entries.length - 1; i++) {
      response += ` ${entries[i].answer}`;
    }
    response += ` Furthermore, ${entries[entries.length - 1].answer
      .charAt(0)
      .toLowerCase()}${entries[entries.length - 1].answer.slice(1)}`;
  }

  return response;
}

// Format answers from different categories
function formatCategorizedAnswers(
  entries: KnowledgeEntry[],
  questionType: string
): string {
  const categoryGroups = new Map<string, KnowledgeEntry[]>();

  entries.forEach((entry) => {
    if (!categoryGroups.has(entry.category)) {
      categoryGroups.set(entry.category, []);
    }
    categoryGroups.get(entry.category)!.push(entry);
  });

  let response = "";
  const categories = Array.from(categoryGroups.entries());

  if (categories.length === 1) {
    return formatMultipleAnswers(categories[0][1], questionType);
  }

  // Combine information from different categories
  categories.forEach(([category, entries], index) => {
    if (index === 0) {
      response = entries[0].answer;
    } else {
      response += ` In terms of ${category.toLowerCase()}, ${entries[0].answer
        .charAt(0)
        .toLowerCase()}${entries[0].answer.slice(1)}`;
    }
  });

  return response;
}

// Main NLP response generation function
export function generateNLPResponse(
  query: string,
  knowledgeEntries: KnowledgeEntry[]
): string {
  const result = synthesizeResponse(query, knowledgeEntries);

  // Add conversational elements for low confidence responses
  if (result.confidence < 0.5) {
    return `Based on what I know, ${result.text
      .charAt(0)
      .toLowerCase()}${result.text.slice(1)}`;
  }

  return result.text;
}

// Generate a streaming-like response for compatibility
export function generateNLPResponseStream(
  query: string,
  knowledgeEntries: KnowledgeEntry[]
): string {
  return generateNLPResponse(query, knowledgeEntries);
}
