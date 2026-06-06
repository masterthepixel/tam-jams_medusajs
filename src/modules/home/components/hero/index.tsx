"use client"

import { useEffect, useMemo, useState, type TouchEvent } from "react"

const flavorCards = [
  {
    name: "Apple",
    label: "Orchard Classic",
    description:
      "Bright apple jam with a crisp, home-kitchen sweetness that pairs perfectly with toast and cheese.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    alt: "Apple jam jar with fresh apple slices",
  },
  {
    name: "Apricot",
    label: "Sun-Kissed Spread",
    description:
      "Velvety apricot jam with a warm golden glow and balanced sweetness from sun-ripened fruit.",
    image:
      "https://images.unsplash.com/photo-1514511448416-34c09d8f3eda?auto=format&fit=crop&w=1200&q=80",
    alt: "Apricot jam jar surrounded by apricots",
  },
  {
    name: "Blueberry",
    label: "Midnight Berry",
    description:
      "Deep blueberry jam rich with berry depth, perfect for morning pastries and savory pairings.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    alt: "Blueberry jam jar with fresh blueberries",
  },
  {
    name: "Raspberry",
    label: "Garden Bright",
    description:
      "Tangy raspberry jam bursting with summer flavor, brightening every bite with its lively notes.",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Raspberry jam jar with ripe raspberries",
  },
  {
    name: "Sour Cherry",
    label: "Tart & True",
    description:
      "Sour cherry jam with a bold tart edge, bringing elegant contrast to rich cheese and baked goods.",
    image:
      "https://images.unsplash.com/photo-1560179707-5aad0191de06?auto=format&fit=crop&w=1200&q=80",
    alt: "Sour cherry jam jar with cherries",
  },
  {
    name: "Strawberry",
    label: "Summer Red",
    description:
      "Classic strawberry jam made with ripe berries for a sweet, nostalgic finish on every plate.",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
    alt: "Strawberry jam jar with strawberries",
  },
]

