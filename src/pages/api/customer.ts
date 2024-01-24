// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/firebase';
import {
  CUSTOMER_COLLECTION_NAME,
  type CustomerCollection,
} from '@/firebase/firestore';
import { type ApiError } from '@/types/api';
import { type CustomerForm } from '@/types/forms/CustomerForm';
import { type Customer } from '@/types/models/Customer';

type Data = Customer | Customer[] | ApiError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const q = query<CustomerCollection, CustomerCollection>(
          collection(db, CUSTOMER_COLLECTION_NAME),
          orderBy('kd_KundenID', 'asc'),
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
        res.status(500).json({ message: 'Error getting items', error });
      }
      break;

    case 'POST':
      try {
        const payload = body as CustomerForm;

        const docRef = await addDoc(collection(db, CUSTOMER_COLLECTION_NAME), {
          kd_KundenID: payload.customerNumber,
          kd_EMail: payload.email,
          kd_HNummer: payload.houseNumber,
          kd_Vorname: payload.firstname,
          kd_Ort: payload.city,
          kd_PLZ: payload.postalCode,
          kd_Strasse: payload.street,
          kd_Telefon: payload.phoneNumber,
          kd_Name: payload.lastname,
        });

        res.status(201).json({ id: docRef.id });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating item', error });
      }
      break;

    // case 'PUT':
    //   // Update to new syntax
    //   try {
    //     const { id, name } = JSON.parse(body);
    //     await db.collection('items').doc(id).update({ name });
    //     res.status(200).json({ id });
    //   } catch (error) {
    //     res.status(500).json({ error: 'Error updating item' });
    //   }
    //   break;

    // case 'DELETE':
    //   // Update to new syntax
    //   try {
    //     const { id } = JSON.parse(body);
    //     await db.collection('items').doc(id).delete();
    //     res.status(200).json({ id });
    //   } catch (error) {
    //     res.status(500).json({ error: 'Error deleting item' });
    //   }
    //   break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
