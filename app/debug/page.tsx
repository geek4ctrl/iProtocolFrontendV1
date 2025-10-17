import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function DebugPage() {
  const supabase = createServerComponentClient({ cookies })

  // Test database connection
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  // Try to fetch events
  const { data: events, error: eventsError } = await supabase
    .from('getevents')
    .select()

  // Try to fetch places
  const { data: places, error: placesError } = await supabase
    .from('getplaces')
    .select()

  // Try to fetch Goma places
  const { data: gomaPlaces, error: gomaError } = await supabase
    .from('place_in_goma_view')
    .select()

  // Try to fetch Kinshasa places
  const { data: kinshasaPlaces, error: kinshasaError } = await supabase
    .from('place_in_kinshasa_view')
    .select()

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Database Debug Information</h1>

      {/* User Info */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        {userError ? (
          <div className="text-red-600">
            <p className="font-semibold">Error:</p>
            <pre className="mt-2 p-4 bg-red-50 rounded overflow-auto">{JSON.stringify(userError, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <p className="mb-2"><strong>User:</strong> {user?.email || 'Not logged in'}</p>
            <p className="mb-2"><strong>User ID:</strong> {user?.id || 'N/A'}</p>
          </div>
        )}
      </section>

      {/* Events */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Events (from 'getevents' view/table)</h2>
        {eventsError ? (
          <div className="text-red-600">
            <p className="font-semibold">Error:</p>
            <pre className="mt-2 p-4 bg-red-50 rounded overflow-auto">{JSON.stringify(eventsError, null, 2)}</pre>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-semibold text-yellow-800">Possible Issues:</p>
              <ul className="list-disc list-inside mt-2 text-sm text-yellow-700">
                <li>The 'getevents' table/view doesn't exist in your Supabase database</li>
                <li>Row Level Security (RLS) policies might be blocking access</li>
                <li>You need to create this table/view in your Supabase dashboard</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-2"><strong>Count:</strong> {events?.length || 0}</p>
            {events && events.length > 0 ? (
              <pre className="mt-2 p-4 bg-gray-50 rounded overflow-auto max-h-96">{JSON.stringify(events, null, 2)}</pre>
            ) : (
              <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-blue-800">The table/view exists but contains no data. You may need to add some events in your Supabase database.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Places */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Places (from 'getplaces' view/table)</h2>
        {placesError ? (
          <div className="text-red-600">
            <p className="font-semibold">Error:</p>
            <pre className="mt-2 p-4 bg-red-50 rounded overflow-auto">{JSON.stringify(placesError, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <p className="mb-2"><strong>Count:</strong> {places?.length || 0}</p>
            {places && places.length > 0 && (
              <pre className="mt-2 p-4 bg-gray-50 rounded overflow-auto max-h-64">{JSON.stringify(places, null, 2)}</pre>
            )}
          </div>
        )}
      </section>

      {/* Goma Places */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Goma Places</h2>
        {gomaError ? (
          <div className="text-red-600">
            <p className="font-semibold">Error:</p>
            <pre className="mt-2 p-4 bg-red-50 rounded overflow-auto">{JSON.stringify(gomaError, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <p className="mb-2"><strong>Count:</strong> {gomaPlaces?.length || 0}</p>
          </div>
        )}
      </section>

      {/* Kinshasa Places */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Kinshasa Places</h2>
        {kinshasaError ? (
          <div className="text-red-600">
            <p className="font-semibold">Error:</p>
            <pre className="mt-2 p-4 bg-red-50 rounded overflow-auto">{JSON.stringify(kinshasaError, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <p className="mb-2"><strong>Count:</strong> {kinshasaPlaces?.length || 0}</p>
          </div>
        )}
      </section>

      {/* Environment Variables */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Environment Configuration</h2>
        <div>
          <p className="mb-2">
            <strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
          </p>
          <p className="mb-2">
            <strong>Supabase Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
          </p>
          {process.env.NEXT_PUBLIC_SUPABASE_URL && (
            <p className="text-sm text-gray-600 mt-2">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
            </p>
          )}
        </div>
      </section>

      {/* Action Items */}
      <section className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Next Steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Check if environment variables are properly set in .env.local</li>
          <li>Verify that the required tables/views exist in your Supabase database</li>
          <li>Check Row Level Security (RLS) policies in Supabase dashboard</li>
          <li>Add sample data to your database if tables are empty</li>
        </ol>
      </section>
    </div>
  )
}
