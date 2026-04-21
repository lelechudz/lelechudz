import Image from "next/image";

export function FallbackImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image
        src="/hero-fallback@2x.png"
        alt="Lei Maboloc — portfolio hero, static render of phone constellation"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-80"
      />
    </div>
  );
}
