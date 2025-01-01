export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'student' | 'teacher' | 'parent'
          created_at: string
          updated_at: string
          grade_level?: number
          display_name: string
        }
        Insert: {
          email: string
          role: 'student' | 'teacher' | 'parent'
          grade_level?: number
          display_name: string
        }
        Update: {
          email?: string
          role?: 'student' | 'teacher' | 'parent'
          grade_level?: number
          display_name?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          grade_level_min: number
          grade_level_max: number
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description: string
          grade_level_min: number
          grade_level_max: number
        }
        Update: {
          title?: string
          description?: string
          grade_level_min?: number
          grade_level_max?: number
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          course_id: string
          progress: number
          completed: boolean
        }
        Update: {
          progress?: number
          completed?: boolean
        }
      }
    }
  }
} 