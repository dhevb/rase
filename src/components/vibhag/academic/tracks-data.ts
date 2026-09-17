import { ACADEMIC_CONFERENCE_TRACKS } from "@/data/academic-council-tracks";

const tracks = ACADEMIC_CONFERENCE_TRACKS.map((track) => ({
  title: track.titleEn,
  titleHi: track.titleHi,
  topics: track.topics,
  details: track.details,
  coordinators: track.coordinators,
}));

export { tracks };
export type Track = (typeof tracks)[number];
