   <h1>Exercise Tracker</h1>
    <p>This is an <strong>Exercise Tracker</strong> application built during a Node.js course on FreeCodeCamp. It allows users to track exercises by logging their duration, description, and date.</p>

  <h2>Features</h2>
    <ul>
        <li>Create a new user for the exercise tracker</li>
        <li>Add exercise logs for a user, including description, duration, and date</li>
        <li>View the logs of a user, filterable by date range, and with a limit to the number of results</li>
    </ul>

  <h2>Technologies Used</h2>
    <ul>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB (Mongoose)</li>
        <li>dotenv</li>
        <li>CORS</li>
    </ul>

  <h2>Project Structure</h2>
    <ul>
        <li><code>server.js</code>: Main server file containing routes and database logic</li>
        <li><code>views/index.html</code>: Basic front-end page served from the root</li>
        <li><code>models/</code>: Mongoose schemas for Users and Exercises</li>
        <li><code>.env</code>: Environment variables (not included in the repository)</li>
    </ul>



  <h2>API Endpoints</h2>
    <ul>
        <li><strong>GET /api/users</strong> - Retrieve all users</li>
        <li><strong>POST /api/users</strong> - Create a new user</li>
        <li><strong>POST /api/users/:_id/exercises</strong> - Add an exercise log for a user</li>
        <li><strong>GET /api/users/:_id/logs</strong> - Retrieve a user's exercise logs, with optional filters for date and limit</li>
    </ul>
