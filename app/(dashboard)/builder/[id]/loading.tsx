import { CgSpinner } from "react-icons/cg";

export default function Loading () {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <CgSpinner className="animate-spin h-12 w-12" />
    </div>
  )
}