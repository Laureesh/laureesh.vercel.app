-- Insert initial skills
INSERT INTO public.skills (name, category, proficiency, icon, order_index) VALUES
  -- Frontend
  ('React', 'Frontend', 90, 'react', 1),
  ('Next.js', 'Frontend', 85, 'nextjs', 2),
  ('TypeScript', 'Frontend', 88, 'typescript', 3),
  ('Tailwind CSS', 'Frontend', 92, 'tailwind', 4),
  ('HTML/CSS', 'Frontend', 95, 'html', 5),
  
  -- Backend
  ('Node.js', 'Backend', 85, 'nodejs', 6),
  ('Python', 'Backend', 80, 'python', 7),
  ('Java', 'Backend', 75, 'java', 8),
  ('REST APIs', 'Backend', 88, 'api', 9),
  
  -- Database
  ('PostgreSQL', 'Database', 82, 'postgresql', 10),
  ('Supabase', 'Database', 85, 'supabase', 11),
  ('MongoDB', 'Database', 78, 'mongodb', 12),
  
  -- Tools & Other
  ('Git', 'Tools', 90, 'git', 13),
  ('Docker', 'Tools', 75, 'docker', 14),
  ('Vercel', 'Tools', 88, 'vercel', 15),
  ('VS Code', 'Tools', 92, 'vscode', 16)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO public.testimonials (author_name, author_role, author_company, content, rating, featured, order_index) VALUES
  ('Sarah Johnson', 'Senior Developer', 'Tech Corp', 'Laureesh is an exceptional developer with a keen eye for detail. Their work on our project exceeded all expectations.', 5, true, 1),
  ('Michael Chen', 'CTO', 'StartupXYZ', 'Working with Laureesh was a pleasure. They delivered high-quality code and met all deadlines consistently.', 5, true, 2),
  ('Emily Rodriguez', 'Product Manager', 'Innovation Labs', 'Laureesh brings both technical expertise and great communication skills to every project. Highly recommended!', 5, true, 3)
ON CONFLICT DO NOTHING;

-- Insert sample site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_title', '"Full-Stack Developer & Problem Solver"'),
  ('hero_subtitle', '"Building elegant solutions with modern technologies"'),
  ('about_intro', '"I''m a passionate developer with a 3.92 GPA from Georgia Gwinnett College, specializing in full-stack web development."'),
  ('footer_text', '"© 2025 Laureesh Volmar. All rights reserved."')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
