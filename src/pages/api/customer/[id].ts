// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/firebase';
import { CUSTOMER_COLLECTION_NAME } from '@/firebase/firestore';
import { type ApiError } from '@/types/api';
import { type CustomerForm } from '@/types/forms/CustomerForm';
import { type Customer } from '@/types/models/Customer';

type Data = Customer | string | ApiError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const customerId = req.query.id;

  if (typeof customerId !== 'string') {
    res.status(400).json({ message: 'Invalid query parameter.' });
    return;
  }

  const customerRef = doc(db, CUSTOMER_COLLECTION_NAME, customerId);

  switch (req.method) {
    case 'GET':
      try {
        const docSnap = await getDoc(customerRef);

        if (docSnap.exists() === false) {
          res.status(404).json({ message: 'Customer not found.' });
          return;
        }

        const data = docSnap.data();

        res.status(200).send({
          id: docSnap.id,
          customerNumber: data.kd_KundenID,
          email: data.kd_EMail,
          houseNumber: data.kd_HNummer,
          firstname: data.kd_Vorname,
          city: data.kd_Ort,
          postalCode: data.kd_PLZ,
          street: data.kd_Strasse,
          phoneNumber: data.kd_Telefon,
          lastname: data.kd_Name,
        } satisfies Customer);
      } catch (error) {
        res.status(500).json({ message: 'Error getting items', error });
      }
      break;

    case 'PUT':
      try {
        const payload = req.body as CustomerForm;

        await setDoc(customerRef, {
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

        res.status(200).json({ message: 'Customer updated.' });
      } catch (error) {
        res.status(500).json({ message: 'Error getting items', error });
      }
      break;

    case 'DELETE':
      try {
        await deleteDoc(customerRef);

        res.status(200).json({ message: 'Customer deleted.' });
      } catch (error) {
        res.status(500).json({ message: 'Error getting items', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
