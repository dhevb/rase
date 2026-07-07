export type TravelTrainRow = {
  train: string;
  timing: string;
  note: string;
};

export type TravelRouteRow = {
  from: string;
  to: string;
  journey: string;
};

export type TravelAirportRow = {
  airport: string;
  bestUse: string;
  roadConnection: string;
};

export const NIT_TRAVEL_DISCLAIMER =
  "Travel timings are indicative and may vary due to weather, traffic, or operational reasons. Visitors are requested to confirm the latest schedules with the respective transport service provider before booking their journey.";

export const NIT_TRAVEL_RAILWAY = {
  title: "By Railway",
  intro:
    "Nearest railway station: Una Himachal Railway Station (UHL), approximately 80 km from NIT Hamirpur. Chandigarh Railway Station is another major railhead, approximately 200 km away.",
  trains: [
    {
      train: "Vande Bharat Express 22447",
      timing: "New Delhi 05:50 → Una Himachal around 10:32 → Amb Andaura 11:05",
      note: "Fast morning option; generally runs six days a week, except Tuesday.",
    },
    {
      train: "Jan Shatabdi Express 12057",
      timing: "New Delhi 14:35 → Una Himachal around 21:20–22:10",
      note: "Daily afternoon option from New Delhi side.",
    },
    {
      train: "Himachal Express 14553",
      timing: "Old Delhi around 22:50 → Una Himachal next morning around 07:30",
      note: "Overnight option suitable for travellers who prefer night journey.",
    },
  ] satisfies TravelTrainRow[],
  bullets: [
    "Una to NIT Hamirpur: taxi or HRTC/private bus via Bangana → Bhota → Hamirpur.",
    "Approximate road time from Una: 2 to 2.5 hours, depending on traffic and hill-road conditions.",
    "HRTC and private buses are available from the bus stop outside Una Railway Station.",
    "From Hamirpur Bus Stand: NIT Hamirpur is approximately 3 km; local bus, auto, and taxi options are normally available.",
  ],
} as const;

export const NIT_TRAVEL_BUS = {
  title: "By Bus / Road from Delhi",
  intro:
    "HRTC Volvo, Deluxe and Ordinary buses operate from ISBT Kashmere Gate, Delhi to Hamirpur, Himachal Pradesh.",
  routes: [
    {
      from: "ISBT Kashmere Gate, Delhi",
      to: "Hamirpur Bus Stand",
      journey:
        "Approximately 8.5 to 10 hours; many services are available from morning to night.",
    },
    {
      from: "Hamirpur Bus Stand",
      to: "NIT Hamirpur",
      journey: "Approximately 3 km; 10 to 15 minutes by local transport.",
    },
  ] satisfies TravelRouteRow[],
  bullets: [
    "Recommended for visitors who want a direct road connection from Delhi.",
    "Book or verify HRTC buses through the official HRTC portal or authorised platforms.",
    "Private buses also operate daily on this route with multiple departure timings.",
    "During event days, keep buffer time because hill routes can be affected by traffic, rain, or road works.",
  ],
} as const;

export const NIT_TRAVEL_AIR = {
  title: "By Air",
  intro:
    "Nearest airport: Dharamshala/Gaggal Airport (DHM), approximately 80 km from NIT Hamirpur. Major airport option: Chandigarh International Airport (IXC), approximately 175 km away.",
  airports: [
    {
      airport: "Dharamshala / Gaggal Airport",
      bestUse: "Nearest air option for Himachal route",
      roadConnection:
        "Taxi or connecting road transport; approximately 2 to 3 hours depending on route and traffic.",
    },
    {
      airport: "Chandigarh International Airport",
      bestUse: "Better flight frequency and wider city connectivity",
      roadConnection:
        "Taxi/Bus via Chandigarh → Ropar → Kiratpur Sahib → Swarghat → Bhager → Ghumarwin → Bhota → Hamirpur; approximately 4 to 5 hours by road.",
    },
  ] satisfies TravelAirportRow[],
  bullets: [
    "Direct Chandigarh–Dharamshala flights may be available on selected days; check live airline schedule before booking.",
    "Delhi, Mumbai, Bengaluru and other major-city visitors can also fly to Chandigarh and continue by road.",
  ],
} as const;

export const NIT_TRAVEL_CHANDIGARH = {
  title: "From Chandigarh to Hamirpur",
  intro:
    "Buses are available from Chandigarh ISBT Sector 43 to Hamirpur. The route is convenient for travellers coming by flight or train to Chandigarh.",
  bullets: [
    "Approximate distance: about 170 km.",
    "Approximate time: 4 to 5 hours by bus/taxi.",
    "Common road route: Chandigarh → Kiratpur Sahib → Bhager → Ghumarwin → Bhota → Hamirpur → NIT Hamirpur.",
    "Online bus listings usually show services from early morning to late night; verify final departure time before travel.",
  ],
} as const;

export const NIT_TRAVEL_JALANDHAR = {
  title: "From Jalandhar to Hamirpur",
  intro:
    "Visitors coming from Punjab may travel from Jalandhar to Hamirpur by bus, taxi, or self-drive.",
  bullets: [
    "Common road route: Jalandhar → Hoshiarpur → Una → Bangana → Bhota → Hamirpur.",
    "Approximate time: 4 to 5 hours, depending on road and traffic conditions.",
    "Useful for travellers reaching Jalandhar by train and then continuing towards Himachal by road.",
  ],
} as const;
