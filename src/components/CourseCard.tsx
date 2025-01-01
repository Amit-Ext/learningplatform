import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ReactNode } from 'react'

interface CourseCardProps {
  id: string
  title: string
  description: string
  gradeLevelMin: number
  gradeLevelMax: number
  progress?: number
  isEnrolled?: boolean
  children?: ReactNode
}

export function CourseCard({
  id,
  title,
  description,
  gradeLevelMin,
  gradeLevelMax,
  progress = 0,
  isEnrolled = false,
}: CourseCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Grades {gradeLevelMin}-{gradeLevelMax}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {isEnrolled && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/courses/${id}`}>
            {isEnrolled ? 'Continue Learning' : 'Start Learning'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 