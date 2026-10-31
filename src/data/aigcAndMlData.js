// Comprehensive Knowledge Base distilled from:
// 1. https://github.com/WeThinkIn/AIGC-Interview-Book (AIGC, Diffusion, PEFT, Alignment, Inference Acceleration)
// 2. https://github.com/BoltzmannEntropy/interviews.ai (ML/DL Foundations, Optimizers, ML System Design, Ensembles)

export const AIGC_MODULES = [
  {
    id: 'diffusion-multimodal',
    title: 'Diffusion Models & Multimodal AIGC',
    category: 'AIGC Architecture',
    badge: 'Vision & Multimodal',
    summary: 'DDPM, DDIM, Classifier-Free Guidance (CFG), Stable Diffusion VAE/UNet, DiT, and CLIP.',
    formula: '\\mathbf{\\epsilon}_\\theta(x_t, c) = \\mathbf{\\epsilon}_\\theta(x_t, \\emptyset) + s \\cdot (\\mathbf{\\epsilon}_\\theta(x_t, c) - \\mathbf{\\epsilon}_\\theta(x_t, \\emptyset))',
    keyTakeaway: 'Classifier-Free Guidance (CFG) blends conditional and unconditional noise predictions with guidance scale s > 1, boosting prompt fidelity and sharpness at the expense of sample diversity.',
    details: [
      {
        sub: 'DDPM vs DDIM',
        text: 'DDPM formulates a forward Markovian process adding Gaussian noise step-by-step and trains a UNet to predict noise ε. DDIM introduces a non-Markovian forward process with identical marginal distributions, enabling deterministic sampling in 20-50 steps instead of 1000.'
      },
      {
        sub: 'Latent Diffusion Models (LDM / Stable Diffusion)',
        text: 'Instead of denoising directly in high-dimensional pixel space (512x512x3 = 786,432 dims), LDM uses a pre-trained VAE encoder to compress images 8x into latent space (64x64x4 = 16,384 dims), reducing computational cost by 48x while preserving visual semantics.'
      },
      {
        sub: 'Diffusion Transformers (DiT / Sora Architecture)',
        text: 'Replaces the traditional convolutional UNet backbone with a Vision Transformer operating on latent image/video patches. Uses Adaptive LayerNorm (AdaLN-Zero) to inject diffusion timestep t and text conditioning vectors directly into transformer residual blocks.'
      },
      {
        sub: 'CLIP (Contrastive Language-Image Pretraining)',
        text: 'Trains image and text encoders simultaneously using an InfoNCE symmetric cross-entropy loss over a batch of (Image, Text) pairs. The cosine similarity of matching pairs is maximized while non-matching pairs are minimized.'
      }
    ],
    viva: {
      q: 'Why does Stable Diffusion operate in Latent Space instead of Pixel Space, and what role does the VAE play?',
      ans: 'Pixel space contains high-frequency perceptual noise that is imperceptible to humans but computationally expensive to process. The VAE encoder compresses the image 8x spatially into a lower-dimensional latent manifold, discarding high-frequency imperceptible details. The diffusion denoising model (UNet/DiT) trains solely in this compact semantic space, speeding up training and inference by ~50x. The VAE decoder then reconstructs the final pixel image.'
    }
  },
  {
    id: 'peft-finetuning',
    title: 'PEFT: Parameter-Efficient Fine-Tuning',
    category: 'Fine-Tuning & Adaptation',
    badge: 'LLMOps & Training',
    summary: 'LoRA, QLoRA, AdaLoRA, Prefix Tuning, and P-Tuning v2.',
    formula: 'W = W_0 + \\Delta W = W_0 + \\frac{\\alpha}{r} (B \\cdot A), \\quad B \\in \\mathbb{R}^{d \\times r}, A \\in \\mathbb{R}^{r \\times k}',
    keyTakeaway: 'LoRA freezes base weights W_0 and injects trainable rank-decomposition matrices A and B (r << min(d, k)). This reduces trainable parameters by up to 99.9% and eliminates GPU memory overhead for optimizer states.',
    details: [
      {
        sub: 'Weight Matrix Initialization',
        text: 'In LoRA, matrix A is initialized with random Gaussian noise N(0, σ²), while matrix B is initialized to exact zeros. This guarantees ΔW = 0 at step 0, ensuring model behavior begins identically to the pre-trained base model.'
      },
      {
        sub: 'QLoRA Innovations (Dettmers et al.)',
        text: '1. 4-bit NormalFloat (NF4): Information-theoretically optimal quantile quantization for normally distributed weights. 2. Double Quantization (DQ): Quantizes the quantization constants, saving 0.37 bits/param. 3. Paged Optimizers: Uses CUDA unified memory to page memory spikes to CPU RAM during long sequence training.'
      },
      {
        sub: 'Prefix Tuning vs P-Tuning v2 vs LoRA',
        text: 'Prefix Tuning and P-Tuning v2 prepend virtual continuous prompt vectors to the Keys and Values of every transformer attention layer. LoRA modifies the feed-forward and projection weight updates directly. LoRA is generally preferred because it incurs zero inference latency penalty (adapters can be mathematically merged into W_0: W = W_0 + (α/r)BA).'
      }
    ],
    viva: {
      q: 'How does QLoRA achieve 16-bit fine-tuning performance on a single 24GB GPU, and why is NF4 better than INT4?',
      ans: 'Pre-trained neural network weights follow a zero-mean normal distribution N(0, σ²). Standard INT4 uses equidistant bins, which wastes precision in the tails and clusters too few bins where 95% of weights reside. NF4 constructs non-uniform bins where each quantile has an equal probability under standard normal distribution, maximizing entropy and minimizing information loss. Coupled with Double Quantization and 16-bit LoRA adapters, QLoRA enables 65B/70B parameter models to be fine-tuned on consumer GPUs.'
    }
  },
  {
    id: 'alignment-rlhf',
    title: 'Alignment: RLHF, DPO, KTO & SimPO',
    category: 'Model Alignment',
    badge: 'Post-Training',
    summary: 'Reward Modeling, PPO Actor-Critic, Direct Preference Optimization, and Reference-Free SimPO.',
    formula: '\\mathcal{L}_{\\text{DPO}}(\\theta) = -\\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)} \\right) \\right]',
    keyTakeaway: 'DPO eliminates the unstable reward-model training and reinforcement learning PPO loop by using an analytical change of variables to optimize policy directly on pairwise chosen/rejected data.',
    details: [
      {
        sub: 'PPO in Classical RLHF',
        text: 'Requires running 4 models concurrently in GPU memory: Actor (trained model), Critic (value function baseline), Reference Model (frozen base model for KL penalty calculation), and Reward Model (evaluates answer quality). Highly sensitive to hyperparameter tuning and prone to reward hacking.'
      },
      {
        sub: 'DPO (Direct Preference Optimization)',
        text: 'Proves mathematically that the ground-truth reward can be expressed in terms of the optimal policy: r(x,y) = β log(π_θ(y|x) / π_ref(y|x)). Maximizing the Bradley-Terry preference model directly yields a clean binary cross-entropy loss function over preference pairs.'
      },
      {
        sub: 'KTO (Kahneman-Tversky Optimization)',
        text: 'Unlike DPO which strictly requires paired preferences (chosen vs rejected), KTO aligns models using unpaired binary feedback (thumbs up / thumbs down) inspired by Prospect Theory, maximizing utility for loss aversion.'
      },
      {
        sub: 'SimPO (Simple Preference Optimization)',
        text: 'Removes the need for a reference model π_ref entirely. Computes average log probability normalized by sequence length, and enforces a target margin γ between chosen and rejected responses, cutting GPU memory by 50%.'
      }
    ],
    viva: {
      q: 'What is "Length Bias" in DPO and how does SimPO or Length-Normalized DPO mitigate it?',
      ans: 'Standard DPO sums log probabilities across all tokens in a response. Longer responses naturally accumulate larger absolute differences, causing the model to learn that generating verbose, wordy answers yields higher reward, regardless of quality. SimPO and Length-Normalized DPO divide the log probability by the sequence length |y|, ensuring preference scores measure per-token confidence rather than raw token count.'
    }
  },
  {
    id: 'inference-acceleration',
    title: 'LLM Inference Engines & KV Cache Optimization',
    category: 'Inference & LLMOps',
    badge: 'High Throughput',
    summary: 'KV Cache math, PagedAttention (vLLM), MQA/GQA, Speculative Decoding, and Continuous Batching.',
    formula: '\\text{KV Cache Memory (Bytes)} = 2 \\times 2 \\times n_{\\text{layers}} \\times n_{\\text{kv\\_heads}} \\times d_{\\text{head}} \\times B \\times S',
    keyTakeaway: 'At serving time, LLMs are memory-bandwidth bound during the autoregressive token-generation phase. PagedAttention eliminates internal and external memory fragmentation, raising serving throughput by 2x to 4x.',
    details: [
      {
        sub: 'KV Cache Bottleneck',
        text: 'During decoding, previously computed Key and Value vectors are cached in GPU VRAM so attention is not recalculated from scratch. For a 70B model with 128k context and batch size 16, KV Cache can exceed 100 GB of VRAM, dwarfing model weights.'
      },
      {
        sub: 'PagedAttention (vLLM)',
        text: 'Inspired by virtual memory paging in operating systems. Instead of pre-allocating contiguous memory chunks for maximum sequence length (which causes 60-80% memory waste), PagedAttention partitions KV Cache into fixed-size virtual blocks that map to non-contiguous physical GPU blocks.'
      },
      {
        sub: 'Grouped-Query Attention (GQA) vs MQA',
        text: 'Multi-Head Attention (MHA) has 1 KV head per Query head. Multi-Query Attention (MQA) shares 1 KV head across all Query heads. GQA (e.g. LLaMA 3, Mistral) groups Query heads (e.g. 8 Q heads per 1 KV head), preserving model reasoning capacity while slashing memory bandwidth bottlenecks by 8x.'
      },
      {
        sub: 'Speculative Decoding',
        text: 'A lightweight draft model (e.g. 1B) rapidly guesses K candidate tokens autoregressively. The massive target model (e.g. 70B) validates all K tokens in parallel during a single forward pass, achieving 2x to 3x wall-clock speedup without any change in output distribution.'
      }
    ],
    viva: {
      q: 'Why are LLMs memory-bandwidth bound during token generation, and compute-bound during prefill (prompt processing)?',
      ans: 'During prefill, the model processes the entire prompt of N tokens in parallel: performing Matrix-Matrix multiplications (GEMM) with arithmetic intensity O(N), which fully saturates the GPU Tensor Cores. During autoregressive decoding, the model generates 1 token at a time: performing Matrix-Vector multiplications (GEMV) where all model parameters and KV caches must be loaded from slow GPU High Bandwidth Memory (HBM) into fast SRAM for just 1 token, resulting in low arithmetic intensity (memory-bandwidth bound).'
    }
  }
];

