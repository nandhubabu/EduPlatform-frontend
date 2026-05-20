# EduPlatform (Frontend)

EduPlatform is a modern, comprehensive learning management system (LMS) frontend built with **React** and **Vite**. It offers a rich, interactive educational experience tailored for both students and instructors, featuring advanced tools such as an AI-powered Career Assessment and an interactive chatbot.

## 🚀 Key Features

### 👥 Role-Based Access Control
- **Students**: Access to course enrollments, personalized dashboards, a dedicated course player, and settings.
- **Instructors**: Dedicated instructor dashboard with capabilities to add, update, and manage course content.

### 🧠 AI-Powered Career Assessment
A sophisticated 3-stage career discovery tool powered by **Google's Gemini Pro AI**:
1. **Interest Discovery**: Identifies natural interests and preferences across multiple domains.
2. **Knowledge Assessment**: Evaluates technical readiness and baseline knowledge.
3. **Personalized Evaluation**: Dynamically generates targeted questions to recommend personalized career paths, certifications, and job opportunities.

### 💬 Interactive Chatbot
- A floating AI chatbot integrated directly into the platform to assist users with navigation, queries, and contextual help.

### 📚 Course Management & Player
- Seamless browsing and enrollment of courses.
- Dedicated `CoursePlayer` component for an immersive learning experience.
- Instructor tools (`AddCourse`, `UpdateCourse`, `AdminCourses`) to effortlessly manage the curriculum.

## 🛠️ Technology Stack

- **Core Framework**: [React 18](https://reactjs.org/) & [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: 
  - [Redux Toolkit](https://redux-toolkit.js.org/) (for global auth state)
  - [TanStack React Query](https://tanstack.com/query/latest) (for asynchronous state and data fetching)
- **Styling & UI**: 
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Headless UI](https://headlessui.com/)
  - [Heroicons](https://heroicons.com/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Forms & Validation**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **API Client**: [Axios](https://axios-http.com/)

## 📂 Project Structure

```text
src/
├── assets/             # Static assets (images, icons)
├── components/         # React components organized by feature
│   ├── Admin/          # Course management components for instructors
│   ├── AuthRoute/      # Route protection and role-based wrappers
│   ├── Chatbot/        # Floating chatbot components
│   ├── Courses/        # Course browsing and course player
│   ├── Dashboard/      # User and instructor dashboards
│   ├── Home/           # Landing page and Assessment features
│   ├── Navbar/         # Public, Private, and Instructor navigation
│   └── User/           # Authentication (Login/Register) and Settings
├── reactQuery/         # API hooks and query/mutation configurations
├── redux/              # Redux slices (e.g., authSlice) and store setup
├── services/           # API integration (courseService, chatbotService, aiAssessmentService)
├── utils/              # Helper functions and utilities
├── App.jsx             # Main application component and routing configuration
└── main.jsx            # Entry point
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### 1. Clone & Install
```bash
# Navigate to the project directory
cd EduPlatform

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and configure the following variables:
```env
# Backend API URL (defaults to http://localhost:5000 in vite proxy if not set)
VITE_API_URL=http://localhost:5000

# Gemini API Key for the AI Assessment Feature
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: Depending on your Vite setup for the AI service, you may need to use `VITE_GEMINI_API_KEY` instead of `REACT_APP_` if accessed via `import.meta.env`.)*

### 3. Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (configured in `vite.config.js`).

### 4. Build for Production
```bash
npm run build
```
This generates the optimized production build in the `dist` folder. You can preview the production build locally by running:
```bash
npm run preview
```

## 📝 Scripts Overview

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles and bundles the application for production.
- `npm run lint`: Runs ESLint to find and report errors or warnings.
- `npm run preview`: Locally previews the production build.
- `npm test`: Runs test suites via Jest.
