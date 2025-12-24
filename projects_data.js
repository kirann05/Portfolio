// Project data structure for Interactive Project Journey
const projectsData = [
  {
    "id": "real_time_fake_news_detection",
    "title": "Real-Time Fake News Detection",
    "slug": "real-time-fake-news-detection",
    "category": ["Machine Learning", "NLP"],
    "overview": "Built and optimized a real-time Fake News Detection system with 91.1% accuracy using BERT & SBERT, reducing inference time by 30%.",
    "problemStatement": "The proliferation of fake news on social media poses a significant threat to information integrity and public trust. Existing detection methods often suffer from high latency and accuracy issues with real-time data.",
    "solution": "Developed a robust real-time system utilizing state-of-the-art BERT and SBERT models. Implemented advanced optimization techniques (quantization, pruning) to achieve high accuracy and low inference time.",
    "technologies": ["BERT", "SBERT", "TensorFlow", "Python", "NLP", "Flask"],
    "achievements": [
      "Achieved 91.1% accuracy on real-time data streams",
      "Reduced inference time by 30% through model quantization and pruning",
      "Implemented a scalable architecture for real-time processing"
    ],
    "challengesAndLearnings": "Overcame challenges related to noisy social media data preprocessing and real-time model deployment. Learned extensive model optimization strategies for production environments.",
    "mainImageUrl": "24cjcnbyu4.png",
    "thumbnailUrl": "q29e53vfbq.png",
    "galleryImages": [
      "24cjcnbyu4.png",
      "q29e53vfbq.png"
    ],
    "demoLink": null,
    "githubLink": null,
    "paperLink": null,
    "date": "April 2024 – May 2024",
    "metric": "91.1% accuracy using BERT & SBERT with optimized inference"
  },
  {
    "id": "multi_class_hashtag_prediction",
    "title": "Multi-class Hashtag Prediction Classifier",
    "slug": "multi-class-hashtag-prediction",
    "category": ["Machine Learning", "NLP"],
    "overview": "Engineered a real-time multi-class classifier achieving 91.35% accuracy on imbalanced social media data using Bidirectional LSTM.",
    "problemStatement": "Accurate hashtag prediction for social media posts is crucial for content discoverability and trend analysis, but imbalanced datasets and noisy text pose significant challenges.",
    "solution": "Developed a Bidirectional LSTM-based classifier. Applied advanced NLP techniques, including custom tokenization and attention mechanisms, to handle noisy text data and improve prediction accuracy.",
    "technologies": ["Bidirectional LSTM", "NLP", "Python", "PyTorch", "Data Preprocessing"],
    "achievements": [
      "Achieved 91.35% accuracy on a highly imbalanced dataset",
      "Improved real-time hashtag prediction accuracy by 30% through advanced optimization strategies",
      "Demonstrated proficiency in deep learning model development and tuning"
    ],
    "challengesAndLearnings": "Addressed class imbalance issues using techniques like SMOTE and weighted loss functions. Gained deep insights into optimizing neural networks for text classification.",
    "mainImageUrl": "Project1.jpg",
    "thumbnailUrl": "project2.jpg",
    "galleryImages": [
      "Project1.jpg"
    ],
    "demoLink": null,
    "githubLink": null,
    "paperLink": null,
    "date": "May 2024 – June 2024",
    "metric": "91.35% accuracy on imbalanced social media data using Bidirectional LSTM"
  },
  {
    "id": "medical_ai_chatbot",
    "title": "Medical AI Chatbot (NoteAid-Chatbot)",
    "slug": "medical-ai-chatbot",
    "category": ["AI Research", "Healthcare AI", "Full-Stack"],
    "overview": "Pioneered a conversational AI leveraging multi-agent LLM and RL (PPO) for patient education on health records.",
    "problemStatement": "Patients often struggle to understand complex medical discharge summaries, leading to poor adherence and increased readmission rates. Existing solutions are often costly and lack scalability.",
    "solution": "Developed NoteAid-Chatbot, utilizing a novel multi-agent LLM and PPO-based Reinforcement Learning framework. Built a full-stack Flask-based annotation platform for processing medical datasets (MIMIC-IV) with HIPAA compliance.",
    "technologies": ["LLMs", "PPO", "Flask", "Python", "Render", "Hugging Face", "LangChain", "RAG", "HIPAA Compliance", "PostgreSQL"],
    "achievements": [
      "Co-authored a published paper on OpenReview: 'Chatbot To Help Patients Understand Their Health'",
      "Pioneered NoteAid-Chatbot, a conversational AI leveraging a novel multi-agent LLM and Reinforcement Learning (RL) framework (PPO-based) for patient education on health records",
      "Led development and deployment of a full-stack Flask-based annotation platform on Render for processing medical datasets, ensuring HIPAA compliance",
      "Integrated LLM-based question generation pipelines (Hugging Face) and prototyped RAG architecture (LangChain, vector search) for medical chatbots"
    ],
    "challengesAndLearnings": "Ensuring HIPAA compliance and data privacy while processing sensitive medical data. Overcoming the challenge of costly human-generated data for training conversational AI. Learned extensive cross-functional collaboration with medical and linguistics researchers.",
    "mainImageUrl": "2j12819yq5.jpg",
    "thumbnailUrl": "27bgrp82t9.jpeg",
    "galleryImages": [
      "2j12819yq5.jpg",
      "27bgrp82t9.jpeg"
    ],
    "demoLink": null,
    "githubLink": null,
    "paperLink": "https://openreview.net/forum?id=YourPaperID",
    "date": "Ongoing Research",
    "metric": "Multi-agent LLM with PPO-based RL for healthcare education"
  },
  {
    "id": "deepfake_face_detection",
    "title": "Deepfake Face Detection",
    "slug": "deepfake-face-detection",
    "category": ["Computer Vision", "Deep Learning"],
    "overview": "Developed a deepfake detection model using CNN-LSTM achieving 85% accuracy with 30% improvement in precision.",
    "problemStatement": "The rise of deepfake technology necessitates robust detection methods to combat misinformation and enhance digital security. Traditional methods often lack the nuance to detect subtle manipulations.",
    "solution": "Developed a CNN-LSTM deepfake detection model. Applied advanced image processing and frame-level analysis techniques to detect inconsistencies in facial features, eye blinking patterns, and subtle temporal irregularities.",
    "technologies": ["CNN-LSTM", "Computer Vision", "Deep Learning", "Image Processing", "OpenCV"],
    "achievements": [
      "Achieved 85% accuracy in deepfake detection",
      "Improved detection precision by 30% through frame-level analysis focusing on subtle temporal irregularities and facial artifacts"
    ],
    "challengesAndLearnings": "Dealing with diverse deepfake generation techniques and creating robust feature extraction methods. Deepened understanding of video analysis and sequential data processing with LSTMs.",
    "mainImageUrl": "Deepfake.jpg",
    "thumbnailUrl": "Deepfake.jpg",
    "galleryImages": [
      "Deepfake.jpg"
    ],
    "demoLink": null,
    "githubLink": null,
    "paperLink": null,
    "date": "July 2020 – August 2020",
    "metric": "85% accuracy using CNN-LSTM architecture"
  },
  {
    "id": "full_stack_bakery_website",
    "title": "Full-Stack Bakery Website",
    "slug": "full-stack-bakery-website",
    "category": ["Full-Stack Development", "Web Development"],
    "overview": "Built and deployed a responsive full-stack bakery website using Node.js, Express, and HTML/CSS/JS, boosting user engagement by 40%.",
    "problemStatement": "Small businesses need a strong online presence. Many existing website templates lack dynamic features and responsiveness, impacting user experience and engagement.",
    "solution": "Developed and deployed a responsive full-stack bakery website with multiple dynamic pages and intuitive navigation. Focused on a modular backend architecture to optimize performance.",
    "technologies": ["Node.js", "Express.js", "HTML", "CSS", "JavaScript", "Responsive Design", "MongoDB"],
    "achievements": [
      "Built and deployed a responsive full-stack bakery website using Node.js, Express, and HTML/CSS/JS, featuring 4+ dynamic pages and intuitive navigation across desktop and mobile platforms",
      "Boosted user engagement by 40% and reduced load times by 30% through modular backend architecture"
    ],
    "challengesAndLearnings": "Ensuring cross-browser compatibility and optimizing for mobile responsiveness. Gained hands-on experience in full-stack deployment and performance tuning.",
    "mainImageUrl": "b7h5r89gmo.jpg",
    "thumbnailUrl": "b7h5r89gmo.jpg",
    "galleryImages": [
      "b7h5r89gmo.jpg"
    ],
    "demoLink": null,
    "githubLink": null,
    "paperLink": null,
    "date": "2023",
    "metric": "40% boost in user engagement, 30% load time reduction"
  }
];

// Make data available globally
window.projectsData = projectsData;