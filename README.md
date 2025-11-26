# 🐾 NGO Animal Rescue Hub

A centralized web platform for animal rescue NGOs to manage rescue cases, animal care, adoptions, volunteer coordination, and public incident reports. Built to support faster response, transparency, and easier collaboration between NGOs and citizens.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Hardware Requirements](#hardware-requirements)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Key Improvements](#key-improvements)
- [Contributors](#contributors)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

NGO Rescue Hub is a mission-critical platform that bridges the gap between citizens who witness animal emergencies and NGOs that can respond. Citizens can submit rescue reports with location details, and NGO staff can view all reports on a centralized dashboard, assign volunteers, track case progress, and manage rescue operations efficiently.

**Tagline:** "Compassion. Protection. Community."

## ✨ Features

- ✅ **Emergency Reporting** - Citizens can report injured/distressed animals with location and photos
- ✅ **NGO Dashboard** - Centralized view of all rescue reports with filtering and search
- ✅ **Case Management** - Track case status from submission to resolution
- ✅ **Volunteer Assignment** - Assign rescue cases to available volunteers
- ✅ **Real-time Updates** - Instant notifications for new reports and status changes
- ✅ **Location Tracking** - Geographic display of rescue incidents on interactive maps
- ✅ **User Authentication** - Secure login for citizens, NGO staff, and administrators
- ✅ **Report History** - Complete audit trail of all rescue operations
- ✅ **Image Upload** - Users can upload photos/videos of animal emergencies

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework for interactive components
- **JavaScript (ES6+)** - Core programming language
- **React Router** - Client-side routing and navigation
- **CSS3** - Styling and responsive design

### Backend
- **Java** - Server-side programming language
- **Spring Boot** - RESTful API framework
- **JDBC** - Database connectivity layer
- **Maven** - Dependency management

### Database
- **MySQL** - Relational database
- **SQL** - Query language for data operations

### Tools & Deployment
- **Git & GitHub** - Version control and repository
- **VS Code** - Code editor
- **Node.js & npm** - Package manager for React
- **Postman** - API testing (optional)

## 💻 Hardware Requirements

### Development Environment
- **Processor:** Intel Core i5/i7 or AMD Ryzen 5/7 (4+ cores, 2.4+ GHz)
- **RAM:** 16 GB DDR4 recommended (8 GB minimum)
- **Storage:** 512 GB SSD recommended (256 GB minimum)
- **Display:** 1440p 27" external monitor recommended (1080p 15.6" minimum)

### Production Server
- **Processor:** Intel Xeon or equivalent (8+ cores, 2.4+ GHz)
- **RAM:** 16-32 GB (scales with concurrent users)
- **Storage:** 500 GB - 2 TB SSD for database and logs
- **Database Server:** Separate instance with 16-32 GB RAM, 500 GB - 1 TB SSD

### Client Devices
- **Mobile:** 4 GB RAM, 32 GB storage, 5.5"-6.7" display
- **Tablet:** 6-8 GB RAM, 64 GB storage, 8"-10" display
- **Desktop:** 8 GB RAM, 256 GB SSD, 21.5"-24" Full HD display

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+) and npm installed
- Git installed
- MySQL Server running
- Java JDK (v11+) installed
- Maven installed

### Frontend Setup

1. **Clone the repository**
```bash
git clone https://github.com/sanjeevani5456/ngo-rescue-hub.git
cd ngo-rescue-hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Access the application**
Open your browser and go to: `http://localhost:3000`

### Backend Setup

1. **Navigate to backend folder**
```bash
cd backend
```

2. **Configure database connection** in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ngo_rescue_hub
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

3. **Build and run Spring Boot**
```bash
mvn clean install
mvn spring-boot:run
```

4. **Backend runs on:** `http://localhost:8080`

### Database Setup

1. **Create database**
```sql
CREATE DATABASE ngo_rescue_hub;
USE ngo_rescue_hub;
```

2. **Import SQL schema**
```sql
-- Rescue Reports Table
CREATE TABLE rescue_reports (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    animal_type VARCHAR(100),
    location VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE,
    status VARCHAR(50) DEFAULT 'REPORTED',
    reported_by VARCHAR(100),
    contact_number VARCHAR(20),
    image_url VARCHAR(500),
    priority_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- NGO Staff Table
CREATE TABLE ngo_staff (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    phone_number VARCHAR(20),
    ngo_name VARCHAR(255),
    location VARCHAR(255),
    availability_status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Case Updates Table
CREATE TABLE case_updates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    report_id BIGINT NOT NULL,
    status VARCHAR(50),
    update_message TEXT,
    updated_by VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES rescue_reports(id)
);

-- Indexes for performance
CREATE INDEX idx_status ON rescue_reports(status);
CREATE INDEX idx_location ON rescue_reports(location);
CREATE INDEX idx_created_at ON rescue_reports(created_at);
```

## 📁 Project Structure

```
ngo-rescue-hub/
├── public/
│   ├── index.html
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── HomePage.js
│   │   ├── Dashboard.js
│   │   └── ReportForm.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── backend/
│   ├── src/main/java/com/ngorescue/
│   │   ├── controller/RescueController.java
│   │   ├── service/RescueService.java
│   │   ├── model/RescueReport.java
│   │   └── dao/RescueDAO.java
│   ├── application.properties
│   └── pom.xml
├── database/
│   └── schema.sql
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## 💡 Usage

### For Citizens
1. Go to home page and click "Report Now"
2. Fill in animal type, location, and description
3. Upload photos/videos if available
4. Submit the report
5. Track progress on the dashboard

### For NGO Staff
1. Login with NGO credentials
2. View all incoming rescue reports on dashboard
3. Assign reports to available volunteers
4. Update case status as rescue progresses
5. Close case once animal is safe/adopted

## 🔌 API Endpoints

### Rescue Reports
- `POST /api/rescue/report` - Submit new rescue report
- `GET /api/rescue/reports` - Get all reports
- `GET /api/rescue/report/{id}` - Get specific report
- `PUT /api/rescue/report/{id}` - Update report status
- `DELETE /api/rescue/report/{id}` - Delete report

### NGO Staff
- `POST /api/ngo/login` - NGO staff login
- `GET /api/ngo/staff` - Get all staff members
- `PUT /api/ngo/staff/{id}` - Update staff info

## 📊 Database Schema

**rescue_reports:** Stores all submitted rescue incidents
- id, title, description, animal_type, location, latitude, longitude, status, reported_by, contact_number, image_url, priority_level, created_at, updated_at

**ngo_staff:** Stores NGO volunteer information
- id, name, email, password, phone_number, ngo_name, location, availability_status, created_at

**case_updates:** Tracks all updates on rescue cases
- id, report_id, status, update_message, updated_by, updated_at

## 🎯 Key Improvements

- ✅ Real-time notifications using WebSocket
- ✅ Interactive map integration for location tracking
- ✅ User authentication with JWT tokens and role-based access
- ✅ Advanced case management workflow with status tracking
- ✅ Image and file upload capability
- ✅ Mobile responsive design for field workers
- ✅ Database query optimization with indexing

## 👥 Contributors

- **Sanjeevani Chitale** - Full Stack Developer
- **Arjun** - Frontend Developer

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 📧 Contact

**Email:** sanjeevanichitale10@gmail.com

**GitHub:** https://github.com/sanjeevani5456/ngo-rescue-hub

**For Issues & Feature Requests:** Open an issue on GitHub

---

**Made with ❤️ for animal welfare and NGO support**
