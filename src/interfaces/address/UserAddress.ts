// Table: addresses.userAddresses
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=userAddresses&schema=address&view=table_structure

export interface UserAddress {
  id: number;
  addressId: number;
  userId: number;
  description: string;
  index: number;
  isActive: boolean;
  name: string;
}
