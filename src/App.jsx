import { slides } from "./assets/slide-data";
import { createSignal, createEffect, onCleanup, For } from "solid-js";

function App() {
  const [expanded, setExpanded] = createSignal(null);
  const [activeSlide, setActiveSlide] = createSignal(null);
  const [slideCategories, setSlideCategories] = createSignal([]);
  const [currentCategory, setCurrentCategory] = createSignal(0);
  let scrollContainer;
  
  const expandSlide = (slide) => {
    const slideElement = document.getElementById(slide);
    if (!slideElement) return;
  
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
      setActiveSlide(slideElement)
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
      return "opacity-100";
    } else {
      return "opacity-0";
    }
  };

  //Check Expanded Status
  const isExpanded = (s) => {
   if (`slide-${s}` === expanded()) {
    console.log("slide", s)
    return true
   } else {
    console.log("slide", s)
    return false
   }
  }
  

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

        if(offsetFromCenter === 0) {
          setExpanded(slideElement.id)
        }

        //return offsetFromCenter
      }
    }
  };

  createEffect(() => {
    const handleScroll = () => {
      checkSelectedSlidePosition()
    }

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
    <>
      <div class="w-full bg-black h-[60px] flex">
        <div class="max-w-[500px] overflow-scroll inline-flex m-auto gap-10 no-scrollbar">
          <For each={slideCategories()}>
            {(category, i) => (
              <div
                class="text-white text-nowrap cursor-pointer"
                onClick={() => setCurrentCategory(category)}
              >
                {category}
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        ref={(el) => (scrollContainer = el)} // Assign the scroll container ref
        class="snap-x snap-mandatory scroll-smooth inline-flex content-center h-[600px] w-full overflow-x-scroll bg-white gap-2 p-2"
      >
        {/* Empty div for padding */}
        <div class={`h-full transition-all shrink-0 w-[900px]`}></div>

        <For each={slides}>
          {(slide, j) => (
            <div
              class={`relative overflow-hidden snap-center max-w-[1216px] shadow-md transition-all duration-500 ease-in-out shrink-0 h-full bg-red-500 cursor-pointer 
                  ${
                    `slide-${j()}` !== expanded() ? "w-[300px]" : "w-[100%]"
                  }
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
                      <div
                        class="absolute top-0 w-full h-full"
                        style={{
                          "background-image": `url(${content.coverImageUrl})`, // corrected
                          "background-position": "center",
                        }}
                      ></div>
                      <div class="absolute w-full transition-all duration-500 top-0 px-4 
                          group-[.is-expanded]:top-[-25%]"
                      >
                        <h2 class="text-lg p-2 text-center bg-black bg-opacity-40 rounded-b-2xl max-w-[250px] mx-auto">
                          {content.title}
                        </h2>
                      </div>
                      <div class="absolute w-full p-2 bg-black bg-opacity-40 bottom-[-25%] transition-all duration-200 ease-in-out delay-0
                        group-[.is-expanded]:bottom-0 group-[.is-expanded]:delay-1000
                      ">
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

        {/* Empty div for padding */}
        <div class="h-full transition-all shrink-0 w-[900px]"></div>
      </div>
    </>
  );
}

export default App;
