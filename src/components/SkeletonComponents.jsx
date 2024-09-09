import { Skeleton } from "@/components/ui/skeleton"


function SkeletonProfile() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-500" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-500" />
        <Skeleton className="h-4 w-[200px] bg-gray-500" />
      </div>
    </div>
  )
}

export { SkeletonProfile }