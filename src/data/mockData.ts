import { Restaurant, CuisineType, Category, Dish, PriceCategory, Review } from "../types";

// --- Helpers ---

const getRandomRating = () => parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1));
const getRandomScore = () => Math.floor(Math.random() * (100 - 70) + 70);

const MOCK_REVIEWS: Review[] = [
  { id: "r1", user: "Rahul S.", rating: 5, comment: "Absolutely authentic taste! Highly recommended.", date: "2024-02-15" },
  { id: "r2", user: "Priya M.", rating: 4, comment: "Great ambiance and quick service.", date: "2024-02-10" },
  { id: "r3", user: "Amit K.", rating: 4.5, comment: "The popular dish here is a must-try.", date: "2024-02-05" },
  { id: "r4", user: "Sneha G.", rating: 3.5, comment: "Good food but waiting time was a bit long.", date: "2024-01-28" },
];

const FOOD_IMAGES = {
  STREET: [
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1589187151003-0dd34ad6023d?auto=format&fit=crop&w=800&q=80",
  ],
  MAIN: [
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
  ],
  DESSERT: [
    "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
  ]
};

const RESTAURANT_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
];

const generateMenu = (city: string, type: string): Dish[] => {
  const menu: Dish[] = [];
  const categories = [Category.STARTER, Category.MAIN_COURSE, Category.DESSERT, Category.BEVERAGE];
  
  // Add 12-15 items
  for (let i = 0; i < 12; i++) {
    const cat = categories[i % categories.length];
    const isPopular = i === 0;
    menu.push({
      id: `dish-${city}-${type}-${i}`,
      name: `${city} ${type} Special ${i + 1}`,
      price: Math.floor(Math.random() * (800 - 100) + 100),
      image: i % 2 === 0 ? FOOD_IMAGES.MAIN[i % 3] : FOOD_IMAGES.STREET[i % 3],
      category: cat,
      description: `A delicious ${cat.toLowerCase()} prepared with authentic ${city} spices.`,
      rating: getRandomRating(),
      isPopular,
      reviews: MOCK_REVIEWS.slice(0, 2),
    });
  }
  return menu;
};

const generateRestaurants = (city: string, count: number): Restaurant[] => {
  const restaurants: Restaurant[] = [];
  const types = ["Street Food", "Casual Dining", "Fine Dining", "Cafe", "Bistro"];
  const locations = {
    Mumbai: ["Bandra", "Colaba", "Juhu", "Andheri", "Dadar", "Worli", "Powai"],
    Delhi: ["Connaught Place", "Hauz Khas", "Chandni Chowk", "Saket", "Karol Bagh"],
    Bengaluru: ["Indiranagar", "Koramangala", "MG Road", "Whitefield", "Jayanagar"],
    Hyderabad: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitech City"],
  };

  const cityLocations = locations[city as keyof typeof locations] || ["Downtown"];

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    const loc = cityLocations[i % cityLocations.length];
    const priceCat = i % 4 === 0 ? PriceCategory.LUXURY : i % 3 === 0 ? PriceCategory.EXPENSIVE : PriceCategory.MODERATE;
    
    restaurants.push({
      id: `${city.toLowerCase()}-${i}`,
      name: `${city} ${type} ${i + 1}`,
      city,
      location: loc,
      rating: getRandomRating(),
      cuisine: [CuisineType.INDIAN, i % 2 === 0 ? CuisineType.STREET_FOOD : CuisineType.CASUAL],
      image: RESTAURANT_IMAGES[i % RESTAURANT_IMAGES.length],
      history: `Serving authentic flavors in ${loc} for over ${Math.floor(Math.random() * 50 + 5)} years.`,
      trustScore: getRandomScore(),
      authenticityScore: getRandomScore(),
      priceCategory: priceCat,
      description: `The best place in ${city} for authentic ${type.toLowerCase()} experience.`,
      menu: generateMenu(city, type),
      popularDishId: `dish-${city}-${type}-0`,
      reviews: MOCK_REVIEWS,
    });
  }
  return restaurants;
};

// --- Exported Data ---

export const MOCK_RESTAURANTS: Restaurant[] = [
  ...generateRestaurants("Mumbai", 38),
  ...generateRestaurants("Delhi", 22),
  ...generateRestaurants("Bengaluru", 22),
  ...generateRestaurants("Hyderabad", 15),
];

export const CITY_SPECIALTIES: Record<string, string[]> = {
  Mumbai: ["Vada Pav", "Pav Bhaji", "Bombay Sandwich", "Misal Pav"],
  Delhi: ["Chole Bhature", "Butter Chicken", "Paratha", "Chaat"],
  Bengaluru: ["Masala Dosa", "Idli", "Bisi Bele Bath", "Filter Coffee"],
  Hyderabad: ["Hyderabadi Biryani", "Haleem", "Double Ka Meetha"],
};

export const CITY_SPECIALTY_DATA: Record<string, Dish[]> = {
  Mumbai: [
    {
      id: "sp-mum-1",
      name: "Classic Vada Pav",
      price: 20,
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
      category: Category.STREET_FOOD,
      description: "The soul of Mumbai. Spicy potato fritter in a bun.",
      rating: 5.0,
      reviews: [],
    },
    {
      id: "sp-mum-2",
      name: "Buttery Pav Bhaji",
      price: 120,
      image: "https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&w=800&q=80",
      category: Category.STREET_FOOD,
      description: "Mashed vegetable curry served with soft buttered buns.",
      rating: 4.9,
      reviews: [],
    }
  ],
  Delhi: [
    {
      id: "sp-del-1",
      name: "Chole Bhature",
      price: 150,
      image: "https://images.unsplash.com/photo-1589187151003-0dd34ad6023d?auto=format&fit=crop&w=800&q=80",
      category: Category.STREET_FOOD,
      description: "Spicy chickpeas served with fried leavened bread.",
      rating: 4.9,
      reviews: [],
    },
    {
      id: "sp-del-2",
      name: "Butter Chicken",
      price: 450,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
      category: Category.MAIN_COURSE,
      description: "Rich, creamy, and legendary Old Delhi style.",
      rating: 5.0,
      reviews: [],
    }
  ],
  Bengaluru: [
    {
      id: "sp-blr-1",
      name: "Benne Masala Dosa",
      price: 90,
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
      category: Category.MAIN_COURSE,
      description: "Crispy dosa with a dollop of butter and potato filling.",
      rating: 4.8,
      reviews: [],
    }
  ],
};
