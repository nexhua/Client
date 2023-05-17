// Table: mealkit.ingredientAllergens
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=allergens&schema=mealkit&view=table_structure

export interface IngredientAllergens {
  allergenId: number;
  ingredientId: number;
}

// Table: mealkit.allergens
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=allergens&schema=mealkit&view=table_structure

export interface Allergens {
  id: number;
  code: string;
  description: string | null;
  name: string;
}