export const ML_SYSTEM_DESIGNS = [
  {
    id: 'recommendation-system',
    title: 'Two-Tower E-Commerce & Video Recommendation System',
    company: 'YouTube / Amazon / Instagram Scale',
    scale: '100M+ Items • 1B+ Daily Users • <40ms p99 SLA',
    stages: [
      {
        name: '1. Candidate Generation (Retrieval)',
        engine: 'Two-Tower DSSM (User Tower + Item Tower)',
        sla: '10ms',
        input: '100 Million global items',
        output: 'Top 1,000 candidate items',
        details: 'User features (history, demographic, time) encode into vector U. Item features encode into vector V. Approximate Nearest Neighbor (ANN) search via HNSW or ScaNN finds top dot-product matches.'
      },
      {
        name: '2. Heavy Scoring & Ranking',
        engine: 'DLRM / DeepFM / Multi-Gate Mixture of Experts (MMoE)',
        sla: '20ms',
        input: '1,000 retrieved items',
        output: 'Top 100 scored items',
        details: 'Computes multi-task predictions: pCTR (probability of click) and pWatchTime / pPurchase. Combines sparse categorical features with dense numerical features via explicit feature cross layers.'
      },
      {
        name: '3. Re-ranking & Diversity',
        engine: 'Maximal Marginal Relevance (MMR) + Exploration Bandits',
        sla: '5ms',
        input: '100 scored items',
        output: 'Final 20 recommendations',
        details: 'Balances relevance with diversity: Argmax [ λ * Sim(Item, User) - (1-λ) * MaxSim(Item, AlreadySelected) ]. Injects fresh cold-start items using Thompson Sampling multi-armed bandits.'
      },
      {
        name: '4. Business Rules & Deduplication',
        engine: 'Redis Filter & Policy Engine',
        sla: '2ms',
        input: '20 diversified items',
        output: 'Display Feed to User',
        details: 'Filters out already viewed items (Bloom filters in Redis), enforces frequency capping (no more than 2 ads per session), and verifies age/regional content compliance.'
      }
    ],
    architectureHighlights: [
      'Offline Pipeline: Spark batch jobs compute user historical embeddings nightly; Item embeddings updated on publish.',
      'Online Pipeline: Real-time user click events streamed through Kafka + Flink to update User State in Redis within 2 seconds.',
      'Training Objective: Sampled Softmax Loss with in-batch negatives and log-frequency correction to avoid popularity bias.'
    ],
    viva: {
      q: 'How do you handle the "Popularity Bias" and "Cold-Start Problem" in Two-Tower Recommendation Systems?',
      ans: 'Popularity bias is addressed during training by applying logQ correction: subtracting log(P_i) from item logits before softmax, penalizing head items so niche items can compete fairly. Cold-start is mitigated by: 1) Using content features (category, brand, description embeddings via CLIP/BERT) instead of relying solely on Item ID embeddings, and 2) Using Upper Confidence Bound (UCB) or Thompson Sampling in the re-ranking layer to allocate 5-10% of user feed impressions for exploring new items.'
    }
  },
  {
    id: 'realtime-fraud-detection',
    title: 'Real-Time Financial Fraud & Anomaly Stream Pipeline',
    company: 'Stripe / PayPal / Banking Scale',
    scale: '15,000 TPS • <50ms Authorization SLA • $10M+ Saved Daily',
    stages: [
      {
        name: '1. Ingestion & Event Timestamping',
        engine: 'Apache Kafka Multi-AZ Cluster',
        sla: '5ms',
        input: 'Raw payment transaction payload',
        output: 'Validated streaming event',
        details: 'Enforces schema validation (Protobuf) and attaches monotonic event timestamps for strict event-time processing.'
      },
      {
        name: '2. Stateful Streaming Feature Extraction',
        engine: 'Apache Flink Stateful Stream Processing',
        sla: '15ms',
        input: 'Transaction event stream',
        output: 'Real-time velocity features',
        details: 'Maintains RocksDB state backend for rolling time windows: number of transactions in last 5m, 1h, 24h; IP distance velocity (e.g. New York to Tokyo within 20 minutes).'
      },
      {
        name: '3. Real-Time Feature Store Lookup',
        engine: 'Feast + Redis Cluster (<1ms lookup)',
        sla: '5ms',
        input: 'Cardholder ID & Merchant ID',
        output: 'Enriched 250-dimensional feature vector',
        details: 'Joins streaming velocity features with pre-computed offline features: 90-day chargeback history, device fingerprint trust score, merchant category risk index.'
      },
      {
        name: '4. Low-Latency Model Inference',
        engine: 'LightGBM C++ / ONNX Runtime + Graph Neural Network',
        sla: '15ms',
        input: 'Enriched feature vector',
        output: 'Fraud Risk Score [0.00 to 1.00]',
        details: 'LightGBM model evaluates tree ensembles in single-digit milliseconds. GNN embeddings identify card sharing rings and coordinated fraud syndicates.'
      }
    ],
    architectureHighlights: [
      'Extreme Class Imbalance Handling: Fraud occurs in <0.1% of transactions. Trained using Focal Loss or cost-sensitive matrix weighting false negatives 100x higher than false positives.',
      'Concept Drift Monitoring: Automated Population Stability Index (PSI) calculation every hour on prediction score distributions; alerts if PSI > 0.25.',
      'Fallback Circuit Breaker: If Flink or Redis times out (>35ms), execution falls back to strict rule-based heuristic checks so payment authorizations are never blocked indefinitely.'
    ],
    viva: {
      q: 'Why choose LightGBM/XGBoost over Deep Learning for production financial fraud detection?',
      ans: 'Tabular financial data contains heterogeneous numerical features, high-cardinality categorical IDs, and missing values. GBDT models natively handle missing values, are invariant to monotonic feature scaling, offer superior sample efficiency on extreme class imbalances, and run inference in <2ms on inexpensive CPU servers without requiring GPU infrastructure. Deep Learning is reserved for specialized sub-signals like graph embeddings (GNN) and transaction sequence modeling.'
    }
  },
  {
    id: 'search-and-rerank',
    title: 'Enterprise Semantic Search & Multimodal Hybrid Retrieval',
    company: 'Enterprise Google / Pinecone / Elastic Scale',
    scale: '50M Documents • Hybrid Dense + Sparse • <60ms Latency',
    stages: [
      {
        name: '1. Query Understanding & Expansion',
        engine: 'Lightweight Transformer Tokenizer & Entity Parser',
        sla: '8ms',
        input: 'User search query text',
        output: 'Keywords, Synonyms, Dense Query Vector',
        details: 'Identifies legal/product entities, removes stop words for sparse search, and generates a 768-dim normalized dense vector via BGE/ModernBERT.'
      },
      {
        name: '2. Dual-Path Hybrid Retrieval',
        engine: 'Elasticsearch (BM25) + Qdrant/Milvus (HNSW Vector Index)',
        sla: '25ms',
        input: 'Dense Vector & Sparse Keywords',
        output: 'Top 100 BM25 + Top 100 Dense Chunks',
        details: 'BM25 guarantees exact keyword recall (SKUs, IDs, error codes). Dense vector search captures semantic synonymy and conceptual intent.'
      },
      {
        name: '3. Reciprocal Rank Fusion (RRF)',
        engine: 'Deterministic Ranking Merger',
        sla: '2ms',
        input: '200 candidate documents',
        output: 'Top 50 deduplicated candidates',
        details: 'Formula: RRF_Score(d) = Σ [ 1 / (60 + Rank_dense(d)) + 1 / (60 + Rank_sparse(d)) ]. Normalizes non-comparable BM25 and cosine distance scores.'
      },
      {
        name: '4. Cross-Encoder Transformer Reranking',
        engine: 'BGE-Reranker-Large / Cohere Rerank',
        sla: '20ms',
        input: 'Top 50 candidate passages + Query',
        output: 'Top 5 finalized documents with citations',
        details: 'Unlike bi-encoders which encode Query and Doc independently, Cross-Encoder performs joint multi-head self-attention across [Query, Document] tokens, evaluating exact factual alignment.'
      }
    ],
    architectureHighlights: [
      'Bi-Encoder vs Cross-Encoder Tradeoff: Bi-encoders are fast (millions of pre-computed offline vectors) but miss subtle interactions. Cross-encoders are accurate but slow O(N) at runtime; using them as a second-stage reranker gives the best of both worlds.',
      'Context Preservation: Uses Small-to-Big Parent Document retrieval: searches 128-token chunks for precision, returns 1024-token parent documents to the reader model.'
    ],
    viva: {
      q: 'Why can we not just rely solely on Dense Vector Search for enterprise search systems?',
      ans: 'Dense embeddings compress long texts into fixed-dimension vectors, often losing specific low-frequency tokens like exact serial numbers, product SKUs, legal article references, and rare acronyms. Furthermore, out-of-domain queries cause dense embeddings to retrieve hallucinatory "conceptually similar" texts. Hybrid search pairing BM25 keyword matching with Dense Vector search via Reciprocal Rank Fusion (RRF) provides fault tolerance and industry-grade precision.'
    }
  }
];

