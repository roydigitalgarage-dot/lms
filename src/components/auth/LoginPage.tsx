import React, { useState } from 'react';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useAuth, UserRole } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Allow simpler validation for "login by anything"
    if (!email) {
      newErrors.email = 'Email (or username) is required';
    }
    // Removed strict email regex and password length check

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(email, password, role);
    } catch (error) {
      setErrors({ submit: 'Invalid credentials. Please try again.' });
    }
  };

  const roles = [
    { value: 'student', label: 'Student', icon: '🎓', color: 'from-blue-400 to-purple-500' },
    { value: 'teacher', label: 'Teacher', icon: '👨‍🏫', color: 'from-green-400 to-blue-500' },
    { value: 'parent', label: 'Parent', icon: '👨‍👩‍👧‍👦', color: 'from-pink-400 to-red-500' },
    { value: 'administrator', label: 'Administrator', icon: '⚙️', color: 'from-yellow-400 to-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center px-4 py-12 relative overflow-hidden transition-colors duration-500">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '0s' }}>🌟</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '1s' }}>🎈</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '2s' }}>🦋</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '0.5s' }}>🌈</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '1.5s' }}>⭐</div>
        <div className="absolute top-1/3 right-5 text-4xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '2.5s' }}>🎨</div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-full mb-4 shadow-lg transform hover:scale-110 transition-all duration-300">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🌟 Fun Learning Portal 🌟
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            {isLogin ? 'Welcome back, little learner! 🎓' : 'Join our magical learning adventure! ✨'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-purple-200 dark:border-purple-600 p-8 transform hover:scale-105 transition-all duration-300">
          <div className="flex mb-6 bg-gray-100 dark:bg-gray-700/80 rounded-2xl p-1">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 text-lg font-bold rounded-xl transition-all duration-300 ${isLogin
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              🔑 Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 text-lg font-bold rounded-xl transition-all duration-300 ${!isLogin
                ? 'bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              ✨ Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <span className="text-2xl mr-2">👤</span>
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((roleOption) => (
                  <button
                    key={roleOption.value}
                    type="button"
                    onClick={() => setRole(roleOption.value as UserRole)}
                    className={`p-4 rounded-2xl border-3 text-lg font-bold transition-all duration-300 transform hover:scale-105 ${role === roleOption.value
                      ? `border-purple-400 bg-gradient-to-r ${roleOption.color} text-white shadow-lg scale-105`
                      : 'border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:border-purple-300 dark:hover:border-purple-500 bg-white dark:bg-gray-700/80'
                      }`}
                  >
                    <div className="text-3xl mb-2">{roleOption.icon}</div>
                    {roleOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <span className="text-xl mr-2">📧</span>
                Email Address
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-3 border-gray-300 dark:border-gray-500 rounded-2xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-700/80 text-gray-900 dark:text-white transition-all duration-300 text-lg placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter your email 📮"
              />
              {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium">❌ {errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <span className="text-xl mr-2">🔒</span>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-3 border-gray-300 dark:border-gray-500 rounded-2xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-700/80 text-gray-900 dark:text-white transition-all duration-300 text-lg placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your password 🗝️"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xl transition-colors duration-200"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium">❌ {errors.password}</p>}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {!isLogin && (
              <div>
                <label className="block text-lg font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <span className="text-xl mr-2">🔐</span>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-gray-300 dark:border-gray-500 rounded-2xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-700/80 text-gray-900 dark:text-white transition-all duration-300 text-lg placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Confirm your password 🔄"
                />
                {errors.confirmPassword && <p className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium">❌ {errors.confirmPassword}</p>}
              </div>
            )}

            {errors.submit && <p className="text-red-500 dark:text-red-400 text-lg font-medium">❌ {errors.submit}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center text-lg shadow-lg transform hover:scale-105 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  <span className="text-xl mr-2">⏳</span>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <span className="text-2xl mr-3">{isLogin ? '🚀' : '✨'}</span>
                  {isLogin ? 'Let\'s Learn!' : 'Join the Fun!'}
                  <span className="text-2xl ml-3">🎉</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <p className="text-sm text-yellow-800 dark:text-yellow-100 mb-2 font-bold flex items-center">
            <span className="text-lg mr-2">🎮</span>
            Any details work! Try:
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-200">📧 Email: guest@school.com</p>
          <p className="text-sm text-yellow-700 dark:text-yellow-200">🔑 Password: 123</p>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-6">
          <div className="flex justify-center space-x-4 text-4xl">
            <span className="animate-pulse-slow opacity-80 dark:opacity-70">🌟</span>
            <span className="animate-bounce-slow opacity-80 dark:opacity-70">🎈</span>
            <span className="animate-pulse-slow opacity-80 dark:opacity-70">🌈</span>
            <span className="animate-bounce-slow opacity-80 dark:opacity-70">🎨</span>
            <span className="animate-pulse-slow opacity-80 dark:opacity-70">⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
}