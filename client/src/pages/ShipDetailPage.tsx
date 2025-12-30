import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import ShipInfo from '../components/ShipDetail/ShipInfo';
import ShipHero from '../components/ShipDetail/ShipHero';
import DetailRow from '../components/ShipDetail/DetailRow';
import InfoCard from '../components/ShipDetail/InfoCard';
import StatusBadge from '../components/ShipDetail/StatusBadge';

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
      <div className="page-container flex items-center justify-center">
        <p className="text-blue-200">Loading ship details...</p>
      </div>
    );
  }

  if (!ship) {
    return (
      <div className="page-container flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-300 mb-4">
            Ship Not Found
          </h1>
          <button
            type="button"
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
    <div className="page-container">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-blue-500/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="Breadcrumb">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors"
              aria-label="Back to fleet list"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Back to Fleet
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ShipHero
              icon={ship.icon}
              displayName={ship.displayName}
              level={ship.level}
              isPremium={ship.isPremium}
              isSpecial={ship.isSpecial}
            />
            <ShipInfo
              displayName={ship.displayName}
              nationDisplay={ship.nationDisplay}
              typeDisplay={ship.typeDisplay}
              description={ship.description}
            />
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="sr-only">Ship specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ship Details Card */}
          <InfoCard title="Ship Details">
            <dl className="space-y-3">
              <DetailRow label="Internal Name" value={ship.name} mono />
              <DetailRow label="Tier" value={ship.level} />
              <DetailRow label="Type" value={ship.typeDisplay} />
              <DetailRow label="Nation" value={ship.nationDisplay} />
            </dl>
          </InfoCard>

          {/* Tags Card */}
          <InfoCard title="Tags">
            <ul className="flex flex-wrap gap-2" role="list">
              {ship.tags.map((tag) => (
                <li key={tag}>
                  <span className="bg-slate-700 px-3 py-1 rounded-full text-sm text-slate-300">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Status Card */}
          <InfoCard title="Status">
            <StatusBadge
              isPremium={ship.isPremium}
              isSpecial={ship.isSpecial}
            />
          </InfoCard>
        </div>
      </main>
    </div>
  );
}
