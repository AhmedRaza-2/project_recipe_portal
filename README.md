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
