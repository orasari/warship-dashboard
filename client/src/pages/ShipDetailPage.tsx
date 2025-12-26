import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Sparkles } from 'lucide-react';
import { useAppSelector } from '../app/hooks';

export default function ShipDetailPage() {
  const { shipId } = useParams<{ shipId: string }>();
  const navigate = useNavigate();
  const { normalizedShips, loading } = useAppSelector((state) => state.ships);

  const ship = normalizedShips.find((s) => s.id === shipId);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [shipId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <p className="text-blue-200">Loading ship details...</p>
      </div>
    );
  }

  if (!ship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-300 mb-4">Ship Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Fleet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-blue-500/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Fleet
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Ship Image */}
            <div className="flex-1 w-full max-w-2xl">
              <div className="relative aspect-video bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                <img
                  src={ship.icon}
                  alt={ship.displayName}
                  className="w-full h-full object-contain p-4"
                  loading="eager"
                />
                
                {/* Tier Badge */}
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-2 rounded text-lg font-bold">
                  Tier {ship.level}
                </div>

                {/* Premium/Special Badge */}
                {ship.isPremium && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-2 rounded text-sm font-bold flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Premium
                  </div>
                )}
                {ship.isSpecial && !ship.isPremium && (
                  <div className="absolute top-4 left-4 bg-cyan-600 text-white px-3 py-2 rounded text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Special
                  </div>
                )}
              </div>
            </div>

            {/* Ship Info */}
            <div className="flex-1 w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-200 mb-4">
                {ship.displayName}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-slate-700 px-4 py-2 rounded-lg text-lg">
                  {ship.nationDisplay}
                </span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg text-lg">
                  {ship.typeDisplay}
                </span>
              </div>

              {ship.description && (
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                  <h2 className="text-xl font-semibold text-blue-300 mb-3">Description</h2>
                  <p className="text-slate-300 leading-relaxed">
                    {ship.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ship Details Card */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Ship Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Internal Name:</span>
                <span className="text-slate-200 font-mono text-sm">{ship.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tier:</span>
                <span className="text-slate-200">{ship.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Type:</span>
                <span className="text-slate-200">{ship.typeDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nation:</span>
                <span className="text-slate-200">{ship.nationDisplay}</span>
              </div>
            </div>
          </div>

          {/* Tags Card */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {ship.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-700 px-3 py-1 rounded-full text-sm text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {ship.isPremium ? (
                  <>
                    <Award className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300">Premium Ship</span>
                  </>
                ) : ship.isSpecial ? (
                  <>
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300">Special Ship</span>
                  </>
                ) : (
                  <span className="text-slate-300">Standard Ship</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}