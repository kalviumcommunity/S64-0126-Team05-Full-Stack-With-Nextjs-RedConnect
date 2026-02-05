import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const testType = searchParams.get('test') || 'all';

  try {
    const results: Record<string, unknown> = {};

    // Test 1: Unoptimized Query - N+1 Problem
    if (testType === 'unoptimized' || testType === 'all') {
      console.log('\n🔴 ===== UNOPTIMIZED QUERY (N+1 Problem) =====');
      const startUnoptimized = Date.now();

      // First query: Get all donations
      const donations = await prisma.donation.findMany({
        take: 10,
      });

      // N+1 Problem: Separate queries for each donor and blood bank
      const donationsWithDetails = await Promise.all(
        donations.map(async (donation: { id: number; donorId: number; bloodBankId: number; units: number; status: string; notes: string | null; createdAt: Date }) => {
          const donor = await prisma.donor.findUnique({
            where: { id: donation.donorId },
          });
          const bloodBank = await prisma.bloodBank.findUnique({
            where: { id: donation.bloodBankId },
          });
          return { ...donation, donor, bloodBank };
        })
      );

      const endUnoptimized = Date.now();
      const unoptimizedTime = endUnoptimized - startUnoptimized;

      results.unoptimized = {
        time: `${unoptimizedTime}ms`,
        queryCount: `1 + (${donations.length} * 2) = ${1 + donations.length * 2} queries`,
        data: donationsWithDetails,
        problem: 'N+1 problem - Makes separate query for each related record',
      };

      console.log(`⏱️  Unoptimized Query Time: ${unoptimizedTime}ms`);
      console.log(`📊 Total Queries: ${1 + donations.length * 2}`);
    }

    // Test 2: Optimized Query - Using include/select
    if (testType === 'optimized' || testType === 'all') {
      console.log('\n🟢 ===== OPTIMIZED QUERY (Using Include) =====');
      const startOptimized = Date.now();

      // Single query with joins
      const donations = await prisma.donation.findMany({
        take: 10,
        include: {
          donor: {
            select: {
              id: true,
              name: true,
              email: true,
              bloodType: true,
            },
          },
          bloodBank: {
            select: {
              id: true,
              name: true,
              city: true,
              contactNo: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const endOptimized = Date.now();
      const optimizedTime = endOptimized - startOptimized;

      results.optimized = {
        time: `${optimizedTime}ms`,
        queryCount: '1 query (with JOINs)',
        data: donations,
        benefit: 'Single query with LEFT JOIN - much faster',
      };

      console.log(`⏱️  Optimized Query Time: ${optimizedTime}ms`);
      console.log(`📊 Total Queries: 1`);
    }

    // Test 3: Optimized with Pagination and Filtering
    if (testType === 'paginated' || testType === 'all') {
      console.log('\n🟢 ===== OPTIMIZED WITH PAGINATION =====');
      const startPaginated = Date.now();

      const [donations, totalCount] = await Promise.all([
        prisma.donation.findMany({
          take: 10,
          skip: 0,
          where: {
            status: 'completed',
          },
          include: {
            donor: {
              select: {
                id: true,
                name: true,
                bloodType: true,
              },
            },
            bloodBank: {
              select: {
                id: true,
                name: true,
                city: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        prisma.donation.count({
          where: {
            status: 'completed',
          },
        }),
      ]);

      const endPaginated = Date.now();
      const paginatedTime = endPaginated - startPaginated;

      results.paginated = {
        time: `${paginatedTime}ms`,
        queryCount: '2 queries (1 SELECT + 1 COUNT)',
        totalRecords: totalCount,
        pageSize: 10,
        data: donations,
        benefit: 'Efficient pagination with parallel count query',
      };

      console.log(`⏱️  Paginated Query Time: ${paginatedTime}ms`);
      console.log(`📊 Total Queries: 2 (parallel)`);
    }

    // Test 4: Index Usage Test
    if (testType === 'index' || testType === 'all') {
      console.log('\n🟢 ===== TESTING INDEX USAGE =====');
      const startIndex = Date.now();

      // Query using indexed field (bloodType)
      const donorsByBloodType = await prisma.donor.findMany({
        where: {
          bloodType: 'A+',
        },
        select: {
          id: true,
          name: true,
          bloodType: true,
          email: true,
        },
        take: 10,
      });

      const endIndex = Date.now();
      const indexTime = endIndex - startIndex;

      results.indexedQuery = {
        time: `${indexTime}ms`,
        queryCount: '1 query',
        indexUsed: 'bloodType index',
        data: donorsByBloodType,
        benefit: 'Fast lookup using indexed column',
      };

      console.log(`⏱️  Indexed Query Time: ${indexTime}ms`);
    }

    // Calculate performance improvement
    if (results.unoptimized && results.optimized) {
      const unoptimized = results.unoptimized as { time: string };
      const optimized = results.optimized as { time: string };
      
      const improvement = (
        ((parseFloat(unoptimized.time) - parseFloat(optimized.time)) /
          parseFloat(unoptimized.time)) *
        100
      ).toFixed(2);

      results.comparison = {
        improvement: `${improvement}% faster`,
        unoptimizedTime: unoptimized.time,
        optimizedTime: optimized.time,
        recommendation: 'Always use include/select to fetch related data in a single query',
      };

      console.log('\n📈 ===== PERFORMANCE COMPARISON =====');
      console.log(`Unoptimized: ${unoptimized.time}`);
      console.log(`Optimized: ${optimized.time}`);
      console.log(`Improvement: ${improvement}%`);
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error: unknown) {
    console.error('Query performance test error:', error);
    const err = error as Error;
    return NextResponse.json(
      {
        error: 'Query performance test failed',
        details: err.message,
      },
      { status: 500 }
    );
  }
}
