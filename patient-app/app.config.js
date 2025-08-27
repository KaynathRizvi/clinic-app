export default {
  expo: {
    name: "patient-app",
    slug: "patient-app",
    version: "1.0.0",

    // 👇 You can add comments now!
    extra: {
      //SERVER_URL: "https://clinic-app-server.onrender.com",
      DEBUG_SERVER_URL: "http://192.168.1.182:5000", // Production backend
      DEBUG_SERVER_URL: "http://localhost:5000",            // Local dev backend
    },

    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "patientapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },
  },
};
