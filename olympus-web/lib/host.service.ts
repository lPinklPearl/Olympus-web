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
  goddessName?: string;
  description?: string;
  image?: string;
  slug: string;
  aura?: string;
  active: boolean;
  order?: number;

  // ✅ extras (ตาม slug page)
  title?: string;
  status?: {
    conversation?: number;
    funVibe?: number;
    seductiveCharm?: number;
  };
  speakingStyle?: Array<{ label: string; checked: boolean }>;
  clientFit?: Array<{ label: string; checked: boolean }>;
  messageToClient?: string;
  boundaries?: string;
  notes?: string;
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

  // ✅ extras
  title?: string;
  status?: {
    conversation?: number;
    funVibe?: number;
    seductiveCharm?: number;
  };
  speakingStyle?: Array<{ label: string; checked: boolean }>;
  clientFit?: Array<{ label: string; checked: boolean }>;
  messageToClient?: string;
  boundaries?: string;
  notes?: string;
};

const ref = collection(db, "hosts");

const DEFAULT_HOST_EXTRAS: Required<
  Pick<
    HostData,
    | "aura"
    | "order"
    | "title"
    | "status"
    | "speakingStyle"
    | "clientFit"
    | "messageToClient"
    | "boundaries"
    | "notes"
  >
> = {
  aura: "from-red-800/30 via-transparent to-transparent",
  order: 999,
  title: "HOST (The Radiant)",
  status: { conversation: 78, funVibe: 62, seductiveCharm: 88 },
  speakingStyle: [
    { label: "สุภาพ นุ่มนวล", checked: true },
    { label: "ขี้เล่น เป็นกันเอง", checked: false },
    { label: "ลึกลับ เงียบขรึม", checked: false },
    { label: "อ่อนหวาน ใจดี", checked: true },
  ],
  clientFit: [
    { label: "ชอบคุยสบาย ๆ", checked: true },
    { label: "ชอบบทสนทนา deep talk", checked: true },
    { label: "ลูกค้าใหม่ / ขี้อาย", checked: false },
    { label: "ลูกค้าสายดื่ม ชอบความเย้ายวน", checked: true },
  ],
  messageToClient: "หวังว่าในบทสนทนาของเราจะทำให้คุณรู้สึกดีไม่มากก็น้อย",
  boundaries: "ไม่มีค่ะ",
  notes: "-",
};

const isNil = (v: any) => v === undefined || v === null;

/**
 * ✅ เติม defaults เฉพาะ field ที่ "ยังไม่มี" ให้โฮสต์เก่า
 * - ไม่ทับค่าที่มีอยู่แล้ว
 * - อ่าน doc ก่อน แล้วค่อย update เฉพาะส่วนที่ขาด
 */
export const ensureHostDefaults = async (id: string) => {
  const snap = await getDoc(doc(db, "hosts", id));
  if (!snap.exists()) return null;

  const data = snap.data() as any;

  const patch: any = {};

  // top-level defaults
  if (isNil(data.aura)) patch.aura = DEFAULT_HOST_EXTRAS.aura;
  if (isNil(data.order)) patch.order = DEFAULT_HOST_EXTRAS.order;
  if (isNil(data.title)) patch.title = DEFAULT_HOST_EXTRAS.title;
  if (isNil(data.messageToClient))
    patch.messageToClient = DEFAULT_HOST_EXTRAS.messageToClient;
  if (isNil(data.boundaries)) patch.boundaries = DEFAULT_HOST_EXTRAS.boundaries;
  if (isNil(data.notes)) patch.notes = DEFAULT_HOST_EXTRAS.notes;

  // arrays
  if (isNil(data.speakingStyle))
    patch.speakingStyle = DEFAULT_HOST_EXTRAS.speakingStyle;
  if (isNil(data.clientFit))
    patch.clientFit = DEFAULT_HOST_EXTRAS.clientFit;

  // nested status: เติมเฉพาะ key ที่ขาด
  const s = data.status ?? {};
  const ds = DEFAULT_HOST_EXTRAS.status;
  const statusPatch: any = {};
  if (isNil(s.conversation)) statusPatch.conversation = ds.conversation;
  if (isNil(s.funVibe)) statusPatch.funVibe = ds.funVibe;
  if (isNil(s.seductiveCharm)) statusPatch.seductiveCharm = ds.seductiveCharm;

  if (Object.keys(statusPatch).length > 0) {
    patch.status = { ...(data.status ?? {}), ...statusPatch };
  }

  if (Object.keys(patch).length > 0) {
    await updateDoc(doc(db, "hosts", id), patch);
  }

  // return merged view
  return { id: snap.id, ...data, ...patch };
};

export const getPublicHosts = async (): Promise<PublicHost[]> => {
  const q = query(
    collection(db, "hosts"),
    where("active", "==", true),
    orderBy("order", "asc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((docSnap) => {
    const data = docSnap.data() as any;

    // ✅ merge defaults ตอนอ่านด้วย (ไม่เขียนลง db)
    const merged: any = {
      ...DEFAULT_HOST_EXTRAS,
      ...data,
      status: { ...DEFAULT_HOST_EXTRAS.status, ...(data.status ?? {}) },
    };

    return { id: docSnap.id, ...(merged as Omit<PublicHost, "id">) };
  });
};

// READ all
export const getHosts = async (): Promise<HostData[]> => {
  const snap = await getDocs(ref);
  return snap.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as HostData),
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

      // ✅ defaults (รวม extras)
      active: true,
      ...DEFAULT_HOST_EXTRAS,

      createdAt: serverTimestamp(),
    });
  }
};

// UPDATE (เหมือนเดิม แต่แนะนำเรียก ensureHostDefaults ก่อน/หลังได้)
export const updateHost = async (id: string, data: Partial<HostData>) => {
  // ✅ ถ้าหนูอยาก "อัปเดตแล้วเติมของที่ขาด" ในคำสั่งเดียว
  // ให้เปิดบรรทัดนี้ก่อน update (หรือหลัง update ก็ได้)
  await ensureHostDefaults(id);

  return updateDoc(doc(db, "hosts", id), data);
};

// DELETE
export const deleteHost = async (id: string) => {
  return deleteDoc(doc(db, "hosts", id));
};

export const getHostBySlug = async (slug: string) => {
  const q = query(collection(db, "hosts"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;

  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as any) };
};

