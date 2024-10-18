import { NextResponse } from 'next/server';

import supabaseService from '../../../lib/supabaseServiceClient';

export async function POST(request) {
  try {
    const { email, username, password, dateOfBirth, name } =
      await request.json();

    if (!email || !username || !password || !dateOfBirth || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Check if the username or email is already taken
    await isUserTaken(username, email);

    const data = await signUpUser(email, password);
    // Check if the user is properly created before proceeding
    await createUser(data.user, email, username, dateOfBirth, name);

    return NextResponse.json({ data: 'User created' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Throws error is username or email is already taken
async function isUserTaken(username, email) {
  const { data: existingUser, error: error } = await supabaseService
    .from('user')
    .select('user_id')
    .or(`username.eq.${username},email.eq.${email}`);

  // Handle specific "No rows found" error properly
  if (error && error.code !== 'PGRST116') {
    throw new Error('Database error: ' + error.message);
  }

  if (existingUser && existingUser.length > 0) {
    throw new Error('Username or email is already taken');
  }

  return existingUser;
}

// Signs up the user with the provided email and password
async function signUpUser(email, password) {
  const { data: user, error } = await supabaseService.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

// Creates a user profile with the provided user, email, username, date of birth, and name
async function createUser(user, email, username, dateOfBirth, name) {
  const { data, error: profileError } = await supabaseService
    .from('user')
    .insert([
      {
        user_id: user.id,
        name: name,
        username: username,
        email: email,
        birthday: dateOfBirth,
      },
    ]);

  if (profileError) {
    throw new Error(profileError.message);
  }

  return data;
}
