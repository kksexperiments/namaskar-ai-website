import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isAdmin: false,
  });

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        // Check admin status when user logs in
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data: roleData } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .eq('role', 'admin')
                .single();

              setAuthState(prev => ({
                ...prev,
                isAdmin: !!roleData,
                loading: false,
              }));
            } catch (error) {
              setAuthState(prev => ({
                ...prev,
                isAdmin: false,
                loading: false,
              }));
            }
          }, 0);
        } else {
          setAuthState(prev => ({
            ...prev,
            isAdmin: false,
            loading: false,
          }));
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));

      if (session?.user) {
        setTimeout(async () => {
          try {
            const { data: roleData } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .eq('role', 'admin')
              .single();

            setAuthState(prev => ({
              ...prev,
              isAdmin: !!roleData,
              loading: false,
            }));
          } catch (error) {
            setAuthState(prev => ({
              ...prev,
              isAdmin: false,
              loading: false,
            }));
          }
        }, 0);
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    ...authState,
    signOut,
  };
};