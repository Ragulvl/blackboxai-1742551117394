import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  onClick?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  difficulty,
  progress = 0,
  onClick,
}) => {
  const getDifficultyStyles = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group relative p-6 border rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer bg-white hover:border-blue-500"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyles()}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      {progress > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-xl transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default CourseCard;