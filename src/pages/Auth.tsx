import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Seo from '@/components/Seo';
import { getLanguageFromPath, toLocalePath } from '@/lib/locale';

export const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const routeLanguage = getLanguageFromPath(location.pathname);
  const authPath = toLocalePath('/auth', routeLanguage);
  const homePath = toLocalePath('/', routeLanguage);
  const adminPath = toLocalePath('/admin', routeLanguage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const isAssamese = routeLanguage === 'as';

  const text = {
    title: isAssamese ? "এডমিন লগিন" : "Admin Login",
    subtitle: isAssamese
      ? "এই পৃষ্ঠা কেবল নমস্কাৰ AI-ৰ এডমিনৰ বাবে।"
      : "This page is only for Namaskar AI admins.",
    cardTitle: isAssamese ? "এডমিন অথেনটিকেশ্যন" : "Admin Authentication",
    cardDescription: isAssamese
      ? "এডমিন পেনেল ব্যৱহাৰ কৰিবলৈ লগিন কৰক।"
      : "Sign in to access the admin panel.",
    email: isAssamese ? "ইমেইল" : "Email",
    password: isAssamese ? "পাছৱাৰ্ড" : "Password",
    emailPlaceholder: isAssamese ? "আপোনাৰ ইমেইল" : "your@email.com",
    passwordPlaceholder: isAssamese ? "আপোনাৰ পাছৱাৰ্ড" : "Your password",
    signIn: isAssamese ? "লগিন" : "Sign In",
    signingIn: isAssamese ? "লগিন হৈ আছে..." : "Signing in...",
    backHome: isAssamese ? "← ঘৰত উভতি যাওক" : "← Back to Home",
    notAdmin: isAssamese
      ? "এই লগিন কেবল এডমিনৰ বাবে। অনুগ্ৰহ কৰি সঠিক এডমিন ইমেইল ব্যৱহাৰ কৰক।"
      : "This login is for admins only. Please use an admin email.",
    invalidCreds: isAssamese
      ? "ইমেইল বা পাছৱাৰ্ড ভুল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।"
      : "Invalid email or password. Please check your credentials and try again.",
    emailNotConfirmed: isAssamese
      ? "অনুগ্ৰহ কৰি আপোনাৰ ইমেইলত গৈ একাউণ্ট confirm কৰক, তাৰ পিছত লগিন কৰক।"
      : "Please check your email and confirm your account before logging in.",
    unexpected: isAssamese
      ? "কিবা সমস্যা হৈছে। অনুগ্ৰহ কৰি অলপ পাছত পুনৰ চেষ্টা কৰক।"
      : "An unexpected error occurred. Please try again.",
    successTitle: isAssamese ? "লগিন সফল" : "Login successful",
    successBody: isAssamese ? "স্বাগতম!" : "Welcome back!",
  };

  const checkAdmin = async (userId: string) => {
    try {
      const { data, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) {
        // If role lookup fails, do not block login here; the /admin page will enforce.
        return false;
      }

      return Boolean(data);
    } catch {
      return false;
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const isAdmin = await checkAdmin(session.user.id);
        if (isAdmin) {
          navigate(adminPath);
          return;
        }

        // Non-admin sessions shouldn't linger on an admin-only login surface.
        await supabase.auth.signOut();
        setError(text.notAdmin);
      }
    };
    checkUser();
  }, [adminPath, navigate, text.notAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError(text.invalidCreds);
        } else if (error.message.includes('Email not confirmed')) {
          setError(text.emailNotConfirmed);
        } else {
          setError(error.message);
        }
        return;
      }

      const userId = data?.user?.id ?? data?.session?.user?.id;
      if (userId) {
        const isAdmin = await checkAdmin(userId);
        if (!isAdmin) {
          await supabase.auth.signOut();
          setError(text.notAdmin);
          return;
        }
      }

      toast({
        title: text.successTitle,
        description: text.successBody,
      });

      navigate(adminPath);
    } catch (err) {
      setError(text.unexpected);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title={routeLanguage === 'as' ? "অথেনটিকেশ্যন | নমস্কাৰ AI" : "Authentication | Namaskar AI"}
        description={routeLanguage === 'as' ? "এডমিন লগিন (private route)." : "Admin login (private route)."}
        path={authPath}
        language={routeLanguage}
        robots="noindex, nofollow"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{text.title}</h1>
            <p className="text-muted-foreground">{text.subtitle}</p>
          </div>

          <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>{text.cardTitle}</CardTitle>
            <CardDescription>{text.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">{text.email}</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder={text.emailPlaceholder}
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">{text.password}</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder={text.passwordPlaceholder}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {text.signingIn}
                  </>
                ) : (
                  text.signIn
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate(homePath)}
                className="text-sm text-muted-foreground"
              >
                {text.backHome}
              </Button>
            </div>
          </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
