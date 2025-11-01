import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getUsers } from '@/utils/storage';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    aadhaar: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = getUsers();
    const user = users.find(u => u.aadhaar === formData.aadhaar && u.password === formData.password);
    
    if (user) {
      login(user);
      toast({
        title: "Welcome back! 🎉",
        description: `Logged in as ${user.name}`
      });
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid Aadhaar or password",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - CITIFIX 2.0</title>
        <meta name="description" content="Login to your CITIFIX account to report issues and track resolutions." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <Button
          variant="ghost"
          className="absolute top-4 left-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 gradient-tricolor rounded-lg"></div>
              <span className="text-2xl font-bold text-gradient">CITIFIX 2.0</span>
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-slate-600 text-center mb-8">Login to continue</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                  required
                  maxLength={12}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full gradient-saffron text-white">
                Login
              </Button>
            </form>

            <p className="text-center mt-6 text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-orange-600 font-semibold hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;