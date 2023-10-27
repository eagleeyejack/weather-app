# WeatherApp

This README provides step-by-step instructions for pulling and running WeatherApp locally on your development machine and launching it on iOS and Android emulators. By following these steps, you'll be able to quickly set up and test your Expo app on both platforms.

## Prerequisites

Before you begin, make sure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) (recommended version: 18 or newer)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) package manager
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally
- Xcode (for iOS emulator)
- Android Studio (for Android emulator)

## Step 1: Clone the Project

Clone the Expo project repository to your local machine using Git:

```bash
git clone git@github.com:eagleeyejack/weather-app.git
cd weather-app
```

## Step 2: Install Dependencies

Install the project dependencies using Yarn. Run one of the following commands depending on your package manager:

Using Yarn:

```bash
yarn install
```

## Step 3: Start the Development Server

To run on an iOS emultor, use the following command:

```bash
yarn ios
```

to run on an Android emulator:

```bash
yarn android
```

## Step 4: Development

The app was developed using Expo Go, a powerful tool for quickly building and testing React Native applications. Expo Go streamlines the development process by providing a development environment & simplifying the deployment to physical devices.

It's worth noting that should the need arise, this Expo application can be easily converted into a React Native bare app, allowing for greater customization and integration of native modules and libraries.

Converting to a bare app provides developers with the flexibility to fine-tune the application to meet specific requirements while retaining the core functionality and structure already implemented in Expo.

## Additional Notes

- You can also run the app on physical devices by installing the Expo Go app and scanning the QR code displayed in the Expo Developer Tools.

- For more information on Expo development and debugging, please refer to the [Expo documentation](https://docs.expo.dev/).

With these steps, you should be able to pull, run, and test your Expo application locally on both iOS and Android emulators. Happy coding!

---

## Application Features

### Screens

**Home Screen**

- Display current weather conditions:
  - Temperature
  - Weather description

**Forecast Screen**

- Display a 5-day weather forecast for the user's current location

- Implement the ability for the user to:
  - Search for weather conditions in different locations
  - Save a city once you've searched for it

### Data Source

- WeatherAPI
