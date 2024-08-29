# WanderLust 🌍✈️

WanderLust is a Node.js-based web application inspired by Airbnb's design, enabling users to list hotels, places, and experiences for sale. The application incorporates modern web technologies and best practices to deliver a robust, scalable platform for managing travel listings.

## 🚀 Features

- User authentication and authorization
- Listing creation and management
- Image uploads with Cloudinary integration
- Map integration with Mapbox
- Responsive design for various devices

## 📋 Prerequisites

Before running this project locally, ensure you have the following installed:

- Node.js (version 22.6.0)
- MongoDB
- Cloudinary Account (for image uploads)
- Mapbox Account (for map integration)

## 🛠️ Local Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/itisaarjan/wanderLust.git
   cd wanderLust
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your API keys and database URL:

   ```
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_cloud_api_key
   CLOUD_API_SECRET=your_cloud_api_secret
   MAP_TOKEN=your_mapbox_token
   ATLASDB_URL=your_mongodb_url
   ```

4. **Run the Application:**

   ```bash
   npm start
   ```

   The app will be running at `http://localhost:8080`.

## 📦 Packages Used

```json
{
  "engines": {
    "node": "22.6.0"
  },
  "dependencies": {
    "@mapbox/mapbox-sdk": "^0.16.0",
    "cloudinary": "^1.41.3",
    "connect-flash": "^0.1.1",
    "connect-mongo": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "ejs-mate": "^4.0.0",
    "express": "^4.19.2",
    "express-session": "^1.18.0",
    "joi": "^17.13.3",
    "method-override": "^3.0.0",
    "mongoose": "^8.6.0",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0",
    "node-fetch": "^2.7.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^8.0.0"
  }
}
```

## 🔮 Future Enhancements

- **Automated Testing:** Integrate unit and integration tests to ensure code quality.
- **Search and Filters:** Implement advanced search functionality with filters for better user experience.
- **Real-time Notifications:** Add real-time notifications for user interactions like booking confirmations.
- **Payment Integration:** Incorporate a payment gateway for seamless transactions.
- **Multilingual Support:** Add support for multiple languages to cater to a global audience.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/itisaarjan/wanderLust/issues).

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## 🎉 Conclusion

This WanderLust project showcases the use of modern web development practices with a focus on scalability and integration of third-party services. It's a great starting point for further development and enhancement into a full-featured web application.

---

Made with ❤️ by [Your Name](https://github.com/itisaarjan)
