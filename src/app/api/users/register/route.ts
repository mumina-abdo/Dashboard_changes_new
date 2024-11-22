import {  NextResponse } from 'next/server';

export async function POST(request:Request) {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    console.error('BASE_URL environment variable is not set.');
    return NextResponse.json(
      { success: false, error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  
  try {
    const { first_name, last_name, username, email, password } = await request.json();
    console.log('Received signup request');

    const response = await fetch(`${baseUrl}/api/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, username, email, password }),
    });

    const responseData = await response.json();
    console.info('Backend response:', responseData, 'Status:', response.status);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: responseData.error || 'Registration failed.' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: responseData.message || 'Registration successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
