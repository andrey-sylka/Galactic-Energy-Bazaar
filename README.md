# Galactic Energy Bazaar

## Boilerplate

Afterr checking galactic energy bazaar requiriments i decided to use bollerplate that has most of the things that i need for the architecture of the project.
https://github.com/ArslanAmeer/angular-boilerplate

bellow you find readme file of the boilerplate.

## UI Components library

Another package that i used is: https://js.devexpress.com/Angular/
I used it because in such application we will bneed a lot of UI components like grids, charts, forms, etc.

In this example i used the following grid example with real-time updates: https://js.devexpress.com/Angular/Demos/WidgetsGallery/Demo/DataGrid/RealTimeUpdates/MaterialBlueLight/

I do not have much experience with this package but i think it is a good choice for this project. Probably i coud replace at least grid with AG-Grid package that is more popular and i have goit more experience with. Disadvantage of ag-grid is that we need another package for other UI elements.

### User Roles & Permissions

Authentification is done with auth module in [app/auth](./src/app/auth/) folder. for demonstration it returns hardcoded user with role and permissions. but it can be connected to backend.

for testing how interface works we can change roles in login function the [authentification service](./src/app/auth/services/authentication.service.ts).

```JavaScript
login(context: LoginContext): Observable<Credentials> {
    const credentials: Credentials = new Credentials({
      username: 'johndoe',
      id: '',
      token: '123456',
      refreshToken: '123456',
      expiresIn: 3600,
      roles: ['user', 'admin'],
      email: 'john@email.com',
      firstName: 'John',
      lastName: 'Doe',
    });
```

We can add roles and permissions in [**app/@core/constance/app-settings.ts**](./src/app/@core/constants/app-settings.ts) file. Define roles and permissions for navigation in nav-menu-items.ts file in the same folder.
Additionally i wrote a custom directive to check permissions in the template. It used for show buttons actions in the trades page.
[**app/shared/directives/hasPermission.directive.ts**](./src/app/shared/directives/hasPermission.directive.ts)

We can write custom decorator for check permissions in any method in components or services on a frontend. it can be usefull if we would like to show user all possible actions and tell user how to get permissions if he does not have permissions for some actions.

⚡ Important **Note about client side role system**

- never trast client side authorisation. It is not secure. We can use roles only for navigation and hide/show components on client side.
- do not send any data to client that user not authorised to see.
- when we perform any action on server side, check user permissions on the server side.
- example stack for backend authorization: mongoDB, mongoose, casl
- if we think we could have very complicated logic for authorization, we can use casl.js for authorization on the client too.

### TODO:

- right now user credentials and authentication token are stored in local storage. It is not secure. we should move it to HTTP only cookies.
- integrate authorization with backend supporting OAuth2
- use PKCE for replace api-keys stored in the code that mitigates the risk of interception attacks
- write interceptor for prevent http requests or replace it with https.

## Localization

We can use localization for our application. We can use ngx-translate package. It can use loacal translation files or use backend for translation. We can have some languages in application codebase and if it is not exists request to the backend for translation. In this example i created 2 lenguages solar and magelan and change language in the header and change some texts in interface.

### TODO:

if we would like use icons as a translations we can extend ngx-translate translate directive and check if we do not have text translation but have a swg icon we can use it.

## Real-Time or Near-Real-Time Communication

We can use socket.io for real-time communication. It is a library that allows us to communicate with the server in real-time. We can orginize subscription to the server and get data only related to user to minimize data transfer.

In the example i emulate real-time data updates with the setInterval function in the [**app/pages/trades/trades.service.ts**](./src/app/pages/trades/trades.service.ts) file.

## Performance

- we should use lazy loading for modules and components.
- we should use changeDetectionStategy.OnPush
- we should use NgZone.runOutsideAngular() to run code outside of Angular's zone. example: [**app/pages/trades/trades.service.ts**](./src/app/pages/trades/trades.service.ts)
- we should use webb workers for heavy calculations.
- we should use subscription for data streams in real-time data updates to load only data that we need.
- we should cache data. example: [**cachable.decorator**](./src/app/@core/helpers/cacheable.decorator.ts)

