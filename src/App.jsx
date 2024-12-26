
const slides = [
  [
    {
      type: 'video',
      videoUrl: 'https://example.com/video1.mp4',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/alan_96167_a_colour_crayon_sketch_of_two_young_men_in_khaki_out_9a27b7b7-6e84-45b8-959a-4128c44e7a26.webp',
      title: 'Introductory Video',
      description: 'Our product features: Introduction.',
      cta: 'Watch Now',
      category: 'Product Demos'
    },
    {
      type: 'video',
      videoUrl: 'https://example.com/video5.mp4',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_hyper-realistic_169_image_of_Saturn_set_against_the_backd_907d83c1-777b-41b9-8b6a-33ec1c96476b.webp',
      title: 'Customer Experience',
      description: 'What our customers have to say.',
      cta: 'Watch Story',
      category: 'Customer Stories'
    }
  ],
  [
    {
      type: 'video',
      videoUrl: 'https://example.com/video2.mp4',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/alan_96167_a_colour_crayon_sketch_of_two_young_men_in_safari_ou_e08b5ec0-d5b8-44f2-8a3e-fe46ccb85290.webp',
      title: 'How It Works',
      description: 'Step-by-step guide on using the product.',
      cta: 'Learn More',
      category: 'Product Demos'
    },
    {
      type: 'image',
      imageUrl: 'https://example.com/image3.jpg',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_hyper-realistic_image_of_a_high-end_car_parked_on_a_rain-_56ac3d11-66fe-4fb0-9944-f551435762f7.webp',
      title: 'User Testimonials',
      description: 'Read reviews from our happy customers.',
      cta: 'Read Reviews',
      category: 'Customer Stories'
    }
  ],
  [
    {
      type: 'image',
      imageUrl: 'https://example.com/image1.jpg',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/jiraesdae_A_photograph_of_a_volunteer_teacher_in_a_Southeast_As_b4468539-a23c-4952-aa2e-723961a6008e.webp',
      title: 'Product Showcase',
      description: 'Explore the product features.',
      cta: 'View Details',
      category: 'Product Demos'
    },
    {
      type: 'video',
      videoUrl: 'https://example.com/video6.mp4',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_journalistic-style_image_capturing_a_scene_deep_beneath_t_e2a80c88-ad29-4206-8ae5-6986f13528f5.webp',
      title: 'Success Stories',
      description: 'Success stories from real users.',
      cta: 'Watch Now',
      category: 'Customer Stories'
    }
  ],
  [
    {
      type: 'video',
      videoUrl: 'https://example.com/video3.mp4',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_a_sleek_modern_smartphone_with_an_edge-to-edge_OLED_displ_9efc3301-d2fd-47da-8bb3-ff3c0313b6b7.webp',
      title: 'Advanced Features',
      description: 'Learn about our advanced features.',
      cta: 'Watch Now',
      category: 'Product Demos'
    },
    {
      type: 'image',
      imageUrl: 'https://example.com/image4.jpg',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_Picture_a_dark_ethereal_scene_where_Saturn_and_its_rings__a66ac341-9313-405c-ae6d-d6774be194a1.webp',
      title: 'Customer Success',
      description: 'See how our product helps customers achieve success.',
      cta: 'Learn More',
      category: 'Customer Stories'
    }
  ],
  [
    {
      type: 'image',
      imageUrl: 'https://example.com/image2.jpg',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_a_sleek_modern_smartphone_with_an_edge-to-edge_OLED_displ_abab0275-d63f-4ca3-873a-ff1f75bb6222.webp',
      title: 'Feature Comparison',
      description: 'See how we compare with competitors.',
      cta: 'Compare Now',
      category: 'Product Demos'
    },
    {
      type: 'video',
      videoUrl: 'https://example.com/video7.mp4',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_the_interior_of_this_high-end_car_a_seamless_blend_of_lux_7ab7f5ae-5fb7-4e12-a705-2c806a96bd04.webp',
      title: 'Community Impact',
      description: 'How our customers are making a difference.',
      cta: 'Watch Now',
      category: 'Customer Stories'
    }
  ],
  [
    {
      type: 'video',
      videoUrl: 'https://example.com/video4.mp4',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_a_stunning_hyper-realistic_image_of_a_vast_ancient_cave_i_3bf2721b-3c2f-456c-ae2d-35f77eb9f4cb.webp',
      title: 'Product Demo',
      description: 'Watch a full demo of our product in action.',
      cta: 'Watch Demo',
      category: 'Product Demos'
    },
    {
      type: 'image',
      imageUrl: 'https://example.com/image5.jpg',
      coverImageUrl: 'https://solid-js-slider.s3.us-east-1.amazonaws.com/images/t.ptr_the_interior_of_this_high-end_car_a_seamless_blend_of_lux_c285ec3c-7271-4390-bf99-443c0c916cd1.webp',
      title: 'Customer Spotlight',
      description: 'Highlighting our standout customers.',
      cta: 'View Spotlight',
      category: 'Customer Stories'
    }
  ]
];
import { createSignal, createEffect, onCleanup, For } from "solid-js";

function App() {
  const [expanded, setExpanded] = createSignal(null);
  const [activeSlide, setActiveSlide] = createSignal(null);
  const [slideCategories, setSlideCategories] = createSignal([]);
  const [currentCategory, setCurrentCategory] = createSignal(0);
  const [slideAnimationEnded, setSlideAnimationEnded] = createSignal(false);
  let scrollContainer;

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
    <>
      <div class="w-full bg-gray-500 h-[60px] flex">
        <div class="max-w-[500px] overflow-scroll inline-flex m-auto gap-8 no-scrollbar">
          <For each={slideCategories()}>
            {(category, i) => (
              <div
                class={`text-gray-800 text-nowrap cursor-pointer bg-white py-2 px-6 rounded-full hover:bg-white
                  ${currentCategory() !== category && "opacity-75"}`}
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
        <div class={`h-full transition-all shrink-0 w-[50%]`}></div>

        <For each={slides}>
          {(slide, j) => (
            <div
              class={`relative overflow-hidden snap-center max-w-[1038px] shadow-md transition-all duration-500 ease-in-out shrink-0 h-full bg-red-500 cursor-pointer 
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
                          alt="Cover Image"
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

        {/* Empty div for padding */}
        <div class="h-full transition-all shrink-0 w-[50vw]"></div>
      </div>
    </>
  );
}

export default App;
