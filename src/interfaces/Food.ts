export interface FoodInfo {
  foodClass: string;
  description: string;
  foodNutrients: FoodNutrient[];
  foodCode: string;
  startDate: string;
  endDate: string;
  wweiaFoodCategory: {
    wweiaFoodCategoryCode: number;
    wweiaFoodCategoryDescription: string;
  };
  fdcId: number;
  dataType: string;
  publicationDate: string;
  foodPortions: FoodPortion[];
  inputFoods: Food[];
}

export interface Food {
  id: number;
  unit: string;
  portionDescription: string;
  portionCode: string;
  foodDescription: string;
  sequenceNumber: number;
  amount: number;
  ingredientCode: number;
  ingredientWeight: number;
  ingredientDescription: string;
}

export interface FoodNutrient {
  type: 'string';
  id: number;
  nutrient: Nutrient;
  amount: number;
}

export interface Nutrient {
  id: number;
  number: string;
  name: string;
  rank: number;
  unitName: string;
}

export interface FoodPortion {
  id: number;
  measureUnit: MeasureUnit;
  modifier: string;
  gramWeight: number;
  sequenceNumber: number;
  portionDescription: string;
}

export interface MeasureUnit {
  id: number;
  name: string;
  abbreviation: string;
}
