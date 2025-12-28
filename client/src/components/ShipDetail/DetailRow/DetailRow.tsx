interface DetailRowProps {
  label: string;
  value: string | number;
  mono?: boolean;
}

export default function DetailRow({
  label,
  value,
  mono = false,
}: DetailRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}:</span>
      <span className={`text-slate-200 ${mono ? 'font-mono text-sm' : ''}`}>
        {value}
      </span>
    </div>
  );
}
