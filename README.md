# Sard Phase 4

SARD is a web-based platform that streamlines the book production process by connecting authors, editors, reviewers, and publishers in one centralized space. Whether you're a casual writer looking for feedback or a publisher searching for the next great manuscript, SARD brings every key stakeholder together to transform rough drafts into polished, high-quality books.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Setup & Installation](#setup--installation)
- [Usage Instructions](#usage-instructions)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [Support](#support)

## 🎯 Project Overview

Sard Phase 4 is a React-based PDF viewer application that provides users with a seamless experience for viewing and interacting with PDF documents. Built with modern web technologies and best practices, this project showcases professional development standards with clean code architecture and responsive design.

## ✨ Features

- **PDF Viewing**: View PDF documents using multiple PDF viewer libraries
- **React 19**: Modern React with latest features and hooks
- **Vite**: Lightning-fast build tool and development server with Hot Module Replacement (HMR)
- **Bootstrap Integration**: Responsive UI components with React-Bootstrap
- **Icon Libraries**: Beautiful icons via react-icons and react-bootstrap-icons
- **Code Quality**: ESLint for maintaining code standards
- **Responsive Design**: Works seamlessly across all device sizes

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Bootstrap 5.3.8 with React-Bootstrap 2.10.10
- **PDF Libraries**:
  - react-pdf 10.4.1
  - @embedpdf/react-pdf-viewer 2.14.0
  - pdfjs-dist 5.6.205
- **Routing**: React Router DOM 7.13.2
- **Icons**: 
  - react-icons 5.6.0
  - react-bootstrap-icons 1.11.6
- **Code Quality**: ESLint 9.39.4

## 📁 Project Structure

```
Sard_phase4/
├── react-starter/                 # Main React application
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── pages/                # Page components
│   │   ├── App.jsx               # Main App component
│   │   └── main.jsx              # Entry point
│   ├── public/                   # Static assets
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint rules
│   ├── package.json              # Project dependencies
│   └── .env.example              # Example environment variables
├── node_modules/                 # Installed dependencies
├── package.json                  # Root dependencies
├── package-lock.json             # Locked versions
└── README.md                      # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher recommended) - [Download here](https://nodejs.org/)
- **npm** (v7 or higher) or **yarn** (v1.22 or higher)
- **Git** for version control

You can verify your installation by running:
```bash
node --version
npm --version
```

### Setup & Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/ima1001/Sard_phase4.git
cd Sard_phase4
```

#### Step 2: Install Root Dependencies

```bash
npm install
```

#### Step 3: Install Application Dependencies

```bash
cd react-starter
npm install
cd ..
```

#### Step 4: Configure Environment Variables

Create a `.env` file in the `react-starter` directory. Copy the contents from `.env.example` and update as needed:

```bash
cd react-starter
cp .env.example .env
```

Edit the `.env` file with your configuration (see [Environment Variables](#environment-variables) section).

## 📖 Usage Instructions

### Development Server

To start the development server with hot module replacement:

```bash
cd react-starter
npm run dev
```

The application will be available at `http://localhost:5173`

**Features during development:**
- Hot Module Replacement (HMR) for instant updates
- Source maps for easier debugging
- Fast refresh for component changes

### Production Build

To create an optimized production build:

```bash
cd react-starter
npm run build
```

The optimized build will be output to the `dist` directory, ready for deployment.

### Preview Production Build

To test the production build locally before deployment:

```bash
cd react-starter
npm run preview
```

Open `http://localhost:4173` to view the production build.

### Code Quality & Linting

Run ESLint to check code quality and maintain consistent code standards:

```bash
cd react-starter
npm run lint
```

Fix auto-fixable linting issues:
```bash
npm run lint -- --fix
```

### Example Usage

#### Viewing a PDF

```javascript
import PDFViewer from './components/PDFViewer';

function App() {
  return (
    <PDFViewer 
      file="/path/to/pdf.pdf" 
      title="My Document"
    />
  );
}
```

## 🔐 Environment Variables

Environment variables should be configured in a `.env` file in the `react-starter` directory. This file should **never be committed** to version control.

### Required Environment Variables

Create a `.env` file with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# PDF Viewer Configuration
VITE_PDF_WORKER_URL=/pdf.worker.min.js

# Application Settings
VITE_APP_TITLE=Sard Phase 4 - PDF Viewer
VITE_APP_VERSION=1.0.0

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
```

### .env.example Template

```env
# Copy this file to .env and fill in your values
# DO NOT commit .env to version control

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# PDF Viewer Configuration
VITE_PDF_WORKER_URL=/pdf.worker.min.js

# Application Settings
VITE_APP_TITLE=Sard Phase 4 - PDF Viewer
VITE_APP_VERSION=1.0.0

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
```

### Accessing Environment Variables in Code

```javascript
// Access environment variables using import.meta.env
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
```

⚠️ **Important Security Notes:**
- Environment variables prefixed with `VITE_` are exposed to client-side code
- **Never store sensitive data** (API keys, tokens, passwords) in the client-side environment
- Sensitive configurations should only exist on the backend
- Always use `.env` in `.gitignore` to prevent accidental commits

## 📋 Available Scripts

### Development

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite development server with HMR |
| `build` | `npm run build` | Build for production |
| `preview` | `npm run preview` | Preview the production build locally |
| `lint` | `npm run lint` | Run ESLint to check code quality |

### Full Command Reference

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Create production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check code quality
npm run lint --fix   # Auto-fix linting issues
```

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| Ima (ima1001) | Project Lead & Developer | Project setup, PDF viewer implementation, repository management |
| [Team Member 2] | Frontend Developer | UI/UX components, styling, responsive design |
| [Team Member 3] | Backend Integration | API integration, environment configuration |
| [Team Member 4] | QA & Testing | Testing, bug fixes, documentation review |

*Note: Update this section with actual team member information*

## 🤝 Contributing

Contributions are welcome! To contribute to this project:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and commit: `git commit -m 'Add new feature'`
4. **Push to the branch**: `git push origin feature/your-feature-name`
5. **Submit a Pull Request** with a clear description of your changes

### Development Guidelines

- Follow the ESLint rules configured in the project
- Write clean, readable code with meaningful variable names
- Add comments for complex logic
- Test your changes before submitting a PR
- Update documentation as needed

## 📝 License

This project is open source and available under the MIT License.

## 💬 Support

For issues, questions, or suggestions:

1. **Search existing issues** in the [GitHub Issues](https://github.com/ima1001/Sard_phase4/issues)
2. **Create a new issue** if your problem isn't listed
3. **Include detailed information**:
   - Steps to reproduce the issue
   - Expected vs. actual behavior
   - Browser and OS information
   - Error messages or screenshots

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [React-Bootstrap Documentation](https://react-bootstrap.github.io)
- [React-PDF Documentation](https://react-pdf.org)

---

**Last Updated**: 2026-04-11
**Repository**: [ima1001/Sard_phase4](https://github.com/ima1001/Sard_phase4)
