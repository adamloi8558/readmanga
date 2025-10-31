import { NextRequest, NextResponse } from 'next/server';
import { apiAdapter } from '@/lib/api-adapter';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await apiAdapter.getContentBySlug(params.slug);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: error instanceof Error && error.message.includes('404') ? 404 : 500 }
    );
  }
}

