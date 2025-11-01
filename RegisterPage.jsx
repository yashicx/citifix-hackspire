import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { saveUser } from '@/utils/storage';
import { ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhaar: '',
    password: '',
    role: 'citizen'
  });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setStep(2);
    
    toast({
      title: "OTP Sent! 📱",
      description: `Mock OTP: ${mockOtp} (for demo purposes)`
    });
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      const newUser = saveUser(formData);
      login(newUser);
      
      toast({
        title: "Registration successful! 🎉",
        description: "Welcome to CITIFIX"
      });
      
      navigate(formData.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please check and try again",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - CITIFIX 2.0</title>
        <meta name="description" content="Create your CITIFIX account and start reporting civic issues in your community." />
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

            <h2 className="text-3xl font-bold text-center mb-2">
              {step === 1 ? 'Create Account' : 'Verify Aadhaar'}
            </h2>
            <p className="text-slate-600 text-center mb-8">
              {step === 1 ? 'Join the civic movement' : 'Enter the OTP sent to your phone'}
            </p>

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role">Register as</Label>
                  <select
                    id="role"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="citizen">Citizen</option>
                    <option value="admin">Admin (Authority)</option>
                  </select>
                </div>

                <Button type="submit" className="w-full gradient-saffron text-white">
                  Continue
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    Demo OTP: {generatedOtp}
                  </p>
                </div>

                <Button 
                  onClick={handleVerifyOtp} 
                  className="w-full gradient-saffron text-white"
                >
                  Verify & Register
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="w-full"
                >
                  Back
                </Button>
              </div>
            )}

            <p className="text-center mt-6 text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-orange-600 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;