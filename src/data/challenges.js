export const ZONES = {
  MOVEMENT: { id: 'movement', label: 'ZONE MOUVEMENT', color: '#CCFF00', icon: 'run' },
  NUTRITION: { id: 'nutrition', label: 'ZONE NUTRITION', color: '#00E5FF', icon: 'salad' },
  RECOVERY:  { id: 'recovery',  label: 'ZONE RÉCUPÉRATION', color: '#7F77DD', icon: 'moon' },
  MINDSET:   { id: 'mindset',   label: 'ZONE MENTAL',   color: '#FFA502', icon: 'brain' },
  BOSS:      { id: 'boss',      label: 'DÉFI BOSS',     color: '#FF4757', icon: 'skull' },
}

export const CHALLENGES = [
  // MOUVEMENT
  {
    id: 'm1', zone: 'movement', xp: 150,
    title: 'MARCHE DU SKY BRIDGE',
    mission: 'Marcher 30–60 min aujourd\'hui',
    flavor: 'Le district Sky Bridge est verrouillé. Seuls ceux qui couvrent la distance pourront en débloquer les corridors néon.',
  },
  {
    id: 'm2', zone: 'movement', xp: 120,
    title: 'SCAN DES CHECKPOINTS',
    mission: 'Marcher 10 min après chaque repas',
    flavor: 'Trois checkpoints urbains t\'attendent. Les patrouilles post-repas stabilisent ta grille glycémique. En route, agent.',
    reps: 3, repLabels: ['Après déjeuner', 'Après dîner', 'Après souper'],
  },
  {
    id: 'm3', zone: 'movement', xp: 140,
    title: 'ACTIVATION DE L\'EXO-SUIT',
    mission: 'Squats, pompes et fentes aujourd\'hui',
    flavor: 'Ton exo-suit est à plat. Les protocoles au poids de corps rechargent ses cellules. Lance la séquence.',
  },
  {
    id: 'm4', zone: 'movement', xp: 160,
    title: 'FORGE DE L\'ARMURE',
    mission: '2–4 séances de musculation cette semaine',
    flavor: 'L\'armure métabolique ne s\'achète pas — elle se forge. Rejoins la baie d\'entraînement et renforce tes défenses.',
  },
  {
    id: 'm5', zone: 'movement', xp: 100,
    title: 'RECHARGE DES CELLULES',
    mission: 'Se lever toutes les 30 minutes',
    flavor: 'Le mode sédentaire vide tes cellules d\'énergie. Brise l\'immobilité. Bouge, recharge, recommence.',
    reps: 6, repLabels: ['1re levée', '2e levée', '3e levée', '4e levée', '5e levée', '6e levée'],
  },

  // NUTRITION
  {
    id: 'n1', zone: 'nutrition', xp: 130,
    title: 'PURGE DE L\'APPROVISIONNEMENT',
    mission: 'Zéro boisson sucrée aujourd\'hui',
    flavor: 'L\'approvisionnement en eau de la ville est contaminé par des sucres synthétiques. Ta mission : le garder propre pendant 24h.',
  },
  {
    id: 'n2', zone: 'nutrition', xp: 140,
    title: 'CARBURANT DU MOTEUR QUANTIQUE',
    mission: 'Protéines + fibres en premier à chaque repas',
    flavor: 'Ton moteur quantique fonctionne avec la bonne séquence de carburant. Protéines et fibres d\'abord — toujours. Sans exception.',
    reps: 3, repLabels: ['Déjeuner', 'Dîner', 'Souper'],
  },
  {
    id: 'n3', zone: 'nutrition', xp: 130,
    title: 'DÉCONTAMINATION DE ZONE',
    mission: 'Éviter tous les aliments ultra-transformés',
    flavor: 'Les composés ultra-transformés dégradent ta zone. Décontamine en les éliminant complètement.',
  },
  {
    id: 'n4', zone: 'nutrition', xp: 150,
    title: 'HACK DU PARE-FEU GLYCÉMIQUE',
    mission: 'Manger les légumes avant les glucides',
    flavor: 'Ton pare-feu glycémique est vulnérable. Hacke-le en commençant par les fibres — elles ralentissent la montée du glucose.',
  },
  {
    id: 'n5', zone: 'nutrition', xp: 120,
    title: 'REROUTAGE GRAIN ENTIER',
    mission: 'Pas de pain blanc ni de riz blanc aujourd\'hui',
    flavor: 'L\'autoroute des grains blancs est compromise. Reroute toute ta consommation vers l\'infrastructure grain entier.',
  },

  // RÉCUPÉRATION
  {
    id: 'r1', zone: 'recovery', xp: 170,
    title: 'MODE RECHARGE PROFONDE',
    mission: 'Dormir 7–9 heures cette nuit',
    flavor: 'Systèmes à 40% de capacité. Lance le mode recharge profonde. Ton corps se reconstruit dans l\'obscurité.',
  },
  {
    id: 'r2', zone: 'recovery', xp: 150,
    title: 'SYNC DU BIORYTHME',
    mission: 'Maintenir un horaire de sommeil constant',
    flavor: 'La grille biorythmique de la ville nécessite une synchronisation. Verrouille ton cycle sommeil/éveil pour stabiliser le réseau.',
  },
  {
    id: 'r3', zone: 'recovery', xp: 130,
    title: 'ARRÊT DE LA GRILLE NEURALE',
    mission: 'Aucun écran 1h avant le coucher',
    flavor: 'La grille neurale surstimule ton cortex. Désactive tous les écrans 60 min avant la séquence d\'arrêt.',
  },

  // MENTAL
  {
    id: 'x1', zone: 'mindset', xp: 120,
    title: 'ACCÈS AU DISTRICT ZEN',
    mission: '10 minutes de méditation aujourd\'hui',
    flavor: 'Le District Zen est masqué. Seuls les agents qui font silence pendant 10 minutes peuvent y accéder.',
  },
  {
    id: 'x2', zone: 'mindset', xp: 110,
    title: 'CONNEXION AU RÉSEAU HUMAIN',
    mission: 'Participer à une activité sociale significative',
    flavor: 'L\'isolement dégrade ta résilience neurale. Connecte-toi au réseau humain — c\'est essentiel à la mission.',
  },
  {
    id: 'x3', zone: 'mindset', xp: 120,
    title: 'DÉCODAGE DU COFFRE DU SAVOIR',
    mission: 'Lire ou faire une activité créative aujourd\'hui',
    flavor: 'Le Coffre du Savoir contient des mises à niveau critiques. Décode-le par la lecture ou la création.',
  },
  {
    id: 'x4', zone: 'mindset', xp: 140,
    title: 'ÉQUILIBRE DU CORTISOL',
    mission: 'Soirée sans stress',
    flavor: 'Les niveaux de cortisol montent en flèche. Exécute un protocole de soirée calme pour stabiliser l\'équilibre hormonal.',
  },

  // BOSS
  {
    id: 'b1', zone: 'boss', xp: 300,
    title: 'CIRCUIT COMPLET DE LA VILLE',
    mission: 'Journée modèle complète : omelette au déjeuner → poulet + salade au dîner → saumon + patate douce au souper',
    flavor: 'C\'est le test ultime. Trois repas parfaits. Zéro compromis. Complète le Circuit Complet et atteins le statut légendaire.',
    isBoss: true,
  },
]

export const NON_BOSS = CHALLENGES.filter(c => !c.isBoss)
export const BOSS_CHALLENGE = CHALLENGES.find(c => c.isBoss)
