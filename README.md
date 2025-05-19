# 🧠 EduSmart - The AI-Powered Learning Buddy

EduSmart is a Generative AI-based learning assistant designed to **enhance the personalized learning experience** for students across India. It leverages the power of Large Language Models (LLMs), data analytics, and smart recommendations to help students track their progress, understand weaknesses, and get contextual support — all from a unified web platform.

> 🚀 Built during a pseudo-hackathon simulating the Salesforce ecosystem — inspired by EduSmart’s mission to democratize personalized education.

---

## 🌟 Features

### 🔹 1. **Dashboard**
- Displays overall test performance metrics (topper score, average score, your score)
- To-Do List with priority tagging (High, Medium, Low)
- Syllabus completion meter
- Top 5 weak areas based on test data
- Visual charts and reminders to keep students on track

### 🔹 2. **AI Assistant**
- Powered by a GenAI LLM (e.g., OpenAI API)
- Context-aware assistant to answer subject-specific queries
- Responds meaningfully and suggests follow-up resources
- 24/7 learner support with interactive UI

### 🔹 3. **Progress Analysis**
- Detailed subject-wise analysis of strengths and weaknesses
- AI-generated insights based on question-level test data
- Detects time-consuming or incorrectly answered questions
- Offers reassessment modules and improvement suggestions

### 🔹 4. **Learning Resources**
- Recommender engine that suggests:
  - YouTube videos
  - Articles
  - Practice questions
- Based on student’s weak topics and knowledge gaps
- Real-time fetching from MongoDB/SQL-tagged resources

---

## 🧩 Tech Stack

| Frontend | Backend | AI | Database |
|----------|---------|----|----------|
| React.js + Tailwind CSS | Node.js / Express | OpenAI API (LLM) | MongoDB / MySQL |

---

## 📌 How to Run Locally

git clone https://github.com/tanyaP0405/EduSmart.git
cd EduSmart
npm install
npm start
OPENAI_API_KEY=your_api_key_here
MONGODB_URI=your_mongodb_uri

