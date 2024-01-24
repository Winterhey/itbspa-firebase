// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker';
import { addDoc, collection } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/firebase';
import { CUSTOMER_COLLECTION_NAME } from '@/firebase/firestore';
import { type ApiError } from '@/types/api';

type Data = string | ApiError;

const COUNT = 250;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    for (let i = 0; i < COUNT; i++) {
      await addDoc(collection(db, CUSTOMER_COLLECTION_NAME), {
        kd_KundenID: i + 1,
        kd_EMail: faker.internet.email(),
        kd_HNummer: faker.helpers.rangeToNumber({
          max: 250,
          min: 1,
        }),
        kd_Vorname: faker.person.firstName(),
        kd_Ort: faker.location.city(),
        kd_PLZ: faker.location.zipCode(),
        kd_Strasse: faker.location.street(),
        kd_Telefon: faker.phone.number(),
        kd_Name: faker.person.lastName(),
      });
    }

    res.status(201).json('Seeder run successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in Seeding', error });
  }
};

export default handler;
