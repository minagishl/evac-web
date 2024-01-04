export type FooterContent = {
  name: string;
  href: string;
};

export type Shelter = {
  id: string;
  shelter_name: string;
  representative_name: string;
  shelter_type: string;
  address: string;
  phone_number: string;
  population_age_0_15: number;
  population_age_16_59: number;
  population_age_60_above: number;
  male_population: number;
  female_population: number;
  supplies_not_needed: string;
  supplies_needed: string;
  remarks: string | null;
  photo_url: string;
  is_emergency: boolean;
  created_at: Date;
  updated_at: Date;
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
