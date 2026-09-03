import { ACADEMIC_CONFERENCE_TRACKS } from "@/data/academic-council-tracks";

const tracks = ACADEMIC_CONFERENCE_TRACKS.map((track) => ({
  title: track.titleEn,
  details: track.details,
  coordinators: track.coordinators,
}));

export { tracks };
export type Track = (typeof tracks)[number];
