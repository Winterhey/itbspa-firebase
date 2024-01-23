import { getApps, initializeApp } from 'firebase/app';
import { EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '@/config/firebase.config';

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!;

const provider = new EmailAuthProvider();
const db = getFirestore(app);

export { db, provider };
