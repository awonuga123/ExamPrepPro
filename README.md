# ExamPrepPro

> An all-in-one quiz and computer-based testing (CBT) application designed to engage, educate, and connect individuals worldwide.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Active-brightgreen.svg)

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality
- **Joint Quiz**: Organize and participate in group quiz competitions
- **Solo Quiz**: Test your knowledge independently at your own pace
- **JAMB Mock Tests**: Comprehensive CBT exam preparation with real exam questions
- **Leaderboard**: Track performance and compete with peers
- **User Authentication**: Secure login and registration system
- **Dashboard**: Central hub for managing quizzes and tracking progress

### Technical Features
- Professional, consistent UI design system
- Centralized API configuration and error handling
- Mobile-responsive design
- Real-time quiz taking experience
- Score tracking and performance analytics

---

## 📁 Project Structure

```
ExamPrepPro/
├── index.html                          # Home page
├── style.css                           # Main stylesheet
├── script.js                           # Home page scripts
├── config.js                           # Centralized configuration
├── api-service.js                      # API service layer
├── FIXES_SUMMARY.md                    # Documentation of recent fixes
├── README.md                           # This file
│
├── assets/
│   ├── css/                            # Stylesheets
│   │   ├── colors.css                  # Global color variables
│   │   ├── dashboard.css               # Dashboard styling
│   │   ├── join_quiz_login.css         # Login/Join styling
│   │   ├── joint_quiz.css              # Quiz taking styling
│   │   ├── joint.css                   # Quiz participants styling
│   │   ├── leaderboard.css             # Leaderboard styling
│   │   └── take_quiz.css               # Quiz session styling
│   │
│   ├── html/                           # HTML pages
│   │   ├── dashboard.html              # User dashboard
│   │   ├── login.html                  # Login page
│   │   ├── sign_up.html                # Registration page
│   │   ├── join_quiz_login.html        # Join quiz page
│   │   ├── joint_quiz.html             # Quiz taking page
│   │   ├── joint.html                  # Quiz participants view
│   │   ├── jamb_test.html              # JAMB exam page
│   │   ├── leaderboard.html            # Leaderboard page
│   │   ├── end_quiz.html               # Quiz results page
│   │   └── take_quiz.html              # Quiz session page
│   │
│   └── js/                             # JavaScript modules
│       ├── auth.js                     # Authentication logic
│       ├── dashboard.js                # Dashboard functionality
│       ├── login.js                    # Login logic
│       ├── join_quiz.js                # Join quiz logic
│       ├── joint_quiz.js               # Quiz taking logic
│       ├── joint.js                    # Quiz participants logic
│       ├── jamb_test.js                # JAMB test logic
│       ├── leaderboard.js              # Leaderboard logic
│       ├── take_quiz.js                # Quiz session logic
│       └── end_quiz.js                 # Quiz results logic
│
└── CNAME                              # GitHub Pages domain config
```

---

## 🛠 Technologies

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Styling with CSS variables for theming
- **Vanilla JavaScript**: No framework dependencies
- **Font Awesome**: Icon library for UI elements

### Backend
- **REST API**: Custom backend at `https://web-01.awonuga.tech/ExamPrepPro_api`
- **External Integration**: JAMB questions from `https://questions.aloc.com.ng/api/v2`

### Architecture
- **Centralized Configuration**: `config.js` for all API endpoints
- **API Service Layer**: `api-service.js` for request handling
- **Session Management**: Browser storage for user data

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- GitHub account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/awonuga123/ExamPrepPro.git
   cd ExamPrepPro
   ```

2. **Install dependencies** (if using with a build tool)
   ```bash
   # No npm dependencies required
   # All JavaScript is vanilla
   ```

3. **Local Development**
   ```bash
   # Start a local server
   python -m http.server 8000
   # or
   npx http-server
   ```

4. **Access the application**
   ```
   http://localhost:8000
   ```

### Deployment

The application is deployed on GitHub Pages:
- **Live URL**: https://awonuga123.github.io/ExamPrepPro/
- **Domain**: Configured via CNAME file

---

## 📖 Usage

### For Students

1. **Create Account**
   - Navigate to "Sign Up"
   - Enter credentials and register

2. **Join a Quiz**
   - Click "Join a Quiz"
   - Enter quiz code or select from available quizzes
   - Take the quiz

3. **Try JAMB Mock Test**
   - Select subject and year
   - Complete the exam
   - View results and leaderboard

4. **View Dashboard**
   - After login, access your dashboard
   - View quiz history and scores
   - Track progress

### For Quiz Organizers

1. **Create Quiz**
   - Log in to dashboard
   - Click "Organize a Quiz"
   - Add quiz details and questions
   - Share quiz code with participants

2. **Monitor Progress**
   - Track participant responses
   - View leaderboard in real-time

3. **Manage Results**
   - View final scores
   - Access analytics

---

## 🔌 API Integration

### Configuration

All API endpoints are configured in `config.js`:

```javascript
CONFIG.API = {
    BASE_URL: 'https://web-01.awonuga.tech/ExamPrepPro_api',
    ENDPOINTS: {
        GET_DATA: '/getdata',
        LOGIN: '/login',
        SIGNUP: '/signup',
        GET_QUIZ: '/getquiz',
        SUBMIT_QUIZ: '/submitquiz'
    },
    EXTERNAL_QUESTIONS: 'https://questions.aloc.com.ng/api/v2/q/40'
}
```

### Using the API Service

```javascript
// Import (already included in HTML)
// <script src="config.js"></script>
// <script src="api-service.js"></script>

