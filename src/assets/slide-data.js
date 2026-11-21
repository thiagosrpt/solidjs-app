// Placeholder content for illustration purposes only.
// Images come from Picsum (https://picsum.photos); the seed in each URL pins a specific photo,
// and the copy below was written to match what each photo shows.
// Each inner array is one carousel slide; each item is that slide's view for one category.
const picsum = (seed) => `https://picsum.photos/seed/${seed}/1200/800`;

export const slides = [
  [
    {
      type: 'image',
      imageUrl: picsum('introductory-video'),
      coverImageUrl: picsum('introductory-video'),
      title: 'Forest Floor',
      description: 'A weathered stone resting in wild ginger and fallen leaves. Some of the best scenes are found by looking down.',
      cta: 'Explore',
      category: 'Explore'
    },
    {
      type: 'image',
      imageUrl: picsum('customer-experience'),
      coverImageUrl: picsum('customer-experience'),
      title: 'Basalt Coast',
      description: 'Columns of volcanic rock meet a black pebble beach, where the North Atlantic has carved the cliffs for thousands of years.',
      cta: 'Read Story',
      category: 'Stories'
    }
  ],
  [
    {
      type: 'image',
      imageUrl: picsum('how-it-works'),
      coverImageUrl: picsum('how-it-works'),
      title: 'Patterns from Above',
      description: 'Seen from a drone, freshly mown grass becomes geometry: stripes, light and shadow laid out like a map.',
      cta: 'Explore',
      category: 'Explore'
    },
    {
      type: 'image',
      imageUrl: picsum('user-testimonials'),
      coverImageUrl: picsum('user-testimonials'),
      title: 'Above the Clouds',
      description: 'A contrail cuts across a quiet sky as clouds rise below. Notes from a window seat somewhere over the ocean.',
      cta: 'Read Story',
      category: 'Stories'
    }
  ],
  [
    {
      type: 'image',
      imageUrl: picsum('product-showcase'),
      coverImageUrl: picsum('product-showcase'),
      title: 'Left Behind',
      description: 'A vintage dashboard slowly being reclaimed by the trees. Its steering wheel still points toward the next road trip.',
      cta: 'Explore',
      category: 'Explore'
    },
    {
      type: 'image',
      imageUrl: picsum('success-stories'),
      coverImageUrl: picsum('success-stories'),
      title: 'Golden Hour',
      description: 'The last warm light of the day, and a moment to slow down and let the sun set without reaching for the phone.',
      cta: 'Read Story',
      category: 'Stories'
    }
  ],
  [
    {
      type: 'image',
      imageUrl: picsum('advanced-features'),
      coverImageUrl: picsum('advanced-features'),
      title: 'In Motion',
      description: 'Riders blur past the crowd during a city criterium. A slow shutter turns speed into something you can see.',
      cta: 'Explore',
      category: 'Explore'
    },
    {
      type: 'image',
      imageUrl: picsum('customer-success'),
      coverImageUrl: picsum('customer-success'),
      title: 'Rust & Wildflowers',
      description: 'An old barrel at the edge of a farm, peeling red against tall summer grass. Small details from a long country walk.',
      cta: 'Read Story',
      category: 'Stories'
    }
  ],
  [
    {
      type: 'image',
      imageUrl: picsum('city-lights'),
      coverImageUrl: picsum('city-lights'),
      title: 'Aurora from Orbit',
      description: 'The northern lights ripple across the planet, seen from a space station 400 km above the clouds.',
      cta: 'Explore',
      category: 'Explore'
    },
    {
      type: 'image',
      imageUrl: picsum('mountain-pass'),
      coverImageUrl: picsum('mountain-pass'),
      title: 'Violet Crossing',
      description: 'A long exposure smooths the bay into glass as a cable-stayed bridge stretches toward the far shore at dusk.',
      cta: 'Read Story',
      category: 'Stories'
    }
  ],
  [
    {
      type: 'image',
      imageUrl: picsum('product-demo'),
      coverImageUrl: picsum('product-demo'),
      title: 'Desert Palms',
      description: 'Wind-bent palms line the horizon as the sun sinks into a hazy desert sky.',
      cta: 'Explore',
      category: 'Explore'
    },
    {
      type: 'image',
      imageUrl: picsum('customer-spotlight'),
      coverImageUrl: picsum('customer-spotlight'),
      title: 'Still Water',
      description: 'A photographer waits at the lake edge for the blue hour, camera in hand and contrails overhead.',
      cta: 'Read Story',
      category: 'Stories'
    }
  ]
];
