import { NextRequest, NextResponse } from 'next/server';
import { hydra } from '@/lib/hydra-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!q) {
      return NextResponse.json({ suggestions: [] });
    }

    const response = await hydra.content.searchSuggestions({ q, limit });
    
    return NextResponse.json({ suggestions: response.data });
  } catch (error) {
    console.error('Search suggestions error:', error);
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}
