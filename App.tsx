import React, { useState, useCallback } from 'react';
import { Search, GraduationCap, AlertCircle, Trophy } from 'lucide-react';
import { STUDENT_DATA } from './constants';
import { Student, SearchStatus } from './types';

const App: React.FC = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [result, setResult] = useState<Student | null>(null);

  const handleSearch = useCallback(() => {
    const trimmedName = searchName.trim();
    
    if (!trimmedName) {
      setStatus('empty');
      setResult(null);
      return;
    }

    const foundStudent = STUDENT_DATA.find(
      (s) => s.name === trimmedName
    );

    if (foundStudent) {
      setResult(foundStudent);
      setStatus('found');
    } else {
      setResult(null);
      setStatus('not-found');
    }
  }, [searchName]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-600 rounded-full shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            博士开题成绩娱乐查询系统
          </h1>
          <p className="text-sm text-rose-500 font-medium bg-rose-50 inline-block px-4 py-1 rounded-full border border-rose-100">
            ⚠️ 本页面纯属虚构，仅供娱乐，与真实人物、学校和成绩无关。
          </p>
        </header>

        {/* Search Section */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="请输入要查询的姓名"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all active:scale-95 w-full md:w-auto"
            >
              查询
            </button>
          </div>

          {/* Search Result Display */}
          <div className="mt-6">
            {status === 'empty' && (
              <div className="flex items-center p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200 animate-fade-in">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>请输入姓名后再进行查询。</span>
              </div>
            )}

            {status === 'not-found' && (
              <div className="flex items-center p-4 bg-slate-100 text-slate-600 rounded-lg border border-slate-200 animate-fade-in">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>没有找到该同学的开题记录（本系统仅为娱乐演示）。</span>
              </div>
            )}

            {status === 'found' && result && (
              <div className={`bg-gradient-to-br ${result.rank === 1 ? 'from-yellow-400 to-amber-600' : (result.rank === 11 ? 'from-slate-400 to-slate-600' : 'from-indigo-500 to-purple-600')} rounded-xl p-1 shadow-lg animate-fade-in transform transition-all`}>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-3">
                      查询成功
                    </span>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{result.name}</h3>
                    <p className="text-lg font-semibold text-indigo-600">当前排名：第 <span className="text-2xl">{result.rank}</span> 名</p>
                  </div>
                  
                  <div className="space-y-3 text-left bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">开题题目</p>
                      <p className="text-lg font-medium text-slate-800 mt-1">{result.topic}</p>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">最终得分</p>
                      <p className={`text-3xl font-extrabold mt-1 ${result.rank === 1 ? 'text-amber-500' : (result.rank === 11 ? 'text-slate-500' : 'text-emerald-600')}`}>{result.score}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            <span className="w-1 h-6 bg-indigo-600 rounded mr-3"></span>
            开题人员名单
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/4">
                      姓名
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      开题题目
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {STUDENT_DATA.map((student) => (
                    <tr 
                      key={student.rank} 
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 break-words max-w-xs sm:max-w-sm md:max-w-md">
                        {student.topic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-400 text-sm py-6 border-t border-slate-200">
          <p>本查询系统仅供娱乐，所有信息为虚构。</p>
        </footer>
      </div>
    </div>
  );
};

export default App;