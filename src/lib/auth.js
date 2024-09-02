import supabaseAnon from "./supabaseAnonClient";
import { NextResponse } from 'next/server';

export const login = async (email, password, router) => {
  const { error } = await supabaseAnon.auth.signInWithPassword({ email, password });

  if (error) {
    console.log("ERROR")
    console.error("error", error);
    router.push("/login?message=Could not authenticate user"); // Use router.push for client-side navigation
    return NextResponse.json({error: "Invalid Credentials"}, { status: 400 });
  }
  router.push("/home");
  return NextResponse.json({data: "User authenticated"}, { status: 200 });
}

export const signOut = async (router) => {
  await supabaseAnon.auth.signOut();
  router.push("/login");
}