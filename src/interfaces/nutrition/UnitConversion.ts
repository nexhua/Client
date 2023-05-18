// Table: nutrition.unitConversions
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=units&schema=nutrition&view=table_structure

export interface UnitConversion {
  id: number;
  fromUnitId: string;
  toUnitId: string;
  rate: number;
}
