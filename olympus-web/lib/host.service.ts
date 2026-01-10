import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface HostData {
  id?: string;
  name: string;
  goddessName: string;
  description: string;
  image: string;
  slug: string;
  active?: boolean;
  order?: number;
  aura?: string;
  createdAt?: any;
}

export type PublicHost = {
  id: string;
  slug: string;
  name: string;
  goddessName: string;
  description: string;
  image: string;
  aura?: string;
  active: boolean;
  order: number;
};

const ref = collection(db, "hosts");

export const getPublicHosts = async (): Promise<PublicHost[]> => {
  const q = query(
    collection(db, "hosts"),
    where("active", "==", true),
    orderBy("order", "asc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PublicHost, "id">),
  }));
};

// READ all
export const getHosts = async (): Promise<HostData[]> => {
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as HostData),
  }));
};

// READ one
export const getHostById = async (id: string) => {
  const snap = await getDoc(doc(db, "hosts", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// CREATE
export const createHost = async (data: HostData) => {
  if (data.id) {
    const { id, ...updateData } = data;
    await updateDoc(doc(db, "hosts", id), updateData);
  } else {
    await addDoc(collection(db, "hosts"), {
      ...data,

      // 👇 DEFAULT PUBLIC FIELDS
      active: true,
      order: 999,
      aura: "from-red-800/30 via-transparent to-transparent",

      createdAt: serverTimestamp(),
    });
  }
};



// UPDATE
export const updateHost = async (id: string, data: Partial<HostData>) => {
  return updateDoc(doc(db, "hosts", id), data);
};

// DELETE
export const deleteHost = async (id: string) => {
  return deleteDoc(doc(db, "hosts", id));
};
