'use client';

export function ParticleNebulaBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white"></div>
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="particle-blue"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      <style>{`
        .particle-blue {
          position: absolute;
          background: rgb(59, 130, 246);
          border-radius: 50%;
          animation: particle-float-blue 4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
                      0 0 20px rgba(59, 130, 246, 0.3);
        }
        @keyframes particle-float-blue {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-20px) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