export const ML_DL_FOUNDATIONS = [
  {
    topic: 'Optimizers: SGD, Adam & AdamW Decoupled Weight Decay',
    formula: '\\theta_t = \\theta_{t-1} - \\eta \\lambda \\theta_{t-1} - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t',
    takeaway: 'Standard Adam combines L2 regularization into the gradient g_t, which causes parameters with large historical gradients to experience less regularization. AdamW decouples weight decay (λθ), scaling weight shrinkage independently of adaptive gradient moments.',
    breakdown: [
      'First Moment (m_t): Exponential moving average of gradients (momentum): m_t = β1 * m_{t-1} + (1-β1) * g_t.',
      'Second Moment (v_t): Exponential moving average of squared gradients (variance): v_t = β2 * v_{t-1} + (1-β2) * g_t².',
      'Bias Correction: Divides by (1 - β^t) to correct for zero-initialization bias in early iterations.'
    ],
    vivaQ: 'Why did AdamW replace Adam for training large Transformers (LLaMA, GPT-4, BERT)?',
    vivaAns: 'In standard Adam with L2 regularization, the penalty term is added to the gradient g_t before computing v_t. As a result, the effective weight decay rate is proportional to 1/√v_t: weights with frequent large gradients are penalized less, while weights with sparse small gradients are penalized more. AdamW decouples the weight decay step directly from the gradient moments, restoring true L2 weight shrinkage and drastically improving Transformer generalization.'
  },
  {
    topic: 'Normalization: BatchNorm vs LayerNorm vs RMSNorm',
    formula: '\\text{RMSNorm}(a) = \\frac{a}{\\sqrt{\\frac{1}{d} \\sum_{i=1}^d a_i^2 + \\epsilon}} \\odot g',
    takeaway: 'RMSNorm modifies LayerNorm by assuming zero mean and normalizing solely by Root Mean Square. This eliminates two passes over the hidden dimension and mean subtraction, speeding up Transformer training by 10% to 50% without degrading stability.',
    breakdown: [
      'BatchNorm: Normalizes across the batch dimension. Fails when batch size is small (<16) or with variable sequence lengths in NLP.',
      'LayerNorm: Normalizes across the feature dimension for each token independently. Used in original GPT and BERT.',
      'Pre-LN vs Post-LN: Modern LLMs use Pre-LayerNorm (normalizing inputs to sub-layers instead of outputs) to maintain an uninhibited residual stream, preventing vanishing/exploding gradients in deep models (e.g. 80+ layers).'
    ],
    vivaQ: 'Why is Pre-LN preferred over Post-LN in modern deep Transformer architectures?',
    vivaAns: 'In Post-LN (used in the original 2017 "Attention is All You Need" paper), LayerNorm is applied to the output of each residual block: x_{l+1} = LN(x_l + SubLayer(x_l)). In deep networks, the gradient of the residual connection is multiplied by LayerNorm scaling factors at every layer, leading to vanishing or exploding gradients near the input layers requiring delicate learning rate warmups. Pre-LN applies normalization before the sublayer: x_{l+1} = x_l + SubLayer(LN(x_l)), keeping the main residual highway x_{l+1} = x_l + ... completely unobstructed.'
  },
  {
    topic: 'Ensemble Learning: GBDT, XGBoost & LightGBM',
    formula: '\\mathcal{L}^{(t)} \\approx \\sum_{i=1}^n \\left[ g_i f_t(x_i) + \\frac{1}{2} h_i f_t^2(x_i) \\right] + \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2',
    takeaway: 'XGBoost uses a second-order Taylor expansion (first derivative g_i, second derivative h_i) of the loss function, enabling fast closed-form optimal leaf weights and split scores while incorporating L1 and L2 regularization directly on leaf weights.',
    breakdown: [
      'Bagging (Random Forest): Trains independent trees in parallel on bootstrap samples; averages predictions to reduce Variance.',
      'Boosting (GBDT): Trains trees sequentially; each tree fits the negative gradient (residual errors) of the preceding ensemble to reduce Bias.',
      'LightGBM Optimization: GOSS (Gradient-based One-Side Sampling) keeps instances with large gradients and subsamples small gradients; EFB (Exclusive Feature Bundling) bundles mutually exclusive sparse features.'
    ],
    vivaQ: 'What is the mathematical difference between Random Forest and Gradient Boosted Decision Trees (GBDT)?',
    vivaAns: 'Random Forest uses Bagging (Bootstrap Aggregation): it trains multiple deep, low-bias decision trees independently in parallel on random sub-samples and random feature subsets, and averages their predictions to reduce variance (error = bias² + variance). GBDT uses Boosting: it trains shallow, high-bias decision trees sequentially, where each new tree fits the residual pseudo-errors (negative gradients) of the accumulated ensemble, optimizing the objective via gradient descent in function space to systematically reduce bias.'
  },
  {
    topic: 'Concept Drift & Population Stability Index (PSI)',
    formula: '\\text{PSI} = \\sum_{i=1}^k (A_i - E_i) \\times \\ln\\left(\\frac{A_i}{E_i}\\right)',
    takeaway: 'PSI quantifies the shift between a baseline reference distribution (E_i) and a production test distribution (A_i) across k bins. PSI < 0.1 indicates stability; 0.1 <= PSI < 0.25 indicates moderate shift; PSI >= 0.25 signals severe concept drift requiring immediate model retraining.',
    breakdown: [
      'Data Drift (Covariate Shift): Input distribution P(X) changes while P(Y|X) remains constant.',
      'Concept Drift: The underlying relationship P(Y|X) changes (e.g. consumer spending patterns change during inflation).',
      'Mitigation: Automated retrain triggers, online learning with rolling data windows, and shadow-mode canary deployments.'
    ],
    vivaQ: 'What is the difference between Data Drift and Concept Drift, and how do you test for both in production?',
    vivaAns: 'Data Drift (Covariate Shift) occurs when the input feature distribution P(X) shifts over time (e.g. users buying on newer smartphone models), but the relationship P(Y|X) stays the same; tested using Kolmogorov-Smirnov (KS) test for numerical features, Chi-square for categoricals, and PSI. Concept Drift occurs when the underlying ground truth relationship P(Y|X) shifts (e.g. fraud patterns evolve to circumvent rules); detected by tracking ground truth evaluation metrics (Precision, Recall, ROC-AUC) over time on verified labels or using sliding window error rate detectors (DDM/EDDM).'
  }
];

