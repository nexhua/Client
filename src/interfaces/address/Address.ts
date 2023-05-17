// Table: address.addresses
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=addresses&schema=address&view=table_structure

export interface Address {
  id: number;
  districtId: number;
  building: string;
  door: string;
  floor: string;
  latitude: number;
  longitude: number;
  neighbourhood: string;
  postalCode: string;
  street: string;
}

// Table: address.districts
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=addresses&schema=address&view=table_structure

export interface District {
  id: number;
  cityId: number;
  name: string;
}

// Table: address.cities
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=cities&schema=address&view=table_structure

export interface City {
  id: number;
  countryId: number;
  code: string;
  name: string;
}

// Table: address.countries
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=cities&schema=address&view=table_structure

export interface Country {
  id: number;
  code: string;
  name: string;
}
