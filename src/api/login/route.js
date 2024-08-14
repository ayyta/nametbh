import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, username, password, dateOfBirth } = await request.json();
    console.log("User Info: ", { email, username, password, dateOfBirth });
  } catch (error) {
    return NextResponse({error: error.message}, { status: 500 });
  }
}