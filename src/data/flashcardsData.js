// Active recall flashcards across CS, Aptitude, and Govt Exam Fundamentals

export const FLASHCARDS_DATA = [
  {
    id: 'fc-1',
    category: 'Computer Science',
    front: 'What are the 4 Coffman conditions required for a Deadlock in OS?',
    back: '1. Mutual Exclusion (resources non-shareable)\n2. Hold and Wait (holding one while requesting another)\n3. No Preemption (resources cannot be forcibly taken)\n4. Circular Wait (p0 waits for p1, p1 waits for p0)',
    tip: 'Breaking ANY one of these 4 conditions guarantees deadlock prevention!'
  },
  {
    id: 'fc-2',
    category: 'Quantitative Aptitude',
    front: 'What is the formula for the difference between CI and SI for 3 years?',
    back: '$$D_3 = P \\left(\\frac{R}{100}\\right)^2 \\left(\\frac{300 + R}{100}\\right)$$',
    tip: 'Compare with 2 years: $$D_2 = P \\left(\\frac{R}{100}\\right)^2$$'
  },
  {
    id: 'fc-3',
    category: 'Computer Science',
    front: 'What is the difference between Clustered and Non-Clustered Index?',
    back: 'Clustered Index physically reorders the rows on disk (only ONE per table, usually Primary Key). Non-Clustered Index creates a separate B-tree structure holding pointers to the physical data rows (MULTIPLE allowed per table).',
    tip: 'Think of Clustered as a dictionary (words sorted in-place) and Non-Clustered as an index at the back of a book.'
  },
  {
    id: 'fc-4',
    category: 'Indian Polity & Govt',
    front: 'What are the 5 types of Writs under Article 32 & 226 of the Indian Constitution?',
    back: '1. Habeas Corpus (To have the body - against illegal detention)\n2. Mandamus (We command - public duty enforcement)\n3. Prohibition (To forbid - lower court exceeding jurisdiction)\n4. Certiorari (To be certified/quashed)\n5. Quo-Warranto (By what authority)',
    tip: 'Article 32 is called the "Heart and Soul" of the Constitution by Dr. B.R. Ambedkar.'
  },
  {
    id: 'fc-5',
    category: 'Aptitude & Speed Math',
    front: 'What is the formula for Average Speed when distance is divided equally into two halves at speeds $S_1$ and $S_2$?',
    back: '$$S_{\\text{avg}} = \\frac{2 S_1 S_2}{S_1 + S_2}$$',
    tip: 'Never do simple arithmetic mean $(S_1 + S_2)/2$ when distance is constant!'
  },
  {
    id: 'fc-6',
    category: 'Computer Science',
    front: 'What is the CAP Theorem in distributed databases?',
    back: 'A distributed system can guarantee at most TWO out of three properties simultaneously:\n- Consistency (All nodes see same data at same time)\n- Availability (Every request gets a non-error response)\n- Partition Tolerance (System works despite network drops)',
    tip: 'In real networks where network partitions are inevitable, systems choose between CP (e.g., MongoDB, HBase) or AP (e.g., Cassandra, DynamoDB).'
  }
];

export const UPCOMING_DRIVES = [
  {
    id: 'drive-1',
    company: 'TCS National Qualifier Test (NQT)',
    role: 'Ninja / Digital / Prime Software Engineer',
    package: '₹3.36 - ₹11.5 LPA',
    batch: '2025 & 2026 Batch',
    eligibility: 'B.E / B.Tech / M.Tech / MCA (60% or 6.0 CGPA)',
    deadline: 'Registration Active',
    status: 'Open'
  },
  {
    id: 'drive-2',
    company: 'Infosys Special Programmer (SP & DSE)',
    role: 'Specialist Programmer & Digital Specialist Engineer',
    package: '₹6.5 - ₹9.5 LPA',
    batch: 'Final Year Students',
    eligibility: 'All Engineering Streams (65% throughout)',
    deadline: 'Upcoming Next Month',
    status: 'Announced'
  },
  {
    id: 'drive-3',
    company: 'SSC CGL 2025-26 Recruitment Cycle',
    role: 'Assistant Section Officer (CSS/MEA), Inspector (CGST/IT)',
    package: 'Pay Level 7 (₹65,000 - ₹85,000/mo in-hand)',
    batch: 'Graduates aged 18-30 years',
    eligibility: 'Any Bachelor Degree from Recognized University',
    deadline: 'Tier-1 Scheduled',
    status: 'Govt Notification'
  },
  {
    id: 'drive-4',
    company: 'Amazon WOW & Off-Campus SDE-1',
    role: 'Software Development Engineer - 1',
    package: '₹32 - 44 LPA CTC',
    batch: 'Current & Recent Graduates',
    eligibility: 'Proficiency in DSA, System Design basics, 7.0+ CGPA',
    deadline: 'Rolling Applications',
    status: 'Open'
  }
];
