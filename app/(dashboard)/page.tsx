import { EyeIcon, ArrowTrendingUpIcon, CloudArrowUpIcon, ArrowRightOnRectangleIcon, ArrowRightCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { GetFormStats, GetForms } from "@/actions/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import CreateFormButton from '@/components/CreateFormButton'
import { Form } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { formatDistance } from 'date-fns/esm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardHome() {
  return(
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense fallback={[1, 2, 3, 4].map(e => (
           <FormCardSkeleton key={e} />))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  )
}

async function CardStatsWrapper () {
  const stats = await GetFormStats()
  return <StatsCards loading={false} data={stats} />
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>
  loading: boolean
}

function StatsCards(props: StatsCardProps) {
  const { data, loading }= props

  return (
    <div className="w-full pt-8 gap-4 grid gridcols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        title="Total Visits"
        icon={<EyeIcon className="text-primary w-8 h-8" />}
        helperText="Total amount of visits to the forms"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md"
      />
      <StatsCard 
        title="Total Submissions"
        icon={<ArrowTrendingUpIcon className="text-primary w-8 h-8" />}
        helperText="Total amount of submissions to the forms"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md"
      />
      <StatsCard 
        title="Submission Rate"
        icon={<CloudArrowUpIcon className="text-primary w-8 h-8" />}
        helperText="Amount of visits that result in form submissions"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md"
      />
      <StatsCard 
        title="Bounce Rate"
        icon={<ArrowRightOnRectangleIcon className="text-primary w-8 h-8" />}
        helperText="Amount of visits that leave without submmitting a form"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  icon: React.ReactNode
  helperText: string
  value: string
  loading: boolean
  className: string
}

function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {
          loading && 
            <Skeleton>
              <span className="bg-transparent">0</span>
            </Skeleton>
          }
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  )
}

function FormCardSkeleton () {
  return (
    <Skeleton className="border-2 border-primary/40 w-full h-48" />
  )
}
async function FormCards () {
  const forms = await GetForms()
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  )
}

function FormCard ({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2 justify-between truncate">
            {form.name}
            {form.published && <Badge>Published</Badge>}
            {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
          </span>
        </CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true
          })}
          {form.published && 
            <span className="flex items-center gap-2">
              <EyeIcon className="w-8 h-8"/>
              <span>{form.visits.toLocaleString()}</span>
              <ArrowTrendingUpIcon className="w-8 h-8"/>
              <span>{form.submissions.toLocaleString()}</span>
            </span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-5 truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View Submissions <ArrowRightCircleIcon className="w-6 h-6"/>
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
            <Link href={`/builder/${form.id}`}>
              Edit Form <PencilSquareIcon className="w-6 h-6"/>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}