export const SITE = {
  name: "Stoke Fleming Guide",
  origin: "https://stokefleming.com",
  lat: 50.3237,
  lon: -3.6,
  description:
    "An independent guide to Stoke Fleming, the village above Start Bay in South Devon. Beaches, the coast path, food, buses and village life — not an official tourist board.",
} as const;

export const NAV = [
  { to: "/things-to-do", label: "Things to do" },
  { to: "/beaches", label: "Beaches" },
  { to: "/food-drink", label: "Food & drink" },
  { to: "/stay", label: "Stay" },
  { to: "/events", label: "Events" },
  { to: "/community", label: "Community" },
  { to: "/visit", label: "Visit" },
] as const;

export type PageRef =
  | "/"
  | "/things-to-do"
  | "/beaches"
  | "/food-drink"
  | "/stay"
  | "/events"
  | "/community"
  | "/visit"
  | "/about"
  | "/contact"
  | "/privacy"
  | "/cookies"
  | "/terms"
  | "/accessibility"
  | "/planner"
  | "/search"
  | "/newsletter"
  | "/webcam"
  | "/sitemap";

export const SITEMAP: { path: PageRef | string; title: string; changefreq: string }[] = [
  { path: "/", title: "Home", changefreq: "weekly" },
  { path: "/things-to-do", title: "Things to do", changefreq: "monthly" },
  { path: "/beaches", title: "Beaches", changefreq: "monthly" },
  { path: "/food-drink", title: "Food and drink", changefreq: "monthly" },
  { path: "/stay", title: "Stay", changefreq: "monthly" },
  { path: "/events", title: "Events", changefreq: "weekly" },
  { path: "/community", title: "Village directory", changefreq: "monthly" },
  { path: "/visit", title: "Plan your visit", changefreq: "monthly" },
  { path: "/about", title: "About this guide", changefreq: "yearly" },
  { path: "/contact", title: "Contact", changefreq: "yearly" },
  { path: "/newsletter", title: "Monthly newsletter", changefreq: "monthly" },
  { path: "/planner", title: "Trip planner", changefreq: "yearly" },
  { path: "/search", title: "Search", changefreq: "yearly" },
  { path: "/webcam", title: "Conditions, not a webcam", changefreq: "yearly" },
  { path: "/accessibility", title: "Accessibility", changefreq: "yearly" },
  { path: "/privacy", title: "Privacy", changefreq: "yearly" },
  { path: "/cookies", title: "Cookies", changefreq: "yearly" },
  { path: "/terms", title: "Terms", changefreq: "yearly" },
];

export type Activity = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  credit?: string;
  duration: string;
  effort: string;
  parking: string;
  route: string;
  mapUrl: string;
  who: string;
  whoUrl?: string;
  warning?: string;
};

