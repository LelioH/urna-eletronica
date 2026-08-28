import Lara from "../assets/lara-urna.jpg";
import type { Candidate } from "../domain/election";

export const simulatorCandidates = [
  {
    id: "lara-oliveira",
    officeId: "councilor",
    number: "12000",
    name: "LARA OLIVEIRA",
    party: "PDT",
    photoSrc: Lara,
    photoAlt: "Lara Oliveira",
    confirmationSound: "candidate-jingle",
  },
] as const satisfies readonly Candidate<"councilor">[];
