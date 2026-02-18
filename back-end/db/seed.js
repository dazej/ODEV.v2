const client = require('./client');

const {
  createUser,
  createProduct,
  getAllUsers,
  createCart,
  getAllProducts,
  createOrders,
  createProdCategory,
  createMailingAddress
} = require('.');

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS product_category;
        DROP TABLE IF EXISTS mailing_address;
        DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          first_name varchar(255) NOT NULL,
          last_name varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          phone_number varchar(255) NOT NULL,
          type varchar(255) DEFAULT 'user'
        );
  
        CREATE TABLE mailing_address (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          street TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL
        );
        
        CREATE TABLE product_category (
            id SERIAL PRIMARY KEY,
            name varchar(255) NOT NULL,
            description varchar(255) NOT NULL
        );

        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name varchar(255) NOT NULL,
          description varchar(255) NOT NULL,
          "categoryId" INTEGER REFERENCES product_category(id),
          inventory int NOT NULL,
          product_tag varchar(255) NOT NULL,
          price int NOT NULL,
          image_url TEXT NOT NULL
        );
  
        CREATE TABLE cart (
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "userId" INTEGER REFERENCES users(id),
          quantity int NOT NULL
        );

        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id),
            "userId" INTEGER REFERENCES users(id),
            quantity int NOT NULL
        );

      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    await createUser({
      username: 'albert',
      password: 'bertie99',
      first_name: 'Al Bert',
      last_name: 'Smith',
      email: 'abert@gmail.com',
      phone_number: '1234567890',
      type: 'user'
    });
    await createUser({
      username: 'dazzej',
      password: 'test',
      first_name: 'Jess',
      last_name: 'Adams',
      email: 'test@gmail.com',
      phone_number: '9876543210',
      type: 'admin'
    });
    await createUser({
      username: 'andrek',
      password: 'test',
      first_name: 'Andre',
      last_name: 'Kelly',
      email: 'test1@gmail.com',
      phone_number: '1234567456',
      type: 'admin'
    });

    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  try {

    console.log("Starting to create products...");
    await createProduct({
      name: 'Shirt',
      product_tag: 'trendy',
      description: 'This is a really trendy shirt!',
      price: 10,
      image_url: 'https://dictionary.cambridge.org/us/images/thumb/shirt_noun_002_33400.jpg?version=5.0.389',
      inventory: 5,
      categoryId: 1
    });

    await createProduct({
      name: 'Pants',
      product_tag: 'Sporty',
      description: 'Long pants that are great for running in.',
      price: 15,
      image_url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1664889996-ua-vital-1664889990.jpg?crop=1xw:1xh;center,top&resize=980:*',
      inventory: 25,
      categoryId: 2
    });

    await createProduct({
      name: 'Hat',
      product_tag: 'Sporty',
      description: 'A hate suitable for casual wear and sport attire.',
      price: 100,
      image_url: 'https://t3.ftcdn.net/jpg/02/72/20/82/360_F_272208218_pS249ZTq8cu3yknECXm0K3U8UtOIBVvr.jpg',
      inventory: 5,
      categoryId: 2
    });

    await createProduct({
      name: 'Bracelet',
      product_tag: 'Chic',
      description: 'A cute braclet that goes with anything.',
      price: 10,
      image_url: 'https://puregreekshop.com/cdn/shop/products/il_fullxfull.4209318838_55ez_800x.jpg?v=1709667233',
      inventory: 40,
      categoryId: 3
    });

    await createProduct({
      name: 'Tank Top',
      product_tag: 'Chic',
      description: 'A stylish tank top.',
      price: 30,
      image_url: 'https://s7d9.scene7.com/is/image/Aritzia/f23_03_a01_102367_1274_on_a?wid=1200',
      inventory: 50,
      categoryId: 3
    });

    await createProduct({
      name: 'Blouse',
      product_tag: 'Chic',
      description: 'A comfy and cute everyday top.',
      price: 45,
      image_url: 'https://www.lilysilk.com/media/catalog/product/1/_/1_6021.jpg?quality=80&bg-color=255%2C255%2C255&fit=bounds&width=1800',
      inventory: 50,
      categoryId: 3
    });


    await createProduct({
      name: 'Sunglasses',
      product_tag: 'Casual',
      description: 'A pair of sleek glasses for any occasion.',
      price: 12,
      image_url: 'https://eu-images.contentstack.com/v3/assets/blt7dcd2cfbc90d45de/blt2546b3c703773712/60dba5e693730d0ef6fb82c3/16-1_1_3.jpg?format=pjpg&auto=webp&quality=75%2C90&width=3840',
      inventory: 35,
      categoryId: 1
    });

    await createProduct({
      name: 'Jeans',
      product_tag: 'Casual',
      description: 'Demin jeans perfect for anytime of the year.',
      price: 60,
      image_url: 'https://imgproxy.asket.com/e:1/width:1250/resize:fit/quality:85/aHR0cHM6Ly9kM212ZGhhb2wwNjJmeS5jbG91ZGZyb250Lm5ldC9kL2EvZi8yL2RhZjIxYTkyMjM2ZjY5MzYxZWYxYTgxZmIzODMxN2UyNmVkZmJiYjBfYXNrZXRfd2RqX21lX3NlYl9zbGlkZXNob3dfMDEuanBn.webp',
      inventory: 35,
      categoryId: 1
    });

    await createProduct({
      name: '',
      product_tag: 'Casual',
      description: 'Demin jeans perfect for anytime of the year.',
      price: 60,
      image_url: 'https://imgproxy.asket.com/e:1/width:1250/resize:fit/quality:85/aHR0cHM6Ly9kM212ZGhhb2wwNjJmeS5jbG91ZGZyb250Lm5ldC9kL2EvZi8yL2RhZjIxYTkyMjM2ZjY5MzYxZWYxYTgxZmIzODMxN2UyNmVkZmJiYjBfYXNrZXRfd2RqX21lX3NlYl9zbGlkZXNob3dfMDEuanBn.webp',
      inventory: 35,
      categoryId: 1
    });

    console.log("Finished creating products!");
  } catch (error) {
    console.log("Error creating products!");
    throw error;
  }
}

