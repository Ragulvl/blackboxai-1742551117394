import React, { useState } from 'react';
import Header from './components/common/Header';
import CourseCard from './components/course/CourseCard';
import CodeEditor from './components/editor/CodeEditor';

const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with JavaScript',
    difficulty: 'Beginner' as const,
    progress: 0,
    initialCode: `// Welcome to Introduction to Programming!
// Let's start with a simple "Hello, World!" program

function greet(name) {
  return "Hello, " + name + "!";
}

// Try running this code to see the output
console.log(greet("Learner"));`,
  },
  {
    id: 2,
    title: 'Data Structures',
    description: 'Master fundamental data structures in programming',
    difficulty: 'Intermediate' as const,
    progress: 30,
    initialCode: `// Data Structures in JavaScript
// Let's implement a simple Stack

class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

// Try creating and using a stack
const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.pop()); // Should print 20`,
  },
  {
    id: 3,
    title: 'Algorithms',
    description: 'Learn essential algorithms and problem-solving techniques',
    difficulty: 'Advanced' as const,
    progress: 0,
    initialCode: `// Algorithms Practice
// Let's implement a binary search algorithm

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}

// Test the algorithm
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // Should print 3`,
  },
];

function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  const handleRunCode = async (code: string): Promise<string[]> => {
    const outputs: string[] = [];
    const originalLog = console.log;

    try {
      // Override console.log
      console.log = (...args) => {
        const output = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        outputs.push(output);
        originalLog.apply(console, args);
      };

      // Execute the code
      eval(code);

      return outputs;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    } finally {
      // Restore original console.log
      console.log = originalLog;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    difficulty={course.difficulty}
                    progress={course.progress}
                    onClick={() => setSelectedCourseId(course.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Practice Code</h2>
                {selectedCourse && (
                  <span className="text-sm text-gray-600">
                    Currently working on: {selectedCourse.title}
                  </span>
                )}
              </div>
              <CodeEditor
                onRun={handleRunCode}
                initialCode={selectedCourse?.initialCode || `// Welcome to the Programming Learning Portal
// Select a course to get started with specific exercises

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Learner"));`}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500">
            <p>© 2024 Programming Learning Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
