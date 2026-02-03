# 🩸 RedConnect

**Real-Time Blood Donation & Inventory Management Platform**

## Project Description

RedConnect is a full-stack Next.js platform designed to solve critical coordination issues in India's blood donation ecosystem. The problem isn't a lack of donors, but rather **poor coordination and outdated inventory data**. Blood availability information is often stale, manually updated, or inaccessible during emergencies, leading to critical delays that can cost lives.

RedConnect connects **donors, hospitals, blood banks, and NGOs**, providing:
- **Location-aware discovery** of blood availability
- **Live availability dashboards** with real-time updates
- **Secure role-based access** for different user types
- **Emergency response workflows** for urgent blood requests

This platform ensures fast access, fresh data, and scalable infrastructure, especially in life-critical scenarios where every minute counts.

---

## 📁 Folder Structure

```
redconnect/
├── src/
│   ├── app/              # Routes & pages (App Router)
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Home page
│   │   ├── globals.css   # Global styles
│   │   └── favicon.ico   # Site favicon
│   ├── components/       # Reusable UI components
│   │   └── (components will be added here)
│   └── lib/              # Utilities, helpers, configs
│       └── (utilities will be added here)
├── public/               # Static assets (images, icons, etc.)
├── .gitignore           # Git ignore rules
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

### Directory Explanations

#### `src/app/`
Contains all routes and pages using Next.js App Router. This directory follows the file-based routing convention where:
- `layout.tsx` defines the root layout for all pages
- `page.tsx` files represent routes
- Nested folders create nested routes
- Special files like `loading.tsx`, `error.tsx` handle loading and error states

**Purpose:** Centralizes all application routes and page-level components, making navigation and routing intuitive and maintainable.

#### `src/components/`
Houses reusable UI components that can be shared across different pages and features. Examples include:
- Button components
- Form inputs
- Cards and containers
- Navigation bars
- Modals and dialogs

**Purpose:** Promotes code reusability, consistency in UI/UX, and easier maintenance. Components here follow a modular approach, making it easy to test and update individual pieces of the interface.

#### `src/lib/`
Contains utility functions, helper modules, and configuration files. This includes:
- API client configurations
- Data validation utilities
- Date/time formatters
- Constants and enums
- Type definitions
- Database connection helpers

**Purpose:** Separates business logic and utilities from UI components, making the codebase more organized and testable. This structure supports clean architecture principles.

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd S64-0126-Team05-Full-Stack-With-Nextjs-RedConnect-1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

---

## 📸 Application Screenshot

![RedConnect Running Locally](./screenshot.png)

*Screenshot of RedConnect running locally on http://localhost:3000*

> **Note:** To capture your own screenshot:
> 1. Run `npm run dev`
> 2. Open http://localhost:3000 in your browser
> 3. Take a screenshot
> 4. Save it as `screenshot.png` in the project root
> 5. Update this README with the actual screenshot

---

## 🏗️ Naming Conventions

### Files and Folders
- **Components**: Use PascalCase (e.g., `BloodCard.tsx`, `DonorForm.tsx`)
- **Utilities/Helpers**: Use camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Pages/Routes**: Use lowercase with hyphens for multi-word routes (e.g., `blood-availability/page.tsx`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_DONORS_PER_PAGE`)

### Code
- **Components**: PascalCase for component names
- **Functions/Variables**: camelCase
- **Types/Interfaces**: PascalCase with descriptive names (e.g., `BloodInventory`, `DonorProfile`)
- **Constants**: UPPER_SNAKE_CASE

---

## 💭 Reflection: Why This Structure?

### Scalability

This folder structure supports scalability in several ways:

1. **Clear Separation of Concerns**: By separating routes (`app/`), UI components (`components/`), and business logic (`lib/`), developers can easily locate and modify specific parts of the application without affecting others.

2. **Modular Architecture**: The `components/` directory allows us to build a library of reusable components. As the application grows, we can add new features by composing existing components rather than rewriting code.

3. **Maintainable Codebase**: The `lib/` directory centralizes utilities and configurations. When we need to update API endpoints, validation rules, or constants, we know exactly where to look.

4. **Team Collaboration**: With a clear structure, multiple team members can work on different features simultaneously without conflicts. Frontend developers can focus on `components/`, backend integration can happen in `lib/`, and routing logic stays in `app/`.

### Future Sprints

This structure will help our team scale the app in future sprints by:

- **Adding New Features**: New pages can be added to `src/app/` following the same pattern, making onboarding easier for new team members.
- **Component Library Growth**: As we build more UI components, they'll be organized in `src/components/`, potentially with subdirectories for different feature areas (e.g., `components/donors/`, `components/hospitals/`).
- **API Integration**: The `src/lib/` directory can expand to include API clients, data fetching utilities, and state management, keeping business logic separate from presentation.
- **Testing**: The clear structure makes it easier to write unit tests for components and integration tests for features.
- **Performance Optimization**: With organized code, we can easily identify and optimize specific areas (e.g., lazy loading components, code splitting by route).

### Clarity

The structure provides immediate clarity:
- New developers can understand the codebase organization within minutes
- Code reviews become more efficient when reviewers know where to expect certain types of code
- Documentation is easier to maintain when the structure itself is self-documenting

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **React**: 19.2.3
- **Linting**: ESLint with Next.js config

---

## 📝 Development Notes

- The project uses Next.js App Router for modern React Server Components
- TypeScript is configured with strict mode enabled for type safety
- Tailwind CSS is set up for utility-first styling
- The `src/` directory structure is used to keep the root directory clean

---

## 🤝 Contributing

This project follows a structured development workflow:
1. Create a feature branch from `main`
2. Make your changes following the folder structure and naming conventions
3. Test your changes locally
4. Submit a pull request with a clear description

---

## 📄 License

This project is part of a team assignment for Sprint 1.

---

**Team**: Team05 - RedConnect  
**Sprint**: Sprint 1 - Project Initialization & Folder Structure


## Aryan 
**In Concept 2.10**
 I set up secure environment variable management for the project. I created a .env.local file to store sensitive credentials and a .env.example file to document all required variables with placeholders. I ensured that only variables prefixed with NEXT_PUBLIC_ are accessible on the client side, keeping server secrets secure. I updated .gitignore to prevent environment files from being committed. Finally, I documented the purpose and usage of each variable in the README and avoided common security pitfalls.