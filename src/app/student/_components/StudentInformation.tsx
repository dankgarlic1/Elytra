'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import {
  InputDemo,
  InputTags,
  NationalitySelect,
  PhoneInput,
  PhoneInputComponent,
  SelectDemo,
  TextArea,
} from '@/components/ui/origin';
import { toast, Toaster } from 'sonner';
import { uploadStudentInfo } from '@/actions/onStudentInfo';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LogOut,
  Brain,
  Sparkles,
  GraduationCap,
  Globe,
  Briefcase,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StudentData {
  name: string;
  phone: string;
  age: number;
  nationality: string;
  previousDegree: string;
  grades: string;
  currentEducationLevel: string;
  preferredCountries: string[];
  preferredPrograms: string;
  careerAspirations: string;
  visaQuestions?: string;
}

const StudentDataForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    phone: '',
    age: 0,
    nationality: '', // Can be empty or null
    previousDegree: '',
    grades: '',
    currentEducationLevel: '',
    preferredCountries: ['India', 'Usa'], // Ensure this is an array
    preferredPrograms: '',
    careerAspirations: '',
    visaQuestions: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (tags: { id: string; text: string }[]) => {
    const updatedCountries = tags.map((tag) => tag.text);

    console.log('Updated Preferred Countries:', updatedCountries); // Debugging log

    setFormData((prevState) => ({
      ...prevState,
      preferredCountries: updatedCountries,
    }));
  };

  async function handleFormAction(formdata: FormData) {
    setLoading(true);
    const data = {
      name: formdata.get('name') as string,
      phone: formdata.get('phone') as string,
      age: Number(formdata.get('age')),
      nationality: formData.nationality as string,
      previousDegree: formdata.get('previousDegree') as string,
      grades: formdata.get('grades') as string,
      currentEducationLevel: formdata.get('currentEducationLevel') as string,
      preferredCountries: formData.preferredCountries as string[],
      preferredPrograms: formdata.get('preferredPrograms') as string,
      careerAspirations: formdata.get('careerAspirations') as string,
      visaQuestions: formdata.get('visaQuestions') as string,
    };

    console.log('Form Data:', data);

    const response = await uploadStudentInfo(data);
    console.log('Response:', response);
    if (response) {
      setLoading(false);
      toast.success('Student Information Uploaded Successfully');
      redirect('/dashboard');
    } else {
      setLoading(false);
      toast.error('Error uploading student information');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-0 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="relative">
            <Brain className="h-8 w-8 text-purple-500 animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-spin" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Elytra
          </span>
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut()}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Student Information Form
            </h1>
            <p className="text-gray-400">
              Help us understand your academic background and preferences
            </p>
          </motion.div>

          <form action={handleFormAction} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-purple-400">
                  <User className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Personal Details</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <InputDemo
                      id="name"
                      label="Name"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <InputDemo
                      id="phone"
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <InputDemo
                      id="age"
                      label="Age"
                      placeholder="Enter your age"
                      name="age"
                      value={formData.age.toString()}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <NationalitySelect
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={(value) =>
                        handleSelectChange('nationality', value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-purple-400">
                  <GraduationCap className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Academic Background</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <InputDemo
                      id="previousDegree"
                      label="Previous Degree"
                      placeholder="Degree you've completed"
                      name="previousDegree"
                      value={formData.previousDegree}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <InputDemo
                      id="grades"
                      label="Academic Grades"
                      placeholder="Your overall grades/GPA"
                      name="grades"
                      value={formData.grades}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <SelectDemo
                      id="currentEducationLevel"
                      name="currentEducationLevel"
                      label="Current Education Level"
                      options={["Bachelor's", 'Masters', 'PhD', 'Other']}
                      value={formData.currentEducationLevel}
                      onChange={(value) =>
                        handleSelectChange('currentEducationLevel', value)
                      }
                    />
                  </div>
                  <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                    <InputTags
                      id="preferredCountries"
                      name="preferredCountries"
                      label="Preferred Countries"
                      value={formData.preferredCountries}
                      onChange={handleTagsChange}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-purple-400">
                <Globe className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Study Preferences</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                  <TextArea
                    label="Career Aspirations"
                    id="careerAspirations"
                    name="careerAspirations"
                    value={formData.careerAspirations}
                    onChange={handleChange}
                    placeholder="Describe your career aspirations"
                  />
                </div>
                <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                  <TextArea
                    label="Preferred Programs"
                    id="preferredPrograms"
                    name="preferredPrograms"
                    value={formData.preferredPrograms}
                    onChange={handleChange}
                    placeholder="Enter your preferred programs"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 text-purple-400">
                <Briefcase className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Visa Information</h2>
              </div>
              <div className="bg-gray-700/50 border border-gray-600 focus-within:border-purple-500 rounded-lg p-2">
                <TextArea
                  label="Visa Questions"
                  id="visaQuestions"
                  name="visaQuestions"
                  value={formData.visaQuestions || ''}
                  onChange={handleChange}
                  placeholder="Enter your visa-related questions"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-8"
            >
              <Button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 rounded-xl"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-white border-purple-500"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Information'
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
};

export default StudentDataForm;
