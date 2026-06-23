import type { FallbackProps } from 'react-error-boundary'

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div
    className="flex min-h-screen flex-col items-center justify-center gap-3 p-8 text-center font-sans"
    role="alert"
  >
    <h1 className="m-0 text-2xl">Something went wrong</h1>
    <p className="m-0 text-neutral-500">The application encountered an unexpected error.</p>
    <button
      type="button"
      className="mt-2 cursor-pointer rounded-full border-none bg-primary px-5 py-2.5 text-[0.95rem] text-white hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      onClick={resetErrorBoundary}
    >
      Reload page
    </button>
  </div>
)
