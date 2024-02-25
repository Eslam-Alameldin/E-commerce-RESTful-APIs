# E-commerce-RESTful-APIs

## Important Note
> I am still working on the project, this is not the final verison of it, I just make it public to get feedback and imporve it ...

## About
> This project is an E-commerce website with essential commerce features Built with Nodejs and Express. I made this project to practice and get hands-on experience in things and topics i'm learning about. This is just the beginning 💥


## Getting Started
> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these instructuins.

### Installation

1. **_Clone the repository_**

```sh
$ git@github.com:Eslam-Alameldin/E-commerce-RESTful-APIs.git
```
2. **_Navigate to repository directory_**
```sh
$ cd E-commerce-RESTful-APIs
```

3. **_Install dependencies_**
```sh
$ npm install
```
4. **_Add config.env file with the following environment variables_**
```
# PORT number (default 8000 if not given)
PORT=

# You can choose between two modes (development , production)
NODE_ENV=

# Your Mongodb database url
DB_URI=


# JWT Settings
JWT_SECRET_KEY=
JWT_EXPIRE_TIME=

# Email Settings
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=

# Stripe Settings
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=

```

### Running

1. **_Run in development mode_**
```sh
$ npm run start:dev
```

2. **_Run in productoin mode_**
```sh
$ npm run start:prod
```



## File Structure
```md
┣ 📂config
┃ ┗ 📜database.js
┣ 📂middlewares
┃ ┣ 📜errorMiddleware.js
┃ ┣ 📜uploadImageMiddleware.js
┃ ┗ 📜validatorMiddleware.js
┣ 📂models
┃ ┣ 📜brandModel.js
┃ ┣ 📜cartModel.js
┃ ┣ 📜categoryModel.js
┃ ┣ 📜couponModel.js
┃ ┣ 📜orderModel.js
┃ ┣ 📜productModel.js
┃ ┣ 📜reviewModel.js
┃ ┣ 📜subCategoryModel.js
┃ ┗ 📜userModel.js
┣ 📂routes
┃ ┣ 📜addressRoute.js
┃ ┣ 📜authRoute.js
┃ ┣ 📜brandRoute.js
┃ ┣ 📜cartRoute.js
┃ ┣ 📜categoryRoute.js
┃ ┣ 📜couponRoute.js
┃ ┣ 📜index.js
┃ ┣ 📜orderRoute.js
┃ ┣ 📜productRoute.js
┃ ┣ 📜reviewRoute.js
┃ ┣ 📜subCategoryRoute.js
┃ ┣ 📜userRoute.js
┃ ┗ 📜wishlistRoute.js
┣ 📂services
┃ ┣ 📜addressService.js
┃ ┣ 📜authService.js
┃ ┣ 📜brandService.js
┃ ┣ 📜cartService.js
┃ ┣ 📜categoryService.js
┃ ┣ 📜couponService.js
┃ ┣ 📜handlersFactory.js
┃ ┣ 📜orderService.js
┃ ┣ 📜productService.js
┃ ┣ 📜reviewService.js
┃ ┣ 📜subCategoryService.js
┃ ┣ 📜userService.js
┃ ┗ 📜wishlistService.js
┣ 📂uploads
┃ ┣ 📂brands
┃ ┣ 📂categories
┃ ┗ 📂products
┣ 📂utils
┃ ┣ 📂dummyData
┃ ┃ ┣ 📜products.json
┃ ┃ ┗ 📜seeder.js
┃ ┣ 📂validators
┃ ┃ ┣ 📜addressValidator.js
┃ ┃ ┣ 📜authValidator.js
┃ ┃ ┣ 📜brandValidator.js
┃ ┃ ┣ 📜cartValidator.js
┃ ┃ ┣ 📜categoryValidator.js
┃ ┃ ┣ 📜couponValidator.js
┃ ┃ ┣ 📜orderValidator.js
┃ ┃ ┣ 📜productValidator.js
┃ ┃ ┣ 📜reviewValidator.js
┃ ┃ ┣ 📜subCategoryValidator.js
┃ ┃ ┣ 📜userValidator.js
┃ ┃ ┗ 📜wishlistValidator.js
┃ ┣ 📜apiError.js
┃ ┣ 📜apiFeatures.js
┃ ┣ 📜createToken.js
┃ ┗ 📜sendEmail.js
┣ 📜.eslintrc.json
┣ 📜.gitignore
┣ 📜config.env
┣ 📜package.json
┣ 📜README.md
┗ 📜server.js
```

## BackLog

- [x] ~Prepare Express server and Mongodb~
- [x] ~Adding Categories CRUD Operations~
- [x] ~Handling Errors and adding validation layer~
- [x] ~Adding Subcategories CRUD Operations~
- [x] ~Adding Brands CRUD Operations~
- [x] ~Adding Products CRUD Operations~
- [x] ~Implementing Uploading images and Image Processing functionality~
- [x] ~Adding Authenticaton and Authorization and User management~
- [x] ~Adding Reviews Feature~
- [x] ~Adding Wishlist and User Addresses Features~
- [x] ~Adding Shopping Cart Feature~
- [x] ~Adding Coupons Feature~
- [X] ~Adding creating cash and online Payment Orders Featrue~
- [x] ~Integrate with Stripe to allow Online Payments~ 
- [ ] Enhance the App Security
- [ ] Dockerize the Application

**_To BE CONTINUED_**
