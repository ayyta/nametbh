import { CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const PostCardPreviewHeader = ({
  pfp,
  name,
  username,
  creationDate
}) => {
  return (
    <CardHeader className="flex flex-row items-center gap-4 py-2">
      <Avatar>
        <AvatarImage src={pfp} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-500">@{username} • {creationDate}</p>
      </div>
    </CardHeader>
  )
}

export default PostCardPreviewHeader