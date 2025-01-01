import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { Database } from '@/lib/database.types'

async function getCourseProgress() {
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

  try {
    const { data: progress } = await supabase
      .from('user_progress')
      .select(`
        *,
        courses (
          title,
          description,
          grade_level_min,
          grade_level_max
        )
      `)
      .eq('user_id', session.user.id)

    return progress || []
  } catch (error) {
    console.error('Error fetching course progress:', error)
    return []
  }
}

export default async function DashboardPage() {
  const progress = await getCourseProgress()

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {progress?.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center space-x-3 rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div className="min-w-0 flex-1">
                <a href={`/courses/${item.course_id}`} className="focus:outline-none">
                  <p className="text-sm font-medium">{item.courses?.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{item.courses?.description}</p>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
          {progress.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              No courses in progress. Start learning by enrolling in a course!
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 