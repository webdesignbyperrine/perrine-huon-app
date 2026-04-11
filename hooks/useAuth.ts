'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import type { Profile } from '@/types/database.types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchProfile(userId: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erreur chargement profil:', error.message);
      }

      setProfile(data ?? null);
      setLoading(false);
    }

    supabase.auth
      .getUser()
      .then(({ data: { user: currentUser } }) => {
        setUser(currentUser);
        if (currentUser) {
          fetchProfile(currentUser.id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Erreur getUser:', err);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const supabase = createClient();
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
    return { error };
  };

  const isAdmin = profile?.role === 'admin';

  return { user, profile, loading, isAdmin, signIn, signOut };
}
