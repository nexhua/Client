import {
  type IngredientAllergens,
  type Allergens,
} from '../interfaces/mealkit/Allergens';
import {
  type RecipeIngredients,
  type Ingredients,
} from '../interfaces/mealkit/Ingredients';
import {type Instructions} from '../interfaces/mealkit/Instructions';
import {type Recipe} from '../interfaces/mealkit/Recipe';
import {type RecipeNutrients} from '../interfaces/mealkit/RecipeNutrient';
import {type Units} from '../interfaces/mealkit/Units';
import {
  type RecipeUtensils,
  type Utensils,
} from '../interfaces/mealkit/Utensils';

export const recipe: Recipe = {
  id: 2131,
  authorId: 24,
  foodId: 21,
  mainCategoryId: 52,
  mainCuisineId: 2,
  createdAt: new Date(),
  description:
    'For this fajita-inspired meal, our chefs thought outside the box—errr, tortilla—to create some epic bowls. You’ll start with buttery rice, saucy spiced pork, and sautéed peppers and onions, then jazz things up with Monterey Jack cheese, pico de gallo, chili lime crema, and blue corn tortilla chips. Go wild when you assemble your bowl—that’s the beauty of making it yourself!',
  difficulty: 3,
  imageUrl:
    'https://img.hellofresh.com/q_40,w_1920,f_auto,c_limit,fl_lossy/hellofresh_s3/image/pork-fajita-bowls-d36b877f.jpg',
  isAvailable: true,
  isDeliverable: true,
  isVisible: true,
  name: 'Pork Fajita Bowls',
  price: 23.59,
  servings: 4,
  servingSize: 8,
  totalTime: 25,
};

export const recipeUtensils: RecipeUtensils[] = [
  {
    recipeId: 2131,
    utensilId: 0,
  },
  {
    recipeId: 2131,
    utensilId: 1,
  },
  {
    recipeId: 2131,
    utensilId: 2,
  },
  {
    recipeId: 2131,
    utensilId: 3,
  },
  {
    recipeId: 2131,
    utensilId: 4,
  },
];

export const utensils: Utensils[] = [
  {
    id: 0,
    code: '000',
    name: 'Baking Sheet',
  },
  {
    id: 1,
    code: '001',
    name: 'Small Bowl',
  },
  {
    id: 2,
    code: '002',
    name: 'Whisk',
  },
  {
    id: 3,
    code: '003',
    name: 'Patato Masher',
  },
  {
    id: 4,
    code: '004',
    name: 'Strainer',
  },
];

export const instructions: Instructions[] = [
  {
    id: 0,
    recipeId: 2131,
    index: 0,
    text: 'Adjust rack to top position and preheat oven to 450 degrees. Bring 1 TBSP butter (2 TBSP for 4 servings) to room temperature. Wash and dry produce. • Cut potatoes into ½-inch-thick wedges. Peel and mince garlic. Trim and thinly slice scallions, separating whites from greens; mince whites. Pick and mince fronds from dill. Thinly slice tomato and season with salt and pepper.',
  },
  {
    id: 3,
    recipeId: 2131,
    index: 3,
    text: 'Drain and rinse chickpeas. Place half the chickpeas (all for 4 servings) in a large bowl. Mash with a potato masher or fork until almost smooth. TIP: It’s OK if there are some larger pieces. • Stir in garlic, scallion whites, half the scallion greens, half the dill, half the curry powder, 3 TBSP tempura batter mix (be sure to measure; we sent more), and 2 TBSP water until thoroughly combined. (For 4, use all the curry powder, 6 TBSP tempura batter mix, and 4 TBSP water.) Taste and season with salt (we used ¼ tsp; ½ tsp for 4) and pepper. • Divide chickpea mixture into two mounds (four mounds for 4).',
  },
  {
    id: 2,
    recipeId: 2131,
    index: 2,
    text: 'In a small bowl, whisk together mayonnaise, mustard, jam, half the turmeric (all for 4 servings), and 2 tsp vinegar (4 tsp for 4) until combined. (Be sure to measure the vinegar—we sent more.) Taste and season with salt and pepper.',
  },
  {
    id: 1,
    recipeId: 2131,
    index: 1,
    text: 'Toss potatoes on a baking sheet with a drizzle of olive oil and a pinch of salt and pepper. • Roast on top rack until browned and tender, 20-25 minutes.',
  },
];

