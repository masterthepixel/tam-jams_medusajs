# Hero Epic

## Summary

This epic captures the work required to define, design, and build the homepage hero experience for Tam Jams as a flavor-first jam carousel.

## Goal

Create an immersive homepage hero that introduces the brand, celebrates jam flavor variety, and leads visitors into the store while matching the Apple-inspired visual system.

## Scope

- Hero headline and brand messaging
- Stacked jam card carousel with rotating flavor presentation
- Flavor overlay copy anchored in the lower third of the active card
- Flavor-specific ring colors and progressive blur/depth styling
- Responsive hero behavior across desktop and mobile
- Accessible controls with swipe and keyboard navigation

## Stories

- [x] Define hero copy and jam flavor messaging
- [x] Design hero visual treatment and carousel stacking
- [x] Implement hero component in the Next.js storefront
- [ ] Sign off responsive spacing and mobile behavior
- [ ] Validate accessibility for keyboard and screen reader users
- [ ] Add homepage metadata and SEO checks for the hero

## Notes

This epic is focused on the jam story, not a team profile. The hero currently renders:

- a large `OUR JAM` title
- a rounded stacked carousel with one active center card and two visible side cards
- a lower-third overlay for flavor name, label, and description
- flavor-specific color rings around each card
- increasing blur and grayscale for cards further back in the stack

At any time, one flavor is active in the center and one flavor is hidden behind the deck. The active center card changes with carousel navigation.

## SEO considerations

- **Semantic structure**: Use a clear hero heading and ensure the hero content reflects the jam flavor story.
- **Meta data**: Confirm homepage metadata mentions Tam Jams, flavor variety, and the jam experience.
- **Image SEO**: Use descriptive `alt` text for each flavor image, e.g. `Apple jam jar with fresh apples`.
- **Content relevance**: Keep hero content focused on jams, taste notes, and brand quality.
- **Performance**: Optimize hero images, keep the carousel lightweight, and avoid unnecessary script bloat.
- **Accessibility**: Ensure carousel controls are keyboard focusable and that any status updates are screen-reader friendly.
- **Social/Open Graph**: If the homepage has OG metadata, reflect jam flavor storytelling in preview text and imagery.
- **Localization**: Keep localized homepage metadata consistent across `/us`, `/ca`, and other routes.

## Current hero structure

```html
<section class="hero-carousel">
  <h1 class="about-title">OUR JAM</h1>
  <div class="carousel-container">
    <button class="nav-arrow left">‹</button>
    <div class="carousel-track">
      <!-- center, left-1, left-2, right-1, right-2, hidden cards -->
    </div>
    <button class="nav-arrow right">›</button>
  </div>
  <div class="member-info">
    <h2 class="member-name">Apple Jam</h2>
    <p class="member-role">Orchard Classic</p>
    <p class="member-description">Bright apple jam with a crisp, home-kitchen sweetness that pairs perfectly with toast and cheese.</p>
  </div>
  <div class="dots">
    <!-- flavor indicator dots -->
  </div>
</section>
```

## Current implementation details

- The hero is implemented in `src/modules/home/components/hero/index.tsx`
- Flavor cards are stored in `flavorCards`
- Flavor-specific ring colors are applied as a custom CSS variable
- The active card is centered, side cards appear with reduced scale
- Back cards are blurred and desaturated to emphasize depth
- The overlay text has been moved to the lower third of the hero card
- The top black nav bar is currently hidden while the white sub-nav remains visible
	margin-top: -15px;
	position: relative;
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

	.card {
		width: 200px;
		height: 280px;
	}

	.card.left-2 {
		transform: translateX(-250px) scale(0.8) translateZ(-300px);
	}

	.card.left-1 {
		transform: translateX(-120px) scale(0.9) translateZ(-100px);
	}

	.card.right-1 {
		transform: translateX(120px) scale(0.9) translateZ(-100px);
	}

	.card.right-2 {
		transform: translateX(250px) scale(0.8) translateZ(-300px);
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


const teamMembers = [
	{ name: "Emily Kim", role: "Founder" },
	{ name: "Michael Steward", role: "Creative Director" },
	{ name: "Emma Rodriguez", role: "Lead Developer" },
	{ name: "Julia Gimmel", role: "UX Designer" },
	{ name: "Lisa Anderson", role: "Marketing Manager" },
	{ name: "James Wilson", role: "Product Manager" }
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	memberName.style.opacity = "0";
	memberRole.style.opacity = "0";

	setTimeout(() => {
		memberName.textContent = teamMembers[currentIndex].name;
		memberRole.textContent = teamMembers[currentIndex].role;
		memberName.style.opacity = "1";
		memberRole.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);
