# Plot Twist <img src="./public/icons/logo.png" alt="drawing" width="36"/>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/NeoFoxxo/plottwist/tree/main)

Choose your own adventure story generator built for the Supabase hackathon

## About the Project

Plot Twist is a fullstack application developed using NextJS, SmythOS and Supabase. You can create your own unique story and make choices based on the story outcome. This leverages AI to get unique and interesting choices for the user to choose, so that the outcome of the story is different everytime. You tell your own story and share it to the outer world. There are many things you could do with the story created by other users. You can remix other's stories or comment on them. You can also regenerate story that was not to your liking and save them.

![vercel](https://img.shields.io/github/deployments/NeoFoxxo/plottwist/production?label=vercel&logo=vercel&logoColor=white)

![main page](https://github.com/NeoFoxxo/plottwist/assets/76598208/a3edc721-cee0-4ca7-917c-44b560646e56)

![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

<p align="left">

  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/NeoFoxxo/plottwist" />
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/NeoFoxxo/plottwist" />
  <img alt="GitHub Issues" src="https://img.shields.io/github/issues/NeoFoxxo/plottwist" />
  <img alt="GitHub Closed Issues" src="https://img.shields.io/github/issues-closed/NeoFoxxo/plottwist" />
  <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/NeoFoxxo/plottwist" />

</p>

## How to navigate the Project ?

The project consists `app` folder, which is responsible for handling frontend and backend features. Below are the details on how the folders are structured to better understand the architecture of the application.

```
📂root/
    ├── public/             # Public assets and HTML template
    ├── app/
    │   ├── api/            # All main files
    │   ├── app/            # Base app post login
    │   ├── login/          # Login feature
    │   ├── profile/        # Profile feature
    │   ├── story/          # User story feature
    │   ├── layout.tsx      # Headers and footers for the app
    │   └── page.tsx        # Landing page
    │
    └── components/         # Client components for the UI
    └── utils/              # React query and other utils
    └── lib/                # Server & DB actions with supabase auth
    └── ...
```

## Features ✨

- **User Authentication**: Users can create accounts, log in, and securely access their personalized profiles.
- **Responsive Design**: Enjoy a consistent and visually appealing experience across various devices.
- **User Profile**: User can manage their profile information and upload images.
- **Create Story**: Create your own unique stories powered by AI.
- **Comments**: Add a review comment for any story created by other users.
- **Remix**: Reuse stories created by other users to brew your own unique version of the story.
- **Bookmarks**: Bookmark your favourite stories to access them later.

## Installation 💻

To make the application run locally on your computer, you can follow the below steps:

### Project setup:

Follow the steps below to setup the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/NeoFoxxo/plottwist.git
   ```

2. Navigate to the project directory:

   ```bash
   cd plottwist
   ```

> You can use `npm / yarn / pnpm`. Just replace `pnpm` with `npm` or `yarn` for all the commands.

### Frontend setup:

To run the client locally, follow the below steps:

1. Install the dependencies using pnpm / npm (make sure you have pnpm installed):

   ```bash
   npm install
   ```

2. Start the development server for frontend:

   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:3000/` to access the frontend of plottwist application.

## Technologies Used 🔧

- **NextJS**: Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.
- **Typescript**: TypeScript checks a program for errors before execution, ensures better developer experience.
- **React**: JavaScript library for building user interfaces.
- **React Query**: Also knows as Tanstack query for better data fetching.
- **TailwindCSS**: A utility-first CSS framework packed with classes.
- **Zod**: Zod for consistent input validation, data structuring, and error handling.
- **PostgreSQL**: Supabase is used to manage our postgres database.

## Contributing 🤝

We welcome open-source contributions to **Plottwist project** ! If you would like to contribute, please follow the below steps:

1. Fork the repository.
2. Create a new branch for your feature/fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push the changes to your forked repository: `git push origin feature-name`.
5. Open a pull request to the main repository's `main` branch.

### Contributors

<a href="https://github.com/NeoFoxxo/plottwist/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=NeoFoxxo/plottwist" />
</a>

## License 📝

This project is licensed under the [GPL 3 License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

## Contact 💬

If you have any questions, suggestions, or feedback, please don't hesitate to reach out to the project maintainer.
