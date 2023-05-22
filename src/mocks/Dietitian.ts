import {type NutritionistAppointment} from '../interfaces/dietitian/Appointment';
import {type NutritionistClient} from '../interfaces/dietitian/Client';
import {type Nutritionist} from '../interfaces/dietitian/Dietitian';
import {type WorkingHours} from '../interfaces/dietitian/WorkingHours';

export const dietitian: Nutritionist = {
  id: 213123,
  addressId: 2133213,
  userId: 213213,
  address: 'Mebusevleri Şirin Sokak 22/7',
  biography: 'Gazi Üniversitesi Mezunu',
  isAvailable: true,
  isDietitian: true,
  isVisible: true,
  name: 'İlknur Aydoğan',
  photoUrl:
    'https://149937275.v2.pressablecdn.com/wp-content/uploads/2021/01/hero-how-to-become-a-dietitian-390x390-1.jpg',
  title: 'Dr.',
};

export const clients: NutritionistClient[] = [
  {
    id: 0,
    nutritionistId: 213123,
    userId: 15,
    name: 'John Doe',
    notes: null,
    photoUrl: null,
    privateNotes: null,
  },
  {
    id: 1,
    nutritionistId: 213123,
    userId: 16,
    name: 'Jeremy Clarkson',
    notes: null,
    photoUrl: null,
    privateNotes: null,
  },
  {
    id: 2,
    nutritionistId: 213123,
    userId: 17,
    name: 'James May',
    notes: null,
    photoUrl: null,
    privateNotes: null,
  },
  {
    id: 3,
    nutritionistId: 213123,
    userId: 25,
    name: 'Richard Hammond',
    notes: null,
    photoUrl: null,
    privateNotes: null,
  },
];

export const appointments: NutritionistAppointment[] = [
  {
    id: 0,
    clientId: 27,
    createdAt: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    dateTime: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    notes: 'Lütfen ölçüm yapılabilmesi için aç geliniz.',
  },
  {
    id: 1,
    clientId: 27,
    createdAt: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    dateTime: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    notes: null,
  },
  {
    id: 2,
    clientId: 27,
    createdAt: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    dateTime: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    notes: null,
  },
  {
    id: 3,
    clientId: 27,
    createdAt: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    dateTime: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    notes: null,
  },
  {
    id: 4,
    clientId: 27,
    createdAt: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    dateTime: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    notes: null,
  },
  {
    id: 5,
    clientId: 27,
    createdAt: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    dateTime: new Date('Fri May 15 2023 14:00:00 GMT+0300 (GMT+03:00)'),
    notes: null,
  },
  {...randomAppointment(6)},
  {...randomAppointment(7)},
  {...randomAppointment(8)},
  {...randomAppointment(9)},
  {...randomAppointment(10)},
  {...randomAppointment(11)},
  {...randomAppointment(12)},
  {...randomAppointment(13)},
  {...randomAppointment(14)},
  {...randomAppointment(15)},
  {...randomAppointment(16)},
  {...randomAppointment(17)},
  {...randomAppointment(18)},
];

export const workingHours: WorkingHours[] = [
  {
    id: 1,
    nutritionistId: 213123,
    startsAt: 9,
    endsAt: 17,
    weekday: 1,
  },
  {
    id: 2,
    nutritionistId: 213123,
    startsAt: 9,
    endsAt: 17,
    weekday: 2,
  },
  {
    id: 3,
    nutritionistId: 213123,
    startsAt: 9,
    endsAt: 17,
    weekday: 3,
  },
  {
    id: 4,
    nutritionistId: 213123,
    startsAt: 9,
    endsAt: 17,
    weekday: 4,
  },
  {
    id: 5,
    nutritionistId: 213123,
    startsAt: 9,
    endsAt: 17,
    weekday: 5,
  },
  {
    id: 6,
    nutritionistId: 213123,
    startsAt: 12,
    endsAt: 16,
    weekday: 6,
  },
];

function randomAppointment(id: number): NutritionistAppointment {
  const date = new Date();

  date.setDate(date.getDate() + 2);

  const randomHour = 9 + Math.floor(Math.random() * 9);

  let randomMinute = 0;

  const random = Math.random();
  if (random > 0.66) {
    randomMinute = 40;
  } else if (random > 0.33) {
    randomMinute = 20;
  } else {
    randomMinute = 0;
  }

  date.setHours(randomHour, randomMinute, 0, 0);

  return {id, clientId: 27, createdAt: new Date(), dateTime: date, notes: null};
}
