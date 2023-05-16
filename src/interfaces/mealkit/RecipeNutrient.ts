// Table: mealkit.recipeNutrients
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=nutrients&schema=mealkit&view=table_structure

export interface RecipeNutrients {
  id: number;
  nutrientId: number;
  recipeId: number;
  amount: number;
}
