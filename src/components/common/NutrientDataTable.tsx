import React from 'react';
import {View} from 'react-native';
import {DataTable} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {type Nutrient} from '../../interfaces/nutrition/Nutrient';
import {type Units} from '../../interfaces/mealkit/Units';

export interface NutrientReference {
  nutrientId: number;
  amount: number;
}

export interface NutrientDataTableProps<T extends NutrientReference> {
  foodNutrients: T[];
  nutrients: Nutrient[];
  units: Units[];
  rate: number;
}

function NutrientDataTable<T extends NutrientReference>(
  props: NutrientDataTableProps<T>,
): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    props.foodNutrients.length,
  );

  function createRow(foodNutrient: T, key: number): JSX.Element {
    const nutrient = props.nutrients.find(
      nutrient => nutrient.id === foodNutrient.nutrientId,
    );

    const unit = props.units.find(elem => elem.id === nutrient?.unitId);

    return (
      <DataTable.Row key={key}>
        <DataTable.Cell>{nutrient?.name}</DataTable.Cell>
        <DataTable.Cell>
          {props.rate !== 1.0
            ? (foodNutrient.amount * props.rate).toFixed(1)
            : foodNutrient.amount}
        </DataTable.Cell>
        <DataTable.Cell>{unit?.name}</DataTable.Cell>
      </DataTable.Row>
    );
  }

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{i18n.t('nutrition')}</DataTable.Title>
          <DataTable.Title>{i18n.t('amount')}</DataTable.Title>
          <DataTable.Title>{i18n.t('unit')}</DataTable.Title>
        </DataTable.Header>

        {props.foodNutrients
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
            props.foodNutrients.length / numberOfItemsPerPage,
          )}
          onPageChange={page => {
            setPage(page);
          }}
          label={`${from + 1}-${to} of ${props.foodNutrients.length}`}
          showFastPaginationControls
          numberOfItemsPerPage={numberOfItemsPerPage}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  );
}

export default NutrientDataTable;
