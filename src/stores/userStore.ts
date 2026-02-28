import { create } from 'zustand';
import { toast } from 'sonner';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  membershipTier: 'Professional' | 'Student' | 'Fellow';
}
interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}
interface UserActions {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'membershipTier'>) => Promise<boolean>;
}
const mockUser: User = {
  id: 'usr_12345',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'member@aing.org',
  membershipTier: 'Professional',
};
const useUserStore = create<UserState & UserActions>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'member@aing.org' && password === 'password123') {
          set({ isAuthenticated: true, user: mockUser });
          toast.success('Login successful!', {
            description: `Welcome back, ${mockUser.firstName}!`,
          });
          resolve(true);
        } else {
          toast.error('Login failed', {
            description: 'Invalid email or password.',
          });
          resolve(false);
        }
      }, 500);
    });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
    toast.info('You have been logged out.');
  },
  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...userData,
          id: `usr_${crypto.randomUUID()}`,
          membershipTier: 'Professional',
        };
        set({ isAuthenticated: true, user: newUser });
        toast.success('Registration successful!', {
          description: `Welcome, ${newUser.firstName}!`,
        });
        resolve(true);
      }, 500);
    });
  },
}));
export default useUserStore;