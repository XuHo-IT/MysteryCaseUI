import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi, caseApi, suspectApi } from '../../services/api';
import { CaseForm } from '../cases/CaseForm';

export const EditCase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [caseData, setCaseData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadCaseData();
    }
  }, [id]);

  const loadCaseData = async () => {
    try {
      setLoading(true);
      const [caseDetail, suspectsData] = await Promise.all([
        caseApi.getCaseDetail(id!),
        suspectApi.getSuspects(id!),
      ]);

      // Map CaseDetail to the format expected by CaseForm
      setCaseData({
        title: caseDetail.title,
        description: caseDetail.description || '',
        fullNarrative: caseDetail.fullNarrative,
        difficultyLevel: caseDetail.difficultyLevel,
        imageUrl: caseDetail.imageUrl || '',
        solution: caseDetail.solution || { correctAnswer: '', detailedExplanation: '' },
        suspects: suspectsData.map((s: any) => ({
          id: s.id,
          fullName: s.fullName,
          alias: s.alias || '',
          gender: s.gender || 'Male',
          age: s.age,
          portraitImageUrl: s.portraitImageUrl || '',
          occupation: s.occupation || '',
          isPrimarySuspect: s.isPrimarySuspect,
        })),
        clues: caseDetail.clues.map((c: any) => ({
          id: c.id,
          title: c.title,
          content: c.content, // Since we are admin, we get the real content
          unlockCost: c.unlockCost,
          imageUrl: c.imageUrl || '',
        })),
      });
    } catch (err: any) {
      setError(err.message || 'Không thể tải thông tin vụ án');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCase = async (updatedData: any) => {
    try {
      // Ensure the ID is included in the update request
      const dataToUpdate = {
        ...updatedData,
        id: id,
      };
      await adminApi.updateCase(id!, dataToUpdate);
      alert('Cập nhật vụ án thành công!');
      navigate(`/case-detail/${id}`);
    } catch (err: any) {
      throw err;
    }
  };

  const handleDeleteCase = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vụ án này?')) {
      try {
        await adminApi.deleteCase(id!);
        alert('Xóa vụ án thành công!');
        navigate('/');
      } catch (err: any) {
        alert(err.message || 'Không thể xóa vụ án');
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-primary text-xl">Đang tải dữ liệu...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-16 animate-fade-in">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Chỉnh sửa Vụ án
            </h1>
            <p className="text-[#9cbaba] text-base font-normal leading-normal">
              Cập nhật hồ sơ vụ án hoặc thay đổi các manh mối.
            </p>
          </div>
          <button
            onClick={handleDeleteCase}
            className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-600/50 font-bold rounded-lg hover:bg-red-600/30 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">delete</span>
            Xóa Vụ án
          </button>
        </div>

        <CaseForm 
          initialData={caseData} 
          onSubmit={handleUpdateCase} 
          isEditing={true} 
        />
      </div>
    </div>
  );
};