// Get user data
const result = await api.getUserData();

// Login
const loginResult = await api.login(email, password);

// Get JAMB questions
const questions = await api.getJAMBQuestions('English', 2023);

// Submit quiz
const submitResult = await api.submitQuiz(quizData);
```

### API Service Methods

| Method | Purpose | Parameters |
|--------|---------|-----------|
| `getUserData()` | Fetch authenticated user data | None |
| `login(email, password)` | User login | email, password |
| `signup(userData)` | User registration | userData object |
| `getQuizQuestions(quizId)` | Get quiz questions | quizId |
| `submitQuiz(quizData)` | Submit quiz responses | quizData object |
| `getJAMBQuestions(subject, year)` | Fetch JAMB questions | subject, year |
| `isAuthenticated()` | Check auth status | None |
| `logout()` | Clear session | None |

---

## ⚙️ Configuration

### Environment Setup

The application uses `config.js` for all configuration:

```javascript
// config.js
const CONFIG = {
    API: {
        BASE_URL: 'https://your-api-domain.com/api',
        // ... other settings
    },
    // ... color scheme
}
```

### Color Scheme

Global colors are defined in CSS variables (see `assets/css/colors.css`):

```css
:root {
    --color-primary: #6366f1;      /* Indigo */
    --color-secondary: #f97316;    /* Orange */
    --color-success: #22c55e;      /* Green */
    --color-error: #ef4444;        /* Red */
    /* ... more colors */
}
```

---

## 💻 Development

### Adding New Features

1. **Create HTML page** in `assets/html/`
2. **Add styling** in `assets/css/`
3. **Add JavaScript logic** in `assets/js/`
4. **Update navigation** in `index.html`

### Using the API Service

Always use `api-service.js` for backend calls:

```javascript
// Good ✓
const result = await api.getJAMBQuestions(subject, year);

// Avoid ✗
fetch('https://questions.aloc.com.ng/api/v2/q/40?...')
```

### Styling

Use existing color variables:

```css
.my-element {
    background-color: var(--color-primary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-light);
}
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push origin feature/new-feature

# Create pull request on GitHub
```

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Standards

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code style
- Test changes before pushing
- Update documentation as needed

### Reporting Issues

Report bugs or suggest features via GitHub Issues:
- Clear description of the issue
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

---

## 📊 Performance & Optimization

### Current Status
- ✅ No external build dependencies
- ✅ Minimal CSS (~1300 lines across files)
- ✅ Centralized configuration
- ✅ Proper error handling

### Future Improvements
- [ ] Implement service workers for offline support
- [ ] Add caching strategy for better performance
- [ ] Minify CSS and JavaScript
- [ ] Add progressive web app (PWA) features
- [ ] Implement lazy loading for images

---

## 🔐 Security

### Current Measures
- ✅ Bearer token authentication
- ✅ Secure API configuration
- ✅ Proper error handling (no sensitive data in errors)
- ✅ HTTPS with external APIs

### Recommendations
- Always validate user input on backend
- Use HTTPS for all communications
- Implement CORS properly on backend
- Regular security audits
- Keep dependencies updated

---

## 📝 Recent Updates

### Latest Changes (Feb 27, 2026)
- ✨ Standardized color scheme across all CSS files
- 🔧 Refactored backend API integration
- 📦 Created centralized configuration system
- 🛠 Built API service layer with error handling
- 📚 Added comprehensive documentation

See [FIXES_SUMMARY.md](FIXES_SUMMARY.md) for detailed information.

---

## 📧 Support

For questions or support:
- Open an issue on GitHub
- Check existing documentation
- Review FIXES_SUMMARY.md for recent changes

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Authors

- **Awonuga** - Initial development and maintenance

---

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Community contributors
- JAMB for exam questions integration

---

**Last Updated**: February 27, 2026
**Version**: 1.0.0
**Status**: Active Development

