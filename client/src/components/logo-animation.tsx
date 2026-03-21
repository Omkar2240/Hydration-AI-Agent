export default function Hydramon() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      
      <div className="relative floaty wobble">
        
        {/* Character */}
        <img
          src="/logo-image-hydramon.png"
          alt="Hydramon"
          className="w-64 select-none pointer-events-none"
        />

        {/* Glass highlight (fake movement effect) */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 drink">
          <div className="w-10 h-16 bg-blue-200/40 rounded-b-lg blur-sm"></div>
        </div>

      </div>

    </div>
  );
}