async function createInitialProductCategory() {
  try {
    console.log("Starting to create product category...");
    await createProdCategory({
      id: 1,
      name: 'Casual',
      description: 'Everyday wear'
    });

    await createProdCategory({
      id: 2,
      name: 'Sport',
      description: 'Designed for sport and on-the-go attire'
    });

    await createProdCategory({
      id: 3,
      name: 'Chic',
      description: 'Level up your style'
    });


    console.log("Finished creating product category!");
  } catch (error) {
    console.log("Error creating product category!");
    throw error;
  }
}

async function createInitialMailingAdress() {
  try {
    console.log("getting the users mailing addresses")
    const [albert, dazzej, andrek] = await getAllUsers();

    await createMailingAddress({
      userId: albert.id,
      street: '123 Westside Drive',
      city: 'SpringField',
      state: 'MI'
    });
    await createMailingAddress({
      userId: dazzej.id,
      street: '123 Westside Drive',
      city: 'SpringField',
      state: 'MI'
    });
    await createMailingAddress({
      userId: andrek.id,
      street: '123 Westside Drive',
      city: 'SpringField',
      state: 'MI'
    });

    console.log("finished getting the users mailing addresses")
  } catch (error) {
    throw error
  }
}
async function createInitialCart() {
  try {
    const [albert, dazzej, andrek] = await getAllUsers();
    const [shirt, pants, hat] = await getAllProducts();

    await createCart({
      userId: albert.id,
      productId: shirt.id,
      quantity: 2
    });
    await createCart({
      userId: dazzej.id,
      productId: pants.id,
      quantity: 3
    });
    await createCart({
      userId: andrek.id,
      productId: hat.id,
      quantity: 2
    });


  } catch (error) {
    throw error
  }
}
async function createInitialOrders() {
  try {
    const [albert, dazzej, andrek] = await getAllUsers();
    const [shirt, pants, hat] = await getAllProducts();

    await createOrders({
      userId: albert.id,
      productId: shirt.id,
      quantity: 1
    });
    await createOrders({
      userId: dazzej.id,
      productId: pants.id,
      quantity: 1
    });
    await createOrders({
      userId: andrek.id,
      productId: hat.id,
      quantity: 1
    });

  } catch (error) {
    throw error
  }
}


async function rebuildDB() {
  try {
    console.log("got here")
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialMailingAdress();
    await createInitialProductCategory();
    await createInitialProducts();
    await createInitialCart();
    await createInitialOrders();
    console.log("products here" , await getAllProducts())
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}
rebuildDB().finally(()=>client.end())