export const recipeIngredients: RecipeIngredients[] = [
  {
    id: 0,
    ingredientId: 25,
    recipeId: 2131,
    amount: 1,
    amountUnitId: 2,
    index: 0,
    isDelivered: false,
  },
  {
    id: 1,
    ingredientId: 28,
    recipeId: 2131,
    amount: 1,
    amountUnitId: 0,
    index: 1,
    isDelivered: false,
  },
  // Randomly generated objects
  {
    id: 2,
    ingredientId: 40,
    recipeId: 2131,
    amount: 3,
    amountUnitId: 3,
    index: 2,
    isDelivered: false,
  },
  {
    id: 3,
    ingredientId: 39,
    recipeId: 2131,
    amount: 2,
    amountUnitId: 1,
    index: 3,
    isDelivered: false,
  },
  {
    id: 4,
    ingredientId: 33,
    recipeId: 2131,
    amount: 5,
    amountUnitId: 1,
    index: 4,
    isDelivered: false,
  },
  {
    id: 5,
    ingredientId: 26,
    recipeId: 2131,
    amount: 4,
    amountUnitId: 2,
    index: 5,
    isDelivered: false,
  },
  {
    id: 6,
    ingredientId: 37,
    recipeId: 2131,
    amount: 1,
    amountUnitId: 0,
    index: 6,
    isDelivered: false,
  },
  {
    id: 7,
    ingredientId: 31,
    recipeId: 2131,
    amount: 2,
    amountUnitId: 1,
    index: 7,
    isDelivered: false,
  },
  {
    id: 8,
    ingredientId: 35,
    recipeId: 2131,
    amount: 3,
    amountUnitId: 1,
    index: 8,
    isDelivered: false,
  },
  {
    id: 9,
    ingredientId: 29,
    recipeId: 2131,
    amount: 1,
    amountUnitId: 3,
    index: 9,
    isDelivered: false,
  },
  {
    id: 10,
    ingredientId: 27,
    recipeId: 2131,
    amount: 2,
    amountUnitId: 0,
    index: 10,
    isDelivered: false,
  },
  {
    id: 11,
    ingredientId: 40,
    recipeId: 2131,
    amount: 3,
    amountUnitId: 0,
    index: 11,
    isDelivered: false,
  },
  {
    id: 12,
    ingredientId: 31,
    recipeId: 2131,
    amount: 5,
    amountUnitId: 1,
    index: 12,
    isDelivered: false,
  },
  {
    id: 13,
    ingredientId: 30,
    recipeId: 2131,
    amount: 4,
    amountUnitId: 0,
    index: 13,
    isDelivered: false,
  },
  {
    id: 14,
    ingredientId: 32,
    recipeId: 2131,
    amount: 2,
    amountUnitId: 2,
    index: 14,
    isDelivered: false,
  },
  {
    id: 15,
    ingredientId: 36,
    recipeId: 2131,
    amount: 1,
    amountUnitId: 3,
    index: 15,
    isDelivered: false,
  },
  {
    id: 16,
    ingredientId: 38,
    recipeId: 2131,
    amount: 3,
    amountUnitId: 1,
    index: 16,
    isDelivered: false,
  },
  {
    id: 17,
    ingredientId: 42,
    recipeId: 2131,
    amount: 2,
    amountUnitId: 2,
    index: 17,
    isDelivered: false,
  },
  {
    id: 18,
    ingredientId: 41,
    recipeId: 2131,
    amount: 4,
    amountUnitId: 0,
    index: 18,
    isDelivered: false,
  },
  {
    id: 19,
    ingredientId: 26,
    recipeId: 2131,
    amount: 1,
    amountUnitId: 3,
    index: 19,
    isDelivered: false,
  },
  {
    id: 20,
    ingredientId: 37,
    recipeId: 2131,
    amount: 3,
    amountUnitId: 1,
    index: 20,
    isDelivered: false,
  },
];

