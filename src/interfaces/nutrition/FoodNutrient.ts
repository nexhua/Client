// Table: nutrition.foodNutrients
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=foodNutrients&schema=nutrition&view=table_structure

export interface FoodNutrient {
  id: number;
  foodId: number;
  nutrientId: number;
  amount: number;
}