## Consider how new features (like “energy futures” or “interplanetary auctions”) would plug into your structure

- we can define more complicated data structures for trades and products
- product types
- product properties set for each product type
- trade or product actions list for each product type
- for show grids with products and trades probably better AG-Grid library, as it allows denamic column deffenitions and we do not need to change html code for each new product type.

## some known issues

- we need to use npm i --force to install packages. as it has some issues with dependencies not ready for angular 19.

# Angular 19 Enterprise-Grade Boilerplate

Get started fast with this **Angular 19** boilerplate, crafted for **enterprise-level scalability**. It integrates critical features like **authentication**, **lazy loading**, **real-time socket communication**, **service workers**, **shell layout (header+sidebar)** making it ready to handle everything from SaaS platforms to enterprise dashboards. Built on the latest **Angular 19**, this template is packed with the newest capabilities and ensures that you adhere to **modern development best practices**.

With a solid foundation of **PWA (Progressive Web App)**, **authentication**, **role-based permissions**, **HTTP interceptors**, **socket integration**, and more, this boilerplate takes care of the core setup so you can focus on building features.

### Key Features:

- [x] **Angular 19**: Built with the latest version, utilizing improved standalone components and reactive forms.
- [x] **PWA (Progressive Web App) support**: Fully configured to enable offline capabilities, background sync, and push notifications.
- [x] **Scalable folder structure**: Optimized for enterprise-level applications with a modular design that adapts to growing project needs.
- [x] **Separation of concerns**: Adopting [Domain-Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) for a clear boundary between business logic and infrastructure code.
- [x] **Modularization**: Components, services, pipes, and directives are split into reusable modules for easy maintenance and scalability.
- [x] **Hybrid architecture**: Combines both standalone components and module-based structure, optimizing the initial app component as standalone and using modules for pages and shell.
- [x] **[Lazy loading](https://angular.io/guide/lazy-loading-ngmodules)**: Efficiently loads only the necessary modules, improving app performance.
- [x] **[Routing with guards](https://angular.io/guide/router)**: Robust routing system with [authentication and authorization guards](https://angular.io/api/router/CanActivate) for secured navigation.
- [x] **Complete authentication system**: Pre-configured JWT-based authentication, including services, guards, and interceptors for seamless integration.
- [x] **[Guards](https://angular.io/api/router/CanActivate)**: Role-based guards to protect routes and enforce permissions.
- [x] **[Interceptors](https://angular.io/api/common/http/HttpInterceptor)**: Secure API communication with interceptors handling authentication and error management.
- [x] **i18n Translation support**: Full [internationalization](https://angular.io/guide/i18n) for multi-language apps, with seamless integration of translation services.
- [x] **Basic error handling**: Centralized error handling for smooth debugging and a better user experience.
- [x] **Class-based entities**: Utilizing [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) concepts for consistent and maintainable entity structures.
- [x] **Implementation of [Class Transformers](https://github.com/typestack/class-transformer)**: Easily transform backend data models to frontend-friendly formats (e.g., snake_case to camelCase).
- [x] **[Socket.io](https://socket.io/) integration**: Real-time updates with modular socket services that seamlessly integrate with the Angular ecosystem.
- [x] **App updates in production**: Automatic app updates for production environments, ensuring users always get the latest features and fixes without manual intervention.
- [x] **Environments for development and production**: Predefined configurations for different environments, ensuring smooth deployment and testing processes.
- [x] **Utility functions**: A set of reusable functions to handle common tasks like:
  - **Local storage obfuscation**: Getters and setters that automatically encrypt and decrypt data in production environments.
- [x] **Helper functions**: Pre-configured helper functions for common development tasks, enhancing productivity and code quality.
- [x] **Detailed documentation**: Comprehensive documentation for setup, dependencies, coding styles, utility functions, and more, to help developers get up to speed quickly.
- [x] **Documented utility and helper functions**: Clearly explained and reusable across the application, with customization options.

### Development Best Practices

This boilerplate enforces **strict best practices** and includes a configured **ESLint flat config** to guide developers in writing clean, maintainable, and high-quality code:

- **Code Quality**: ESLint rules enforce coding standards like naming conventions, indentation, and eliminating unused code.
- **No Direct Service Access**: Encourages a clean architecture by requiring components to interact with data via **UseCases**, keeping the service layer isolated.
- **Modularization**: Promotes single-responsibility services, with each service handling only domain-specific tasks.
- **Scoped Variables**: Enforces scoped use of variables and functions, reducing the risk of global state conflicts.
- **Clean, Maintainable Code**: The **standalone component** and **module-based** hybrid structure optimizes performance and keeps the codebase organized.
- **DRY Principle**: Adheres to **Don't Repeat Yourself (DRY)** principles, reducing redundancy and improving the maintainability of code.
- **Security Awareness**: Built-in ESLint rules ensure you avoid common security pitfalls, ensuring secure and performant code.

### ESLint Configuration Highlights:

- **Strict Linting Rules**: Custom **ESLint flat config** enforces coding standards, ensuring consistent formatting and type checking across the codebase.
- **Prettier Integration**: Maintains consistent code styling with automatic formatting on save or commit.
- **Error Prevention**: Detects common issues early on, such as missing type declarations or direct DOM manipulations.
- **Security Focused**: The configuration includes security-related rules to avoid risky code patterns.

### Why Choose This Boilerplate?

This Angular 19 boilerplate goes beyond just being a starting template—it's a **fully equipped foundation** for any **enterprise-level project**. From **fully configured authentication** and **lazy loading** to **role-based permissions** and **real-time communication**, it covers the most common requirements out-of-the-box.

By enforcing **best coding practices** and strict **ESLint rules**, the boilerplate guarantees that every contributor to your project adheres to **high development standards**. Plus, the **modular, scalable architecture** and **cutting-edge Angular features** ensure that this project grows with you.

Whether you’re developing a SaaS platform, building a dynamic web app, or designing an enterprise-level solution, this boilerplate gives you the tools you need—fast.

### Continuous Updates

This project will be regularly updated with the latest **Angular** releases, ensuring compatibility with the latest features and security updates. Stay tuned for new enhancements and features as they are added based on evolving development needs.

### Demo:

Check out working demo [here](https://angular-boilerplate.arslanameer.com)

> ## **Note:** <small style="color: red"> You can remove this with all the above lines and use rest in your documentation.</small>

---

# Web Front-End

## Status Badges

<p align="right"> &nbsp;</p>

## 💻 Current Stack Version:

- Node `^v20`
- Angular `^v19`

<p align="right"> &nbsp;</p>

## 🚀 Project setup

If you want to setup this project locally and start developing, read setup and developers guide here: [Setup](docs/setup.md)

<p align="right"> &nbsp;</p>

## 😎 Coding style

We make use of **[Javascript Standard Style](https://standardjs.com/)** while developing.

You can integrate it with [eslint](https://eslint.org/) linter tool in your IDE to help smoothen the process by integrating automatic linting in compile time.

We already have a `eslint.config.js` file in the root of the project which you can use to configure your IDE.

We also have husky hooks with prettier and eslint to make sure that the code is linted and formatted before committing.

If you want to read more about the rules, read [Coding style](docs/coding-style.md)

<p align="right"> &nbsp;</p>

## 🧳 Dependencies

If you want to read more about dependencies in this platform, read [Dependencies](docs/dependencies.md)

<p align="right"> &nbsp;</p>

## 🪢 Helper and Utility functions

We have several documented helper and utility functions that play a big part of the platform. They are available in `@core\helpers` and `@core\utils` folder.

<p align="right"> &nbsp;</p>

---

## 📜 Change Logs:

_(Latest)_

<p align="right"> &nbsp;</p>

## [Version 0.0.0] - 2024-10-05

### Added

### Changed

### Fixed

---

<p align="right"> &nbsp;</p>

_You can see all change logs [Here](/CHANGELOG.md)._

<p align="right"> &nbsp;</p>

---

Author:

[Arslan Ameer](www.arslanameer.com) | [GitHub](https://github.com/ArslanAmeer)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/arslanameer)
