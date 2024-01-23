// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs, query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/firebase';
import {
  CUSTOMER_COLLECTION_NAME,
  type CustomerCollection,
} from '@/firebase/firestore';
import { type ApiError } from '@/types/api';
import { type Customer } from '@/types/models/Customer';

type Data = Customer | Customer[] | ApiError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const q = query<CustomerCollection, CustomerCollection>(
          collection(db, CUSTOMER_COLLECTION_NAME),
        );

        const querySnapshot = await getDocs(q);

        const customers: Customer[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            customerNumber: data.kd_KundenID,
            email: data.kd_EMail,
            houseNumber: data.kd_HNummer,
            firstname: data.kd_Vorname,
            city: data.kd_Ort,
            postalCode: data.kd_PLZ,
            street: data.kd_Strasse,
            phoneNumber: data.kd_Telefon,
            lastname: data.kd_Name,
          } satisfies Customer;
        });

        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ message: 'Error getting items' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
