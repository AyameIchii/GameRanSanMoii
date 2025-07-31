\# 🚀 Deployment Guide for Snake Game



\## Step-by-Step Deployment to Vercel



\### 1. Prepare Your Repository



Create the following file structure in your GitHub repository:



```

snake-game-multiplayer/

├── index.html              # Main game file (from artifact)

├── api/

│   └── leaderboard.php     # PHP API (from artifact)  

├── vercel.json             # Vercel config (from artifact)

├── package.json            # Project metadata (from artifact)

├── .gitignore              # Git ignore file (from artifact)

└── README.md               # Documentation (from artifact)

```



\### 2. Create GitHub Repository



1\. Go to \[GitHub](https://github.com) and create a new repository

2\. Name it `snake-game-multiplayer` (or your preferred name)

3\. Make it public (required for Vercel free tier)

4\. Don't initialize with README since you'll upload your own files



\### 3. Upload Files



\*\*Option A: Using GitHub Web Interface\*\*

1\. Click "uploading an existing file"

2\. Drag and drop all your files

3\. Commit the files



\*\*Option B: Using Git CLI\*\*

```bash

git clone https://github.com/YOUR\_USERNAME/snake-game-multiplayer.git

cd snake-game-multiplayer



\# Copy all your files here, then:

git add .

git commit -m "Initial commit: Snake game with PHP backend"

git push origin main

```



\### 4. Deploy to Vercel



1\. \*\*Go to Vercel\*\*: Visit \[vercel.com](https://vercel.com)



2\. \*\*Sign up/Login\*\*: Use your GitHub account for easy integration



3\. \*\*Import Project\*\*:

&nbsp;  - Click "New Project"

&nbsp;  - Click "Import" next to your GitHub repository

&nbsp;  - Vercel will automatically detect it's a PHP project



4\. \*\*Configure (usually auto-detected)\*\*:

&nbsp;  - \*\*Framework Preset\*\*: Other

&nbsp;  - \*\*Root Directory\*\*: `./` (default)

&nbsp;  - \*\*Build Command\*\*: Leave empty

&nbsp;  - \*\*Output Directory\*\*: Leave empty

&nbsp;  - \*\*Install Command\*\*: Leave empty



5\. \*\*Deploy\*\*:

&nbsp;  - Click "Deploy"

&nbsp;  - Wait for deployment (usually 30-60 seconds)

&nbsp;  - Your game will be live at `https://your-project-name.vercel.app`



\### 5. Test Your Deployment



1\. \*\*Visit your URL\*\* (e.g., `https://snake-game-multiplayer.vercel.app`)



2\. \*\*Test the game\*\*:

&nbsp;  - Enter a player name

&nbsp;  - Start the game

&nbsp;  - Play a round and get a score

&nbsp;  - Check if the score appears in the leaderboard



3\. \*\*Test multi-user functionality\*\*:

&nbsp;  - Open the game in multiple browser tabs/devices

&nbsp;  - Submit scores from different "players"

&nbsp;  - Verify all scores appear in the global leaderboard



\### 6. Custom Domain (Optional)



If you want a custom domain:



1\. \*\*In Vercel Dashboard\*\*:

&nbsp;  - Go to your project

&nbsp;  - Click "Settings" → "Domains"

&nbsp;  - Add your custom domain



2\. \*\*DNS Configuration\*\*:

&nbsp;  - Add CNAME record pointing to `cname.vercel-dns.com`

&nbsp;  - Or add A record pointing to `76.76.19.61`



\### 7. Environment Variables (If Needed)



For production enhancements, you might want to add:



1\. \*\*In Vercel Dashboard\*\*:

&nbsp;  - Go to Settings → Environment Variables

&nbsp;  - Add variables like:

&nbsp;    - `DB\_CONNECTION\_STRING` (if using external database)

&nbsp;    - `API\_SECRET\_KEY` (for API authentication)



\## 🔧 Troubleshooting



\### Common Issues



\*\*1. PHP Functions Not Working\*\*

```

Error: Ensure your vercel.json has the correct PHP runtime:

{

&nbsp; "functions": {

&nbsp;   "api/\*.php": {

&nbsp;     "runtime": "vercel-php@0.6.0"

&nbsp;   }

&nbsp; }

}

```



\*\*2. CORS Issues\*\*

```

Make sure your API includes CORS headers:

header('Access-Control-Allow-Origin: \*');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

```



\*\*3. File Not Found Errors\*\*

```

Check that your file structure matches exactly:

\- index.html (in root)

\- api/leaderboard.php (in api folder)

```



\*\*4. Leaderboard Not Persisting\*\*

```

This is expected behavior on Vercel free tier.

/tmp storage is ephemeral and resets with each function cold start.

For persistence, integrate with a database service.

```



\### Performance Optimization



\*\*1. Enable Caching\*\*

Add to your `vercel.json`:

```json

{

&nbsp; "headers": \[

&nbsp;   {

&nbsp;     "source": "/(.\*)",

&nbsp;     "headers": \[

&nbsp;       {

&nbsp;         "key": "Cache-Control",

&nbsp;         "value": "public, max-age=31536000, immutable"

&nbsp;       }

&nbsp;     ]

&nbsp;   }

&nbsp; ]

}

```



\*\*2. Compress Assets\*\*

Vercel automatically compresses your files, but you can optimize:

\- Minify your JavaScript

\- Compress images if you add any

\- Use modern CSS features



\## 🔄 Updates and Maintenance



\### Making Updates



1\. \*\*Edit files\*\* in your GitHub repository

2\. \*\*Commit changes\*\*: Vercel automatically redeploys on push to main branch

3\. \*\*Monitor\*\*: Check Vercel dashboard for deployment status



\### Monitoring



1\. \*\*Vercel Analytics\*\*: Enable in project settings for traffic insights

2\. \*\*Function Logs\*\*: View in Vercel dashboard under "Functions" tab

3\. \*\*Error Tracking\*\*: Monitor the console for JavaScript errors



\## 📊 Scaling for Production



\### Database Integration



For a production app, consider replacing file storage:



\*\*Option 1: PlanetScale (MySQL)\*\*

```php

$pdo = new PDO($dsn, $username, $password, \[

&nbsp;   PDO::ATTR\_ERRMODE => PDO::ERRMODE\_EXCEPTION

]);

```



\*\*Option 2: Supabase (PostgreSQL)\*\*

```php

$client = new SupabaseClient($url, $key);

```



\*\*Option 3: MongoDB Atlas\*\*

```php

$client = new MongoDB\\Client($connectionString);

```



\### Rate Limiting



Implement proper rate limiting:

```php

// Use Redis or database for distributed rate limiting

if (isRateLimited($ip)) {

&nbsp;   http\_response\_code(429);

&nbsp;   exit('Rate limited');

}

```



\### Security Enhancements



1\. \*\*Input validation\*\*: More strict validation

2\. \*\*SQL injection prevention\*\*: Use prepared statements

3\. \*\*XSS protection\*\*: Content Security Policy headers

4\. \*\*HTTPS enforcement\*\*: Vercel provides this automatically



\## 🎉 Success!



Once deployed, your Snake game will be:

\- ✅ \*\*Globally accessible\*\* via HTTPS

\- ✅ \*\*Multi-user capable\*\* with shared leaderboard  

\- ✅ \*\*Mobile responsive\*\* for all devices

\- ✅ \*\*Fast and reliable\*\* with Vercel's CDN

\- ✅ \*\*Free to host\*\* on Vercel's generous free tier



\*\*Your game URL\*\*: `https://your-project-name.vercel.app`



Share it with friends and start competing for high scores! 🐍🏆

