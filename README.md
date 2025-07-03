
# NativeWind React Native Boilerplate

This is a starter boilerplate for React Native projects using **TypeScript** and **Tailwind CSS utility classes** via [NativeWind](https://www.nativewind.dev/).

---

## Getting Started

You can use this template to quickly bootstrap a new React Native project with NativeWind and Tailwind CSS preconfigured.

### Usage

#### 1. Scaffold a new project (using degit):

```bash
npx degit yourusername/native-wind-template-0.80 my-app
cd my-app
npm install
```

#### 2. Start the app

```bash
npm run android # or npm run ios
```

---

## Features

- React Native CLI
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- Preconfigured for Android & iOS
- Example Home Screen
- Redux Toolkit setup

---

## How this template is set up

### NativeWind & Tailwind CSS

All configuration is ready-to-go. See `tailwind.config.js`, `global.css`, and `metro.config.js` for details.

---

## Customization

1. Update the project name in `package.json` and `app.json`.
2. Replace placeholder text, logos, and assets as needed.
3. Add your own screens and components in the `src/` directory.

---

## License

MIT

---

## Original Setup Instructions (for reference)

<details>
<summary>Expand for full setup steps</summary>

...existing code...

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create a CSS file and add the Tailwind directives.

**global.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> **Note:** From here onwards, replace `./global.css` with the relative path to the CSS file you just created.

### 3. Add the Babel preset

**babel.config.js**

```javascript
module.exports = {
- presets: ['<existing presets>'],
+ presets: ['<existing presets>', 'nativewind/babel'],
};
```

### 4. Modify your metro.config.js

Create a `metro.config.js` file in the root of your project if you don't already have one, then add the following configuration:

**metro.config.js**

```javascript
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = mergeConfig(getDefaultConfig(__dirname), {
  /* your config */
});

module.exports = withNativeWind(config, { input: "./global.css" });
```

### 5. Import your CSS file

**App.js**

```javascript
import "./global.css"

export default App() {
  /* Your App */
}
```

### 6. TypeScript setup (optional)

If you're using TypeScript in your project, you'll need to set up the type definitions. NativeWind extends the React Native types via declaration merging. The simplest method to include the types is to create a new `nativewind-env.d.ts` file and add a **triple-slash directive** referencing the types.

**nativewind-env.d.ts**

```typescript
/// <reference types="nativewind/types" />
```

> **⚠️ CAUTION**
> 
> Do not call this file:
> * `nativewind.d.ts`
> * The same name as a file or folder in the same directory e.g `app.d.ts` when an `/app` folder exists
> * The same name as a folder in `node_modules`, e.g `react.d.ts`
> 
> By doing so, your types will not be picked up by the TypeScript compiler.

### Try it out!

Create a simple component to test your NativeWind setup:

**App.tsx**

```typescript
import "./global.css"
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to NativeWind!
      </Text>
    </View>
  );
}
```

This example shows:
* Using `className` prop to style components
* Tailwind utility classes like `flex-1`, `items-center`, `justify-center`
* Color utilities like `bg-white`, `text-blue-500`
* Typography utilities like `text-xl`, `font-bold`

If you see the styled text centered on a white background, NativeWind is working correctly!