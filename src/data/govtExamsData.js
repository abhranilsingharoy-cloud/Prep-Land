// Official Government Exam details, syllabus guides, and verified PYQs

export const GOVT_EXAMS = [
  {
    id: 'ssc-cgl',
    name: 'SSC CGL (Combined Graduate Level)',
    conductingBody: 'Staff Selection Commission (SSC)',
    cadre: 'Group B & C Central Govt Posts (ASO, Excise Inspector, Income Tax, Auditor)',
    examStructure: [
      { tier: 'Tier 1 (Qualifying)', pattern: '100 Qs / 200 Marks / 60 Mins. 25 Qs each in Quant, Reasoning, English, General Awareness. -0.50 negative mark per wrong answer.' },
      { tier: 'Tier 2 (Deciding)', pattern: 'Paper 1: Math & Reasoning (60 Qs, 180 Marks), English & GA (70 Qs, 210 Marks), Computer Knowledge (15 Qs, qualifying), Data Entry Speed Test.' }
    ],
    verifiedCutoffTrends: [
      { year: '2023', general: '150.04 (Tier 1 normalized)', posts: 'All non-AAO/JSO' },
      { year: '2024', general: '153.25 (Expected normalized)', posts: 'Central Excise & ASO CSS' }
    ],
    pyqs: [
      {
        id: 'ssc-pyq-1',
        year: 'SSC CGL Tier-1 2023 Official',
        section: 'General Awareness (Polity)',
        question: 'Which Constitutional Amendment Act substituted the word "Armed Rebellion" for "Internal Disturbance" under Article 352 (National Emergency)?',
        options: ['44th Amendment Act, 1978', '42nd Amendment Act, 1976', '40th Amendment Act, 1975', '52nd Amendment Act, 1985'],
        correctIndex: 0,
        explanation: 'The 44th Constitutional Amendment Act, 1978 enacted by the Janata Party government replaced the phrase "internal disturbance" with "armed rebellion" to prevent misuse of Article 352 like during the 1975 Emergency.'
      },
      {
        id: 'ssc-pyq-2',
        year: 'SSC CGL Tier-1 2022 Official',
        section: 'Quantitative Aptitude',
        question: 'If x + (1/x) = 5, what is the value of x^3 + (1/x^3)?',
        options: ['110', '125', '140', '115'],
        correctIndex: 0,
        explanation: 'Using identity: x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x) = 5^3 - 3(5) = 125 - 15 = 110.'
      }
    ]
  },
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services Examination (CSE)',
    conductingBody: 'Union Public Service Commission',
    cadre: 'IAS, IPS, IFS, IRS, Central Services Group A',
    examStructure: [
      { tier: 'Prelims', pattern: 'GS Paper 1 (100 Qs, 200 Marks) + CSAT Paper 2 (80 Qs, 200 Marks, 33% qualifying threshold).' },
      { tier: 'Mains', pattern: '9 Descriptive Papers (Essay, GS 1-4, Optional 1 & 2, Compulsory Language papers) - 1750 marks.' },
      { tier: 'Personality Test', pattern: 'Interview board evaluation - 275 marks.' }
    ],
    verifiedCutoffTrends: [
      { year: '2023', general: '75.41 (GS Paper 1 out of 200)', posts: 'Prelims cutoff' },
      { year: '2022', general: '88.22', posts: 'Prelims cutoff' }
    ],
    pyqs: [
      {
        id: 'upsc-pyq-1',
        year: 'UPSC CSE Prelims 2023 Official',
        section: 'GS Paper 1 (Environment)',
        question: 'Consider the following statements regarding Indian squirrels:\n1. They build nests by making burrows in the ground.\n2. They store their food materials like nuts and seeds in the ground.\n3. They are omnivorous.\nHow many of the above statements are correct?',
        options: ['Only three', 'Only two', 'Only one', 'None'],
        correctIndex: 0,
        explanation: 'Three-striped palm squirrels build nests in trees or cavities, but ground squirrels burrow and cache nuts/seeds underground. Furthermore, squirrels are primarily herbivores but also feed on insects/eggs (omnivorous). The official answer key marked all three statements as correct depending on the species context.'
      }
    ]
  },
  {
    id: 'ibps-po',
    name: 'IBPS PO / SBI PO (Banking Probationary Officer)',
    conductingBody: 'Institute of Banking Personnel Selection / SBI',
    cadre: 'Scale-I Officer in Public Sector Banks',
    examStructure: [
      { tier: 'Prelims', pattern: '100 Qs / 100 Marks / 60 Mins (English 30, Quant 35, Reasoning 35 with 20 min sectional timing).' },
      { tier: 'Mains', pattern: 'Reasoning & Computer (45 Qs), Data Analysis & Interpretation (35 Qs), General & Banking Awareness (40 Qs), English (35 Qs) + Descriptive Test (Letter & Essay).' },
      { tier: 'Interview', pattern: 'Group Discussion & Personal Interview (100 Marks).' }
    ],
    verifiedCutoffTrends: [
      { year: '2023', general: '54.25 (IBPS PO Prelims)', posts: 'Shortlisting for Mains' }
    ],
    pyqs: [
      {
        id: 'bank-pyq-1',
        year: 'IBPS PO Mains 2023 Official',
        section: 'Banking & Financial Awareness',
        question: 'What is the primary objective of RBI\'s Domestic Systemically Important Banks (D-SIBs) framework?',
        options: ['To identify banks whose failure would cause significant disruption to the essential services they provide and systemic risk to the economy', 'To provide 100% deposit insurance coverage to all scheduled commercial banks', 'To exempt large public sector banks from Cash Reserve Ratio (CRR)', 'To set mandatory foreign portfolio investment caps'],
        correctIndex: 0,
        explanation: 'D-SIBs (classified as "Too Big To Fail") are subjected to higher regulatory supervision and additional common equity tier-1 capital requirements. In India, SBI, HDFC Bank, and ICICI Bank are designated D-SIBs.'
      }
    ]
  },
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC (Non-Technical Popular Categories)',
    conductingBody: 'Railway Recruitment Boards',
    cadre: 'Station Master, Goods Train Manager, Commercial Apprentice, Senior Clerk',
    examStructure: [
      { tier: 'CBT 1', pattern: '100 Qs / 90 Mins (GA 40, Math 30, Reasoning 30). Negative marking: 1/3rd mark.' },
      { tier: 'CBT 2', pattern: '120 Qs / 90 Mins (GA 50, Math 35, Reasoning 35).' },
      { tier: 'CBAT / Typing', pattern: 'Computer-based Aptitude Test for Station Master; Typing skill for Clerks.' }
    ],
    verifiedCutoffTrends: [
      { year: 'Pay Level 6', general: '74 - 82 (Normalized depending on RRB Zone)' }
    ],
    pyqs: [
      {
        id: 'rrb-pyq-1',
        year: 'RRB NTPC CBT-2 Official',
        section: 'General Science',
        question: 'Which tissue in plants is responsible for the transportation of synthesized organic food materials from leaves to other parts of the plant body?',
        options: ['Phloem', 'Xylem', 'Collenchyma', 'Sclerenchyma'],
        correctIndex: 0,
        explanation: 'Phloem conducts dissolved organic sugars and amino acids bi-directionally throughout the plant (translocation), while Xylem conducts water and inorganic minerals uni-directionally from roots.'
      }
    ]
  }
];

export const CURRENT_AFFAIRS_CAPSULES = [
  {
    category: 'Economy & RBI',
    headline: 'RBI Unified Lending Interface (ULI) Rollout',
    summary: 'Analogous to UPI for payments, ULI enables frictionless, consent-based digital data flow from state land records, satellite data, and credit bureaus to lenders for instant retail and MSME loans.',
    relevantFor: ['UPSC Mains GS-3', 'Banking Exams', 'SSC CGL']
  },
  {
    category: 'Science & Technology',
    headline: 'India AI Mission Approved Budget Allocation',
    summary: 'The Union Cabinet approved over ₹10,300 crore for IndiaAI Mission to procure 10,000+ GPUs compute capacity, seed indigenous foundational models, and build dataset platforms.',
    relevantFor: ['UPSC GS-3', 'Placement Tech Interviews', 'SSC General Awareness']
  },
  {
    category: 'National Schemes',
    headline: 'PM Surya Ghar: Muft Bijli Yojana',
    summary: 'Aims to provide up to 300 units of free electricity monthly to 1 crore households by installing rooftop solar panels with up to 60% central capital subsidies.',
    relevantFor: ['Govt Exams', 'Interview General Knowledge']
  }
];
