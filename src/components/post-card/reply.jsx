import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const Component = ({
  isOpen=false,
  setIsOpen=()=>{},
}) => {
  
  const closeReply = () => {
    setIsOpen(false)
  }
  if (!isOpen) return null

  return (
    <div className="fixed w-screen h-screen inset-0 bg-black/50 flex justify-center items-center" onClick={closeReply}>
      <Card className="w-192 h-fit">
        <CardHeader className="p-4 flex flex-row items-center">
          <p className="w-fit">Reply</p>
          <Button
            variant="ghost"
            size="icon"
            className="z-10 text-black hover:bg-white/20 hover:text-white rounded-full ml-auto !mt-0"
            onClick={closeReply}
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>


      </Card>
    </div>
  )
}

export default Component