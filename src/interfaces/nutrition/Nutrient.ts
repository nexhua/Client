// Table: nutrition.nutrients
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=nutrients&schema=nutrition&view=table_structure

export interface Nutrient {
  id: number;
  code: string;
  name: string;
  parentId: number;
  unitId: number;
}

export interface FoodNutrient {
  nutrient: Nutrient;
  amount: number;
}
