import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAppTheme} from './Theme';

interface StyledDropdownProps {
  value: string | null;
  items: Item[];
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Item {
  label: string;
  value: string;
}

function StyledDropdown(props: StyledDropdownProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(props.items);

  const theme = useAppTheme();

  return (
    <DropDownPicker
      open={open}
      value={props.value}
      items={items}
      setOpen={setOpen}
      setValue={props.setValue}
      setItems={setItems}
      style={{backgroundColor: theme.colors.surfaceVariant}}
      dropDownContainerStyle={{
        backgroundColor: theme.colors.surfaceVariant,
      }}
    />
  );
}

export default StyledDropdown;
