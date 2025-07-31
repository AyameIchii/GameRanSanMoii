\# 🐍 Snake Game - Multiplayer Edition



A modern, responsive Snake game with global leaderboard functionality, built with HTML5 Canvas, JavaScript, and PHP backend.



\## ✨ Features



\- \*\*🎮 Classic Snake Gameplay\*\*: Smooth, responsive controls with WASD or arrow keys

\- \*\*🏆 Global Leaderboard\*\*: Real-time multiplayer leaderboard with PHP backend

\- \*\*⚡ Speed Configuration\*\*: Choose from 4 speed levels (Slow, Normal, Fast, Lightning)

\- \*\*📱 Responsive Design\*\*: Works perfectly on desktop and mobile devices

\- \*\*🎯 Easy Interface\*\*: Clean, intuitive UI with glassmorphism design

\- \*\*💾 Persistent Storage\*\*: Scores saved both locally and globally

\- \*\*🚀 Anti-spam Protection\*\*: Rate limiting to prevent abuse

\- \*\*⏸️ Pause/Resume\*\*: Space bar to pause/resume gameplay

\- \*\*📊 Real-time Stats\*\*: Live score tracking and high score display



\## 🚀 Quick Start



\### Local Development



1\. Clone the repository:

```bash

git clone <your-repo-url>

cd snake-game-multiplayer

```



2\. Start a local PHP server:

```bash

php -S localhost:8000

```



3\. Open your browser and navigate to `http://localhost:8000`



\### Deploy to Vercel



1\. \*\*Fork/Clone this repository\*\* to your GitHub account



2\. \*\*Connect to Vercel\*\*:

