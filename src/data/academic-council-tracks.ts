/** Canonical 16-track roster for Shiksha Mahakumbh 6.0 multi-track conference (official track sheet). */

export type AcademicConferenceTrack = {
  titleEn: string;
  titleHi: string;
  topics: string[];
  details: string;
  coordinators: string[];
};

export const ACADEMIC_CONFERENCE_LEADERSHIP = {
  chair: "Dr. Vipin Jain, CBLU, Bhiwani",
  coChairs: [
    "Prof. R. K. Sehgal, NIT Hamirpur",
    "Prof. Sushi Chauhan, NIT Hamirpur",
    "Prof. Ravi Ranode, NIT Hamirpur",
    "Prof. Vishal Goyal, PU, Patiala",
    "Prof. R.K. Mishra, SLIET, Longowal",
    "Dr. Parveen Kumar Sharma, CU, Jammu",
    "Dr. Vikash Kumar Garg, CUP, Bathinda",
  ],
  conveners: [
    "Prof. Manoj Teotia, CBLU, Bhiwani",
    "Dr. Pankaj Verma, NIT Kurukshetra",
    "Dr. Sunder Kala Negi, NIT Hamirpur",
    "Dr. Subit Jain, NIT Hamirpur",
    "Dr. Jatin Gupta, Chitkara University",
    "Dr. Kapil Sood, Govt. College, H.P.",
  ],
} as const;

export const ACADEMIC_PUBLICATION_NOTE =
  "The papers accepted and presented at the conference will be published in a peer reviewed, open access journal with ISSN. The selected papers meeting the standard quality requirements will be considered for publication in Web of Science/Scopus indexed journals. The authors are invited to submit an abstract, which will undergo a double-blind peer reviewing process for its acceptance. Similarity index of the manuscript must be within acceptable limits.";

export const ACADEMIC_BEST_PAPER_NOTE = "Track-wise one best paper award.";

export const ACADEMIC_PAPER_SUBMISSION_WEBSITE = "shikshamahakumbh.com";

