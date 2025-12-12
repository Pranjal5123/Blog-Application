// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { toast } from 'react-toastify';
// import { authService } from '../../services/authService';
// import { Input } from '../../components/common/Input';
// import { Button } from '../../components/common/Button';
// import { registerSchema } from '../../utils/validation';
// import type { RegisterFormData } from '../../types';
// import { BookOpen } from 'lucide-react';

// export const RegisterPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     setIsLoading(true);
//     try {
//       await authService.register(data);
//       toast.success('Registration successful! Please login.');
//       navigate('/login');
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-lg shadow-xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//               <BookOpen className="h-12 w-12 text-primary-600" />
//             </div>
//             <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//             <p className="mt-2 text-gray-600">Sign up to get started</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <Input
//               label="Name"
//               type="text"
//               placeholder="Enter your name"
//               error={errors.name?.message}
//               {...register('name')}
//             />

//             <Input
//               label="Email"
//               type="email"
//               placeholder="Enter your email"
//               error={errors.email?.message}
//               {...register('email')}
//             />

//             <Input
//               label="Password"
//               type="password"
//               placeholder="Enter your password"
//               error={errors.password?.message}
//               {...register('password')}
//             />

//             <Input
//               label="Age"
//               type="number"
//               placeholder="Enter your age"
//               error={errors.age?.message}
//               {...register('age', { valueAsNumber: true })}
//             />

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Gender
//               </label>
//               <select
//                 className="input-field"
//                 {...register('gender')}
//               >
//                 <option value="">Select gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.gender && (
//                 <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
//               )}
//             </div>

//             <Button
//               type="submit"
//               variant="primary"
//               className="w-full  px-6 py-3 rounded-full font-medium shadow-md transition-colors duration-200 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
//               isLoading={isLoading}
//             >
//               Sign Up
//             </Button>
//           </form>

//           {/* Footer */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { registerSchema } from '../../utils/validation';
import type { RegisterFormData } from '../../types';
import {UserPlus } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Card with glass morphism effect */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 transform transition-all duration-300 hover:shadow-3xl">
          {/* Header with animated icon */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-linear-to-r from-emerald-500 to-teal-600 p-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  <UserPlus className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 font-medium">Sign up to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Input
                label="Name"
                type="text"
                placeholder="Enter your full name"
                error={errors.name?.message}
                className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none"
                {...register('name')}
              />
            </div>

            <div className="space-y-1">
              <Input
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                error={errors.email?.message}
                className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 outline-none"
                {...register('email')}
              />
            </div>

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                error={errors.password?.message}
                className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 outline-none"
                {...register('password')}
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age
                </label>
                <Input
                  type="number"
                  placeholder="Age"
                  error={errors.age?.message}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none"
                  {...register('age', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 outline-none bg-white text-gray-700 font-medium cursor-pointer hover:border-gray-300"
                  {...register('gender')}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.gender.message}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2 cursor-pointer transition-all duration-200"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6 mb-4"
              isLoading={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

         

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 font-semibold transition-all duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div> 

        {/* Bottom Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-md">
            <div className="flex -space-x-2 mr-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-teal-400 to-cyan-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-cyan-400 to-blue-400 border-2 border-white"></div>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              Join <span className="font-bold text-emerald-600">10,000+</span> users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS or Tailwind config for animations
/*
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}
*/