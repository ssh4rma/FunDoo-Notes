# FunDoo Notes

FunDoo Notes is a Google Keep-inspired note-taking web application built with Angular and Angular Material. It allows users to register, log in, and manage their notes with features like pinning, archiving, reminders, color coding, and more.

## Project Demonstration
**https://youtu.be/V_GLysNw0sI?si=FS5qFP1bd9poz0bi**

## Features

- **User Authentication:** Register and log in securely.
- **Create Notes:** Add notes with title, description, and color.
- **Edit Notes:** Update note content and properties.
- **Pin/Unpin Notes:** Pin important notes for quick access.
- **Archive/Unarchive Notes:** Move notes in and out of the archive.
- **Delete/Restore Notes:** Soft delete notes to trash and restore or permanently delete them.
- **Reminders:** Set reminders for notes.
- **Search:** Filter notes by title.
- **Responsive UI:** Built with Angular Material for a modern look and feel.

## Project Structure

- `src/app/components/`: Contains all UI components (login, register, dashboard, notes, archive, trash, reminder, etc.).
- `src/app/services/`: Contains services for API communication (notes, archive, trash, user, etc.).
- `src/app/models/`: Contains TypeScript interfaces/models.
- `src/assets/`: Static assets like images.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ssh4rma/FunDoo-Notes.git
   cd FunDoo-Notes
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the application:
   ```sh
   ng serve
   ```
   The app will be available at `http://localhost:4200/`.
