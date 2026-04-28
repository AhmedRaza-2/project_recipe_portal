# RecipeNest - Chef Portal

A professional web application for chefs to manage recipes and showcase portfolios.

## 🛠 Tech Stack
- **Frontend**: React.js, Vanilla CSS, React Router
- **Backend**: ASP.NET Core Web API, C#, Entity Framework Core
- **Database**: SQL Server

## 🚀 How to Run Locally

### 1. Backend Setup (ASP.NET Core)
1. Navigate to the `backend/` folder.
2. Ensure you have the .NET 8.0 SDK installed.
3. Update the connection string in `appsettings.json` (if needed).
4. Run migrations to set up the database:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
5. Start the backend server:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001` or `http://localhost:5000`.

### 2. Frontend Setup (React)
1. Navigate to the `frontend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📌 Kya Kya Ho Gya (Completed)
- [x] **Premium UI/UX**: All 7 core pages designed according to screenshots.
- [x] **Responsive Design**: Mobile and desktop friendly layouts.
- [x] **Frontend Routing**: Navigation between Home, Chefs List, Profile, and Dashboard.
- [x] **Backend Models**: Chef and Recipe data structures defined.
- [x] **CRUD Operations**: API endpoints for adding, editing, and deleting recipes.
- [x] **Auth UI**: Login and Register screens.

## 🚧 Kya Kya Rehta Hy (Remaining)
1. **API Integration**: Frontend is currently using mock data. You need to update the `useEffect` hooks in the pages to fetch data from `http://localhost:5000/api/recipes`.
2. **Real Authentication**: Adding JWT tokens for secure login (currently it's a basic check).
3. **Image Uploads**: Implementing a file upload service for chef profile pictures and recipe images.
4. **Form Validation**: Adding deeper validation for recipe ingredients and instructions.
