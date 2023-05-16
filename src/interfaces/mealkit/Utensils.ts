// Table: mealkit.recipeUtensils
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=recipeUtensils&schema=mealkit&view=table_structure

export interface RecipeUtensils {
  recipeId: number;
  utensilId: number;
}

// Table: mealkit.utensils
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=recipeUtensils&schema=mealkit&view=table_structure

export interface Utensils {
  id: number;
  code: string;
  name: string;
}