export const ACTIVITIES: Activity[] = [
  {
    slug: "blackpool-sands-walk",
    title: "Walk down to Blackpool Sands",
    summary:
      "The short walk from the village to the beach. It is downhill on the way there and a pull on the way back. It is not a two-hour hike, and it is not a ten-minute stroll.",
    image: "/photos/blackpool-sands.jpg",
    imageAlt: "The café and shingle beach at Blackpool Sands, with the cliff behind",
    width: 1600,
    height: 1200,
    credit: "Derek Harper via Geograph, CC BY-SA 2.0",
    duration: "About 25 minutes downhill from the village centre",
    effort: "Easy down, moderate back up",
    parking: "If you are not walking, use the beach car park. The beach publishes the charge.",
    route:
      "From St Peter's Church, follow the lanes and the South West Coast Path signs south towards Blackpool Sands. Allow about 25 minutes down and longer back up. A longer coast-path day is a different walk — see the Dartmouth and Strete routes.",
    mapUrl: "https://www.openstreetmap.org/search?query=Blackpool%20Sands%20Devon",
    who: "Path is the South West Coast Path. The beach itself is run by Blackpool Sands.",
    whoUrl: "https://www.blackpoolsands.co.uk/",
  },
  {
    slug: "coast-path-dartmouth",
    title: "Coast path towards Dartmouth",
    summary:
      "Clifftop walking north from the village towards the Dart. This is the walk that takes one to three hours, depending how far you go. It is not the walk to the beach.",
    image: "/photos/coast-path.jpg",
    imageAlt: "Clifftop view over a South Devon bay, used for the coast path towards the Dart",
    width: 1600,
    height: 900,
    duration: "1–3 hours depending on how far you go",
    effort: "Moderate. Uneven, with climbs. Not a buggy route.",
    parking: "Leave the car in a proper space in the village or start from Dartmouth and walk back. Do not block the lanes.",
    route:
      "The South West Coast Path passes through the parish between Dartmouth and Strete. Northbound you drop towards the Dart and, if you continue, into Dartmouth. Check the tide only if you leave the path for the shore. The cliff path itself is not a beach.",
    mapUrl: "https://www.southwestcoastpath.org.uk/",
    who: "South West Coast Path Association",
    whoUrl: "https://www.southwestcoastpath.org.uk/",
    warning: "Boots with grip. The path can be slippery after rain and is exposed in wind.",
  },
  {
    slug: "coast-path-strete",
    title: "Coast path towards Strete",
    summary:
      "South along the cliffs, past Blackpool Sands and on towards Strete. Strete Gate is not a 15-minute walk from the church.",
    image: "/photos/strete-gate.jpg",
    imageAlt: "The shore looking along the bay near Strete, with the cliff and fields above",
    width: 900,
    height: 526,
    duration: "A couple of hours to Strete if you walk it. About 10 minutes by car.",
    effort: "Moderate",
    parking: "Strete Gate has a roadside car park that fills in summer. The village lanes are a poor place to leave a car.",
    route:
      "Follow the coast path south. Blackpool Sands is the first beach. Strete village and Strete Gate are beyond that, about three miles from Stoke Fleming by road. Walking the whole way is a proper half-day, not a quarter of an hour.",
    mapUrl: "https://www.openstreetmap.org/search?query=Strete%20Gate%20Devon",
    who: "South West Coast Path Association",
    whoUrl: "https://www.southwestcoastpath.org.uk/",
  },
  {
    slug: "st-peters-church",
    title: "St Peter's Church",
    summary:
      "The parish church, Grade II* listed, with a stone tower that marks the village from the coast path. The centre of the village is here, not a harbour.",
    image: "/photos/village.jpg",
    imageAlt: "Stone tower of St Peter's Church, Stoke Fleming, with wind-shaped pines",
    width: 1024,
    height: 768,
    duration: "20–40 minutes",
    effort: "Easy, in the village",
    parking: "Short stay only. The centre is tight. Do not block the church, the bus or farm access.",
    route:
      "The church stands in the village on the A379 between Dartmouth and Strete. Step inside when it is open. Services are on the noticeboard, not invented here.",
    mapUrl: "https://www.openstreetmap.org/?mlat=50.3237&mlon=-3.6000#map=17/50.3237/-3.6000",
    who: "The parish church. Council business is separate and lives on the parish site.",
    whoUrl: "https://www.stokefleming.org/",
  },
  {
    slug: "blackpool-sands-day",
    title: "A day at Blackpool Sands",
    summary:
      "Swim, sit, and eat at the beach café. Water sports are booked with the beach, not with a nameless operator on this site.",
    image: "/photos/snorkel.jpg",
    imageAlt: "Two people snorkelling over kelp in clear water",
    width: 1600,
    height: 900,
    duration: "Half a day or a whole one",
    effort: "Easy once you are there. The shingle is tiring underfoot.",
    parking: "Beach car park. Charge and busy-day rules are on the beach website.",
    route:
      "Blackpool Sands is the cove just south of the village. It is shingle, not a golden sandy bay. The water is unusually clear. The café and watersports hut are on the beach.",
    mapUrl: "https://www.openstreetmap.org/search?query=Blackpool%20Sands%20Devon",
    who: "Blackpool Sands — café, parking and watersports",
    whoUrl: "https://www.blackpoolsands.co.uk/",
    warning:
      "Lifeguards, when they are on duty, cover the main summer season only. Confirm on the beach website. This site does not estimate the tide.",
  },
  {
    slug: "dartmouth",
    title: "Dartmouth for a few hours",
    summary:
      "The naval town is about three miles north. Shops, the river, the ferry and boat trips are there. Stoke Fleming does not have a harbour.",
    image: "/photos/coast-path.jpg",
    imageAlt: "Coast looking towards the Dart estuary from the South Devon cliffs",
    width: 1600,
    height: 900,
    duration: "Half a day",
    effort: "Easy in town. The walk over is not.",
    parking: "Use Dartmouth's car parks. They fill up. The bus avoids the problem.",
    route:
      "Drive or take the bus along the A379. Boat trips, fishing and the river cruise leave from Dartmouth quay. Book with the boat, and check it is running that day. This guide does not pretend to be the operator.",
    mapUrl: "https://www.openstreetmap.org/search?query=Dartmouth%20Devon",
    who: "Dartmouth town and the individual boat operators on the quay",
    whoUrl: "https://www.discoverdartmouth.com/",
  },
  {
    slug: "slapton-ley",
    title: "Slapton Sands and the Ley",
    summary:
      "A long shingle bar with a freshwater nature reserve behind it, and a wartime history that is still marked on the shore.",
    image: "/photos/slapton.jpg",
    imageAlt: "Aerial view of Slapton Ley, the coast road and the long beach of Start Bay",
    width: 1400,
    height: 950,
    duration: "Two hours, or longer if you walk the bar",
    effort: "Easy walking on the flat. The shingle is heavy going.",
    parking: "Roadside car parks along the bar. They fill on warm weekends.",
    route:
      "About four miles south of the village, past Strete. The freshwater ley is a national nature reserve. The sea side is a long pebble beach. In 1944 this shore was used for Exercise Tiger; the memorial is on the beach road. It is a place to be quiet, not a theme park.",
    mapUrl: "https://www.openstreetmap.org/search?query=Slapton%20Sands",
    who: "Slapton Ley is looked after as a nature reserve. Field Studies Council and local signs explain access.",
    whoUrl: "https://www.slnnr.org.uk/",
    warning: "No lifeguards. Start Bay can have a strong undertow. Do not swim alone.",
  },
  {
    slug: "strete-gate",
    title: "Strete Gate",
    summary:
      "The beach at the Strete end of the bar. It is an established naturist beach. It is not a 15-minute walk from Stoke Fleming, and it is not a family alternative to Blackpool Sands.",
    image: "/photos/strete-gate.jpg",
    imageAlt: "The open beach near Strete Gate, with the cliff and fields above the shore",
    width: 900,
    height: 526,
    duration: "About 10 minutes by car. A long walk if you come on the coast path.",
    effort: "The walk down to the shore can be steep.",
    parking: "Car park at Strete Gate. Limited facilities.",
    route:
      "Drive south through Strete. The naturist use applies to this beach, not to the village, the coast path or Blackpool Sands. There is little shelter and phone signal can be poor.",
    mapUrl: "https://www.openstreetmap.org/search?query=Strete%20Gate%20Devon",
    who: "No café and no lifeguard. Read the signs in the car park.",
    warning:
      "Naturist beach. If that is not what you want, stop at Blackpool Sands instead. Check the tide so you are not cut off.",
  },
];

