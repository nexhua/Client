// Table: mealkit.favoriteCuisines
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=favoriteCuisines&schema=mealkit&view=table_structure

export interface FavoriteCuisines {
  id: number;
  cuisineId: number;
  userId: number;
}

// Table: mealkit.favoriteRecipes
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=favoriteRecipes&schema=mealkit&view=table_structure

export interface FavoriteRecipes {
  id: number;
  recipeId: number;
  userId: number;
}
