import { NextRequest, NextResponse } from 'next/server';
import { createHydraClient } from '@/lib/hydra-client';
import { getTenantInfo } from '@/lib/tenant';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!q) {
      return NextResponse.json({ suggestions: [] });
    }

    // Create tenant-aware Hydra client
    const tenant = getTenantInfo(request);
    const hydra = createHydraClient(tenant.hostname, tenant.ipAddress, tenant.userAgent);

    const response = await hydra.content.searchSuggestions({ q, limit });
    
    return NextResponse.json({ suggestions: response.data });
  } catch (error) {
    console.error('Search suggestions error:', error);
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}
