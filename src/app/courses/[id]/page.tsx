import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'
import { notFound } from 'next/navigation'

type Course = Database['public']['Tables']['courses']['Row']
type UserProgress = Database['public']['Tables']['user_progress']['Row']

async function getCourse(id: string) {
  console.log('Fetching course with ID:', id)
  const cookieStore = (await cookies()) as unknown as RequestCookies

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials')
    return null
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name)
          return cookie?.value
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
  
  try {
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Session:', session ? 'Logged in' : 'Not logged in')
    
    // Get course details
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single()

    if (courseError) {
      console.error('Error fetching course:', courseError)
      return null
    }

    console.log('Found course:', course)

    if (!course) {
      console.log('No course found with ID:', id)
      return null
    }

    // If user is logged in, get their progress
    let progress: number | null = null
    if (session) {
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('progress')
        .eq('user_id', session.user.id)
        .eq('course_id', id)
        .single()

      if (progressError) {
        console.error('Error fetching progress:', progressError)
      } else if (userProgress) {
        progress = userProgress.progress
        console.log('User progress:', progress)
      }
    }

    return {
      course,
      progress,
      isLoggedIn: !!session
    }
  } catch (error) {
    console.error('Error in getCourse:', error)
    return null
  }
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  console.log('Rendering course page with ID:', params.id)
  const data = await getCourse(params.id)

  if (!data) {
    console.log('No data returned for course ID:', params.id)
    notFound()
  }

  const { course, progress, isLoggedIn } = data

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-lg mb-6">{course.description}</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Grade Level</p>
              <p className="font-medium">
                {course.grade_level_min} - {course.grade_level_max}
              </p>
            </div>
            {isLoggedIn && progress !== null && (
              <div>
                <p className="text-gray-600">Your Progress</p>
                <p className="font-medium">{progress}%</p>
              </div>
            )}
          </div>
        </div>

        {isLoggedIn ? (
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => {/* TODO: Implement course start/continue */}}
          >
            {progress !== null ? 'Continue Learning' : 'Start Learning'}
          </button>
        ) : (
          <p className="text-gray-600">
            Please <a href="/auth" className="text-blue-600 hover:underline">sign in</a> to start learning
          </p>
        )}
      </div>
    </div>
  )
} 