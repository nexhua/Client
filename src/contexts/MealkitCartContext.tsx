import React from 'react';
import {type ShoppingCart} from '../interfaces/cart/ShoppingCart';
import {type Recipe} from '../interfaces/mealkit/Recipe';

export interface CartContext {
  cart: ShoppingCart<Recipe>;
  setCart: (cart: ShoppingCart<Recipe>) => unknown;
}

export const MealkitCartContext = React.createContext<CartContext>({
  cart: {items: []},
  setCart: () => [],
});