export const ingredients: Ingredients[] = [
  {
    id: 25,
    foodId: 2131,
    code: '25',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/6283a92d8766133d500324c1-28662181.png',
    name: 'Potatoes',
  },
  {
    id: 26,
    foodId: 2131,
    code: '26',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/554a363df8b25e1d268b456b-15867d90.png',
    name: 'Garlic',
  },
  {
    id: 27,
    foodId: 2131,
    code: '27',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/556728a04dab71a90d8b456a-a580bdf4.png',
    name: 'Tomato',
  },
  {
    id: 28,
    foodId: 2131,
    code: '28',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/5a783a37d56afa7d6f450259-c11fdcab.png',
    name: 'Mayonnaise',
  },
  {
    id: 30,
    foodId: 2131,
    code: '30',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/6283a92d8766133d500324c1-28662181.png',
    name: 'Mayonnaise',
  },
  {
    id: 31,
    foodId: 2131,
    code: '31',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/55670c96f8b25eae2c8b4567-1f781ded.png',
    name: 'Apricot Jam',
  },
  {
    id: 32,
    foodId: 2131,
    code: '32',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/image/554a4024f8b25e1d268b4570.png',
    name: 'Chickpeas',
  },
  {
    id: 33,
    foodId: 2131,
    code: '33',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/image/55560f58fd2cb9891f8b4567.png',
    name: 'Curry Powder',
  },
  {
    id: 34,
    foodId: 2131,
    code: '25',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/554a301f4dab71626c8b4569-015d8d9b.png',
    name: 'Scallions',
  },
  {
    id: 35,
    foodId: 2131,
    code: '26',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/554a4010f8b25e1c268b456b-f9e2134b.png',
    name: 'Dill',
  },
  {
    id: 36,
    foodId: 2131,
    code: '27',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/image/5550dc7bfd2cb974658b456a.png',
    name: 'White Wine Vinegar',
  },
  {
    id: 37,
    foodId: 2131,
    code: '28',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/image/5550e0454dab718e128b456f.png',
    name: 'Dijon Mustard',
  },
  {
    id: 38,
    foodId: 2131,
    code: '29',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/image/55560f464dab71d3718b4567.png',
    name: 'Turmeric',
  },
  {
    id: 40,
    foodId: 2131,
    code: '30',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/605b68588f34b72089545d98-bbbdd5f6.png',
    name: 'Tempura Batte',
  },
  {
    id: 41,
    foodId: 2131,
    code: '31',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/55670c96f8b25eae2c8b4567-1f781ded.png',
    name: 'Apricot Jam',
  },
  {
    id: 42,
    foodId: 2131,
    code: '32',
    imageUrl:
      'https://img.hellofresh.com/w_96,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/ingredient/555395a4fd2cb9ae048b4568-653a6cff.png',
    name: 'Brioche Buns',
  },
];

export const ingredientAllergens: IngredientAllergens[] = [
  {
    allergenId: 0,
    ingredientId: 28,
  },
  {
    allergenId: 1,
    ingredientId: 28,
  },
  {
    allergenId: 2,
    ingredientId: 42,
  },
];

export const allergens: Allergens[] = [
  {
    id: 0,
    code: '000',
    description: 'Chicken produce',
    name: 'Eggs',
  },
  {
    id: 1,
    code: '001',
    description: 'Cow milk',
    name: 'Milk',
  },
  {
    id: 2,
    code: '002',
    description: 'Sesame',
    name: 'Sesame',
  },
];

export const units: Units[] = [
  {
    id: 0,
    name: 'tablespoon',
    symbol: 'tbs',
  },
  {
    id: 1,
    name: 'gram',
    symbol: 'g',
  },
  {
    id: 2,
    name: 'unit',
    symbol: '',
  },
  {
    id: 3,
    name: 'cup',
    symbol: '',
  },
];

export const recipeNutrients: RecipeNutrients[] = [
  {
    id: 0,
    nutrientId: 0,
    recipeId: 2131,
    amount: 2,
  },
  {
    id: 1,
    nutrientId: 6,
    recipeId: 2131,
    amount: 5,
  },
  {
    id: 2,
    nutrientId: 13,
    recipeId: 2131,
    amount: 2,
  },
  {
    id: 3,
    nutrientId: 11,
    recipeId: 2131,
    amount: 1,
  },
  {
    id: 4,
    nutrientId: 3,
    recipeId: 2131,
    amount: 8,
  },
  {
    id: 5,
    nutrientId: 9,
    recipeId: 2131,
    amount: 3,
  },
  {
    id: 6,
    nutrientId: 5,
    recipeId: 2131,
    amount: 4,
  },
  {
    id: 7,
    nutrientId: 14,
    recipeId: 2131,
    amount: 2,
  },
  {
    id: 8,
    nutrientId: 2,
    recipeId: 2131,
    amount: 7,
  },
  {
    id: 9,
    nutrientId: 10,
    recipeId: 2131,
    amount: 6,
  },
  {
    id: 10,
    nutrientId: 8,
    recipeId: 2131,
    amount: 4,
  },
  {
    id: 11,
    nutrientId: 12,
    recipeId: 2131,
    amount: 3,
  },
  {
    id: 12,
    nutrientId: 1,
    recipeId: 2131,
    amount: 9,
  },
  {
    id: 13,
    nutrientId: 7,
    recipeId: 2131,
    amount: 2,
  },
  {
    id: 14,
    nutrientId: 4,
    recipeId: 2131,
    amount: 7,
  },
  {
    id: 15,
    nutrientId: 15,
    recipeId: 2131,
    amount: 1,
  },
];
