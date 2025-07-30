# Code.org Classroom Manager

This is a classroom management system for Code.org, built with Next.js and Tailwind CSS. It allows instructors to manage students and track their learning progress without needing a database.

## Features

- **Student Management:** Add, edit, and delete student information.
- **Learning Records:** Keep track of each student's learning history, including course, lesson date, duration, progress, and understanding level.
- **Data Portability:** Export all data to CSV or JSON format for backup or use in other applications.
- **Data Recovery:** Restore data from a JSON backup file.
- **Local Storage:** All data is saved in the browser's local storage, so no database is required.
- **Dashboard:** Provides an overview of student progress and learning trends.

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and static web applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for creating custom designs.
- [React Hook Form](https://react-hook-form.com/) - A library for managing forms in React.
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - A library of simply designed icons.
- [date-fns](https://date-fns.org/) - A modern JavaScript date utility library.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v16.x or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/iidaatcnt/code-org-classroom-manager.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Usage

To start the development server, run the following command:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To build the application for production, use:

```sh
npm run build
```

## License

Distributed under the MIT License. See `LICENSE` for more information.