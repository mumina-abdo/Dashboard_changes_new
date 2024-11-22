import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { error: 'BASE_URL environment variable is not set.' },
      { status: 500 }
    );
  }
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      console.error('Validation failed: Missing username or password');
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }
    const response = await fetch(`${baseUrl}/api/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
 
    if (!response.ok) {
      const textResponse = await response.text();
      return NextResponse.json(
        { error: textResponse || 'Login failed. Invalid crAkiraChixedentials.' },
        { status: response.status }
      );
    }
    const result = response.json();
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred.'+ (error as Error).message },
      { status: 500 }
    );
  }
}