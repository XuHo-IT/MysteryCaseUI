import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { suspectApi, SuspectDetail as SuspectDetailType } from '../../services/api';

export const SuspectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [suspect, setSuspect] = useState<SuspectDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadSuspect();
    }
  }, [id]);

  const loadSuspect = async () => {
    try {
      setLoading(true);
      const data = await suspectApi.getSuspectDetail(id!);
      setSuspect(data);
    } catch (err: any) {
      setError(err.message || 'Không thể tải thông tin nghi phạm');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-primary text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error || !suspect) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-red-400 text-xl">{error || 'Không tìm thấy nghi phạm'}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col gap-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium leading-normal w-fit"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>Quay lại</span>
        </button>

        <div className="glass-panel rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {suspect.basicInfo.portraitImageUrl && (
              <div className="flex-shrink-0">
                <img
                  src={suspect.basicInfo.portraitImageUrl}
                  alt={suspect.basicInfo.fullName}
                  className="w-48 h-48 rounded-lg object-cover border border-primary/30"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-white text-3xl font-black mb-2">
                {suspect.basicInfo.fullName}
              </h1>
              {suspect.basicInfo.alias && (
                <p className="text-primary text-lg mb-4">Bí danh: {suspect.basicInfo.alias}</p>
              )}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-sm text-gray-400">Tuổi</span>
                  <p className="text-white font-semibold">{suspect.basicInfo.age}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Giới tính</span>
                  <p className="text-white font-semibold">{suspect.basicInfo.gender}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Nghề nghiệp</span>
                  <p className="text-white font-semibold">{suspect.basicInfo.occupation}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Nơi ở</span>
                  <p className="text-white font-semibold">
                    {suspect.basicInfo.residenceCity}, {suspect.basicInfo.residenceDistrict}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Ngoại hình</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Chiều cao:</span>{' '}
                <span className="text-white">
                  {suspect.physicalAppearance.heightCm || 'N/A'} cm
                </span>
              </p>
              <p>
                <span className="text-gray-400">Màu tóc:</span>{' '}
                <span className="text-white">{suspect.physicalAppearance.hairColor}</span>
              </p>
              <p>
                <span className="text-gray-400">Đặc điểm nổi bật:</span>
                <ul className="list-disc list-inside text-white mt-1">
                  {suspect.physicalAppearance.distinctiveFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Hồ sơ tâm lý</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Tính cách:</span>
                <ul className="list-disc list-inside text-white mt-1">
                  {suspect.behaviorProfile.personalityTraits.map((trait, idx) => (
                    <li key={idx}>{trait}</li>
                  ))}
                </ul>
              </p>
              <p className="text-white mt-2">{suspect.behaviorProfile.psychologicalNotes}</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Liên quan đến vụ án</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Quan hệ với nạn nhân:</span>{' '}
                <span className="text-white">{suspect.caseRelation.relationToVictim}</span>
              </p>
              <p>
                <span className="text-gray-400">Tình trạng alibi:</span>{' '}
                <span className="text-white">{suspect.caseRelation.alibiStatus}</span>
              </p>
              <p className="text-white mt-2">{suspect.caseRelation.alibiStatement}</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Đánh giá rủi ro</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">Mức độ nguy hiểm:</span>{' '}
                <span className="text-red-400 font-bold">{suspect.riskAssessment.dangerLevel}</span>
              </p>
              <p>
                <span className="text-gray-400">Nguy cơ bỏ trốn:</span>{' '}
                <span className="text-white">{suspect.riskAssessment.flightRisk}</span>
              </p>
              <p className="text-white mt-2">{suspect.riskAssessment.riskAssessmentNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

