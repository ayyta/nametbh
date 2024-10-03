import { ArrowLeft } from "lucide-react";

const Component = ({
  title="Note",
  router
}) => {
  const handleBack = () => {
    router.back();
  }
  return (
    <div className="w-192 h-10 flex flex-row items-center text-white my-4">
      <ArrowLeft className="cursor-pointer" onClick={handleBack}/>
      <div className="flex-grow flex justify-center">
        <h1 className="relative inline-block text-center font-bold text-2xl" >
          <span>{title}</span>
          <span className="absolute bottom-0 left-1/2 w-3/4 h-0.5 bg-current transform -translate-x-1/2"></span>
        </h1>
      </div>
    </div>
  );
}

export default Component;