# Welcome to your project

This is a [React](https://reactjs.org/) app using [Tailwind CSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/).

## Development

You can start the development server by running:

```bash
npm install
npm run dev
```

Changes made locally will be automatically reflected in your development environment.

## How to work locally

If you want to work locally using your own IDE, you can clone this repo and push changes.

```bash
git clone <repository-url>
cd <project-directory>
npm install
npm run dev
```

This will start the development server at [http://localhost:5173](http://localhost:5173).

## Building for production

To build your app for production, run:

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Deploying your site

You can deploy your site to various platforms:

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-starter-nextjs)

## Publishing your site

To publish your site, run:

```bash
npm run build
```

Then deploy the resulting `dist` directory to your hosting provider.

## Custom domain setup

You can connect a custom domain to your deployed site by configuring DNS settings with your domain registrar. 

Typically, you'll need to:

1. Add a CNAME record pointing to your deployment URL
2. Configure your hosting provider to recognize your custom domain
3. Update SSL/TLS certificates if necessary

For specific instructions, refer to your hosting provider's documentation.
