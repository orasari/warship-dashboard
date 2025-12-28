import { AlertCircle, RefreshCw } from 'lucide-react';

interface ApiErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ApiErrorMessage({
  message,
  onRetry,
}: ApiErrorMessageProps) {
  return (
    <div className="page-container flex items-center justify-center p-4">
      <div className="card-base max-w-md text-center p-8">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-16 h-16 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-red-300 mb-3">
          Unable to Load Data
        </h2>
        <p className="text-slate-300 mb-6 leading-relaxed">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
