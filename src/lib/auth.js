import { NextResponse } from 'next/server';

import supabaseAnon from './supabaseAnonClient';

export const login = async (email, password, router) => {
  const { error } = await supabaseAnon.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: 'Invalid Credentials' }, { status: 400 });
  }
  router.push('/home');
  return NextResponse.json({ data: 'User authenticated' }, { status: 200 });
};

export const signOut = async (router) => {
  await supabaseAnon.auth.signOut();
  router.push('/login');
};
