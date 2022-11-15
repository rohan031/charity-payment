const target = selectElement(".animate-list");
const listItems = document.querySelectorAll(".animate-list__item");
let observer, media;

// timeline for initial start animation
let tl = gsap.timeline({
	defaults: {
		ease: "power3.out",
	},
});

tl.from(".intro-image", {
	opacity: 0,
	duration: 1.8,
	x: 800,
}).from(
	".intro-text",
	{
		opacity: 0,
		duration: 1.4,
		y: 300,
	},
	"-=1.6"
);

// intersection observer
function animationBasedOnDevice(media, ob) {
	ob?.disconnect();

	if (media.matches) {
		const options = {
			root: null,
			threshold: 0.1,
		};

		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					gsap.to(".cards-list__item", {
						x: 0,
						opacity: 1,
						duration: 1.4,
						stagger: 0.3,
						ease: "power4.out",
					});
				}
			});
		}, options);

		observer.observe(target);

		return observer;
	}

	const options = {
		root: null,
		threshold: 0.2,
	};

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				gsap.to(entry.target, {
					x: 0,
					opacity: 1,
					duration: 1,
					stagger: 0.4,
					ease: "power4.out",
				});
			}
		});
	}, options);

	listItems.forEach((item) => observer.observe(item));

	return observer;
}

// media queries
media = window.matchMedia("(min-width: 50em)");

observer = animationBasedOnDevice(media);

media.addEventListener("change", (e) => {
	observer = animationBasedOnDevice(e.target, observer);
});
