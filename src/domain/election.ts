import Lara from "../assets/lara-urna.jpg";

export type Office<TId extends string = string> = {
  readonly id: TId;
  readonly label: string;
  readonly digitCount: number;
};

export type Candidate<TOfficeId extends string = string> = {
  readonly id: string;
  readonly officeId: TOfficeId;
  readonly number: string;
  readonly name: string;
  readonly party: string;
  readonly photoSrc: string;
  readonly photoAlt: string;
};

export type Election<TOfficeId extends string = string> = {
  readonly id: string;
  readonly offices: readonly Office<TOfficeId>[];
  readonly candidates: readonly Candidate<TOfficeId>[];
};

export const simulatorOffice = {
  id: "councilor",
  label: "VEREADORA",
  digitCount: 5,
} as const satisfies Office<"councilor">;

export const simulatorElection = {
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
} as const satisfies Election<typeof simulatorOffice.id>;

export function findCandidate<TOfficeId extends string>(
  election: Election<TOfficeId>,
  office: Office<TOfficeId>,
  number: string,
): Candidate<TOfficeId> | undefined {
  return election.candidates.find(
    (candidate) => candidate.officeId === office.id && candidate.number === number,
  );
}
