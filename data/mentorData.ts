import { TRAINERS_DATA, Trainer } from "./trainersData";

export interface Mentor {
  id: string;
  name: string;
  role: string;
  image: string;
  qualifications: string[];
  objectPosition?: string;
}

export const MENTORS_DATA: Mentor[] = TRAINERS_DATA.map((t) => ({
  id: t.id,
  name: t.name,
  role: t.designation,
  image: t.image,
  qualifications: t.qualifications,
  objectPosition: t.objectPosition,
}));

export { TRAINERS_DATA };
export type { Trainer };