export const ACADEMIC_CONFERENCE_TRACKS: AcademicConferenceTrack[] = [
  {
    titleEn: "Fundamental and Applied Sciences",
    titleHi: "मौलिक एवं अनुप्रयुक्त विज्ञान",
    topics: [
      "Physics, Chemistry, Biology, Mathematics",
      "Earth and Space Sciences",
      "Interdisciplinary Sciences (Biotechnology, Material Science, etc.)",
    ],
    details:
      "Physics, Chemistry, Biology, Mathematics; Earth and Space Sciences; Interdisciplinary Sciences (Biotechnology, Material Science, etc.)",
    coordinators: [
      "Prof. Sunil, NIT Hamirpur",
      "Dr. Pamita Awasthi, NIT Hamirpur",
      "Dr. Renu Dogra, Govt. Degree College, Palampur",
      "Dr. Praveen Kumar, CU Jammu",
      "Dr. Surinder Singh Khurana, CUP, Bathinda",
      "Dr. Yogesh Kapil, SLIET, Longowal",
      "Dr. Praveen Kumar, Plaksha University, Mohali",
    ],
  },
  {
    titleEn: "Engineering and Technology",
    titleHi: "अभियंत्रण एवं प्रौद्योगिकी",
    topics: [
      "Core Engineering (Mechanical, Civil, Electrical, etc.)",
      "Emerging Technologies (AI, Robotics, Data Science, Quantum Tech)",
    ],
    details:
      "Core Engineering (Mechanical, Civil, Electrical, etc.); Emerging Technologies (AI, Robotics, Data Science, Quantum Tech)",
    coordinators: [
      "Dr. K. S. Pandey, IIT Mandi",
      "Dr. Bharat Bhushan Sharma, NIT Hamirpur",
      "Dr. Siddhartha Sharma, NIT Hamirpur",
      "Dr. Nitin Gupta, NIT Hamirpur",
      "Dr. Navneet Goyal, SLIET, Longowal",
      "Dr. Utkarsh, University of Delhi",
      "Dr. Rajiv Chauhan, IKGPTU, Jalandhar",
      "Dr. Sachin Kumar, GNDU, Amritsar",
      "Dr. Sanu Bala Garg, IKGPTU, Hoshiarpur",
      "Dr. Anju Sharma, Punjab State Aeronautical Engineering College, Patiala",
    ],
  },
  {
    titleEn: "Management, Business & Entrepreneurship",
    titleHi: "प्रबंधन एवं उद्यमिता",
    topics: ["Business Administration", "Innovation and Startups", "Family Business & Social Entrepreneurship"],
    details: "Business Administration, Innovation and Startups, Family Business & Social Entrepreneurship",
    coordinators: [
      "Prof. Sanjeev Gupta, CUHP, Dharamshala",
      "Prof. Sanjeev Bansal, SLIET, Longowal",
      "Dr. Suman Kumar, CUHP, Dharamshala",
      "Dr. Neeraj Dhiman, NIT Hamirpur",
      "Dr. Sachin Kumar, NIT Hamirpur",
    ],
  },
  {
    titleEn: "International Relations, Law & Governance",
    titleHi: "अंतर्राष्ट्रीय संबंध, विधि एवं शासन",
    topics: ["Global Affairs", "Public Policy & Administration", "Legal Studies & Human Rights"],
    details: "Global Affairs, Public Policy & Administration, Legal Studies & Human Rights",
    coordinators: [
      "Dr. Manoj Sharma, NIT Hamirpur",
      "Prof. Sudershan Kumar, IIT Bombay",
      "Dr. Dakshita Sagwan, G.D. Goenka University",
      "Adv. Poonam Pawar, Advocate, Delhi",
      "Adv. Sahil, PHHC, Chandigarh",
    ],
  },
  {
    titleEn: "Social Sciences and Humanities",
    titleHi: "सामाजिक विज्ञान एवं मानविकी",
    topics: [
      "Sociology, Psychology, Political Science, History",
      "Philosophy, Ethics, and Cultural Studies",
    ],
    details:
      "Sociology, Psychology, Political Science, History; Philosophy, Ethics, and Cultural Studies",
    coordinators: [
      "Dr. Yogesh Gupta, NIT Hamirpur",
      "Dr. Sunder Kala Negi, NIT Hamirpur",
      "Dr. Atraquee Saha, JNU, New Delhi",
      "Dr. Neeraj Marwaha, Sri Sai Uni., Palampur",
      "Dr. Sarabjeet, Baba Balraj Punjab University Constituent College Balachaur",
    ],
  },
  {
    titleEn: "Education Systems and Pedagogy",
    titleHi: "शिक्षा प्रणाली एवं शिक्षण पद्धति",
    topics: [
      "School Education (Foundational, Preparatory, Middle, Secondary)",
      "Higher Education & Research",
      "Inclusive Education (for Disabled, Marginalized etc.)",
      "Gurukul and Indigenous Knowledge Systems",
      "Lifelong Learning & Adult Education",
    ],
    details:
      "School Education (Foundational, Preparatory, Middle, Secondary); Higher Education & Research; Inclusive Education (for Disabled, Marginalized etc.); Gurukul and Indigenous Knowledge Systems; Lifelong Learning & Adult Education",
    coordinators: [
      "Dr. Ramesh Kumar Vats, NIT Hamirpur",
      "Dr. Jeetendra Singh Maan, NIT Hamirpur",
      "Dr. Krishna Pandey, Kurukshetra University, Kurukshetra",
      "Dr. Neena Aneja, Principal, S.D. College Women, Moga",
      "Dr. Naveen Mokta, NCERT Delhi",
    ],
  },
  {
    titleEn: "EdTech and Digital Education",
    titleHi: "एडटेक एवं डिजिटल शिक्षा",
    topics: [
      "Education Technology Innovations",
      "Online & Blended Learning",
      "AI in Education",
      "Digital Literacy and Access",
    ],
    details:
      "Education Technology Innovations, Online & Blended Learning, AI in Education, Digital Literacy and Access",
    coordinators: [
      "Prof. Sutinder Singh, SLIET, Longowal",
      "Dr. Siddartha Chauhan, NIT Hamirpur",
      "Dr. Robin Singh Bhadoria, NIT Hamirpur",
      "Dr. Vishal, SLIET, Longowal",
    ],
  },
  {
    titleEn: "Health Sciences and Traditional Medicine",
    titleHi: "स्वास्थ्य विज्ञान एवं पारंपरिक चिकित्सा",
    topics: [
      "Modern Medicine",
      "AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy, Naturopathy)",
      "Public Health & Preventive Care",
    ],
    details:
      "Modern Medicine; AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy, Naturopathy); Public Health & Preventive Care",
    coordinators: [
      "Dr. Gaurov, DST, Delhi",
      "Dr. Shweta Chaurasia, PGIMER, Chandigarh",
      "Dr. Zareena, NIT Hamirpur",
      "Dr. Vikas, Doctor, Haryana",
    ],
  },
  {
    titleEn: "Sports, Physical Education and Well-being",
    titleHi: "खेल एवं कल्याण",
    topics: ["Physical Training & Sports Science", "Mental Health and Wellness", "Yoga and Lifestyle Education"],
    details: "Physical Training & Sports Science; Mental Health and Wellness; Yoga and Lifestyle Education",
    coordinators: [
      "Prof. Monika Verma, CBLU, Bhiwani",
      "Dr. R. K. Jamalta, NIT Hamirpur",
      "Dr. Pawan Kumar, GDC Hamirpur",
    ],
  },
  {
    titleEn: "Agriculture, Food & Veterinary Sciences",
    titleHi: "कृषि एवं पशु चिकित्सा विज्ञान",
    topics: ["Sustainable Agriculture", "Agri-Tech & Innovation", "Animal Health and Husbandry"],
    details: "Sustainable Agriculture; Agri-Tech & Innovation; Animal Health and Husbandry",
    coordinators: [
      "Prof. Namita Singh, Guru Jamshedpur University, Hisar",
      "Prof. Sanjay Guleria, FBSc, SKUAST, Jammu",
      "Dr. Som Dev Retd. Dean COHF Neri",
      "Dr. R. S. Sethi, GADVASU, Ludhiana",
    ],
  },
  {
    titleEn: "Environment, Sustainability & Water Resources",
    titleHi: "पर्यावरण एवं सतत विकास",
    topics: ["Climate Change", "Environmental Education", "Water & Natural Resource Management"],
    details: "Climate Change; Environmental Education; Water & Natural Resource Management",
    coordinators: [
      "Prof. Deepak Pant, CUHP, Dharamshala",
      "Dr. Suneet Dubey, IUCN",
      "Dr. R. S. Banshtu, NIT Hamirpur",
    ],
  },
  {
    titleEn: "Culture, Arts & Heritage",
    titleHi: "संस्कृति, कला एवं विरासत",
    topics: ["Performing & Visual Arts", "Folk and Tribal Traditions", "Cultural Conservation and Promotion"],
    details: "Performing & Visual Arts; Folk and Tribal Traditions; Cultural Conservation and Promotion",
    coordinators: [
      "Prof. Jagmeet Bawa, CUP, Bathinda",
      "Dr. Amarjeet Kaur, NIT Hamirpur",
      "Dr. Nand Lal, HPU Shimla",
      "Dr. Sukhjinder Rishi, PU, Chandigarh",
      "Dr. Manu Sharma, AB College, Pathankot",
    ],
  },
  {
    titleEn: "Languages and Linguistics",
    titleHi: "भाषाएँ एवं भाषाविज्ञान",
    topics: ["Bharat Classical & Modern Languages", "Foreign Languages", "Translation and Language Technology"],
    details: "Bharat Classical & Modern Languages; Foreign Languages; Translation and Language Technology",
    coordinators: [
      "Prof. Chander Kant, CUHP, Dharamshala",
      "Prof. Mohini, Sanskrit Uni. Balohor",
      "Dr. Manoj Yadav, NIT Hamirpur",
      "Dr. Garima Bhatti, Rawal College, Faridabad",
      "Dr. Sameer Mahajan, CUP, Bathinda",
      "Dr. Savita Grover, PU SSG Regional Centre, Hoshiarpur, Punjab",
    ],
  },
  {
    titleEn: "Vocational & Skill-based Education",
    titleHi: "व्यावसायिक एवं कौशल आधारित शिक्षा",
    topics: ["Industrial Training", "Crafts and Traditional Skills", "Workforce Readiness and Certification"],
    details: "Industrial Training; Crafts and Traditional Skills; Workforce Readiness and Certification",
    coordinators: [
      "Prof. Ashok Sarial, Former VC, CSKHPPAU",
      "Prof. Surita Maini, SLIET, Longowal",
      "Dr. Somesh Kumar Sharma, NIT Hamirpur",
      "Dr. Charanjeev Gupta, SLIET, Longowal",
      "Mr. Avinash, SLIET, Longowal",
    ],
  },
  {
    titleEn: "Indian Knowledge System",
    titleHi: "भारतीय ज्ञान प्रणाली",
    topics: [
      "Philosophy and Science in Bharat Traditions",
      "Indian Linguistics & Language Traditions and Art, Aesthetics, and Indian Performing Arts",
      "Education in Ancient Bharat: Gurukula to Nalanda",
      "Bharat Epistemology and Logic (Nyaya, Mimamsa, etc.)",
      "Vedic Literature, Puranas, and Oral Traditions",
    ],
    details:
      "Philosophy and Science in Bharat Traditions; Indian Linguistics & Language Traditions and Art, Aesthetics, and Indian Performing Arts; Education in Ancient Bharat: Gurukula to Nalanda; Bharat Epistemology and Logic (Nyaya, Mimamsa, etc.); Vedic Literature, Puranas, and Oral Traditions",
    coordinators: [
      "Dr. Hemat Vinayak, NIT Hamirpur",
      "Dr. Bala Lakhendra, BHU, Varanasi",
      "Dr. Parminder Singh, CUP, Bathinda",
      "Dr. Mohit Sharma, Chandigarh University",
      "Dr. Ashish Kumar Sharma, Arni University",
      "Dr. Amar Jeet Singh, Hemvati Nandan Bahuguna Garhwal University, Uttarakhand",
      "Dr. Garima Bhati, Chairperson Karya Garima Hindi Sahitya Manch",
    ],
  },
  {
    titleEn: "Defence and Security",
    titleHi: "रक्षा एवं सुरक्षा",
    topics: [
      "National Security & Strategic Affairs",
      "Defence Technologies, Cyber Security & AI",
      "Disaster Management, Border Security & Internal Security",
    ],
    details:
      "National Security & Strategic Affairs; Defence Technologies, Cyber Security & AI; Disaster Management, Border Security & Internal Security",
    coordinators: [
      "Dr. Pawan Kumar Sharma, NIT Hamirpur",
      "Dr. Varun Sharma, NIT Hamirpur",
      "Dr. Vivek Sharma, NIT Hamirpur",
      "Dr. Vikram Verma, NIT Hamirpur",
    ],
  },
];

export function conferenceTracksForHub() {
  return ACADEMIC_CONFERENCE_TRACKS.map(({ titleEn, titleHi, topics }) => ({
    titleEn,
    titleHi,
    topics,
  }));
}
