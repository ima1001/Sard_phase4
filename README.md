# Sard Phase 4 - React PDF Viewer Application

A modern React-based application built with Vite for viewing and interacting with PDF files. This project demonstrates a complete setup with PDF viewing capabilities, Bootstrap styling, and icon libraries.

## Features

- **PDF Viewing**: View PDF documents using multiple PDF viewer libraries
- **React 19**: Modern React with latest features
- **Vite**: Lightning-fast build tool and development server
- **Bootstrap Integration**: Responsive UI components with React-Bootstrap
- **Icon Libraries**: Beautiful icons via react-icons and react-bootstrap-icons
- **Development Tools**: ESLint for code quality and Vite for optimization

## Tech Stack

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

## Project Structure

```
Sard_phase4/
├── react-starter/          # Main React application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   ├── vite.config.js     # Vite configuration
│   ├── eslint.config.js   # ESLint rules
│   └── package.json       # Project dependencies
├── node_modules/          # Installed dependencies
├── package.json           # Root dependencies
└── package-lock.json      # Locked versions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ima1001/Sard_phase4.git
cd Sard_phase4
```

2. Install dependencies:
```bash
npm install
cd react-starter
npm install
```

### Development

To start the development server:

```bash
cd react-starter
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

To create a production build:

```bash
cd react-starter
npm run build
```

The optimized build will be output to the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
cd react-starter
npm run preview
```

### Code Quality

Run ESLint to check code quality:

```bash
cd react-starter
npm run lint
```

## Available Scripts

### Development

- `npm run dev` - Start Vite development server with hot module replacement
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Configuration

### Vite Config
The project uses a Vite configuration with React plugin support located at `react-starter/vite.config.js`.

### ESLint Config
Code style and quality rules are defined in `react-starter/eslint.config.js` with support for React hooks and refresh.

## Dependencies

### Production Dependencies
- React and React DOM for UI
- Bootstrap and React-Bootstrap for styling and components
- PDF viewing libraries for document display
- React Router DOM for navigation
- Icon libraries for UI elements

### Development Dependencies
- Vite and related plugins for build and development
- ESLint and related plugins for code quality
- TypeScript types for development

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

- [ima1001](https://github.com/ima1001)

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.