&nbsp;  - Go to \[vercel.com](https://vercel.com)

&nbsp;  - Click "New Project"

&nbsp;  - Import your GitHub repository

&nbsp;  - Vercel will automatically detect the configuration



3\. \*\*Deploy\*\*:

&nbsp;  - Click "Deploy"

&nbsp;  - Your game will be live at `https://your-project-name.vercel.app`



\## 📁 Project Structure



```

snake-game-multiplayer/

├── index.html              # Main game file

├── api/

│   └── leaderboard.php     # PHP API for leaderboard

├── vercel.json             # Vercel configuration

├── package.json            # Project metadata

└── README.md               # This file

```



\## 🎮 How to Play



1\. \*\*Enter your name\*\* in the player name field

2\. \*\*Choose your speed\*\* from the dropdown menu

3\. \*\*Click "Start Game"\*\* to begin

4\. \*\*Use controls\*\* to move the snake:

&nbsp;  - \*\*W\*\* or \*\*↑\*\* - Move Up

&nbsp;  - \*\*S\*\* or \*\*↓\*\* - Move Down

&nbsp;  - \*\*A\*\* or \*\*←\*\* - Move Left

&nbsp;  - \*\*D\*\* or \*\*→\*\* - Move Right

&nbsp;  - \*\*Space\*\* - Pause/Resume

5\. \*\*Eat the green food\*\* to grow and increase your score

6\. \*\*Avoid walls and your own tail\*\*

7\. \*\*Compete\*\* for the top spot on the global leaderboard!



\## 🛠️ Technical Details



\### Frontend

\- \*\*HTML5 Canvas\*\* for smooth game rendering

\- \*\*Vanilla JavaScript\*\* for game logic

\- \*\*CSS3\*\* with modern effects (glassmorphism, gradients)

\- \*\*Responsive design\*\* with mobile support



\### Backend

\- \*\*PHP 8.x\*\* compatible

\- \*\*RESTful API\*\* design

\- \*\*File-based storage\*\* (suitable for Vercel's serverless environment)

\- \*\*Rate limiting\*\* and input validation

\- \*\*CORS support\*\* for cross-origin requests



\### API Endpoints



\#### GET /api/leaderboard

Returns the top 20 scores from the global leaderboard.



\*\*Response:\*\*

```json

{

&nbsp; "success": true,

&nbsp; "data": \[

&nbsp;   {

&nbsp;     "name": "Player1",

&nbsp;     "score": 420,

&nbsp;     "date": "2025-07-30 12:00:00"

&nbsp;   }

&nbsp; ]

}

```



\#### POST /api/leaderboard

Saves a new score to the leaderboard.



\*\*Request:\*\*

```json

{

&nbsp; "name": "PlayerName",

&nbsp; "score": 350

}

```



\*\*Response:\*\*

```json

{

&nbsp; "success": true,

&nbsp; "message": "Score saved successfully"

}

```



\## 🔧 Configuration



\### Speed Settings

\- \*\*Slow\*\*: 200ms delay (easy mode)

\- \*\*Normal\*\*: 150ms delay (default)

\- \*\*Fast\*\*: 100ms delay (challenging)

\- \*\*Lightning\*\*: 50ms delay (expert mode)



\### Security Features

\- Input sanitization and validation

\- Rate limiting (3 submissions per minute per IP)

\- XSS protection with HTML entity encoding

\- CORS headers for secure cross-origin requests



\## 🌐 Vercel Deployment Details



\### Environment

\- \*\*Runtime\*\*: `vercel-php@0.6.0`

\- \*\*Storage\*\*: File-based in `/tmp` (ephemeral)

\- \*\*Functions\*\*: Serverless PHP functions



\### For Production Use

Consider upgrading to a persistent database:

\- \*\*PlanetScale\*\* (MySQL-compatible)

\- \*\*Supabase\*\* (PostgreSQL)

\- \*\*MongoDB Atlas\*\*

\- \*\*Firebase Firestore\*\*



\## 🎨 Customization



\### Styling

Modify the CSS variables in `index.html` to change colors and effects:



```css

:root {

&nbsp; --primary-color: #667eea;

&nbsp; --secondary-color: #764ba2;

&nbsp; --accent-color: #ff6b6b;

&nbsp; --game-bg: #1a1a2e;

}

```



\### Game Settings

Adjust game parameters in the JavaScript section:



```javascript

const gridSize = 20;        // Size of each grid cell

const tileCount = 20;       // Number of tiles per row/column

const maxScores = 20;       // Maximum scores in leaderboard

```



\## 🐛 Troubleshooting



\### Common Issues



1\. \*\*Leaderboard not loading\*\*:

&nbsp;  - Check browser console for errors

&nbsp;  - Verify API endpoints are accessible

&nbsp;  - Fallback to localStorage is automatic



2\. \*\*Game not responsive\*\*:

&nbsp;  - Clear browser cache

&nbsp;  - Check for JavaScript errors

&nbsp;  - Ensure canvas is properly sized



3\. \*\*Deployment issues\*\*:

&nbsp;  - Verify `vercel.json` configuration

&nbsp;  - Check PHP version compatibility

&nbsp;  - Review Vercel function logs



\### Browser Compatibility

\- \*\*Modern browsers\*\* (Chrome 80+, Firefox 75+, Safari 13+)

\- \*\*Mobile browsers\*\* (iOS Safari, Chrome Mobile)

\- \*\*JavaScript enabled\*\* required



\## 📈 Performance



\- \*\*Optimized rendering\*\* with requestAnimationFrame

\- \*\*Efficient collision detection\*\*

\- \*\*Minimal DOM manipulation\*\*

\- \*\*Lightweight PHP backend\*\* (~2KB)

\- \*\*Fast API responses\*\* (<100ms typical)



\## 🤝 Contributing



1\. Fork the repository

2\. Create a feature branch: `git checkout -b feature-name`

3\. Commit changes: `git commit -am 'Add feature'`

4\. Push to branch: `git push origin feature-name`

5\. Submit a pull request



\## 📄 License



This project is licensed under the MIT License - see the \[LICENSE](LICENSE) file for details.



\## 🙏 Acknowledgments



\- Classic Snake game inspiration

\- Modern web design trends

\- Vercel for excellent hosting platform

\- PHP community for serverless functions



---



\*\*Enjoy the game! 🐍\*\* 



Found a bug or have a suggestion? \[Open an issue](https://github.com/your-username/snake-game-multiplayer/issues) or contribute to make it even better!

