// Table: mealkit.ingredients
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=ingredients&schema=mealkit&view=table_structure

export interface RecipeIngredients {
  id: number;
  ingredientId: number;
  recipeId: number;
  amount: number;
  amountUnitId: number;
  index: number;
  isDelivered: boolean;
}

// Table: mealkit.ingredients
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=ingredients&schema=mealkit&view=table_structure

export interface Ingredients {
  id: number;
  foodId: number;
  code: string;
  imageUrl: string;
  name: string;
}
