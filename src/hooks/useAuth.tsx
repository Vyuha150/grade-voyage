import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export interface UserProfile {
  id: string;
  user_id: string;
  school_id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error?: Error }>;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error?: Error }>;
  demoLogin: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile data
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then((profileData) => {
          setProfile(profileData);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Sign Up Failed',
          description: error.message,
        });
        return { error };
      }

      toast({
        title: 'Account Created',
        description: 'Please check your email to confirm your account.',
      });

      return {};
    } catch (error) {
      const authError = error as Error;
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed', 
        description: authError.message,
      });
      return { error: authError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Sign In Failed',
          description: error.message,
        });
        return { error };
      }

      return {};
    } catch (error) {
      const authError = error as Error;
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: authError.message,
      });
      return { error: authError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: error.message,
        });
        return { error };
      }

      // Update local profile state
      setProfile({ ...profile, ...updates });
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });

      return {};
    } catch (error) {
      const updateError = error as Error;
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: updateError.message,
      });
      return { error: updateError };
    }
  };

  const demoLogin = async (role: UserRole) => {
    try {
      // Create mock user and profile for demo purposes
      const mockUser = {
        id: `demo-${role.toLowerCase()}`,
        email: `${role.toLowerCase()}@demo.com`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as User;

      const mockProfile: UserProfile = {
        id: `profile-${role.toLowerCase()}`,
        user_id: mockUser.id,
        school_id: '00000000-0000-0000-0000-000000000001',
        role: role,
        first_name: role === 'ADMIN' ? 'Admin' : role === 'TEACHER' ? 'Sarah' : 'John',
        last_name: role === 'ADMIN' ? 'User' : role === 'TEACHER' ? 'Teacher' : 'Johnson',
        email: `${role.toLowerCase()}@demo.com`,
      };

      const mockSession = {
        user: mockUser,
        access_token: 'demo-token',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        refresh_token: 'demo-refresh',
      } as Session;

      // Set the mock data
      setUser(mockUser);
      setProfile(mockProfile);
      setSession(mockSession);
      setLoading(false);

      toast({
        title: 'Demo Login Successful',
        description: `Welcome to the ${role} portal!`,
      });
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        variant: 'destructive',
        title: 'Demo Login Failed',
        description: 'Unable to access demo mode.',
      });
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    demoLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};