// Table: mealkit.recipes
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=recipes&schema=mealkit&view=table_structure

export interface Recipe {
  id: number;
  authorId: number;
  foodId: number;
  mainCategoryId: number;
  mainCuisineId: number;
  createdAt: Date;
  description: string;
  difficulty: number;
  imageUrl: string;
  isAvailable: boolean;
  isDeliverable: boolean;
  isVisible: boolean;
  name: string;
  price: number;
  servings: number;
  servingSize: number;
  totalTime: number;
}
