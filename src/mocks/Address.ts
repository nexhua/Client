import {
  type District,
  type Address,
  type City,
  type Country,
} from '../interfaces/address/Address';
import {type UserAddress} from '../interfaces/address/UserAddress';

export const userAddresses: UserAddress[] = [
  {
    id: 0,
    addressId: 0,
    userId: 0,
    description: 'Ankaradaki eski evin adresi',
    index: 0,
    isActive: true,
    name: 'Bizim Ev',
  },
  {
    id: 1,
    addressId: 1,
    userId: 0,
    description: 'Ahmetin Evi',
    index: 1,
    isActive: false,
    name: 'Ahmet Ev',
  },
  {
    id: 2,
    addressId: 2,
    userId: 0,
    description: "Gizem'in Evi",
    index: 2,
    isActive: false,
    name: 'Gizem Ev',
  },
];

export const address: Address[] = [
  {
    id: 0,
    districtId: 25,
    building: 'Mozaik Apt.',
    door: '5',
    floor: '4',
    latitude: 39.925533,
    longitude: 32.866287,
    neighbourhood: 'Çamlıtepe Mah.',
    postalCode: '06590',
    street: 'Özgür Sk.',
  },
  {
    id: 1,
    districtId: 30,
    building: 'Rastgele Apt.',
    door: '2',
    floor: '1',
    latitude: 45.925533,
    longitude: 30.866287,
    neighbourhood: 'Maltepe Mah.',
    postalCode: '06580',
    street: 'Uzun Sk.',
  },
  {
    id: 2,
    districtId: 25,
    building: 'Yaşar Apt.',
    door: '9',
    floor: '3',
    latitude: 45.925533,
    longitude: 39.866287,
    neighbourhood: 'Kurtuluş Mah.',
    postalCode: '06690',
    street: 'Deli Sk.',
  },
];

export const district: District = {
  id: 25,
  cityId: 50,
  name: 'İç Anadolu',
};

export const city: City = {
  id: 50,
  countryId: 90,
  code: '50',
  name: 'Ankara',
};

export const country: Country = {
  id: 90,
  code: '90',
  name: 'Türkiye',
};
