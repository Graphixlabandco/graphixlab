import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc,
  getDocFromServer
} from "firebase/firestore";
import { db, auth } from "./firebase";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentUser = auth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testFirestoreConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network connection.");
    }
    return false;
  }
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: "client" | "admin";
  createdAt: string;
}

export interface Booking {
  id?: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  bookingDate: string;
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Check and create a user profile in Firestore after authentication
export async function createUserProfile(uid: string, email: string, name: string): Promise<UserProfile> {
  if (!db) throw new Error("Database not initialized");
  const path = `users/${uid}`;
  
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    
    // Automatically assign 'admin' role if it's the owner's email
    const isAdminEmail = email.toLowerCase() === "rvprasad24d@gmail.com" || email.toLowerCase() === "admin@graphixlab.com";
    const role = isAdminEmail ? "admin" : "client";
    
    const profile: UserProfile = {
      uid,
      email,
      name: name || "Valued Client",
      role,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(userRef, profile);
    return profile;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Get user profile details
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) return null;
  const path = `users/${uid}`;
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Add a new project booking
export async function createBooking(booking: Omit<Booking, "id" | "status" | "createdAt">): Promise<string> {
  if (!db) throw new Error("Database not initialized");
  
  const bookingId = "bk_" + Math.random().toString(36).substr(2, 9);
  const path = `bookings/${bookingId}`;
  const newBooking: Booking = {
    ...booking,
    id: bookingId,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  
  try {
    await setDoc(doc(db, "bookings", bookingId), newBooking);
    return bookingId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Get all bookings for a specific client
export async function getClientBookings(userId: string): Promise<Booking[]> {
  if (!db) return [];
  const path = "bookings";
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data() as Booking);
    });
    
    return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Admin: Get all bookings
export async function getAllBookings(): Promise<Booking[]> {
  if (!db) return [];
  const path = "bookings";
  try {
    const bookingsRef = collection(db, "bookings");
    const querySnapshot = await getDocs(bookingsRef);
    
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data() as Booking);
    });
    
    return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Admin: Update booking status
export async function updateBookingStatus(bookingId: string, status: "pending" | "confirmed" | "cancelled"): Promise<void> {
  if (!db) throw new Error("Database not initialized");
  const path = `bookings/${bookingId}`;
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// Add contact form inquiry
export async function createInquiry(inquiry: Omit<Inquiry, "id" | "createdAt">): Promise<string> {
  if (!db) throw new Error("Database not initialized");
  
  const inquiryId = "inq_" + Math.random().toString(36).substr(2, 9);
  const path = `inquiries/${inquiryId}`;
  const newInquiry: Inquiry = {
    ...inquiry,
    id: inquiryId,
    createdAt: new Date().toISOString()
  };
  
  try {
    await setDoc(doc(db, "inquiries", inquiryId), newInquiry);
    return inquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Admin: Get all inquiries
export async function getAllInquiries(): Promise<Inquiry[]> {
  if (!db) return [];
  const path = "inquiries";
  try {
    const inquiriesRef = collection(db, "inquiries");
    const querySnapshot = await getDocs(inquiriesRef);
    
    const inquiries: Inquiry[] = [];
    querySnapshot.forEach((doc) => {
      inquiries.push(doc.data() as Inquiry);
    });
    
    return inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// --- Client Requests Collection Support ---
export interface ClientRequest {
  id?: string;
  userName: string;
  projectDescription: string;
  email: string;
  createdAt: string;
}

export async function createClientRequest(requestData: Omit<ClientRequest, "id" | "createdAt">): Promise<string> {
  if (!db) throw new Error("Database not initialized");
  
  const requestId = "req_" + Math.random().toString(36).substr(2, 9);
  const path = `client_requests/${requestId}`;
  const newRequest: ClientRequest = {
    ...requestData,
    id: requestId,
    createdAt: new Date().toISOString()
  };
  
  try {
    await setDoc(doc(db, "client_requests", requestId), newRequest);
    return requestId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// --- Testimonials (Reviews) Collection Support ---
export interface Testimonial {
  id?: string;
  name: string;
  subject: string;
  message: string;
  rating: number; // 1 to 5 stars
  createdAt: string;
}

export async function createTestimonial(testimonialData: Omit<Testimonial, "id" | "createdAt">): Promise<string> {
  if (!db) throw new Error("Database not initialized");
  
  const testimonialId = "rev_" + Math.random().toString(36).substr(2, 9);
  const path = `testimonials/${testimonialId}`;
  const newTestimonial: Testimonial = {
    ...testimonialData,
    id: testimonialId,
    createdAt: new Date().toISOString()
  };
  
  try {
    await setDoc(doc(db, "testimonials", testimonialId), newTestimonial);
    return testimonialId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!db) return [];
  const path = "testimonials";
  try {
    const testimonialsRef = collection(db, "testimonials");
    const querySnapshot = await getDocs(testimonialsRef);
    
    const list: Testimonial[] = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as Testimonial);
    });
    
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

