const Hero = () => {
  return (
    <div className="tile tile--light min-h-screen flex flex-col items-center justify-center text-center gap-6">
      <h1 className="font-display text-display-lg font-semibold text-apple-ink tracking-tight">
        Tam Jams
      </h1>
      <p className="font-sans text-lead font-normal text-apple-ink tracking-wide">
        Premium flavors, delivered.
      </p>
      <div className="flex gap-4 justify-center">
        <a href="/store" className="btn-pill">Shop Now</a>
        <a href="/store" className="btn-pill-ghost">Explore</a>
      </div>
      <div className="w-full aspect-video bg-apple-parchment" />
    </div>
  )
}

export default Hero
