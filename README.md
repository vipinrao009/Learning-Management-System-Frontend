# LMS Frontend

### Setup Instruction

1. Clone the project

```
   git clone https://github.com/vipinrao009/Learning-Management-System-Frontend.git
```

2. Move into the directory

```
   cd frontend
```

3. Install dependencies

```
   npm i
```

4. run the server

```
   npm run dev
```

### Setup Instruction for tailwind

[Tailwind official instruction doc](https://tailwindcss.com/docs/guides/vite)

1. Install tailwind

```
   npm install -D tailwindcss postcss autoprefixer
```

2.Create tailwind config file

```
   npx tailwindcss init -p
```

3. Add extentions to tailwind config file in the content property

```
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
```

4. Add the tailwind directives at the top of the `index.css`file 

```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
```

5. Add the following details in the plugin property of the tailwind config

```
   plugins: [require("daisyui",require("@tailwindcss/line-clamp"))]
```
### Adding plugin and dependencies

```
   npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```

### Configure auto import sort esline

1. Install simple import sore

```
   npm i -D eslint-plugin-simple-import-sort
```

2. Add rule in `.eslint.cjs`

```
   'simple-import-sort/imports': 'error'
```

3. Add simple-import sort plugin in `.eslint.cjs`

```
   plugins: [..., 'simple-import-sort']
```

4. To enable auto import sort on file save in vscode

   - Open `settings.json`
   - add the following config

```
   "editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
    }
```
