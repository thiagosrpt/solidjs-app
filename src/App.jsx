import { createSignal, createEffect, onMount, onCleanup, For } from "solid-js";
import { slides } from "./assets/slide-data";

// Keep in sync with the slide's `duration-[800ms]` class
const SLIDE_DURATION = 800;
const CENTER_TOLERANCE = 2; // px

function App() {
  const [expanded, setExpanded] = createSignal(null);
  const [slideCategories, setSlideCategories] = createSignal([]);
  const [currentCategory, setCurrentCategory] = createSignal(0);
  // True while a slide is changing width; scroll-snap is paused so we can steer the scroll
  const [resizing, setResizing] = createSignal(false);
  // Initial theme is set by the inline script in index.html before first paint
  const [theme, setTheme] = createSignal(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  let scrollContainer;

  createEffect(() => {
    const isDark = theme() === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  });

  // Only persist an explicit choice, so first-time visitors keep following the OS setting
  const toggleTheme = () => {
    const next = theme() === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  // Keep the given slide's center on the container's center (instant, no smooth scroll)
  const centerOn = (el) => {
    const slideRect = el.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    scrollContainer.scrollLeft +=
      slideRect.left + slideRect.width / 2 - (containerRect.left + containerRect.width / 2);
  };

  const offsetFromCenter = (el) => {
    const slideRect = el.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    return slideRect.left + slideRect.width / 2 - (containerRect.left + containerRect.width / 2);
  };

  // While a slide changes width, pin it to the center every frame so it grows/shrinks
  // symmetrically instead of growing to the right and then being yanked back by scroll-snap.
  let rafId;
  const keepCentered = (el) => {
    cancelAnimationFrame(rafId);
    setResizing(true);
    const end = performance.now() + SLIDE_DURATION + 80;
    const tick = (now) => {
      centerOn(el);
      if (now < end) {
        rafId = requestAnimationFrame(tick);
      } else {
        setResizing(false);
      }
    };
    rafId = requestAnimationFrame(tick);
  };

  const open = (el) => {
    pendingSlide = null;
    setExpanded(el.id);
    keepCentered(el);
  };

  const collapse = (el) => {
    setExpanded(null);
    keepCentered(el);
  };

  // Scroll the target into the center; it opens once scrolling settles (see onScrollSettled)
  const goTo = (el) => {
    // Release the previous centering loop so it can't fight this scroll
    cancelAnimationFrame(rafId);
    setResizing(false);
    if (Math.abs(offsetFromCenter(el)) < CENTER_TOLERANCE) {
      open(el);
    } else {
      pendingSlide = el;
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  let pendingSlide = null;
  let switchTimer;
  const expandSlide = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    clearTimeout(switchTimer);

    const current = expanded();
    if (current === id) {
      collapse(el);
      return;
    }
    if (current) {
      // Close the open slide first, then travel to the new one: one motion at a time
      collapse(document.getElementById(current));
      switchTimer = setTimeout(() => goTo(el), SLIDE_DURATION);
    } else {
      goTo(el);
    }
  };

  const onScrollSettled = () => {
    if (pendingSlide && !resizing() && Math.abs(offsetFromCenter(pendingSlide)) < CENTER_TOLERANCE) {
      open(pendingSlide);
    }
  };

  onMount(() => {
    // `scrollend` where supported, with a debounced `scroll` fallback (e.g. older Safari)
    let debounce;
    const handleScroll = () => {
      clearTimeout(debounce);
      debounce = setTimeout(onScrollSettled, 120);
    };
    scrollContainer.addEventListener("scrollend", onScrollSettled);
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    onCleanup(() => {
      clearTimeout(debounce);
      clearTimeout(switchTimer);
      cancelAnimationFrame(rafId);
      scrollContainer.removeEventListener("scrollend", onScrollSettled);
      scrollContainer.removeEventListener("scroll", handleScroll);
    });
  });

  const getUniqueCategories = (slides) => {
    const categories = new Set();

    slides.forEach((slideGroup) => {
      slideGroup.forEach((slide) => {
        if (slide.category) {
          categories.add(slide.category);
        }
      });
    });
    return Array.from(categories);
  };

  //Check current category
  const isCurrentCategory = (c) => {
    if (c === currentCategory()) {
      return "opacity-100 group is-category";
    } else {
      return "opacity-0";
    }
  };

  const isExpanded = (s) => `slide-${s}` === expanded();

  createEffect(() => {
    setSlideCategories(getUniqueCategories(slides));
    setCurrentCategory(slides[0][0].category);
  });

  return (
    <div class="min-h-screen flex flex-col">
      <div class="sticky top-0 z-10 shrink-0 w-full bg-gray-700 dark:bg-gray-900 h-[60px] flex transition-colors duration-300">
        <div class="max-w-[500px] overflow-scroll inline-flex m-auto gap-6 no-scrollbar">
          <For each={slideCategories()}>
            {(category, i) => (
              <div
                class={`text-gray-800 text-nowrap cursor-pointer bg-white border-gray-300 py-2 px-6 rounded-full hover:bg-white
                  dark:bg-gray-800 dark:text-gray-100 dark:border dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-300
                  ${currentCategory() !== category && "opacity-75"}`}
                onClick={() => setCurrentCategory(category)}
              >
                {category}
              </div>
            )}
          </For>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme() === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme() === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          class="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full
            bg-white text-gray-800 hover:ring-2 hover:ring-gray-300
            dark:bg-gray-800 dark:text-yellow-300 dark:border dark:border-gray-700 dark:hover:ring-gray-600
            transition-colors duration-300"
        >
          {theme() === "dark" ? (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
      {/* Fills the space below the menu and centers the carousel vertically */}
      <main class="flex-1 flex items-center">
      <div
        ref={(el) => (scrollContainer = el)} // Assign the scroll container ref
        class={`no-scrollbar snap-x flex h-[min(600px,calc(100vh-92px))] w-full overflow-x-scroll gap-2 p-2
          ${resizing() ? "snap-none" : "snap-mandatory scroll-smooth"}`}
      >
        {/* Spacer: lets the first slide (300px wide + 8px gap) sit in the horizontal center */}
        <div class="h-full shrink-0 w-[calc(50%-158px)]"></div>

        <For each={slides}>
          {(slide, j) => (
            <div
              class={`relative overflow-hidden snap-center max-w-[1038px] shrink-0 h-full bg-gray-200 dark:bg-gray-800 cursor-pointer
                  shadow-md transition-[width,box-shadow] duration-[800ms] ease-soft motion-reduce:transition-none
                  ${isExpanded(j()) ? "w-full shadow-2xl group is-expanded" : "w-[300px]"}
                  ${resizing() ? "will-change-[width]" : ""}
                `}
              onClick={() => expandSlide(`slide-${j()}`)}
              id={`slide-${j()}`}
            >
              <For each={slide}>
                {(content) => (
                  <div
                    class={`absolute inset-0 text-white transition-opacity duration-700 ease-out motion-reduce:transition-none
                    ${isCurrentCategory(content.category)}
                    `}
                  >
                    {/* Fixed at the expanded size and centered: widening the slide reveals more of the
                        image like a curtain, instead of re-cropping/rescaling it on every frame */}
                    <img
                      src={content.coverImageUrl}
                      alt={content.title}
                      class="absolute top-0 left-1/2 h-full w-[1038px] min-w-full max-w-none -translate-x-1/2 object-cover
                        scale-105 transition-transform duration-[1200ms] ease-soft motion-reduce:transition-none
                        group-[.is-category]:scale-100"
                    />
                    <div
                      class="absolute top-0 inset-x-0 px-4 transition-[transform,opacity] duration-500 ease-soft motion-reduce:transition-none
                        group-[.is-expanded]:-translate-y-full group-[.is-expanded]:opacity-0"
                    >
                      <h2 class="text-lg p-2 text-center bg-black/40 backdrop-blur-sm rounded-b-2xl max-w-[250px] mx-auto">
                        {content.title}
                      </h2>
                    </div>
                    {/* Caption: fades and rises in as the slide finishes opening; leaves quickly on close */}
                    <div
                      class="absolute bottom-0 inset-x-0 px-6 pt-16 pb-6 bg-gradient-to-t from-black/75 via-black/40 to-transparent
                        translate-y-6 opacity-0 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none
                        group-[.is-expanded]:translate-y-0 group-[.is-expanded]:opacity-100
                        group-[.is-expanded]:duration-700 group-[.is-expanded]:delay-300"
                    >
                      <h2 class="text-xl font-medium">{content.title}</h2>
                      <p class="mt-1 max-w-2xl text-white/90">{content.description}</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>

        {/* Spacer: lets the last slide sit in the horizontal center */}
        <div class="h-full shrink-0 w-[calc(50%-158px)]"></div>
      </div>
      </main>
    </div>
  );
}

export default App;
