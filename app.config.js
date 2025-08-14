module.exports = {
    name: "DMD We Care",
    slug: "duchenne-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.care.duchennemobile",
        config: {
            usesNonExemptEncryption: false,
        },
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
        package: "com.care.duchennemobile",
        androidStatusBar: {
            backgroundColor: "#ffffff",
            barStyle: "dark-content",
            translucent: true,
            hidden: false,
        },
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
        edgeToEdgeEnabled: true,
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
    },
    plugins: [
        "expo-router",
        "expo-secure-store",
        "expo-font",
        ["expo-notifications"],
        [
            "expo-splash-screen",
            {
                backgroundColor: "#ffffff",
                image: "./assets/images/splash.png",
                imageWidth: 200,
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        router: {
            origin: false,
        },
        eas: {
            projectId: "63e6e899-43d7-4f04-8b19-a077629ee2a3",
        },
    },
};
