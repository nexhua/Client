import React from 'react';
import {View} from 'react-native';
import {DataTable} from 'react-native-paper';
import i18n from '../../localization/_i18n';
import {type FoodNutrient} from '../../interfaces/nutrition/Nutrient';
import {units} from '../../mocks/Recipe';

export interface NutrientDataTableProps {
  nutrients: FoodNutrient[];
}

function NutrientDataTable(props: NutrientDataTableProps): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    props.nutrients.length,
  );

  function createRow(foodNutrient: FoodNutrient, key: number): JSX.Element {
    return (
      <DataTable.Row key={key}>
        <DataTable.Cell>{foodNutrient.nutrient.name}</DataTable.Cell>
        <DataTable.Cell>{foodNutrient.amount}</DataTable.Cell>
        <DataTable.Cell>
          {units.find(elem => elem.id === foodNutrient.nutrient.unitId)?.name}
        </DataTable.Cell>
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

        {props.nutrients
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
            props.nutrients.length / numberOfItemsPerPage,
          )}
          onPageChange={page => {
            setPage(page);
          }}
          label={`${from + 1}-${to} of ${props.nutrients.length}`}
          showFastPaginationControls
          numberOfItemsPerPage={numberOfItemsPerPage}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  );
}

export default NutrientDataTable;
