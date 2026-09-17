import type { CommitteeEditionData } from "./types";
import { m } from "./types";
import { committeeModuleKeyForEdition, committeeSlugForEdition } from "@/lib/committee/edition-slugs";

/** Edition 6.0 — NIT Hamirpur (Oct 2026). Source: brochure page 7. */
export const COMMITTEE_EDITION_6_0: CommitteeEditionData = {
  edition: "6.0",
  slug: committeeSlugForEdition("6.0"),
  moduleKey: committeeModuleKeyForEdition("6.0"),
  breadcrumbLabel: "Shiksha Mahakumbh 6.0",
  pageTitle: "Shiksha Mahakumbh 6.0 — NIT Hamirpur (2026)",
  venue: "NIT Hamirpur",
  dates: "9–11 October 2026",
  theme: "शिक्षा, प्रकृति और प्रगति — Education for Development and Harmony with Nature",
  year: "2026",
  eventHref: "/departments/academic-council",
  sections: [
    {
      title: "Chief Patron",
      badge: "Leadership",
      members: [
        m("Prof. Hiralal Murlidhar Suryawanshi", "Director, NIT Hamirpur"),
      ],
    },
    {
      title: "Patrons",
      members: [
        m("Prof. Laxmidhar Behera", "Director, IIT Mandi"),
        m("Prof. Sat Prakash Bansal", "Vice Chancellor, CUHP, Dharamshala"),
      ],
    },
    {
      title: "Co-Patrons",
      members: [
        m("Prof. Narender Kumar Sankhyan", "Registrar, CUHP Dharamshala"),
        m("Dr. Archana Nanoty", "Registrar, NIT Hamirpur"),
        m("Dr. Kumar Sambhav Pandey", "Registrar, IIT Mandi"),
      ],
    },
    {
      title: "Director",
      members: [
        m(
          "Dr. Thakur SKR",
          "Scientist/Engineer-SF, ISRO; Director, Department of Holistic Education"
        ),
      ],
    },
    {
      title: "Conveners",
      members: [
        m("Dr. Pawan Kumar Sharma", "NIT Hamirpur"),
        m("Dr. Shamsher Singh", "AB College, Pathankot"),
      ],
    },
    {
      title: "Secretaries",
      members: [
        m("Dr. Ravi", "NIT Hamirpur"),
        m("Dr. Jatinder Garg", "CoE, CUHP, Dharamshala"),
      ],
    },
    {
      title: "Joint Secretaries",
      members: [
        m("Smt. Sonu Sharma", "President, DHE"),
        m("Dr. Krishna Pandey", "Kurukshetra University, Kurukshetra"),
      ],
    },
    {
      title: "Advisory Committee",
      badge: "Advisory",
      members: [
        m("Sh. Desh Raj Sharma", "General Secretary, Vidya Bharti"),
        m("Sh. Vijay Nadda", "Organizing Secretary, Vidya Bharti NZ"),
        m("Sh. Bal Kishan", "Jt. Organizing Secretary, Vidya Bharti NZ"),
        m("Sh. Sukhraj Sethia", "President, Vidya Bharti NZ"),
        m("Smt. Deepti Dharmani", "Vice President, Vidya Bharti NZ"),
        m("Sh. Dilaram Chauhan", "General Secretary, Vidya Bharti NZ"),
        m("Sh. Chander Has Gupta", "Secretary, Vidya Bharti NZ"),
        m("Prof. Binod Kumar Kanaujia", "Director, NIT Jalandhar"),
        m("Prof. Suman Sharma", "CUHP, Dharamshala"),
        m("Prof. Pardeep Kumar", "Dean(A), CUHP, Dharamshala"),
        m("Dr. Vijay Sharma", "Registrar CUP, Bathinda"),
        m("Prof. Prem Lal Gautam", "Padma Shree Awardee"),
        m("Prof. Arvind Kumar", "Ex VC PU Patiala, IISER Mohali"),
        m("Prof. Kailash Chand", "Ex. VC, Kurukshetra University"),
        m("Prof. Surender Kashyap", "Ex VC, AMRU, Mandi"),
        m("Prof. Dev Dutt Sharma", "Ex VC SPU Mandi, HPU Shimla"),
        m("Prof. Anish Sachdeva", "NIT Jalandhar"),
        m("Prof. Sathans", "NIT Kurukshetra"),
        m("Prof. Sunil Dhingra", "Kurukshetra University, Kurukshetra"),
        m("Prof. Tarun Sharma", "NIPER Mohali"),
        m("Dr. Vijay Sharma", "NIT Srinagar"),
        m("Dr. Kartar Chand Sounkh", "Padma Shree Awardee"),
        m("Sh. Ajay Trehan", "NIT Jalandhar"),
        m("Sh. Nek Ram Sharma", "Padma Shree Awardee"),
        m("Sh. Hariman Sharma", "Padma Shree Awardee"),
      ],
    },
  ],
};

export const COMMITTEE_EDITION_6_0_ORGANIZERS =
  "Department of Holistic Education, A unit of Vidya Bharti Institute of Training and Research Trust in collaboration with NIT Hamirpur, IIT Mandi, CUHP, Dharamshala and Association of Indian Universities.";
