using Microsoft.EntityFrameworkCore;
using RecipeNest.Models;

namespace RecipeNest.Data
{
    public static class SeedData
    {
        public static void Initialize(RecipeNestContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Chefs.Any())
            {
                var chefs = new List<Chef>
                {
                    new Chef { 
                        Name = "Marco Rossi", 
                        Email = "marco@example.com", 
                        Specialty = "Italian Cuisine Specialist", 
                        Bio = "Passionate about authentic Italian pasta and sauces with over 15 years of experience in Milan's finest kitchens.",
                        ProfileImageUrl = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&q=60",
                        Password = "password123",
                        Likes = 125
                    },
                    new Chef { 
                        Name = "Ayesha Khan", 
                        Email = "ayesha@example.com", 
                        Specialty = "South Asian Cuisine Expert", 
                        Bio = "Specializing in traditional curries and spices that bring the taste of Lahore to the world.",
                        ProfileImageUrl = "https://images.unsplash.com/photo-1583394238182-6f3ad43267b1?w=500&q=60",
                        Password = "password123",
                        Likes = 342
                    },
                    new Chef { 
                        Name = "Takashi Yamamoto", 
                        Email = "takashi@example.com", 
                        Specialty = "Japanese Cuisine Master", 
                        Bio = "Master of Sushi and traditional Kaiseki with a focus on seasonal and fresh ingredients.",
                        ProfileImageUrl = "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=500&q=60",
                        Password = "password123",
                        Likes = 210
                    }
                };
                context.Chefs.AddRange(chefs);
                context.SaveChanges();
            }

            if (!context.Recipes.Any())
            {
                var allChefs = context.Chefs.ToList();
                if (allChefs.Count >= 3) {
                    var recipes = new List<Recipe>
                    {
                        new Recipe { 
                            Name = "Authentic Miso Ramen", 
                            Category = "Main Course", 
                            TimeToPrepare = "45 mins",
                            Ingredients = "Miso paste, Dashi, Ramen noodles, Soft boiled egg, Green onions",
                            Instructions = "1. Prepare broth... 2. Boil noodles... 3. Assemble bowl.",
                            ChefId = allChefs[2].Id 
                        },
                        new Recipe { 
                            Name = "Dragon Roll Sushi", 
                            Category = "Appetizer", 
                            TimeToPrepare = "30 mins",
                            Ingredients = "Sushi rice, Nori, Tempura shrimp, Avocado, Eel sauce",
                            Instructions = "1. Layer rice on nori... 2. Add shrimp... 3. Roll and top with avocado.",
                            ChefId = allChefs[2].Id 
                        },
                        new Recipe { 
                            Name = "Classic Margherita Pizza", 
                            Category = "Main Course", 
                            TimeToPrepare = "20 mins",
                            Ingredients = "Pizza dough, San Marzano tomatoes, Fresh mozzarella, Basil",
                            Instructions = "1. Spread sauce... 2. Add cheese... 3. Bake at high heat... 4. Garnish with basil.",
                            ChefId = allChefs[0].Id 
                        },
                        new Recipe { 
                            Name = "Spicy Chicken Karahi", 
                            Category = "Main Course", 
                            TimeToPrepare = "40 mins",
                            Ingredients = "Chicken, Ginger, Garlic, Tomatoes, Green chilies, Spices",
                            Instructions = "1. Fry chicken... 2. Add ginger garlic... 3. Add tomatoes and spices... 4. Garnish with cilantro.",
                            ChefId = allChefs[1].Id 
                        },
                        new Recipe { 
                            Name = "Tiramisu Dessert", 
                            Category = "Dessert", 
                            TimeToPrepare = "30 mins",
                            Ingredients = "Ladyfingers, Mascarpone, Coffee, Cocoa powder, Eggs",
                            Instructions = "1. Dip ladyfingers in coffee... 2. Layer with mascarpone mix... 3. Dust with cocoa... 4. Chill for 4 hours.",
                            ChefId = allChefs[0].Id 
                        },
                        new Recipe { 
                            Name = "Paneer Tikka", 
                            Category = "Appetizer", 
                            TimeToPrepare = "25 mins",
                            Ingredients = "Paneer, Yogurt, Bell peppers, Onions, Tikka masala",
                            Instructions = "1. Marinate paneer and veggies... 2. Skewer them... 3. Grill until charred.",
                            ChefId = allChefs[1].Id 
                        }
                    };
                    context.Recipes.AddRange(recipes);
                    context.SaveChanges();
                }
            }
        }
    }
}
