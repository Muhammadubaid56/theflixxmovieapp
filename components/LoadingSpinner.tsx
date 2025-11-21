export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