export type Beach = {
  slug: string;
  name: string;
  summary: string;
  surface: string;
  fromVillage: string;
  dogs: string;
  facilities: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  credit?: string;
  mapUrl: string;
  website?: string;
  safety: string;
};

export const BEACHES: Beach[] = [
  {
    slug: "blackpool-sands",
    name: "Blackpool Sands",
    summary:
      "The village beach: a steep shingle cove with clear water, a café and a car park. It has held Blue Flag status in past seasons. Check the current award on the beach's own site rather than trusting a badge printed here.",
    surface: "Shingle. The foreshore looks lighter when the tide is out. It is not a wide sandy bay.",
    fromVillage: "About 25 minutes on foot downhill from the church. A few minutes by car. The walk back is uphill.",
    dogs: "Seasonal rules are set by the beach. Read the sign before you take a dog onto the sand.",
    facilities: "Car park (charged), café, toilets and a watersports hut when the season is open.",
    image: "/photos/blackpool-sands.jpg",
    imageAlt: "Café terrace and shingle shore at Blackpool Sands",
    width: 1600,
    height: 1200,
    credit: "Derek Harper via Geograph (photo 4343133), CC BY-SA 2.0",
    mapUrl: "https://www.openstreetmap.org/search?query=Blackpool%20Sands%20Devon",
    website: "https://www.blackpoolsands.co.uk/",
    safety:
      "Lifeguards patrol in the main summer season, not all year. Boat traffic uses the bay. This website does not show a live tide height.",
  },
  {
    slug: "strete-gate",
    name: "Strete Gate",
    summary:
      "The northern end of the Slapton bar, in the next parish. Naturist beach. Come by car or by a proper coast-path walk, not by a 15-minute stroll from the church.",
    surface: "Shingle and sand mixed, open to the weather.",
    fromVillage: "About three miles south, past Strete. Roughly 10 minutes by car. Not 15 minutes on foot.",
    dogs: "Read the local signs. Do not assume the Blackpool Sands rule applies here.",
    facilities: "A car park. Little else. No lifeguard and no café.",
    image: "/photos/strete-gate.jpg",
    imageAlt: "Open shore near Strete Gate",
    width: 900,
    height: 526,
    mapUrl: "https://www.openstreetmap.org/search?query=Strete%20Gate%20Devon",
    safety:
      "Unguarded. The walk down can be steep and an incoming tide can matter if you are among the rocks. Phone signal may be weak.",
  },
  {
    slug: "slapton-sands",
    name: "Slapton Sands",
    summary:
      "The long bar between the sea and Slapton Ley. Pebbles, a nature reserve, and the Exercise Tiger memorial. A drive from the village, not a neighbour of the church.",
    surface: "Pebble beach. From above it can look sandy. Underfoot it is shingle.",
    fromVillage: "About four miles, 10–15 minutes by car.",
    dogs: "Generally walked on the bar. Follow reserve signs around the freshwater ley.",
    facilities: "Roadside parking, which fills in summer. Pubs and cafés are in the villages nearby, not on the middle of the bar.",
    image: "/photos/slapton.jpg",
    imageAlt: "Slapton Ley on the left, the coast road, and the long beach of Start Bay",
    width: 1400,
    height: 950,
    mapUrl: "https://www.openstreetmap.org/search?query=Slapton%20Sands",
    website: "https://www.slnnr.org.uk/",
    safety: "No lifeguard. Undertow on this shore is well known. Do not use inflatables in an offshore wind.",
  },
];

