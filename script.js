// PS: Addendum: sinds 2023 vorig jaar is er ook een manier om scrolling animaties te maken met alleen CSS, zonder JavaScript!! Dit wordt NIET in onderstaande voorbeelden gebruikt.

// Er zijn dus 3 manieren van animaties maken:
// 1. CSS keyframe animaties met JavaScript "gelijk laten lopen" met de scrollbar, scroll afstand = keyframe aantal.
// 2. CSS keyframe animaties met JavaScript "plakken" op HTML objecten, op het moment dat een element "in beeld" scrolt!
// 3. CSS scrolling animaties ZONDER JavaScript gelinkt aan de scrollbar, met CSS alleen! Sinds 2023!

// ================================================

// NOTE: manier 1
// Voorbeeld van JavaScript gebruiken voor scroll animaties, gescrolde afstand = animatie lengte! (setProperty method) Onderstaand voorbeeld maakt gebruik van JavaScript om de scroll afstand van de scrollbar te "mappen" naar de animatie beweging van CSS keyframes! We maken een unieke CSS property aan die we "--scrollbar" noemen, deze houdt automatische de verticale scrollafstand bij voor je CSS animaties!

/* VERGEET NIET DIT IN JE CSS CODE TE PLAATSEN
BIJ HET HTML ELEMENT DAT JE LAAT BEWEGEN, bijvoorbeeld: */
/* ==================================================== 
    .mannetje {
      animation-play-state: paused;
      animation-delay: calc(var(--scrollbar) * -1s);
      animation-iteration-count: 1;
      animation-fill-mode: both;  
   ==================================================== 
*/
window.addEventListener(
	"scroll",
	() => {
		document.body.style.setProperty("--scrollbar", window.scrollY / (document.body.offsetHeight - window.innerHeight));
	},
	false
);

// NOTE: manier 2
// Voorbeeld van JavaScript gebruiken voor scroll animaties(IntersectionObserver) Onderstaand voorbeeld maakt gebruik van JavaScript om te kijken of een element "in beeld" komt, op dat moment wordt de CSS animatie op DAT element gestart! Keyframe animaties zijn in CSS classes geplaatst.

const elements = {
	astronautJuan: {
		element: document.querySelector(".astronaut_juan"),
		className: "van_rechts",
	},
	badkuip: {
		element: document.querySelector(".badkuip"),
		className: "badkuip_naar_links",
	},
	raam: {
		element: document.querySelector(".raam"),
		className: "raam_naar_rechts",
	},
};

const options = {
	root: null,
	rootMargin: "0px",
	threshold: 0.1,
};

function handleIntersection(entries, observer) {
	entries.forEach((entry) => {
		Object.entries(elements).forEach(([key, value]) => {
			if (entry.target === value.element) {
				if (entry.isIntersecting) {
					value.element.classList.add(value.className);
				} else {
					value.element.classList.remove(value.className);
				}
			}
		});
	});
}
const observer = new IntersectionObserver(handleIntersection, options);
Object.values(elements).forEach((value) => {
	observer.observe(value.element);
});
