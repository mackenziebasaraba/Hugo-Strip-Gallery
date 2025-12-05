document.addEventListener("DOMContentLoaded", () => {
	const components = document.querySelectorAll("[data-strip-gallery]");
	components.forEach(initStripGallery);
});

function initStripGallery(root) {
	const meta = JSON.parse(root.getAttribute("data-strip-gallery-meta"));
	const total = meta.length;

	const track   = root.querySelector("[data-strip-gallery-track]");
	const counter = root.querySelector("[data-strip-gallery-counter]");
	const caption = root.querySelector("[data-strip-gallery-caption]");
	const btnPrev = root.querySelector("[data-strip-gallery-prev]");
	const btnNext = root.querySelector("[data-strip-gallery-next]");
	const items   = Array.from(track.children);

	const imgs = items.map(item => item.querySelector("img"));

	let active = 0;

	function preload(idx) {
		if (idx < 0 || idx >= imgs.length) return;
		const img = imgs[idx];
		if (!img) return;
		img.decode?.().catch(() => {});
	}

	function update() {
		counter.textContent = `${active + 1} of ${total}`;
		caption.innerHTML = meta[active].captionRendered || "";

		items.forEach((item, i) =>
			item.classList.toggle("is-active", i === active)
		);

		const activeItem = items[active];
		const dx = activeItem.offsetLeft;
		track.style.transform = `translateX(${-dx}px)`;

		preload(active + 1);
		preload(active + 2);
	}

	function go(n) {
		active = Math.min(Math.max(n, 0), total - 1);
		update();
	}

	btnPrev.addEventListener("click", () => go(active - 1));
	btnNext.addEventListener("click", () => go(active + 1));

	items.forEach((item, i) =>
		item.addEventListener("click", () => go(i))
	);

	window.addEventListener("resize", update);

	requestAnimationFrame(update);
}
