export default function WaterLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src="/loading.png"
        alt="loading"
        className="w-32 h-32 spin-smooth"
      />
    </div>
  );
}