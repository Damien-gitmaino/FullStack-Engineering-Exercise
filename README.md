## 📦 Project Overview

This project is a user onboarding flow built with a multi-step form (wizard-style), complete with an admin panel to configure the flow and a data table to visualize submitted entries. The goal of this test was to demonstrate the ability to manage dynamic onboarding flows and persist user data in a structured way.


## 🚀 Section 1 - User Onboarding

This is the main page of the application. I built a multi-step user onboarding flow where users can enter their email and password, and proceed through two additional customizable steps. All data is persisted to a backend database.

The onboarding flow is structured like a wizard, giving users visibility into where they are in the process. The flow consists of three pages:
	•	Page 1: Login/Signup form with email and password fields
	•	Page 2 & 3: Configurable steps controlled by the admin panel (see Section 2)

The available components that can appear on page 2 or 3 are:
	•	A large text area for an “About Me” section
	•	A set of address fields: street, city, state, zip code
	•	A birthdate selection UI


## ⚙️ Section 2 - Admin Panel

This section provides an interface for managing which components appear on the second and third pages of the onboarding flow. It is accessible at the route /admin.

Admins (myself during development) can:
	•	Assign which components appear on Page 2 and Page 3
	•	Ensure that each page has at least one component
	•	For the initial state, each page is pre-filled with default components (the exact ones don’t matter for this test)

Example configuration:
	•	Page 2 → “Birthdate” + “About Me”
	•	Page 3 → “Address”


## 📊 Section 3 - Data Table

This is a simple HTML table that displays the user data stored in the database. It is accessible at the route /data.

Key features:
	•	No authentication required (for testing purposes)
	•	Automatically reflects the latest data after form submission
	•	Useful for verifying the backend integration is functioning properly
