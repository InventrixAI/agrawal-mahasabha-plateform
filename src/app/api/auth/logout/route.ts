import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // In a stateless JWT system, logout is handled client-side
    // We can add token blacklisting here if needed in the future

    const response = NextResponse.json({
      success: true,
      message: 'Logout successful',
    })

    // Clear the token cookie
    response.cookies.set('token', '', {
      expires: new Date(0),
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Logout failed',
      },
      { status: 500 }
    )
  }
}
