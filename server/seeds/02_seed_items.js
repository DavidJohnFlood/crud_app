/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    await knex('items').del()
    await knex('items').insert([
        { user_id: 1, quantity: 50, item_name: 'Organic Quinoa',         description: 'Premium quality organic quinoa. Packed with protein, fiber, and essential nutrients. Versatile and great for salads, pilafs, and grain bowls. Try it today!' },
        { user_id: 1, quantity: 20, item_name: 'Whole Wheat Pasta',      description: 'High-quality whole wheat pasta made from durum wheat. Provides a good source of fiber for a nutritious meal. Cooks perfectly al dente every time.' },
        { user_id: 1, quantity: 30, item_name: 'Canned Chickpeas',       description: 'Tender and flavorful canned chickpeas. Ideal for making hummus, salads, and savory dishes. Stock up on this pantry staple for convenient meal preparation.' },
        { user_id: 1, quantity: 40, item_name: 'Basmati Rice',           description: 'Aromatic and long-grain Basmati rice. Perfect for pairing with curries, stir-fries, and pilafs. Elevate your cooking with the exquisite flavor of Basmati rice.' },
        { user_id: 1, quantity: 25, item_name: 'Extra Virgin Olive Oil', description: 'Premium quality extra virgin olive oil. Cold-pressed from olives to retain maximum flavor and health benefits. Ideal for dressing salads, cooking, and dipping. Taste the difference.' },
        { user_id: 1, quantity: 35, item_name: 'Organic Quinoa Flakes',  description: 'Nutritious and gluten-free quinoa flakes. Great for making hot cereal, baking, or adding to smoothies for an extra protein boost. Start your day with a nutritious quinoa breakfast.' },
        { user_id: 1, quantity: 15, item_name: 'Organic Dried Apricots', description: 'Sweet and tangy organic dried apricots. A delicious and healthy snack packed with vitamins and fiber. Enjoy them on their own or in your favorite recipes.' },
        { user_id: 1, quantity: 30, item_name: 'Organic Coconut Flour',  description: 'Fine and gluten-free organic coconut flour. Ideal for gluten-free baking, adding a subtle coconut flavor to your recipes. Discover the versatility of coconut flour.' },
        { user_id: 1, quantity: 20, item_name: 'Natural Almond Butter',  description: 'Creamy and natural almond butter made from roasted almonds. Rich in healthy fats, protein, and vitamins. Spread it on toast or use it in your favorite recipes.' },
        { user_id: 1, quantity: 25, item_name: 'Raw Honey',              description: 'Pure and raw honey sourced from local beekeepers. A natural sweetener with potential health benefits. Add a touch of sweetness to your tea or use it in baking.' },

        { user_id: 2, quantity: 50, item_name: 'Organic Avocados',       description: 'Ripe and creamy organic avocados. Perfect for making guacamole or adding to salads and sandwiches. Enjoy the rich and buttery texture!' },
        { user_id: 2, quantity: 25, item_name: 'Fresh Strawberries',     description: 'Sweet and juicy fresh strawberries. Enjoy them on their own, in smoothies, or as a topping for desserts. Bursting with natural sweetness!' },
        { user_id: 2, quantity: 40, item_name: 'Locally Grown Kale',     description: 'Fresh and nutrient-rich kale sourced from local farms. Great for salads, smoothies, or sautéed dishes. Packed with vitamins and minerals!' },
        { user_id: 2, quantity: 30, item_name: 'Organic Blueberries',    description: 'Plump and antioxidant-rich organic blueberries. Enjoy them as a healthy snack or add them to your favorite recipes. A delicious and nutritious treat!' },
        { user_id: 2, quantity: 20, item_name: 'Vine-Ripened Tomatoes',  description: 'Flavorful vine-ripened tomatoes that are perfect for salads, sandwiches, and homemade sauces. Bursting with vibrant color and natural flavors!' },
        { user_id: 2, quantity: 15, item_name: 'Fresh Basil',            description: 'Aromatic and fragrant fresh basil leaves. Ideal for adding a burst of flavor to pasta dishes, pizzas, and sauces. Elevate your culinary creations!' },
        { user_id: 2, quantity: 30, item_name: 'Organic Spinach',        description: 'Tender and nutrient-packed organic spinach. Use it in salads, smoothies, or sauté it as a delicious side dish. Get your daily dose of vitamins and minerals!' },
        { user_id: 2, quantity: 25, item_name: 'Crisp Green Apples',     description: 'Crisp and refreshing green apples. Enjoy them as a snack, in salads, or use them in your favorite apple recipes. A satisfying and healthy choice!' },
        { user_id: 2, quantity: 35, item_name: 'Sweet Juicy Oranges',    description: 'Sweet and juicy oranges bursting with vitamin C. Enjoy them fresh or use them in fresh juices and citrusy desserts. A zesty and refreshing delight!' },
        { user_id: 2, quantity: 20, item_name: 'Fresh Broccoli',         description: 'Tender and nutritious fresh broccoli florets. Perfect for steaming, stir-fries, or adding to salads. Boost your health with this versatile vegetable!' },

        { user_id: 3, quantity: 30, item_name: 'Organic Whole Milk',     description: 'Creamy and rich organic whole milk. Perfect for enjoying on its own, using in recipes, or adding to your morning coffee or tea. A wholesome and delicious choice!' },
        { user_id: 3, quantity: 20, item_name: 'Chocolate Milk',         description: 'Made with premium cocoa and fresh milk, this classic treat is perfect for satisfying your chocolate cravings. Enjoy it chilled or add it to your favorite recipes for a touch of chocolatey goodness.' },
        { user_id: 3, quantity: 25, item_name: 'Greek Yogurt',           description: 'Thick and creamy Greek yogurt with a velvety texture. Enjoy it on its own, as a topping for desserts, or use it as a healthier alternative in recipes. Indulge in its delightful tang!' },
        { user_id: 3, quantity: 20, item_name: 'Artisanal Cheese',       description: 'Artisanal cheese made with care and expertise. Choose from a variety of flavors and textures, perfect for cheese platters, sandwiches, or adding a gourmet touch to your meals.' },
        { user_id: 3, quantity: 30, item_name: 'Whipped Cream',          description: 'Light and fluffy whipped cream for adding a dollop of decadence to your favorite desserts, hot cocoa, or coffee. Elevate your sweet treats with this delightful topping!' },
        { user_id: 3, quantity: 15, item_name: 'Organic Butter',         description: 'Creamy and flavorful organic butter made from high-quality ingredients. Ideal for spreading on toast, using in cooking, or baking scrumptious treats. Experience the goodness!' },
        { user_id: 3, quantity: 35, item_name: 'Lactose-Free Milk',      description: 'Lactose-free milk for those with lactose intolerance. Enjoy the taste and benefits of milk without discomfort. Perfect for adding to cereal, making smoothies, or drinking on its own.' },
        { user_id: 3, quantity: 25, item_name: 'Vanilla Yogurt',         description: 'Smooth and creamy vanilla yogurt with a hint of sweetness. Enjoy it as a snack, mix it with fruits and granola, or use it in your favorite yogurt-based recipes. A delightful treat for any time of the day!' },
        { user_id: 3, quantity: 20, item_name: 'Organic Cottage Cheese', description: 'Organic cottage cheese made from high-quality ingredients. Enjoy it on its own, in salads, or use it as a healthy protein source in your recipes. Savor the creamy goodness!' },
        { user_id: 3, quantity: 30, item_name: 'Heavy Cream',            description: 'Indulgent heavy cream for enriching your recipes, making homemade ice cream, or creating decadent sauces. Add a touch of luxury to your culinary creations with this rich and creamy delight!' },

        { user_id: 4, quantity: 12, item_name: 'Croissants',             description: 'Flaky and buttery croissants baked to perfection. These French pastries are a delightful breakfast or snack option. Enjoy them plain or filled with your favorite ingredients.' },
        { user_id: 4, quantity: 10, item_name: 'Bagels',                 description: 'Freshly baked bagels with a chewy texture and a variety of flavors. Perfect for breakfast or sandwiches, these bagels are a popular choice for bakery lovers.' },
        { user_id: 4, quantity: 15, item_name: 'Cinnamon Rolls',         description: 'Soft and gooey cinnamon rolls with a sweet glaze. These irresistible treats are perfect for indulging in a delicious breakfast or dessert.' },
        { user_id: 4, quantity: 8,  item_name: 'Sourdough Bread',        description: 'Artisanal sourdough bread with a crusty exterior and a tangy flavor. Made using traditional fermentation methods, this bread is a favorite among bread enthusiasts.' },
        { user_id: 4, quantity: 20, item_name: 'Muffins',                description: 'Freshly baked muffins with various flavors, including blueberry, chocolate chip, and banana nut. These moist and flavorful treats are great for on-the-go snacking.' },
        { user_id: 4, quantity: 10, item_name: 'Pies',                   description: 'Delicious homemade pies with a flaky crust and a variety of fillings, such as apple, cherry, and pumpkin. These pies are a must-have for any dessert table.' },
        { user_id: 4, quantity: 6,  item_name: 'Donuts',                 description: 'Classic glazed donuts and a variety of other flavors, including chocolate, powdered sugar, and jelly-filled. These sweet treats are perfect for a morning pick-me-up.' },
        { user_id: 4, quantity: 10, item_name: 'Bread Rolls',            description: 'Soft and fluffy bread rolls, ideal for making sandwiches or serving alongside soups and stews. These versatile rolls are a staple in any bakery section.' },
        { user_id: 4, quantity: 12, item_name: 'Pretzels',               description: 'Freshly baked pretzels with a golden crust and a sprinkle of salt. Enjoy them as a snack or pair them with your favorite dips for a tasty treat.' },
        { user_id: 4, quantity: 15, item_name: 'Cake Slices',            description: 'Delicious cake slices with various flavors, including chocolate, vanilla, and red velvet. These single-serving slices are perfect for satisfying your sweet tooth.' },
    ]);
};