export type Place = {
  name: string;
  kind: string;
  where: string;
  summary: string;
  hours: string;
  url?: string;
  phone?: string;
  image?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  mapUrl: string;
};

export const FOOD: Place[] = [
  {
    name: "The Green Dragon",
    kind: "The village pub",
    where: "Church Road, Stoke Fleming",
    summary:
      "The pub in the village. There is one. Food is served on the days they publish, and they ask you to book a table. Hours change with the season, so use their site rather than a timetable copied here.",
    hours: "Published on their website. Open through the year, with shorter days early in the week.",
    url: "https://www.greendragonstokefleming.com/",
    phone: "01803 770238",
    image: "/photos/green-dragon.jpg",
    imageAlt: "The white front of the Green Dragon pub in Stoke Fleming, with the pub sign",
    width: 640,
    height: 480,
    mapUrl: "https://www.openstreetmap.org/search?query=The%20Green%20Dragon%20Stoke%20Fleming",
  },
  {
    name: "Blackpool Sands café",
    kind: "Beach café",
    where: "On the beach at Blackpool Sands",
    summary:
      "The café at the beach, run with the beach. People often still say the Venus café. It is seasonal. The menu and the last order are on the beach website, not on a stock photograph.",
    hours: "Seasonal. Check blackpoolsands.co.uk before you rely on lunch.",
    url: "https://www.blackpoolsands.co.uk/",
    image: "/photos/blackpool-sands.jpg",
    imageAlt: "The beach café building at Blackpool Sands",
    width: 1600,
    height: 1200,
    mapUrl: "https://www.openstreetmap.org/search?query=Blackpool%20Sands%20Devon",
  },
  {
    name: "Kendricks, Stoke Fleming",
    kind: "Restaurant, if it is open",
    where: "New Road, at Leonards Cove. Formerly Radius 7.",
    summary:
      "This was Radius 7 and then traded as Kendricks, with pizza and small plates. Guides disagree in 2026: some still list it, and OpenTable has also marked the listing permanently closed. Do not make the trip without checking.",
    hours: "Unconfirmed. Look at kendricks.life or ring before you go.",
    url: "http://kendricks.life/",
    mapUrl: "https://www.openstreetmap.org/search?query=Leonards%20Cove%20Stoke%20Fleming",
  },
  {
    name: "Stoke Lodge Hotel dining",
    kind: "Hotel restaurant",
    where: "Between the village and Blackpool Sands",
    summary:
      "The hotel serves food to residents and, when they say so, to people who are not staying. Menus change. This guide does not invent dishes or a chef's name.",
    hours: "On the hotel website.",
    url: "https://stokelodgehotel.co.uk/",
    mapUrl: "https://www.openstreetmap.org/search?query=Stoke%20Lodge%20Hotel",
  },
  {
    name: "The Greedy Table",
    kind: "Catering, not a restaurant you walk into",
    where: "Based in the village",
    summary:
      "A caterer for events: canapés, buffets, shared feasts. There is no dining room to turn up at. Book them for a party, do not expect a table tonight.",
    hours: "By arrangement.",
    url: "https://www.thegreedytable.com/",
    mapUrl: "https://www.openstreetmap.org/search?query=Stoke%20Fleming%20Devon",
  },
];

