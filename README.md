# Papaya
Please note that Papaya is stilll in development.

## Description

Papaya is an dynamic event registration form builder. It will be integrated with AI to allow the user easy insight and feeback on the guest data for each event as well as some general statistics.

The project was boot-strapped wth Next.js and uses React DnD Kit for added user experience, Prisma and SQL database for data storage, and integrated with openAI.


## Installation

Follow these steps to set up and run the Papaya project on your local machine:

1. Clone the repository and navigate to the folder:

  ```
  shell
  git clone https://github.com/your_username/papaya.git

  cd papaya
  ```


Install the dependencies by running in your terminal:
  ```
  shell

  npm install
  ```
    

Create a .env file in the root directory of the project with the following contents:
  ```
  .env

  CLERK_FRONTEND_API_KEY=YOUR_CLERK_FRONTEND_API_KEY
  SUPABASE_URL=YOUR_SUPABASE_URL
  SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
  ```

Replace `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` with your Clerk  API keys, and `POSTGRES_PRISMA_URL` and `POSTGRES_PRISMA_DIRECT_URL` with your Supabase connection strings. These values can be obtained by signing up for Clerk and Supabase accounts.

Start the development server:

```
shell

npm run dev
```

Open your browser and visit http://localhost:3000 to see the Papaya application running.

--- 

Enjoy using Papaya! I appreciate your support and feedback.
