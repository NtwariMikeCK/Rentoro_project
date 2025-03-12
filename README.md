# Rentoro - Peer-to-Peer Car Rental Platform

## Table of Contents

1. [About Rentoro](#about-rentoro)
2. [Features](#features)
3. [How It Works](#how-it-works)
4. [Technology Stack](#technology-stack)
5. [Team Members](#team-members)
6. [Project Goals](#project-goals)
7. [Installation and Setup](#installation-and-setup)
8. [Usage Guide](#usage-guide)
9. [Contributing](#contributing)
10. [License](#license)

---

## About Rentoro

Rentoro is a web-based peer-to-peer car rental platform that connects car owners with renters in Rwanda. The platform provides a convenient, affordable, and secure way for people to rent cars while enabling car owners to earn money from their idle vehicles.

### Why Rentoro?

- The car rental industry in Rwanda is dominated by traditional companies with high prices and rigid policies.
- Many car owners have vehicles that remain unused for extended periods.
- There is no simple, community-driven platform that allows car sharing in Rwanda.
- Rentoro bridges this gap by offering an easy-to-use, safe, and efficient solution.

---

## Features

- **User Registration & Authentication**: Secure sign-up and login using email or phone number.
- **Car Listing & Management**: Owners can list their cars, set availability, and manage bookings.
- **Advanced Search & Filters**: Renters can search cars by price, location, vehicle type, and features.
- **Instant Booking & Payment Integration**: Secure online payment options for seamless transactions.
- **Ratings & Reviews**: Users can review and rate their rental experience to ensure trust.
- **Notifications & Messaging**: Real-time updates and secure communication between renters and owners.
- **Admin Dashboard**: Moderation tools to manage user activity and listings.

---

## How It Works

1. **Car Owners:**

   - Register and verify their identity.
   - List their car with photos, pricing, and availability.
   - Accept bookings and earn money.

2. **Renters:**

   - Search and filter available cars.
   - Book a car and make payments securely.
   - Pick up the car and leave a review after the rental.

3. **Admin Team:**
   - Manage user accounts and listings.
   - Handle disputes and security concerns.

---

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript (React)
- **Backend**: Python (Django/Flask)
- **Database**: PostgreSQL/MySQL
- **Payment Gateway**: Mobile Money, Stripe, PayPal
- **Authentication**: JWT, OAuth
- **Hosting**: AWS, Heroku

---

## Team Members

- **Ntwari Mike Chris Kevin** - UI/UX Designer & Front-end Developer
- **Dushime Paulette** - Project Manager & Front-end Developer
- **Kayigamba Blair** - Backend Developer & Database Architect
- **Dushimimana Samuel** - Lead Backend Developer & System Architect
- **Emmanuel Annor** - Learning Coach

---

## Project Goals

- **Launch Objective**: Deploy Rentoro with at least 100 car listings in the first three months.
- **Payment System Objective**: Secure at least 50 transactions per month within the first six months.
- **User Satisfaction Objective**: Achieve a 4.5/5-star rating based on user reviews.
- **User Registration Objective**: Reach 1,000 registered users within the first year.

---

## Installation and Setup

### Prerequisites

- Python & Django installed
- Node.js & npm for frontend development
- Database setup (PostgreSQL/MySQL)
- Virtual environment (optional but recommended)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/Dushimepaulette1/rentoro.git
   ```
2. Navigate into the project folder:
   ```sh
   cd rentoro
   ```
3. Set up a virtual environment (optional):
   ```sh
   python -m venv env
   source env/bin/activate  # Mac/Linux
   env\Scripts\activate  # Windows
   ```
4. Install backend dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Run database migrations:
   ```sh
   python manage.py migrate
   ```
6. Start the backend server:
   ```sh
   python manage.py runserver
   ```
7. Navigate to the frontend folder and install dependencies:
   ```sh
   cd frontend
   npm install
   ```
8. Start the frontend server:
   ```sh
   npm start
   ```

---

## Usage Guide

- **Car Owners**: Sign up, list your car, manage availability, and start earning.
- **Renters**: Search, book, and enjoy a hassle-free car rental experience.
- **Admins**: Oversee platform operations and ensure smooth functionality.

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make changes and commit.
4. Submit a pull request for review.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

### Contact & Support

For questions or suggestions, contact the project manager, **Dushime Paulette**, or any of the team members.

🚀 **Rentoro - Making Car Rentals Easy & Affordable!**
