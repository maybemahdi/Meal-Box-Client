# Meal Box Client

## Overview

The Meal Box Client is a user-friendly front-end application that interacts with the Meal Box Server. It allows users to browse, select, and order meals through a seamless interface. The client uses RESTful APIs to communicate with the server for meal data, user sessions, and order processing.

### Key Features
- User authentication and session management
- Meal browsing and selection
- Purchasing Meal by preferences
- Order processing and tracking
- Responsive design for various devices

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maybemahdi/Meal-Box-Client
   ```
2. Navigate to the project directory:
   ```bash
   cd Meal-Box-Server
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

4. Setup .env
   ```
   NEXT_PUBLIC_BASE_URL=server url refer to:
   https://github.com/maybemahdi/Meal-Box-Server

   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   ```

For server-side details, refer to the Meal Box Server documentation.