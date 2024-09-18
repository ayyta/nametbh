import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth";

export default function Component ({ user, roboto }) {
  const handleLogout = () => {
    signOut(router);
  }

  let backgroundStyle = {
    backgroundImage: user.profile_background !== "" ? `url('${user.profile_background}')`: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
  }

  return (
      <div className={`w-full h-64	p-10 flex ${user.profile_background === "" ? "bg-gray-700" : ""}`} style={backgroundStyle}>
      <Avatar className="md:w-28 md:h-28">
        <AvatarImage src={user.pfp} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className={`flex-1 ml-6 flex flex-col ${roboto.className}`}>
        <p className={`text-white text-3xl font-bold `}>{user.name}</p>
        <p className="text-lg text-gray-400">@{user.username}</p>

        <p className="text-xl text-white font-normal my-4">{user.bio}</p>
        
        <div className="flex-grow"></div>
        <p className="text-lg text-gray-400 mt-auto">{formatNumber(user.num_of_followers)} Followers</p>
      </div>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

function formatNumber(num) {
  if (Math.abs(num) >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';  // Converts to millions (M)
  } else if (Math.abs(num) >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';  // Converts to thousands (K)
  } else {
    return num.toString();  // Less than 1,000 stays as is
  }
}