export const VIVA_MASTER_DECK = [
  {
    q: 'Why do Transformers divide the Query-Key dot product by √d_k in Scaled Dot-Product Attention?',
    ans: 'For large head dimensions d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradient problem). Dividing by √d_k normalizes the variance of the logits back to 1, ensuring stable backpropagation gradients.',
    tag: 'LLM Foundations',
    company: 'Google / Meta',
    level: 'Core'
  },
  {
    q: 'How does FlashAttention achieve 2x to 4x speedup without changing the mathematical output of attention?',
    ans: 'Standard attention computes N×N intermediate attention matrices (S and P) and repeatedly reads/writes them to slow GPU High Bandwidth Memory (HBM). FlashAttention tiles the Q, K, and V matrices into fast on-chip GPU SRAM and utilizes online softmax scaling to incrementally compute attention output in a single fused GPU kernel without ever materializing the large N×N matrix in HBM.',
    tag: 'GPU & Performance',
    company: 'OpenAI / Anthropic',
    level: 'Advanced'
  },
  {
    q: 'What is Rotary Position Embedding (RoPE) and why is it superior to Absolute Positional Encodings?',
    ans: 'RoPE applies an orthogonal rotation matrix to Query and Key vectors in complex 2D planes based on token position m. The inner product between rotated vectors <R_m q, R_n k> mathematically reduces to a function of their relative distance (m - n). This incorporates relative positional decay naturally and allows models to extrapolate to context lengths far longer than seen in training.',
    tag: 'LLM Architecture',
    company: 'Meta (LLaMA)',
    level: 'High Yield'
  },
  {
    q: 'What is the KV Cache and why does it cause high memory consumption during inference?',
    ans: 'During autoregressive generation, each newly generated token attends to all previous tokens. To avoid recalculating Key and Value representations of past tokens at each step, they are cached in GPU VRAM. Memory equals 2 * 2 * num_layers * num_heads * head_dim * batch_size * seq_len. For large contexts and batch sizes, this easily exceeds dozens of gigabytes.',
    tag: 'Inference & LLMOps',
    company: 'vLLM / Mistral',
    level: 'High Yield'
  },
  {
    q: 'Explain PagedAttention in vLLM and how it eliminates memory waste.',
    ans: 'Traditional serving engines allocate contiguous blocks of memory for the maximum possible sequence length for each request, causing 60-80% memory waste due to internal and external fragmentation. Inspired by OS virtual memory, PagedAttention partitions the KV cache into fixed-size physical blocks (e.g. 16 tokens per block) mapped via a virtual page table, allowing memory to be allocated dynamically on-demand with <4% waste.',
    tag: 'Inference Engines',
    company: 'Anyscale / AWS',
    level: 'Production'
  },
  {
    q: 'How does LoRA work and why are matrices A and B initialized differently?',
    ans: 'LoRA decomposes weight updates: ΔW = (α/r) * B * A, where B is d x r and A is r x k with rank r << min(d, k). Matrix A is initialized from Gaussian noise N(0, σ²) and B is initialized to exact zero. This ensures ΔW = 0 at the start of training, so the model begins in the exact state of the pre-trained weights without disruption.',
    tag: 'Fine-Tuning',
    company: 'Microsoft / HuggingFace',
    level: 'Core'
  },
  {
    q: 'What are the three core innovations of QLoRA?',
    ans: '1. 4-bit NormalFloat (NF4): optimal quantile quantization for normally distributed weights. 2. Double Quantization (DQ): quantizes the quantization scaling constants, saving 0.37 bits/param. 3. Paged Optimizers: leverages CUDA unified memory to page memory spikes to CPU RAM during activation spikes to prevent Out-Of-Memory (OOM) errors.',
    tag: 'Fine-Tuning',
    company: 'University of Washington',
    level: 'High Yield'
  },
  {
    q: 'What is Direct Preference Optimization (DPO) and how does it bypass PPO?',
    ans: 'PPO requires training a separate reward model and updating the policy via policy gradient RL with a critic network, which is unstable and memory-heavy. DPO mathematically demonstrates that the optimal reward function can be expressed in closed form in terms of the policy itself: r(x, y) = β log(π_θ(y|x) / π_ref(y|x)). Maximizing the Bradley-Terry preference model yields a simple binary cross-entropy loss over chosen/rejected pairs.',
    tag: 'Model Alignment',
    company: 'Stanford / Anthropic',
    level: 'Core'
  },
  {
    q: 'Why does Classifier-Free Guidance (CFG) improve image quality in Diffusion Models?',
    ans: 'CFG trains a single diffusion model with conditional inputs (text prompt) and unconditional inputs (null token ∅ randomly 10-20% of the time). At inference, noise is predicted as: ε_guided = ε_uncond + s * (ε_cond - ε_uncond). Scaling by s > 1 pushes the generated sample away from unconditioned regions and toward high-density regions aligned with the prompt, trading diversity for sharp fidelity.',
    tag: 'Diffusion & AIGC',
    company: 'Stability AI / Midjourney',
    level: 'High Yield'
  },
  {
    q: 'How does AdamW fix the flaw in standard Adam when using L2 regularization?',
    ans: 'In standard Adam with L2 regularization, the weight penalty λθ is added directly to the gradient vector g_t before computing the moving averages m_t and v_t. Because updates are scaled by 1/√v_t, weights with large gradients receive less shrinkage than weights with small gradients. AdamW decouples weight decay, applying λθ directly to the parameter update, ensuring consistent weight shrinkage across all parameters.',
    tag: 'ML Foundations',
    company: 'FastAI / DeepMind',
    level: 'Core'
  },
  {
    q: 'Explain the difference between Bi-Encoder and Cross-Encoder in search retrieval.',
    ans: 'A Bi-Encoder encodes the Query and the Document independently into vectors: Sim = cos(Embed(Q), Embed(D)). This allows document vectors to be indexed offline into HNSW for lightning-fast retrieval across millions of items. A Cross-Encoder feeds [Query, Document] together into a Transformer: tokens attend to each other across all layers, capturing subtle factual nuances, but takes O(N) inference time. Production systems use Bi-Encoders for initial retrieval (top 100) and Cross-Encoders for reranking (top 10).',
    tag: 'System Design',
    company: 'Google / Pinecone',
    level: 'High Yield'
  },
  {
    q: 'What is the Population Stability Index (PSI) and how is it used in production ML?',
    ans: 'PSI = Σ (Actual% - Expected%) * ln(Actual% / Expected%). It measures the divergence between a baseline reference distribution and a live inference distribution across score bins. PSI < 0.1 indicates no significant shift, 0.1 to 0.25 indicates moderate shift, and PSI > 0.25 flags severe concept or data drift, triggering automatic retraining alerts.',
    tag: 'MLOps & Monitoring',
    company: 'Fintech / Banking',
    level: 'Standard Viva'
  }
];
