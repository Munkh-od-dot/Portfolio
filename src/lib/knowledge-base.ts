// Knowledge Base - Contains information about you for the chatbot to retrieve
export interface KnowledgeEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "1",
    category: "education",
    question: "What is your educational background?",
    answer:
      "I am currently applying to universities and have a strong academic background with focus on computer science and AI/ML technologies.",
    keywords: [
      "education",
      "school",
      "university",
      "college",
      "study",
      "academic",
    ],
  },
  {
    id: "2",
    category: "skills",
    question: "What are your technical skills?",
    answer:
      "I have expertise in full-stack development, AI/ML, including building sophisticated chatbots with RAG, intent classification, and FastAPI backends. I'm proficient in React, Next.js, TypeScript, Python, and modern web technologies.",
    keywords: [
      "skills",
      "technical",
      "programming",
      "languages",
      "technologies",
      "expertise",
    ],
  },
  {
    id: "3",
    category: "projects",
    question: "What projects have you built?",
    answer:
      "I've built advanced AI chatbot systems with intent classification and knowledge base retrieval, full-stack web applications, and various portfolio projects showcasing my technical capabilities.",
    keywords: [
      "projects",
      "portfolio",
      "built",
      "created",
      "developed",
      "work",
    ],
  },
  {
    id: "4",
    category: "interests",
    question: "What are your interests?",
    answer:
      "I'm passionate about artificial intelligence, machine learning, web development, and building innovative solutions that solve real-world problems. I'm particularly interested in natural language processing and conversational AI.",
    keywords: ["interests", "passion", "hobbies", "like", "enjoy", "love"],
  },
  {
    id: "5",
    category: "achievements",
    question: "What are your achievements?",
    answer:
      "I have earned multiple certificates in AI/ML, web development, and computer science. I've successfully built complex systems including this portfolio with an advanced chatbot featuring intent classification and RAG.",
    keywords: [
      "achievements",
      "accomplishments",
      "awards",
      "certificates",
      "recognition",
    ],
  },
];

// Retrieval function - finds relevant knowledge entries based on query
export function retrieveRelevantKnowledge(
  query: string,
  topK = 3
): KnowledgeEntry[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);

  // Score each knowledge entry based on keyword matches
  const scoredEntries = knowledgeBase.map((entry) => {
    let score = 0;

    // Check if query words match keywords
    queryWords.forEach((word) => {
      entry.keywords.forEach((keyword) => {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 2;
        }
      });

      // Check if query words appear in question or answer
      if (entry.question.toLowerCase().includes(word)) {
        score += 1;
      }
      if (entry.answer.toLowerCase().includes(word)) {
        score += 1;
      }
    });

    return { entry, score };
  });

  // Sort by score and return top K
  return scoredEntries
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.entry);
}
