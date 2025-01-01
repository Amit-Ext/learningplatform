import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { Database } from '@/lib/database.types'

async function getUser() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // Cookie setting is handled by middleware
        },
        remove(name: string, options: any) {
          // Cookie removal is handled by middleware
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  return session.user
}

export default async function SettingsPage() {
  const user = await getUser()

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">Profile</h2>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Last Sign In</label>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.last_sign_in_at || '').toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 