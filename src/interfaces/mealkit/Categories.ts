// Table: mealkit.categoryRecipes
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=recipeCategories&schema=mealkit&view=table_structure

export interface CategoryRecipes {
  categoryId: number;
  recipeId: number;
}

// Table: mealkit.categories
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=recipeCategories&schema=mealkit&view=table_structure

export interface Categories {
  id: number;
  code: string;
  description: string;
  imageUrl: string;
  index: number;
  isVisible: boolean;
  name: string;
}
