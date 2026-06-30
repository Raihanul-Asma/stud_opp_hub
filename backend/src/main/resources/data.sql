-- ============================================================
-- CareerPort Sample Data
-- Run this AFTER the app starts for the first time (tables auto-created)
-- Member 4: Use this as the base and add more rows from the CSV
-- ============================================================

-- Sample Opportunities (for testing recommendations)
INSERT INTO opportunities (title, organization, type, deadline, apply_link, description, required_skills)
VALUES
('Backend Developer Intern', 'Google', 'Internship', '2026-09-01', 'https://careers.google.com', 'Work on core backend systems at scale.', 'Java,Spring Boot,SQL,AWS'),
('Frontend Developer Intern', 'Microsoft', 'Internship', '2026-08-15', 'https://careers.microsoft.com', 'Build next-gen React interfaces.', 'React,TypeScript,CSS,JavaScript'),
('Full Stack Intern', 'Amazon', 'Internship', '2026-10-01', 'https://amazon.jobs', 'Work on AWS-powered web apps.', 'React,Java,AWS,MySQL'),
('Cybersecurity Scholarship', 'IBM', 'Scholarship', '2026-12-01', 'https://ibm.com/scholarships', 'Full scholarship for security students.', 'Python,Network Security,Linux'),
('Data Science Intern', 'Netflix', 'Internship', '2026-09-15', 'https://jobs.netflix.com', 'Analyze data for content recommendations.', 'Python,SQL,Machine Learning,Statistics'),
('Cloud Hackathon', 'AWS', 'Hackathon', '2026-07-30', 'https://aws.amazon.com/hackathon', '48-hour cloud building challenge.', 'AWS,Python,Docker,Kubernetes'),
('Mobile App Intern', 'Apple', 'Internship', '2026-08-30', 'https://jobs.apple.com', 'Build iOS apps for millions of users.', 'Swift,iOS,Objective-C,Xcode'),
('AI Research Intern', 'DeepMind', 'Internship', '2026-09-30', 'https://deepmind.com/careers', 'Research at the frontier of AI.', 'Python,Machine Learning,TensorFlow,Mathematics'),
('Open Source Hackathon', 'GitHub', 'Hackathon', '2026-08-10', 'https://github.com/hackathon', 'Contribute to open-source projects.', 'Git,Java,Python,JavaScript'),
('STEM Scholarship', 'Google', 'Scholarship', '2026-11-01', 'https://buildyourfuture.withgoogle.com', 'Support for women in STEM.', 'Programming,Mathematics,Problem Solving');
