// Mock data for certificates and achievements (since no database integration)
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  imageUrl: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  icon: string;
}

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "CS50x introdaction to computer science",
    issuer: "Harvard University",
    date: "2024-03",
    category: "Computer science",
    imageUrl: "/machine-learning-certificate.jpg",
    credentialUrl: "#",
  },
  {
    id: "2",
    title: "cs50p Programming with python",
    issuer: "Harvard University",
    date: "2025-09",
    category: "Computer science",
    imageUrl: "/web-development-certificate.jpg",
    credentialUrl: "#",
  },
  {
    id: "3",
    title: "Shanhai summer school chinese weiqi promotion project",
    issuer: "SHANGHAI JAIN QIAO UNIVERSITY",
    date: "2024-08",
    category: "Go board game",
    imageUrl: "/deep-learning-certificate.jpg",
    credentialUrl: "#",
  },
  {
    id: "4",
    title: "Internship at DataCare LLC",
    issuer: "DataCare LLC",
    date: "2025-07",
    category: "Computerscience",
    imageUrl: "/aws-certificate.png",
    credentialUrl: "#",
  },
  {
    id: "5",
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "2024-10",
    category: "ComputerScience",
    imageUrl: "/react-certificate.jpg",
    credentialUrl: "#",
  },
  {
    id: "6",
    title: "Version Control",
    issuer: "Meta",
    date: "2024-11",
    category: "ComputerScience",
    imageUrl: "/react-certificate.jpg",
    credentialUrl: "#",
  },
  {
    id: "7",
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "2024-12",
    category: "ComputerScience",
    imageUrl: "/react-certificate.jpg",
    credentialUrl: "#",
  },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "Working on project named Cyber Math",
    description:
      "Developed a web that has instraction purpose in math( Still in development stage )",
    date: "2025-11",
    category: "Projects",
    icon: "bot",
  },
  {
    id: "2",
    title: "NFT desing",
    description: "did nft project in graphic design class",
    date: "2025-2",
    category: "Projects",
    icon: "users",
  },
  {
    id: "3",
    title: "Internship at DataCare LLC",
    description:
      "One of the main contribution in this company is prototype of management tool that helps small businesses track products with secure access. The experience taught me trade-offs, and why clear database schema design matters for reliability and data security, and how collaborative workflows processing such as issue tracking, version control, and code reviews to turn individual effort into excellent teamwork.",
    date: "2025-6",
    category: "Community",
    icon: "code",
  },
  {
    id: "4",
    title: "Research Publication",
    description: "Co-authored paper on Ai impact on academic",
    date: "2025-10",
    category: "Research",
    icon: "book",
  },
  {
    id: "5",
    title: "Innoknow english project",
    description:
      "Developed a web that has instraction purpose in English which is inspired by Duolinguo( Still in development stage )",
    date: "2025-12",
    category: "Projects",
    icon: "code",
  },
  {
    id: "6",
    title: "Perfect GPA",
    description: "Maintained near of 4.0 GPA in all subjects",
    date: "2024-05",
    category: "Academic",
    icon: "star",
  },
  {
    id: "7",
    title: "Research Publication",
    description:
      "Research work that illustrates the possibilities of converting brain signals to computable data",
    date: "2025-19",
    category: "Research",
    icon: "book",
  },
  {
    id: "8",
    title: "Tought my juniors Computer science",
    description: "In happy teachers day, I become teacher of computer sciences",
    date: "2024-10",
    category: "Academic",
    icon: "star",
  },
  {
    id: "9",
    title: "Tought my juniors Computer science Again",
    description:
      "In next year of happy teachers day, I become teacher of computer sciences again",
    date: "2025-10",
    category: "Academic",
    icon: "star",
  },
  {
    id: "10",
    title: "Participated CleanUp Day 2024",
    description: "One of the biggest eclogical event in the world",
    date: "2024-6",
    category: "Community",
    icon: "users",
  },
  {
    id: "11",
    title: "Participated CleanUp Day 2025",
    description: "One of the biggest eclogical event in the world",
    date: "2025-6",
    category: "Community",
    icon: "users",
  },
  {
    id: "12",
    title: "Eco club",
    description: "the club that encourages childrens to protect nature",
    date: "2024-9",
    category: "Community",
    icon: "users",
  },
  {
    id: "13",
    title: "Shanhai Summer school Chinese Weiqi Promotion Project",
    description:
      "Participated in Shanhai Summer school Chinese Weiqi Promotion Project",
    date: "2024-8",
    category: "Community",
    icon: "users",
  },
];

export const categories = {
  certificates: ["All", "AI/ML", "Web Development", "Cloud"],
  achievements: ["All", "Projects", "Community", "Research", "Academic"],
};
