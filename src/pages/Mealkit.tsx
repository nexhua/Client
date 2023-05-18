import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RecipeCard from '../components/mealkit/RecipeCard';
import {recipe, instructions} from '../mocks/Recipe';
import Product from '../components/common/Product';
import {type Recipe} from '../interfaces/mealkit/Recipe';
import RecipeDetailModal from '../modals/RecipeDetailModal';
import {MealkitCartContext} from '../contexts/MealkitCartContext';
import {type ShoppingCart} from '../interfaces/cart/ShoppingCart';
import {Searchbar} from 'react-native-paper';
import i18n from '../localization/_i18n';

function Mealkit(): JSX.Element {
  const [recipes, setRecipes] = React.useState<Array<Product<Recipe>>>([]);
  const [recipeModalVisible, setRecipeModalVisible] = React.useState(false);
  const [recipeDetail, setRecipeDetail] = React.useState<Recipe>();
  const {cart, setCart} = React.useContext(MealkitCartContext);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const fetchedRecipes: Array<Product<Recipe>> = [];
    for (let i = 0; i < 10; i++) {
      // TO DO: Remove this logic when actual fetch happens
      const newRecipe = {...recipe};
      newRecipe.id += i;
      fetchedRecipes.push(new Product<Recipe>(newRecipe, 0));
    }

    setRecipes(fetchedRecipes);
  }, []);

  function hideRecipeDetailModal(): void {
    setRecipeModalVisible(false);
  }

  function updateCart(item: Product<Recipe>): ShoppingCart<Recipe> {
    const shoppingCart: ShoppingCart<Recipe> = {items: cart.items};

    const index = shoppingCart.items.findIndex(
      elem => elem.item.id === item.getProduct().id,
    );

    // If item already is in the cart
    if (index !== -1) {
      // If we removed the item
      if (item.getAmount() === 0) {
        shoppingCart.items.splice(index, 1);
      } else {
        // If we increased the amount of an existing item
        shoppingCart.items[index].amount = item.getAmount();
      }
    } else {
      // If the item is not in the cart, add

      if (item.getAmount() > 0) {
        shoppingCart.items.push({
          item: item.getProduct(),
          amount: item.getAmount(),
        });
      }
    }

    return shoppingCart;
  }

  return (
    <View style={style.container}>
      <Searchbar
        placeholder={i18n.t('search-food')}
        value={query}
        onChangeText={(text: string) => {
          setQuery(text);
        }}
        mode="view"
      />
      <ScrollView contentContainerStyle={style.scroll}>
        {recipes.map((elem, i) => {
          return (
            <RecipeCard
              key={`${elem.product.id}_${elem.amount}_${i}`}
              recipe={recipe}
              amount={elem.amount}
              onPress={() => {
                setRecipeDetail(elem.product);
                setRecipeModalVisible(true);
              }}
              onAdd={() => {
                elem.add();
                setCart(updateCart(elem));
                setRecipes([...recipes]);
              }}
              onSubtract={() => {
                elem.subtract();
                setCart(updateCart(elem));
                setRecipes([...recipes]);
              }}
            />
          );
        })}
      </ScrollView>

      {recipeDetail !== undefined && (
        <RecipeDetailModal
          visible={recipeModalVisible}
          onDismiss={hideRecipeDetailModal}
          recipe={recipeDetail}
          instructions={instructions}
          isFavorite={Math.floor(Math.random() * 2) > 1}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: '5%',
  },
  scroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Mealkit;
