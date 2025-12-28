interface ShipInfoProps {
  displayName: string;
  nationDisplay: string;
  typeDisplay: string;
  description?: string;
}

export default function ShipInfo({
  displayName,
  nationDisplay,
  typeDisplay,
  description,
}: ShipInfoProps) {
  return (
    <div className="flex-1 w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-200 mb-4">
        {displayName}
      </h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <span className="bg-slate-700 px-4 py-2 rounded-lg text-lg">
          {nationDisplay}
        </span>
        <span className="bg-slate-700 px-4 py-2 rounded-lg text-lg">
          {typeDisplay}
        </span>
      </div>

      {description && (
        <div className="card-info">
          <h2 className="text-xl font-semibold text-blue-300 mb-3">
            Description
          </h2>
          <p className="text-slate-300 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
