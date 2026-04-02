'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '1rem', background: '#04040a', color: '#fff' }}>
      <h2 style={{ fontSize: '1.5rem' }}>Xəta baş verdi</h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#7c3aed',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Yenidən cəhd et
      </button>
    </div>
  );
}
