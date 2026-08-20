import Lara from "../assets/lara-urna.jpg";

export type Office = {
  id: string;
  label: string;
  digitCount: number;
};

export type Candidate = {
  id: string;
  officeId: Office["id"];
  number: string;
  name: string;
  party: string;
  photoSrc: string;
  photoAlt: string;
};

export type Election = {
  id: string;
  offices: Office[];
  candidates: Candidate[];
};

export const simulatorOffice: Office = {
  id: "councilor",
  label: "VEREADORA",
  digitCount: 5,
};

export const simulatorElection: Election = {
  id: "urna-demo",
  offices: [simulatorOffice],
  candidates: [
    {
      id: "lara-oliveira",
      officeId: simulatorOffice.id,
      number: "12000",
      name: "LARA OLIVEIRA",
      party: "PDT",
      photoSrc: Lara,
      photoAlt: "Lara Oliveira",
    },
  ],
};

export function findCandidate(
  election: Election,
  office: Office,
  number: string,
): Candidate | undefined {
  return election.candidates.find(
    (candidate) =>
      candidate.officeId === office.id && candidate.number === number,
  );
}
