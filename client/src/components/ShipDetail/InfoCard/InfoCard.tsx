import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="card-info">
      <h3 className="text-xl font-semibold text-blue-300 mb-4">{title}</h3>
      {children}
    </div>
  );
}
