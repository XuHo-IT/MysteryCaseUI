import React from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { CaseForm } from '../cases/CaseForm';

export const CreateCase: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCase = async (caseData: any) => {
    try {
      const caseId = await adminApi.createCase(caseData);
      alert('Tạo vụ án thành công!');
      navigate(`/case-detail/${caseId}`);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-16 animate-fade-in">
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Tạo Hồ sơ Vụ án
            </h1>
            <p className="text-[#9cbaba] text-base font-normal leading-normal">
              Điền vào các chi tiết bên dưới để xây dựng bí ẩn mới của bạn.
            </p>
          </div>
        </div>

        <CaseForm onSubmit={handleCreateCase} />
      </div>
    </div>
  );
};
