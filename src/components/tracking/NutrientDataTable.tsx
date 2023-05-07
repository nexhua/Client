import React from 'react';
import {type FoodNutrient, type FoodInfo} from '../../interfaces/Food';
import {View} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
import i18n from '../../localization/_i18n';

export interface NutrientDataTableProps {
  food: FoodInfo;
}

function NutrientDataTable(props: NutrientDataTableProps): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    props.food.foodNutrients.length,
  );

  function createRow(foodNutrient: FoodNutrient, key: number): JSX.Element {
    return (
      <DataTable.Row key={key}>
        <DataTable.Cell>{foodNutrient.nutrient.name}</DataTable.Cell>
        <DataTable.Cell>{foodNutrient.amount}</DataTable.Cell>
        <DataTable.Cell>{foodNutrient.nutrient.unitName}</DataTable.Cell>
      </DataTable.Row>
    );
  }

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <View style={{marginTop: '4%'}}>
      <Text variant="headlineSmall">{i18n.t('nutrition-values')}</Text>
      <DataTable style={{marginBottom: '10%'}}>
        <DataTable.Header>
          <DataTable.Title>{i18n.t('nutrition')}</DataTable.Title>
          <DataTable.Title>{i18n.t('amount')}</DataTable.Title>
          <DataTable.Title>{i18n.t('unit')}</DataTable.Title>
        </DataTable.Header>

        {props.food.foodNutrients
          .slice(
            page * numberOfItemsPerPage,
            page * numberOfItemsPerPage + numberOfItemsPerPage,
          )
          .map((foodNutrient, i) => {
            return createRow(foodNutrient, i);
          })}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(
            props.food.foodNutrients.length / numberOfItemsPerPage,
          )}
          onPageChange={page => {
            setPage(page);
          }}
          label={`${from + 1}-${to} of ${props.food.foodNutrients.length}`}
          showFastPaginationControls
          numberOfItemsPerPage={numberOfItemsPerPage}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  );
}

export default NutrientDataTable;
