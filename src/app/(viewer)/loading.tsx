import { Spinner } from "@/shared/ui";

export default function Loading() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Spinner size={132} />
    </div>
  )
}