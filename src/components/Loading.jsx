import { Loader2 } from "lucide-react"

const Component = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-white" />
      <p className="ml-2 text-base text-white text-center">Loading...</p>
    </div>
  )
}
export default Component;