const positionClassForOffset = (offset: number, length: number) => {
  if (offset === 0) return "center"
  if (offset === 1) return "right-1"
  if (offset === 2) return "right-2"
  if (offset === length - 1) return "left-1"
  if (offset === length - 2) return "left-2"
  return "hidden"
}

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)

  const cards = useMemo(
    () =>
      flavorCards.map((card, i) => {
        const offset = (i - currentIndex + flavorCards.length) % flavorCards.length
        return {
          ...card,
          positionClass: positionClassForOffset(offset, flavorCards.length),
        }
      }),
    [currentIndex]
  )

  const currentFlavor = flavorCards[currentIndex]

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((newIndex + flavorCards.length) % flavorCards.length)
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsAnimating(false), 800)
    return () => window.clearTimeout(timeout)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        updateCarousel(currentIndex - 1)
      } else if (event.key === "ArrowRight") {
        updateCarousel(currentIndex + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, isAnimating])

  const handleSwipeStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0].screenX)
  }

  const handleSwipeEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0].screenX
    const diff = touchStartX - touchEndX
    const swipeThreshold = 50
    if (Math.abs(diff) > swipeThreshold) {
      updateCarousel(diff > 0 ? currentIndex + 1 : currentIndex - 1)
    }
  }

  return (
    <section className="hero-carousel relative overflow-hidden text-white pb-20 pt-5 md:pt-6">
      <h1 className="about-title">OUR JAM</h1>

      <div
        className="carousel-container"
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
      >
        <button
          type="button"
          className="nav-arrow left"
          aria-label="Previous flavor"
          onClick={() => updateCarousel(currentIndex - 1)}
        >
          ‹
        </button>

        <div className="carousel-track">
          {cards.map((card, index) => (
            <div key={card.name} className={`card ${card.positionClass}`} data-index={index}>
              <img src={card.image} alt={card.alt} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="nav-arrow right"
          aria-label="Next flavor"
          onClick={() => updateCarousel(currentIndex + 1)}
        >
          ›
        </button>
      </div>

      <div className="member-info">
        <h2 className="member-name">{currentFlavor.name} Jam</h2>
        <p className="member-role">{currentFlavor.label}</p>
        <p className="member-description">{currentFlavor.description}</p>
      </div>

      <div className="dots">
        {flavorCards.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${index === currentIndex ? "active" : ""}`}
            aria-label={`Show ${flavorCards[index].name} flavor`}
            onClick={() => updateCarousel(index)}
          />
        ))}
      </div>

      <style jsx>{`
        .hero-carousel {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background-color: transparent;
        }

        .about-title {
          font-size: 7.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          white-space: nowrap;
          font-family: "Arial Black", "Arial Bold", Arial, sans-serif;
          background: linear-gradient(
            to bottom,
            rgba(8, 42, 123, 0.35) 30%,
            rgba(255, 255, 255, 0) 76%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          z-index: 10;
        }

        .carousel-container {
          width: 100%;
          max-width: 1200px;
          height: 450px;
          position: relative;
          perspective: 1000px;
          margin: 24px auto 0;
        }

        .carousel-track {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card {
          position: absolute;
          left: 50%;
          top: 0;
          width: 280px;
          height: 380px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card.center {
          z-index: 10;
          transform: translateX(-50%) scale(1.1) translateZ(0);
        }

        .card.center img {
          filter: none;
        }

        .card.left-2 {
          z-index: 1;
          transform: translateX(calc(-400px - 50%)) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .card.left-2 img {
          filter: grayscale(100%);
        }

        .card.left-1 {
          z-index: 5;
          transform: translateX(calc(-200px - 50%)) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .card.left-1 img {
          filter: grayscale(100%);
        }

        .card.right-1 {
          z-index: 5;
          transform: translateX(calc(200px - 50%)) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .card.right-1 img {
          filter: grayscale(100%);
        }

        .card.right-2 {
          z-index: 1;
          transform: translateX(calc(400px - 50%)) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .card.right-2 img {
          filter: grayscale(100%);
        }

        .card.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .member-info {
          text-align: center;
          position: absolute;
          top: 150px;
          left: 50%;
          transform: translateX(-50%);
          width: min(280px, 100%);
          max-width: 280px;
          margin: 0;
          padding: 0 16px;
          transition: all 0.5s ease-out;
          z-index: 15;
          word-break: break-word;
        }

        .member-name {
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          display: inline-block;
          line-height: 1.1;
        }

        .member-name::before {
          left: -120px;
        }

        .member-name::after {
          right: -120px;
        }

        .member-role {
          color: #b5b7c7;
          font-size: 1.2rem;
          font-weight: 500;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 8px 0;
          margin-top: -12px;
          position: relative;
        }

        .member-description {
          color: #d2d2ea;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-top: 14px;
        }

        .dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 60px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(8, 42, 123, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .dot.active {
          background: rgb(8, 42, 123);
          transform: scale(1.2);
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(8, 42, 123, 0.6);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          font-size: 1.5rem;
          border: none;
          outline: none;
          padding-bottom: 4px;
        }

        .nav-arrow:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-arrow.left {
          left: 20px;
          padding-right: 3px;
        }

        .nav-arrow.right {
          right: 20px;
          padding-left: 3px;
        }

        @media (max-width: 768px) {
          .about-title {
            font-size: 4.5rem;
          }

          .carousel-container {
            height: 330px;
          }

          .card {
            width: 200px;
            height: 280px;
          }

          .card.left-2 {
            transform: translateX(calc(-250px - 50%)) scale(0.8) translateZ(-300px);
          }

          .card.left-1 {
            transform: translateX(calc(-120px - 50%)) scale(0.9) translateZ(-100px);
          }

          .card.right-1 {
            transform: translateX(calc(120px - 50%)) scale(0.9) translateZ(-100px);
          }

          .card.right-2 {
            transform: translateX(calc(250px - 50%)) scale(0.8) translateZ(-300px);
          }

          .member-name {
            font-size: 2rem;
          }

          .member-role {
            font-size: 1.2rem;
          }

          .member-name::before,
          .member-name::after {
            width: 50px;
          }

          .member-name::before {
            left: -70px;
          }

          .member-name::after {
            right: -70px;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
