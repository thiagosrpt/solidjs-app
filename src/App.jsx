import { createSignal, createEffect, onCleanup, For } from "solid-js";
import { slides } from "./assets/slide-data";

function App() {
  const [expanded, setExpanded] = createSignal(null);
  const [activeSlide, setActiveSlide] = createSignal(null);
  const [slideCategories, setSlideCategories] = createSignal([]);
  const [currentCategory, setCurrentCategory] = createSignal(0);
  const [slideAnimationEnded, setSlideAnimationEnded] = createSignal(false);
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

  createEffect(() => {
    if (expanded()) {
      let slide = document.getElementById(expanded());

      const handleTransitionEnd = (event) => {
        if (event.propertyName === "width") {
          setSlideAnimationEnded(true);
          console.log("ended animation");
        }
      };

      slide.addEventListener("transitionend", handleTransitionEnd);

      onCleanup(() => {
        slide.removeEventListener("transitionend", handleTransitionEnd); // Clean up the listener
      });
    }
  });

  const expandSlide = (slide) => {
    const slideElement = document.getElementById(slide);
    if (!slideElement) return;
    setSlideAnimationEnded(false);

    // Calculate the offset from the center
    const slideRect = slideElement.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    const slideCenter = slideRect.left + slideRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const offsetFromCenter = slideCenter - containerCenter;

    // If the slide is already in the center, trigger the expand function directly
    if (offsetFromCenter === 0) {
      if (slide === expanded()) {
        setExpanded(null);
        setActiveSlide(null);
      } else {
        setExpanded(slide);
        setActiveSlide(slideElement);
      }
    } else {
      slideElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveSlide(slideElement);
    }
  };

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

  //Check Expanded Status
  const isExpanded = (s) => {
    if (`slide-${s}` === expanded()) {
      console.log("slide", s);
      return true;
    } else {
      console.log("slide", s);
      return false;
    }
  };

  const checkSelectedSlidePosition = () => {
    if (activeSlide()) {
      const slideElement = activeSlide();
      const scrollContainerElement = scrollContainer;

      if (slideElement && scrollContainerElement) {
        const slideRect = slideElement.getBoundingClientRect();
        const containerRect = scrollContainerElement.getBoundingClientRect();

        const slideCenter = slideRect.left + slideRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;

        const offsetFromCenter = slideCenter - containerCenter;

        if (offsetFromCenter === 0) {
          setExpanded(slideElement.id);
        }

        //return offsetFromCenter
      }
    }
  };

  createEffect(() => {
    const handleScroll = () => {
      checkSelectedSlidePosition();
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    onCleanup(() => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    });
  });

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
        class="no-scrollbar snap-x snap-mandatory scroll-smooth flex h-[min(600px,calc(100vh-92px))] w-full overflow-x-scroll gap-2 p-2"
      >
        {/* Spacer: lets the first slide (300px wide + 8px gap) sit in the horizontal center */}
        <div class="h-full shrink-0 w-[calc(50%-158px)]"></div>

        <For each={slides}>
          {(slide, j) => (
            <div
              class={`relative overflow-hidden snap-center max-w-[1038px] shadow-md transition-all duration-500 ease-in-out shrink-0 h-full bg-gray-200 dark:bg-gray-800 cursor-pointer
                  ${`slide-${j()}` !== expanded() ? "w-[300px]" : "w-[100%]"}
                  ${isExpanded(j()) && "group is-expanded"}
                `}
              onClick={() => expandSlide(`slide-${j()}`)}
              id={`slide-${j()}`}
            >
              <For each={slide}>
                {(content, c) => (
                  <>
                    <div
                      class={`absolute top-0 h-full w-full text-white transition-all duration-500 ease-in-out
                      ${isCurrentCategory(content.category)}
                      `}
                    >
                        <img
                          src={content.coverImageUrl}
                          alt={content.title}
                          class="absolute inset-0 object-cover w-full h-[125%] transition-all duration-200 ease-out group-[.is-category]:h-full"
                        />
                      <div
                        class="absolute w-full transition-all duration-500 top-0 px-4 
                          group-[.is-expanded]:top-[-25%]"
                      >
                        <h2 class="text-lg p-2 text-center bg-black bg-opacity-40 rounded-b-2xl max-w-[250px] mx-auto">
                          {content.title}
                        </h2>
                      </div>
                      <div
                        class={`absolute w-full p-2 bg-black bg-opacity-40 bottom-[-25%] opacity-0
                        ${
                          slideAnimationEnded() &&
                          "group-[.is-expanded]:animate-slide group-[.is-expanded]:bottom-0 group-[.is-expanded]:opacity-100"
                        }`}
                      >
                        <h2 class="text-lg">{content.title}</h2>
                        <p>{content.description}</p>
                      </div>
                    </div>
                  </>
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
