-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
-- Public can view profiles
CREATE POLICY "profiles_select_public" ON public.profiles
  FOR SELECT USING (true);

-- Only authenticated users can insert their own profile
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Only authenticated users can update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Only authenticated users can delete their own profile
CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- RLS Policies for projects
-- Public can view published projects
CREATE POLICY "projects_select_published" ON public.projects
  FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);

-- Only authenticated users can insert projects
CREATE POLICY "projects_insert_auth" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update projects
CREATE POLICY "projects_update_auth" ON public.projects
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete projects
CREATE POLICY "projects_delete_auth" ON public.projects
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for blog_posts
-- Public can view published blog posts
CREATE POLICY "blog_posts_select_published" ON public.blog_posts
  FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);

-- Only authenticated users can insert blog posts
CREATE POLICY "blog_posts_insert_auth" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update blog posts
CREATE POLICY "blog_posts_update_auth" ON public.blog_posts
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete blog posts
CREATE POLICY "blog_posts_delete_auth" ON public.blog_posts
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for skills
-- Public can view all skills
CREATE POLICY "skills_select_public" ON public.skills
  FOR SELECT USING (true);

-- Only authenticated users can insert skills
CREATE POLICY "skills_insert_auth" ON public.skills
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update skills
CREATE POLICY "skills_update_auth" ON public.skills
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete skills
CREATE POLICY "skills_delete_auth" ON public.skills
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for testimonials
-- Public can view featured testimonials
CREATE POLICY "testimonials_select_public" ON public.testimonials
  FOR SELECT USING (true);

-- Only authenticated users can insert testimonials
CREATE POLICY "testimonials_insert_auth" ON public.testimonials
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update testimonials
CREATE POLICY "testimonials_update_auth" ON public.testimonials
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete testimonials
CREATE POLICY "testimonials_delete_auth" ON public.testimonials
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for contact_messages
-- Anyone can insert contact messages
CREATE POLICY "contact_messages_insert_public" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view contact messages
CREATE POLICY "contact_messages_select_auth" ON public.contact_messages
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Only authenticated users can update contact messages
CREATE POLICY "contact_messages_update_auth" ON public.contact_messages
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete contact messages
CREATE POLICY "contact_messages_delete_auth" ON public.contact_messages
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for site_settings
-- Public can view site settings
CREATE POLICY "site_settings_select_public" ON public.site_settings
  FOR SELECT USING (true);

-- Only authenticated users can modify site settings
CREATE POLICY "site_settings_insert_auth" ON public.site_settings
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "site_settings_update_auth" ON public.site_settings
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "site_settings_delete_auth" ON public.site_settings
  FOR DELETE USING (auth.uid() IS NOT NULL);
