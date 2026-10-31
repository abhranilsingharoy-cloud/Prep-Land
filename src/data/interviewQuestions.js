// STAR framework interview questions, technical viva, and HR simulation

export const STAR_QUESTIONS = [
  {
    id: 'star-1',
    category: 'Behavioral / Leadership',
    question: 'Tell me about a time you faced a major roadblock during a project and how you resolved it.',
    idealFramework: {
      situation: 'Describe the context, the project deadline, and the unexpected technical or resource bottleneck.',
      task: 'Define your exact responsibility and what success looked like.',
      action: 'Detail the concrete, proactive steps you took (debugging, stakeholder communication, alternative architectures).',
      result: 'Quantify the outcome (e.g., delivered on time, reduced latency by 35%, zero customer downtime).'
    },
    sampleModelAnswer: {
      s: 'During our final semester capstone project—an e-commerce microservices application—our payment webhook listener began dropping requests under 500 concurrent connections 48 hours before the college presentation.',
      t: 'As the backend lead, I had to ensure zero transaction loss and stabilize the processing throughput under peak load.',
      a: 'I profiled memory consumption using Go pprof, discovered an unbuffered database connection leak, implemented a Redis pub/sub message queue to buffer incoming webhooks, and added rate-limiting with exponential backoff.',
      r: 'Throughput jumped from 45 req/sec to 1,200 req/sec with 0% dropped transactions, and our team scored an A+ grade.'
    },
    commonTraps: 'Avoid saying "We did this" throughout without clarifying your individual contributions.'
  },
  {
    id: 'star-2',
    category: 'Conflict Management',
    question: 'Describe a situation where you had a strong disagreement with a teammate on a technical decision.',
    idealFramework: {
      situation: 'Explain the technical disagreement (e.g., SQL vs NoSQL, React vs Vue).',
      task: 'Show your goal was project success, not personal ego.',
      action: 'Explain how you objectively benchmarked both options with data and had a respectful discussion.',
      result: 'Both agreed on the data-backed choice; delivered cohesive teamwork.'
    },
    sampleModelAnswer: {
      s: 'During a hackathon, my teammate wanted to use MongoDB for a financial ledger project, while I recommended PostgreSQL.',
      t: 'We needed a decision within 2 hours to start implementation without creating team friction.',
      a: 'Instead of debating hypothetically, I wrote a quick benchmark script testing concurrent balance transfers and showed that ACID transactions and foreign key constraints in Postgres prevented duplicate debit errors natively.',
      r: 'My teammate agreed immediately after seeing the benchmark, and our financial ledger passed all judge stress tests with zero data anomalies.'
    },
    commonTraps: 'Never paint your teammate as incompetent or stubborn.'
  },
  {
    id: 'star-3',
    category: 'HR Classic',
    question: 'Why should we hire you over other candidates from your college?',
    idealFramework: {
      situation: 'Acknowledge the strong peer pool respectfully.',
      task: 'Highlight your unique intersection of core fundamentals and rapid execution.',
      action: 'Point to practical problem solving, consistency in DSA/Aptitude, and adaptability.',
      result: 'Commitment to reducing onboarding ramp-up time.'
    },
    sampleModelAnswer: {
      s: 'Our batch has many talented coders, but what distinguishes my profile is my disciplined consistency and end-to-end engineering mindset.',
      t: 'My objective from day one is to contribute production-ready code with minimal hand-holding.',
      a: 'I have solved 350+ DSA problems focusing on code cleanliness, maintained an active GitHub portfolio of deployed full-stack apps, and contributed to open-source issue resolutions.',
      r: 'This practical foundation means I can ramp up quickly on your tech stack and start delivering value in your upcoming sprint cycles.'
    },
    commonTraps: 'Do not recite your resume; focus on value delivery to the employer.'
  }
];

export const TECHNICAL_INTERVIEW_BANK = [
  {
    id: 'tech-1',
    role: 'SDE (Software Development Engineer)',
    topic: 'System Design Basics',
    question: 'How does Horizontal Scaling differ from Vertical Scaling, and what challenges arise with Horizontal Scaling?',
    answer: 'Vertical scaling (scale up) adds more RAM/CPU to an existing server, which has hardware ceilings and is a single point of failure. Horizontal scaling (scale out) adds more machines behind a Load Balancer. Key challenges of horizontal scaling include: session management/sticky sessions, distributed caching consistency, database replication lag, and distributed transactions (CAP theorem).'
  },
  {
    id: 'tech-2',
    role: 'SDE / Backend',
    topic: 'Database & Concurrency',
    question: 'Explain Optimistic vs Pessimistic Locking with an example.',
    answer: 'Pessimistic locking locks the database record upfront using "SELECT ... FOR UPDATE" until transaction completes, preventing others from reading/writing. Useful when high collision is expected. Optimistic locking does not lock the record; instead, it uses a version column (or timestamp). During UPDATE, it verifies WHERE version = original_version. If someone updated it first, the transaction rolls back and retries.'
  },
  {
    id: 'tech-3',
    role: 'Data Analyst / BI',
    topic: 'SQL & Analytics',
    question: 'What is the exact operational difference between RANK() and DENSE_RANK() in SQL window functions?',
    answer: 'When there is a tie between values: RANK() assigns the same rank to ties and skips subsequent ranks (e.g., 1, 2, 2, 4). DENSE_RANK() assigns the same rank to ties but does NOT skip numbers (e.g., 1, 2, 2, 3).'
  }
];