export type Stay = {
  name: string;
  kind: string;
  area: string;
  summary: string;
  url: string;
  ownerListed: boolean;
};

export const STAYS: Stay[] = [
  {
    name: "Stoke Lodge Hotel",
    kind: "Hotel",
    area: "On the coast path between the village and Blackpool Sands",
    summary:
      "A hotel in the parish, with rooms and a restaurant. What is included — parking, a pool, a view — is for the hotel to say. We do not list a made-up nightly price.",
    url: "https://stokelodgehotel.co.uk/",
    ownerListed: false,
  },
  {
    name: "Channel View",
    kind: "Guest house",
    area: "In the village, a short drive from Dartmouth",
    summary:
      "A guest house in Stoke Fleming. Rooms and breakfast are on their own site. No star rating is invented here.",
    url: "https://www.channelviewguesthouse.com/",
    ownerListed: false,
  },
  {
    name: "The Birdhouses",
    kind: "Small hide, sleeping two",
    area: "Above Blackpool Sands. Not a harbour — the village does not have one.",
    summary:
      "The well-known hide looking over the beach, let by Wild Comfort. A one-minute claim only makes sense if you are already at the beach, not if you are at the church.",
    url: "https://wildcomfort.co.uk/the-birdhouses/",
    ownerListed: false,
  },
];

