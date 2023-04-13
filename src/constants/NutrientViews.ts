import {type NutrientView} from '../types/tracking/NutrientView';

const Protein: NutrientView = {
  title: 'Protein',
  name: 'Protein',
  iconName: 'food-drumstick',
};

const Carbs: NutrientView = {
  title: 'Fat',
  name: 'Total lipid',
  iconName: 'water',
};

const Fat: NutrientView = {
  title: 'Carbohydrates',
  name: 'Carbohydrate',
  iconName: 'baguette',
};

const Fiber: NutrientView = {
  title: 'Fiber',
  name: 'Fiber',
  iconName: 'leaf',
};

export {Protein, Carbs, Fat, Fiber};
