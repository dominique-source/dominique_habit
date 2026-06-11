export const ZONES = {
  MOVEMENT: { id: 'movement', label: 'MOVEMENT ZONE', color: '#CCFF00', icon: 'run' },
  NUTRITION: { id: 'nutrition', label: 'NUTRITION ZONE', color: '#00E5FF', icon: 'salad' },
  RECOVERY:  { id: 'recovery',  label: 'RECOVERY ZONE',  color: '#7F77DD', icon: 'moon' },
  MINDSET:   { id: 'mindset',   label: 'MINDSET ZONE',   color: '#FFA502', icon: 'brain' },
  BOSS:      { id: 'boss',      label: 'BOSS CHALLENGE', color: '#FF4757', icon: 'skull' },
}

export const CHALLENGES = [
  // MOVEMENT
  {
    id: 'm1', zone: 'movement', xp: 150,
    title: 'SKY BRIDGE MARCH',
    mission: 'Walk 30–60 min today',
    flavor: 'The Sky Bridge district is locked. Only those who cover the distance will unlock its neon corridors.',
  },
  {
    id: 'm2', zone: 'movement', xp: 120,
    title: 'CHECKPOINT SCAN',
    mission: '10-min walk after each meal',
    flavor: 'Three city checkpoints await. Post-meal patrols stabilize your glucose grid. Move out, agent.',
  },
  {
    id: 'm3', zone: 'movement', xp: 140,
    title: 'EXO-SUIT POWER-UP',
    mission: 'Do squats, push-ups & lunges today',
    flavor: 'Your exo-suit is depleted. Bodyweight protocols recharge its power cells. Initiate the sequence.',
  },
  {
    id: 'm4', zone: 'movement', xp: 160,
    title: 'ARMOR FORGING',
    mission: '2–4 strength sessions this week',
    flavor: 'Metabolic armor is not bought — it is forged. Hit the training bay and forge your defenses.',
  },
  {
    id: 'm5', zone: 'movement', xp: 100,
    title: 'ENERGY CELL RECHARGE',
    mission: 'Stand up every 30 minutes',
    flavor: 'Sedentary mode drains your energy cells. Break the stillness. Move, recharge, repeat.',
  },

  // NUTRITION
  {
    id: 'n1', zone: 'nutrition', xp: 130,
    title: 'WATER SUPPLY PURGE',
    mission: 'Zero sugary drinks today',
    flavor: 'The city\'s water supply is contaminated with synthetic sugars. Your mission: keep it clean for 24 hrs.',
  },
  {
    id: 'n2', zone: 'nutrition', xp: 140,
    title: 'QUANTUM ENGINE FUEL',
    mission: 'Eat protein + fiber first at each meal',
    flavor: 'Your quantum engine runs on the right fuel sequence. Protein and fiber first — always. No exceptions.',
  },
  {
    id: 'n3', zone: 'nutrition', xp: 130,
    title: 'ZONE DECONTAMINATION',
    mission: 'Skip all ultra-processed food today',
    flavor: 'Ultra-processed compounds are degrading your zone. Decontaminate by eliminating them entirely.',
  },
  {
    id: 'n4', zone: 'nutrition', xp: 150,
    title: 'GLYCEMIC FIREWALL HACK',
    mission: 'Eat vegetables before carbohydrates',
    flavor: 'Your glycemic firewall is vulnerable. Hack it by leading with fiber — it slows the glucose surge.',
  },
  {
    id: 'n5', zone: 'nutrition', xp: 120,
    title: 'WHOLE GRAIN REROUTE',
    mission: 'No white bread or white rice today',
    flavor: 'The white grain highway is compromised. Reroute all intake to whole grain infrastructure only.',
  },

  // RECOVERY
  {
    id: 'r1', zone: 'recovery', xp: 170,
    title: 'DEEP RECHARGE MODE',
    mission: 'Sleep 7–9 hours tonight',
    flavor: 'Systems at 40% capacity. Initiate deep recharge mode. Your body rebuilds in the dark.',
  },
  {
    id: 'r2', zone: 'recovery', xp: 150,
    title: 'BIORHYTHM SYNC',
    mission: 'Maintain a consistent sleep schedule',
    flavor: 'The city\'s biorhythm grid requires synchronization. Lock your sleep/wake cycle to stabilize the network.',
  },
  {
    id: 'r3', zone: 'recovery', xp: 130,
    title: 'NEURAL GRID SHUTDOWN',
    mission: 'No screens 1 hour before bed',
    flavor: 'The neural grid is overstimulating your cortex. Disable all screens 60 min before shutdown sequence.',
  },

  // MINDSET
  {
    id: 'x1', zone: 'mindset', xp: 120,
    title: 'ZEN DISTRICT ACCESS',
    mission: '10 minutes of meditation today',
    flavor: 'The Zen District is cloaked. Only agents who silence the noise for 10 minutes can access it.',
  },
  {
    id: 'x2', zone: 'mindset', xp: 110,
    title: 'HUMAN NETWORK LINK',
    mission: 'Engage in a meaningful social activity',
    flavor: 'Isolation degrades your neural resilience. Connect to the human network — it is mission-critical.',
  },
  {
    id: 'x3', zone: 'mindset', xp: 120,
    title: 'KNOWLEDGE VAULT DECODE',
    mission: 'Read or do a creative activity today',
    flavor: 'The Knowledge Vault holds critical upgrades. Decode it through reading or creative output.',
  },
  {
    id: 'x4', zone: 'mindset', xp: 140,
    title: 'CORTISOL BALANCE',
    mission: 'Have a stress-free evening routine',
    flavor: 'Cortisol levels are spiking. Execute a calm evening protocol to stabilize hormonal balance.',
  },

  // BOSS
  {
    id: 'b1', zone: 'boss', xp: 300,
    title: 'FULL CITY CIRCUIT',
    mission: 'Complete the full model day: omelette breakfast → chicken + salad lunch → salmon + sweet potato dinner',
    flavor: 'This is the ultimate test. Three perfect meals. Zero compromises. Complete the Full City Circuit and claim legendary status.',
    isBoss: true,
  },
]

export const NON_BOSS = CHALLENGES.filter(c => !c.isBoss)
export const BOSS_CHALLENGE = CHALLENGES.find(c => c.isBoss)