export const FIXTURES = [
  {
    title: "Parish council",
    when: "First Wednesday of the month",
    where: "Ron Harris Room, Village Hall",
    summary:
      "The council meets in public. Agendas and minutes are on the parish website. This is the parish council, not the church council.",
    url: "https://www.stokefleming.org/parish-council/",
  },
  {
    title: "Horticultural and sports show",
    when: "Once a year, date announced locally",
    where: "In the village — the hall, the school or a field, depending on the year",
    summary:
      "The village show. A previous version of this website invented a date and spelled the short-mat bowls club wrongly underneath it. Submit the real date when the committee has it.",
    url: "https://www.stokefleming.org/",
  },
  {
    title: "Dartmouth Royal Regatta",
    when: "Usually the end of August",
    where: "Dartmouth, not Stoke Fleming",
    summary:
      "A neighbouring town's regatta week. Worth knowing if you are staying here. It is not a Stoke Fleming event, and the date is the regatta's to publish.",
    url: "https://www.discoverdartmouth.com/",
  },
  {
    title: "Church services",
    when: "See the noticeboard",
    where: "St Peter's Church",
    summary: "Times are set by the church. They are not copied onto this site, because they change.",
    url: "https://www.stokefleming.org/",
  },
];

export const DIRECTORY = [
  {
    name: "Parish council",
    category: "Council",
    summary:
      "Nine councillors and a paid clerk. Meetings are the first Wednesday, in the Village Hall, and the public can speak. The district council covers bins, planning and environmental health. The county council covers roads and schools.",
    url: "https://www.stokefleming.org/parish-council/",
  },
  {
    name: "Village hall",
    category: "Hall",
    summary:
      "The hall is the place for meetings, the library and many clubs. Bookings go through the hall, not through a private mobile published on a tourism page. Start with the parish site if you cannot find the hall's own page.",
    url: "https://www.stokefleming.org/",
  },
  {
    name: "St Peter's Church",
    category: "Church",
    summary:
      "The parish church, Grade II* listed. The church council is not the parish council. Service times are on the noticeboard.",
    url: "https://en.wikipedia.org/wiki/Stoke_Fleming",
  },
  {
    name: "Community library",
    category: "Library",
    summary:
      "A small library at the village hall, run by volunteers. Hours change. Check the parish site or the hall door rather than an old list.",
    url: "https://www.stokefleming.org/",
  },
  {
    name: "Primary school",
    category: "School",
    summary:
      "Stoke Fleming has a community primary school. The head's phone number is not published here. Devon’s school finder has the public contact.",
    url: "https://www.devon.gov.uk/educationandfamilies/",
  },
  {
    name: "Clubs",
    category: "Clubs",
    summary:
      "Short mat bowls, cricket, pétanque, table tennis, a youth group and others meet in the village. Private mobiles and personal email addresses are not listed. A club can add its public website below.",
    url: "https://www.stokefleming.org/",
  },
];

export const ITINERARIES = [
  {
    id: "beach-morning",
    title: "A beach morning",
    steps: [
      "Start at St Peter's. You are in a hill village, not at the beach yet.",
      "Walk down to Blackpool Sands. Allow about 25 minutes. The return is slower.",
      "Swim only if the conditions suit you. This site does not invent a tide.",
      "Eat at the beach café if it is open, or back at the Green Dragon if they are serving.",
    ],
  },
  {
    id: "wet-day",
    title: "A wet day",
    steps: [
      "Skip the cliff path. It is slippery and there is no view.",
      "Take the bus or drive to Dartmouth. Use a town car park.",
      "The river, the shops and an indoor museum beat a closed beach café.",
      "Check the Green Dragon's hours before you assume dinner back in the village.",
    ],
  },
  {
    id: "short-stop",
    title: "An hour in the village",
    steps: [
      "Look at the church. The tower is the landmark from the coast path.",
      "The shop and post office are on the main road. Hours are on the door.",
      "One pub: the Green Dragon, on Church Road.",
      "Do not start the coast path if someone in the party cannot face the climb back.",
    ],
  },
];

export function activityBySlug(slug: string) {
  return ACTIVITIES.find((item) => item.slug === slug);
}

export function beachBySlug(slug: string) {
  return BEACHES.find((item) => item.slug === slug);
}
