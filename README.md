# SARD — Literary Collaboration Platform

SARD is a web-based platform that streamlines the book production process by connecting authors, editors, reviewers, and publishers in one centralized space. Whether you're a casual writer looking for feedback or a publisher searching for the next great manuscript, SARD brings every key stakeholder together to transform rough drafts into polished, high-quality books.

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Usage & Examples](#usage--examples)
- [Team Members](#team-members)

---

## Project Description

SARD solves the challenge of fragmented collaboration in book creation. The platform supports five distinct user roles — **Admin**, **Author**, **Reviewer**, **Editor**, and **Publisher** — each with a tailored dashboard and feature set. Authors can create writing projects, manage drafts, and invite collaborators. Reviewers and editors can provide structured feedback. Publishers can browse ready-to-publish work. Admins oversee communities and platform activity.

Key benefits:
- Saves time by centralizing all collaboration in one place
- Improves book quality through structured professional feedback
- Builds a supportive creative community across experience levels

---

## Features

| Role | Key Features |
|------|-------------|
| **Admin** | Manage communities (add/edit/delete), send platform-wide notifications |
| **Author** | Create and manage writing projects, manage drafts, TODO task list, accept/reject join requests |
| **Reviewer** | Browse communities, join projects, mark projects as reviewed |
| **Editor** | Browse communities, join projects, mark projects as ready for publishing |
| **Publisher** | Browse communities, preview projects, send join requests to authors |
| **All Roles** | Sign up with role selection, login/logout, account settings, join communities, in-project chat |

---

## Tech Stack

- **Framework:** React.js
- **Languages:** HTML, CSS, JavaScript
- **Build Tool:** Vite
- **Package Manager:** npm

---

## Prerequisites

Make sure the following is installed on your machine before getting started:

- npm
- Git

---

## Setup & Installation

1. Clone the repository:
   ```
   git clone https://github.com/ima1001/Sard_phase4.git
   ```

2. Move into the project folder:
   ```
   cd Sard_phase4/react-starter
   ```

3. Install the required node modules:
   ```
   npm install
   ```
   or
   ```
   npm i
   ```

4. To start the development server:
   ```
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

> **Note:** If you get an error like "running scripts is disabled" or the system blocks npm commands, run this first:
> ```
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```
> Then re-run your npm commands.

---

## Project Structure

```
Sard_phase4/
├── react-starter/                # Main React application
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── Pages/                # Page components
│   │   ├── assets/               # Images and static assets
│   │   ├── App.css               # Global app styles
│   │   ├── App.jsx               # Main App component
│   │   ├── index.css             # Base styles
│   │   └── main.jsx              # Entry point
│   ├── data/                     # Static JSON data files
│   ├── public/                   # Static assets served directly
│   ├── .gitignore
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint rules
│   ├── index.html                # HTML entry point
│   ├── package.json              # App dependencies
│   └── package-lock.json         # Locked versions
├── node_modules/                 # Root installed dependencies
├── package.json                  # Root dependencies
├── package-lock.json             # Locked versions
└── README.md                     # Project documentation
```

---

## Usage & Examples

### Signing Up

1. Open the app and navigate to the **Sign Up** page.
2. Enter your full name, email address, and password.
3. Select your role from the dropdown: **Author**, **Editor**, **Reviewer**, or **Publisher**.
4. Accept the terms and conditions.
5. Click **Sign Up** to create your account.

---

### Logging In & Out

1. Navigate to the **Login** page.
2. Enter your registered email and password.
3. Click **Login** — you will be redirected to your role-specific dashboard.
4. To log out, click the **Logout** button from your dashboard or sidebar.

---

### Account Settings

1. From your dashboard, navigate to **Settings**.
2. You can update your **display name**.
3. You can update your **password** by entering your new password and confirming it.
4. Click **Save** to apply the changes.

---

### Joining Communities

1. From the home page, browse the list of available communities.
2. Click the **Join** button on any community you'd like to be part of.
3. You will now have access to projects listed inside that community.

---

### Creating a Project (Author)

1. Log in as an **Author**.
2. From your dashboard, click **Create Project**.
3. Fill in the required fields:
   - Project title
   - Description
   - Number of authors
   - Related communities
   - Accessibility: **Public** or **Private**
4. Click **Publish** — the project will appear in your dashboard.

---

### Managing Drafts (Author)

1. Open one of your projects from the dashboard.
2. View and edit your draft content.
3. When ready, mark the draft status:
   - **Waiting for Review** — makes the draft visible to reviewers.
   - **Waiting for Editing** — makes the draft visible to editors.
4. You will receive join requests from reviewers/editors and can **accept** or **reject** them from the project page.

---

### TODO Task List (Author)

1. Open a project from your dashboard.
2. Navigate to the **TODO** section within the project.
3. Click **Add Task** and enter a task title.
4. The task is saved and visible to all project members.
5. Any project member can mark a task as **completed** by clicking the checkbox next to it.

---

### In-Project Chat

1. Open a project you are a member of.
2. Navigate to the **Chat** section within the project.
3. Type your message in the input field and press **Send**.
4. All project members can view and participate in the conversation.

> Note: Only members who have been accepted into the project can access the chat.

---

### Reviewing a Project (Reviewer)

1. Log in as a **Reviewer**.
2. Browse communities and join one that has projects open for review.
3. Find a project marked **Waiting for Review** and send a join request.
4. Once the author accepts, open the project and read the draft.
5. Click **Mark as Reviewed** to submit your feedback.
6. The system updates the project status and notifies the author.

---

### Editing a Project (Editor)

1. Log in as an **Editor**.
2. Browse communities and join one that has projects open for editing.
3. Find a project marked **Waiting for Editing** and send a join request.
4. Once the author accepts, open the project and make your edits.
5. Click **Mark as Ready for Publishing** when done.
6. The system updates the project status and notifies the author.

---

### Previewing a Project (Publisher)

1. Log in as a **Publisher**.
2. Browse communities and find projects marked **Ready for Publishing**.
3. Click **Preview** to view an overview of the project.
4. Send a join request to the author if you'd like to proceed.
5. Once accepted, you gain full access to the project.

---

### Managing Communities (Admin)

1. Log in as an **Admin**.
2. Navigate to **Community Management** from the sidebar.
3. To **add** a community: click **Add**, fill in the name and description, then click **Publish**.
4. To **edit** a community: click **Edit** next to a community, update the fields, then save.
5. To **delete** a community: click **Delete** next to a community and confirm the action.

---

### Sending Notifications (Admin)

1. Log in as an **Admin**.
2. Navigate to **Notifications** from the sidebar.
3. Write your notification message in the text field.
4. Click **Publish** — the notification will be sent to all platform users.

---

## Team Members

| Name | Role |
|------|------|
| Fatemah AL Jawad | ID: 202248340 |
| Layan Alasmari | ID: 202223720 |
| Naba AL Antaif | ID: 202278160 |
| Hawra AL Majed | ID: 202333090 |


---

## License

This project was developed as part of the SWE363 course at KFUPM — Team 18.
