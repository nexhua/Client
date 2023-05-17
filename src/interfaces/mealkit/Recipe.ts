// Table: mealkit.recipes
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=recipes&schema=mealkit&view=table_structure

export interface Recipe {
  id: number;
  authorId: number;
  foodId: number | null;
  mainCategoryId: number;
  mainCuisineId: number;
  createdAt: Date;
  description: string | null;
  difficulty: number;
  imageUrl: string | null;
  isAvailable: boolean;
  isDeliverable: boolean;
  isVisible: boolean;
  name: string;
  price: number;
  servings: number;
  servingSize: number;
  totalTime: number;
}
