// Comprehensive Placement Hub data: DSA Sheets, Company Patterns, Core CS Cheatsheets

export const DSA_SHEET = [
  {
    id: 'dsa-1',
    category: 'Arrays & Two Pointers',
    title: 'Two Sum (Sorted & Unsorted)',
    difficulty: 'Easy',
    pattern: 'Hash Map / Two Pointers',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Find two indices whose values sum to target. Use HashMap for unsorted array or 2 pointers for sorted array.',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    companies: ['Amazon', 'Google', 'TCS Prime', 'Adobe'],
    pythonSnippet: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    cppSnippet: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for(int i = 0; i < nums.size(); ++i) {
        int comp = target - nums[i];
        if(mp.count(comp)) return {mp[comp], i};
        mp[nums[i]] = i;
    }
    return {};
}`
  },
  {
    id: 'dsa-2',
    category: 'Arrays & Two Pointers',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    pattern: 'Single Pass / Min So Far',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Track the minimum price seen so far and calculate maximum profit achievable on any day.',
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    companies: ['Amazon', 'Microsoft', 'Cognizant', 'Flipkart'],
    pythonSnippet: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
    cppSnippet: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, maxProfit = 0;
    for(int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`
  },
  {
    id: 'dsa-3',
    category: 'Sliding Window',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    pattern: 'Variable Size Sliding Window',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(M, N))',
    description: 'Maintain a window of unique characters using a hash map or frequency array of character indices.',
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    companies: ['Amazon', 'Adobe', 'Paytm', 'Infosys SP'],
    pythonSnippet: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
    cppSnippet: `int lengthOfLongestSubstring(string s) {
    vector<int> charIdx(256, -1);
    int maxLen = 0, left = 0;
    for(int right = 0; right < s.length(); ++right) {
        if(charIdx[s[right]] >= left)
            left = charIdx[s[right]] + 1;
        charIdx[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`
  },
  {
    id: 'dsa-4',
    category: 'Linked List',
    title: 'Reverse a Linked List',
    difficulty: 'Easy',
    pattern: 'Three Pointers (prev, curr, next)',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Iteratively reverse next pointers using prev, current, and next pointers.',
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    companies: ['TCS Digital', 'Microsoft', 'Qualcomm', 'Wipro Turbo'],
    pythonSnippet: `def reverseList(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    cppSnippet: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while(curr) {
        ListNode *nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}`
  },
  {
    id: 'dsa-5',
    category: 'Trees & BST',
    title: 'Lowest Common Ancestor in Binary Tree',
    difficulty: 'Medium',
    pattern: 'Recursive Post-Order Traversal',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description: 'If root matches p or q, return root. Recursively search left & right. If both return non-null, root is LCA.',
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
    companies: ['Amazon', 'Google', 'Samsung', 'Uber'],
    pythonSnippet: `def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root
    return left if left else right`,
    cppSnippet: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if(!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if(left && right) return root;
    return left ? left : right;
}`
  },
  {
    id: 'dsa-6',
    category: 'Dynamic Programming',
    title: '0/1 Knapsack Problem',
    difficulty: 'Medium',
    pattern: 'Include / Exclude Choice Matrix',
    timeComplexity: 'O(N \\times W)',
    spaceComplexity: 'O(W)',
    description: 'Maximize profit with weight limit. Space can be optimized to a 1D array traversed backwards.',
    companies: ['Goldman Sachs', 'Oracle', 'TCS Prime', 'Atlassian'],
    pythonSnippet: `def knapsack(W, weights, values, n):
    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])
    return dp[W]`,
    cppSnippet: `int knapSack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for(int i = 0; i < n; i++) {
        for(int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`
  }
];

export const COMPANY_PROFILES = [
  {
    id: 'amazon',
    name: 'Amazon',
    tier: 'Product (Tier-1)',
    avgPackage: '₹28 - 45 LPA',
    rounds: [
      { name: 'OA (HackerRank)', details: '2 DSA problems (Medium-Hard) + Work Styles Assessment (14 Leadership Principles)' },
      { name: 'Technical Round 1', details: 'DSA (Trees/Graphs/DP) + Complexity analysis' },
      { name: 'Technical Round 2', details: 'DSA + LLD (Class design, OOP principles)' },
      { name: 'Bar Raiser', details: 'Deep dive into 14 Leadership Principles using STAR method + System design' }
    ],
    topFocusAreas: ['Graphs & BFS/DFS', 'Dynamic Programming', 'Amazon Leadership Principles', 'OOP Class Design'],
    cutoffs: 'Min 7.0+ CGPA, No active backlogs'
  },
  {
    id: 'tcs',
    name: 'TCS (Ninja, Digital & Prime)',
    tier: 'Service & R&D',
    avgPackage: '₹3.36 LPA (Ninja) | ₹7 LPA (Digital) | ₹9-11 LPA (Prime)',
    rounds: [
      { name: 'TCS NQT Assessment', details: 'Numerical Ability (20 Qs) + Reasoning (20 Qs) + Verbal (25 Qs) + 2 Coding Qs' },
      { name: 'Technical Interview', details: 'Core CS (OOPs, SQL, OS, Project explanation, Basic DSA)' },
      { name: 'Managerial & HR', details: 'Relocation willingness, shifts, situational questions' }
    ],
    topFocusAreas: ['Time & Work, Percentages, PnC', 'SQL Joins & Group By', 'OOP 4 Pillars', 'Project Architecture'],
    cutoffs: 'Min 60% throughout (10th, 12th, B.Tech)'
  },
  {
    id: 'infosys',
    name: 'Infosys (SE, DSE & SP)',
    tier: 'Service & Specialist',
    avgPackage: '₹3.6 LPA (System Eng) | ₹6.5 LPA (DSE) | ₹9.5 LPA (Specialist Programmer)',
    rounds: [
      { name: 'Online Test (InfyTQ/HackWithInfy)', details: 'Pseudocode (5 Qs) + Puzzle Solving (4 Qs) + 3 Coding Problems (DSE/SP)' },
      { name: 'Technical Round', details: 'Coding implementation, SQL queries, debugging on screen' },
      { name: 'HR Round', details: 'Communication check, career goals' }
    ],
    topFocusAreas: ['Bit Manipulation & Strings', 'Greedy Algorithms', 'Database Normalization', 'Cryptic Puzzles'],
    cutoffs: 'Min 65% / 6.5 CGPA with max 1 backlog history'
  },
  {
    id: 'accenture',
    name: 'Accenture (ASE & FSE)',
    tier: 'Consulting & Tech',
    avgPackage: '₹4.5 LPA (ASE) | ₹6.5 LPA (FSE)',
    rounds: [
      { name: 'Cognitive & Technical Assessment', details: 'Cognitive (50 Qs) + Technical (40 Qs on Cloud/Network/MS Office/Security)' },
      { name: 'Coding Round', details: '2 problems (Arrays, Strings, Hash maps) - 45 mins' },
      { name: 'Communication Test', details: 'Automated test measuring pronunciation, fluency, vocabulary' },
      { name: 'Interview Round', details: 'Combined Tech + HR round' }
    ],
    topFocusAreas: ['String Manipulation', 'Basic Network Security', 'Pseudocode Tracing', 'English Fluency'],
    cutoffs: 'Min 65% / 6.5 CGPA'
  }
];

export const CORE_CS_TOPICS = [
  {
    subject: 'DBMS (Database Management Systems)',
    keyConcepts: [
      {
        title: 'ACID Properties',
        explanation: 'Atomicity (All or nothing), Consistency (Valid states only), Isolation (Concurrent transactions don\'t clash), Durability (Committed changes survive system crashes).',
        interviewQuestion: 'What is Isolation Level and what is Dirty Read?',
        answerSnippet: 'A dirty read occurs when a transaction reads data that has been modified by another running transaction that has not yet committed.'
      },
      {
        title: 'Indexing: B-Tree vs Hash Index',
        explanation: 'B-Trees allow range queries ($O(\\log N)$ lookup and interval scans). Hash indexes provide $O(1)$ point lookup but cannot do range searches.',
        interviewQuestion: 'Why are Primary Keys indexed automatically as Clustered Index?',
        answerSnippet: 'A clustered index physically sorts the actual table rows on disk based on the key, allowing fast sequential range lookups.'
      },
      {
        title: 'Top SQL Query Patterns',
        explanation: 'Finding Nth Highest Salary, Self Joins, GROUP BY with HAVING, Window functions (DENSE_RANK() vs RANK()).',
        interviewQuestion: 'Write SQL to find the 2nd highest salary from Employee table without LIMIT.',
        answerSnippet: 'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);'
      }
    ]
  },
  {
    subject: 'Operating Systems (OS)',
    keyConcepts: [
      {
        title: 'Process vs Thread',
        explanation: 'A process is an execution program with its own memory space (code, data, heap). A thread is a lightweight dispatch unit sharing the process\'s address space.',
        interviewQuestion: 'What is Context Switching overhead?',
        answerSnippet: 'Saving CPU register states, updating PCB/TCB, and invalidating TLB (Translation Lookaside Buffer) caches.'
      },
      {
        title: 'Deadlock Conditions (Coffman Conditions)',
        explanation: 'Deadlock requires 4 simultaneous conditions: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.',
        interviewQuestion: 'How does Banker\'s Algorithm prevent deadlock?',
        answerSnippet: 'It simulates resource allocation to verify if a Safe State sequence exists where all processes can finish without deadlock.'
      },
      {
        title: 'Virtual Memory & Paging',
        explanation: 'Mapping virtual addresses to physical frames via page tables. Page Fault occurs when page is not present in RAM, triggering disk fetch.',
        interviewQuestion: 'What is Thrashing?',
        answerSnippet: 'Thrashing occurs when the system spends more time swapping pages in/out of secondary storage than executing user instructions due to insufficient RAM.'
      }
    ]
  },
  {
    subject: 'Computer Networks (CN)',
    keyConcepts: [
      {
        title: 'TCP 3-Way Handshake vs UDP',
        explanation: 'TCP establishes connection via SYN $\\rightarrow$ SYN-ACK $\\rightarrow$ ACK. Connection-oriented, ordered, reliable. UDP is connectionless, low-latency, unordered.',
        interviewQuestion: 'What happens when you type google.com in browser?',
        answerSnippet: 'DNS resolution (Local cache -> Root -> TLD -> Authoritative) -> TCP Handshake (port 443) -> TLS/SSL handshake -> HTTP GET request -> Browser DOM rendering.'
      },
      {
        title: 'OSI 7-Layer Model & Protocols',
        explanation: 'Application (HTTP, DNS) -> Presentation (SSL) -> Session (RPC) -> Transport (TCP/UDP) -> Network (IP, ICMP) -> Data Link (Ethernet, MAC) -> Physical (Cables).',
        interviewQuestion: 'What is the difference between Router and Switch?',
        answerSnippet: 'A switch operates at Layer 2 (Data Link) using MAC addresses; a router operates at Layer 3 (Network) forwarding packets between IP subnets.'
      }
    ]
  }
];
