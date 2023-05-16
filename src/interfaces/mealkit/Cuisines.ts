// Table: mealkit.cuisinesRecipes
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=cuisines&schema=mealkit&view=table_structure

export interface CuisineRecipes {
  cuisineId: number;
  recipeId: number;
}

// Table: mealkit.cuisines
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=cuisines&schema=mealkit&view=table_structure

export interface Cuisines {
  id: number;
  imageUrl: string;
  index: number;
  name: string;
}
