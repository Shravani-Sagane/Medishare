# 💊 Unused Medicine Redistribution System

A web-based platform is database management system that helps redistribute unused and eligible medicines from donors to people or organizations who need them, while maintaining medicine availability, request management, and administrative monitoring.

## 📌 Overview

The **Unused Medicine Redistribution System** is designed to reduce medicine wastage by providing a digital platform where users can donate unused medicines and eligible recipients can request available medicines.

The system allows users to:


* Donate unused medicines
  <img width="1920" height="1020" alt="Screenshot 2026-04-07 232928" src="https://github.com/user-attachments/assets/586516da-8e2e-4981-9eb9-c420ba1fdfc3" />


  
* View available medicines
  <img width="1920" height="1080" alt="Screenshot 2026-04-08 001657" src="https://github.com/user-attachments/assets/89d070fd-907b-4ef2-854d-494c93e651f1" />

  
* Request required medicines
<img width="1920" height="1080" alt="Screenshot 2026-04-08 001657" src="https://github.com/user-attachments/assets/89d070fd-907b-4ef2-854d-494c93e651f1" />

 *Administrators can manage medicine records, users, donations, and requests through a centralized dashboard.

  <img width="1920" height="1020" alt="Screenshot 2026-04-07 233152" src="https://github.com/user-attachments/assets/8ce84037-7a01-4624-a64e-4563aa1ea58d" />



## 🎯 Objectives

* Reduce wastage of unused medicines.
* Connect medicine donors with eligible recipients.
* Maintain a centralized medicine inventory.
* Provide a simple platform for medicine donation and requests.
* Track medicine expiry and availability.
* Improve transparency in medicine redistribution.

## ✨ Key Features

### 👤 User Module
* User registration and login

<img width="1920" height="1020" alt="Screenshot 2026-04-07 233101" src="https://github.com/user-attachments/assets/130ed486-19d8-4ebb-8b06-035e69597b38" />

* Secure authentication
* User profile management
* Upload unused medicine details
* View available medicines
* Search medicines
* Request medicines
* Track request status
 
### 💊 Medicine Module

* Add medicine information
* Medicine name and category
* Quantity management
* Expiry-date tracking
* Availability status
* Donor information
* Medicine request management

### 🛠️ Admin Module

* Admin authentication
* Manage users
* Manage medicine records
* View donated medicines
* Monitor medicine requests
* Identify expired medicines
* Update medicine availability
* Manage redistribution records

## 🔄 System Workflow

```text
              User
                │
        ┌───────┴────────┐
        │                │
      Donor           Recipient
        │                │
 Donate Medicine    Search Medicine
        │                │
        └───────┬────────┘
                ↓
        Medicine Database
                ↓
        Medicine Available?
           /          \
         Yes           No
          │             │
    Request Medicine   Not Available
          │
          ↓
      Admin Review
          │
          ↓
   Request Processing
          │
          ↓
 Medicine Redistribution
```

1. Clone the repository
git clone https://github.com/Shravani-Sagane/Medishare.git
*cd unused-medicine-redistribution
*2. Install frontend dependencies
*cd frontend
*npm install
*3. Install backend dependencies
*cd ../backend
*npm install
*4. Configure environment variables

*Create a .env file in the backend:

*DB_HOST=localhost
*DB_USER=root
*DB_PASSWORD=your_password
*DB_NAME=medicine_redistribution


*JWT_SECRET=your_secret_key
*5. Create the database
*6. Start the backend
    npm run dev
*7. Start the frontend
cd ../frontend
npm run dev


