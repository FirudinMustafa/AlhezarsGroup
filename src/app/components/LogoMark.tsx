import Image from 'next/image';

export default function LogoMark({ width = 36, height = 36, className = '' }: { width?: number; height?: number; className?: string }) {
  return (
    <Image
      src="/alhezarsLogo.png"
      alt="Alhezars Group"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
    />
  );
}
