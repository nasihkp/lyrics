import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full p-6 text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {error.status === 404 ? 'Page Not Found' : 'Oops! Something went wrong'}
          </h1>
          <p className="text-foreground/60 mb-6">
            {error.status === 404
              ? "The page you're looking for doesn't exist or has been moved."
              : error.data?.message || 'An unexpected error occurred. Please try again later.'}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Unexpected Error
        </h1>
        <p className="text-foreground/60 mb-6">
          An unexpected error occurred. Please try again later.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
} 