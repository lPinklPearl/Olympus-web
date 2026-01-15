import { User } from "firebase/auth";

// ตอนนี้ใช้แค่นี้ก่อน
export const isAdmin = (user: User | null) => {
  if (!user) return false;

  // 🔒 ใส่ email admin ของจริงตรงนี้
  const adminEmails = [
    "zeuslnwza007@gmail.com",
    "justadotow@gmail.com",
  ];

  return adminEmails.includes(user.email || "");
};
