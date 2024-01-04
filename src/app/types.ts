export type FooterContent = {
  name: string;
  href: string;
};

export type Shelter = {
  Id: string;
  ShelterName: string;
  RepresentativeName: string;
  ShelterType: string;
  Address: string;
  PhoneNumber: string;
  ShelterPopulation0to15: number;
  ShelterPopulation16to59: number;
  ShelterPopulation60andAbove: number;
  Male: number;
  Female: number;
  ShelterSuppliesNotNeeded: boolean;
  ShelterSuppliesNeeded: boolean;
  Remarks: string;
  Photo: string;
};

export type Members = {
  ShelterPopulation0to15: number;
  ShelterPopulation16to59: number;
  ShelterPopulation60andAbove: number;
  ShelterPopulationMale: number;
  ShelterPopulationFemale: number;
  match: boolean;
};

export type Fixtures = {
  ShelterSuppliesNotNeeded: string;
  ShelterSuppliesNeeded: string;
};
