import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { CourseCard } from '@/components/CourseCard'
import { Database } from '@/lib/database.types'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'

type Course = Database['public']['Tables']['courses']['Row']
type UserProgress = Database['public']['Tables']['user_progress']['Row']

async function getCourses() {
  const cookieStore = (await cookies()) as unknown as RequestCookies

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Anon Key:', supabaseAnonKey?.slice(0, 10) + '...')

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials')
    return { courses: [], progress: {}, isLoggedIn: false }
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
    
    // Get all courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .order('grade_level_min')

    if (coursesError) {
      console.error('Error fetching courses:', coursesError)
      return { courses: [], progress: {}, isLoggedIn: !!session }
    }

    console.log('Fetched courses:', courses)

    // If user is logged in, get their progress
    let progress: Record<string, number> = {}
    if (session) {
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('course_id, progress')
        .eq('user_id', session.user.id)

      if (progressError) {
        console.error('Error fetching progress:', progressError)
      } else if (userProgress) {
        progress = Object.fromEntries(
          userProgress.map(p => [p.course_id, p.progress])
        )
        console.log('User progress:', progress)
      }
    }

    return {
      courses: courses || [],
      progress,
      isLoggedIn: !!session
    }
  } catch (error) {
    console.error('Error in getCourses:', error)
    return {
      courses: [],
      progress: {},
      isLoggedIn: false
    }
  }
}

export default async function CoursesPage() {
  const { courses, progress, isLoggedIn } = await getCourses()

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            gradeLevelMin={course.grade_level_min}
            gradeLevelMax={course.grade_level_max}
            progress={progress[course.id]}
            isEnrolled={isLoggedIn && course.id in progress}
          />
        ))}
      </div>
    </div>
  )
} 