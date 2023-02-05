module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "modpizza.com",
      "res.cloudinary.com",
      "hips.hearstapps.com",
    ],
  },
  env: {
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
    base_url: process.env.NEXT_URL,
    admin_username: process.env.ADMIN_USERNAME,
    admin_password: process.env.ADMIN_PASSWORD,
    admin_token: process.env.TOKEN,
  },
};
