import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Suspect {
  id?: string;
  fullName: string;
  alias: string;
  gender: string;
  age: number;
  portraitImageUrl: string;
  occupation: string;
  isPrimarySuspect: boolean;
}

interface Clue {
  id?: string;
  title: string;
  content: string;
  unlockCost: number;
  imageUrl: string;
}

interface Solution {
  correctAnswer: string;
  detailedExplanation: string;
}

interface CaseFormData {
  title: string;
  description: string;
  fullNarrative: string;
  difficultyLevel: string;
  imageUrl: string;
  solution: Solution;
  suspects: Suspect[];
  clues: Clue[];
}

interface CaseFormProps {
  initialData?: CaseFormData;
  onSubmit: (data: any) => Promise<void>;
  isEditing?: boolean;
}

export const CaseForm: React.FC<CaseFormProps> = ({ initialData, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    fullNarrative: initialData?.fullNarrative || '',
    difficultyLevel: initialData?.difficultyLevel || 'Medium',
    imageUrl: initialData?.imageUrl || '',
  });

  const [solution, setSolution] = useState({
    correctAnswer: initialData?.solution?.correctAnswer || '',
    detailedExplanation: initialData?.solution?.detailedExplanation || '',
  });

  const [suspects, setSuspects] = useState<Suspect[]>(initialData?.suspects || []);
  const [clues, setClues] = useState<Clue[]>(initialData?.clues || []);
  
  const [newSuspect, setNewSuspect] = useState<Suspect>({
    fullName: '',
    alias: '',
    gender: 'Male',
    age: 25,
    portraitImageUrl: '',
    occupation: '',
    isPrimarySuspect: false,
  });

  const [newClue, setNewClue] = useState<Clue>({
    title: '',
    content: '',
    unlockCost: 10,
    imageUrl: '',
  });

  const handleAddSuspect = () => {
    if (newSuspect.fullName.trim()) {
      setSuspects([...suspects, { ...newSuspect }]);
      setNewSuspect({
        fullName: '',
        alias: '',
        gender: 'Male',
        age: 25,
        portraitImageUrl: '',
        occupation: '',
        isPrimarySuspect: false,
      });
    }
  };

  const handleRemoveSuspect = (index: number) => {
    setSuspects(suspects.filter((_, i) => i !== index));
  };

  const handleAddClue = () => {
    if (newClue.title.trim() && newClue.content.trim()) {
      setClues([...clues, { ...newClue }]);
      setNewClue({
        title: '',
        content: '',
        unlockCost: 10,
        imageUrl: '',
      });
    }
  };

  const handleRemoveClue = (index: number) => {
    setClues(clues.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.fullNarrative.trim()) {
      setError('Vui lòng nhập tiêu đề và nội dung vụ án');
      return;
    }

    try {
      setLoading(true);
      const caseData = {
        ...formData,
        clues,
        suspects,
        solution,
      };
      await onSubmit(caseData);
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 animate-fade-in">
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="glass-panel rounded-xl p-6 shadow-lg ring-1 ring-primary/20 flex flex-col gap-6">
          <h3 className="text-white text-xl font-bold">Thông tin Vụ án</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Tiêu đề Vụ án</p>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input flex w-full rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-14 p-[15px] focus:border-primary focus:outline-none"
                placeholder="Nhập tên vụ án"
                required
              />
            </label>
            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Độ khó</p>
              <select
                value={formData.difficultyLevel}
                onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })}
                className="form-input flex w-full rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-14 p-[15px] focus:border-primary focus:outline-none"
              >
                <option value="Easy">Dễ</option>
                <option value="Medium">Trung bình</option>
                <option value="Hard">Khó</option>
                <option value="Expert">Chuyên gia</option>
              </select>
            </label>
            <label className="flex flex-col flex-1 md:col-span-2">
              <p className="text-white text-base font-medium leading-normal pb-2">Mô tả ngắn</p>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input flex w-full rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-14 p-[15px] focus:border-primary focus:outline-none"
                placeholder="Mô tả ngắn gọn về vụ án"
              />
            </label>
            <label className="flex flex-col flex-1 md:col-span-2">
              <p className="text-white text-base font-medium leading-normal pb-2">Nội dung chi tiết</p>
              <textarea
                value={formData.fullNarrative}
                onChange={(e) => setFormData({ ...formData, fullNarrative: e.target.value })}
                className="form-input flex w-full rounded-lg text-white bg-[#1b2727] border border-[#3b5454] min-h-[200px] p-[15px] focus:border-primary focus:outline-none"
                placeholder="Nhập nội dung đầy đủ của vụ án..."
                required
              ></textarea>
            </label>
            <label className="flex flex-col flex-1 md:col-span-2">
              <p className="text-white text-base font-medium leading-normal pb-2">URL Ảnh bìa</p>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="form-input flex w-full rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-14 p-[15px] focus:border-primary focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </label>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6 shadow-lg ring-1 ring-primary/20 flex flex-col gap-6">
          <h3 className="text-white text-xl font-bold">Đáp án & Lời giải</h3>
          <div className="grid grid-cols-1 gap-6">
            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Câu trả lời đúng</p>
              <input
                type="text"
                value={solution.correctAnswer}
                onChange={(e) => setSolution({ ...solution, correctAnswer: e.target.value })}
                className="form-input flex w-full rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-14 p-[15px] focus:border-primary focus:outline-none"
                placeholder="Tên thủ phạm hoặc đáp án chính xác"
                required
              />
            </label>
            <label className="flex flex-col flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Lời giải chi tiết</p>
              <textarea
                value={solution.detailedExplanation}
                onChange={(e) => setSolution({ ...solution, detailedExplanation: e.target.value })}
                className="form-input flex w-full rounded-lg text-white bg-[#1b2727] border border-[#3b5454] min-h-[150px] p-[15px] focus:border-primary focus:outline-none"
                placeholder="Giải thích chi tiết các manh mối dẫn đến kết luận..."
                required
              ></textarea>
            </label>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6 shadow-lg ring-1 ring-primary/20 flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-white text-xl font-bold">Danh sách Nghi phạm</h3>
            <button
              type="button"
              onClick={handleAddSuspect}
              className="flex items-center gap-2 text-primary text-sm font-bold hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Thêm Nghi phạm
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {suspects.map((suspect, index) => (
              <div key={index} className="border border-[#3b5454] rounded-lg p-4 flex flex-col gap-4 bg-black/20">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {suspect.portraitImageUrl && (
                      <img src={suspect.portraitImageUrl} alt="" className="size-10 rounded-full object-cover" />
                    )}
                    <h4 className="text-primary font-bold">{suspect.fullName} {suspect.isPrimarySuspect && '(Chính)'}</h4>
                  </div>
                  <button type="button" onClick={() => handleRemoveSuspect(index)} className="text-red-400 hover:text-red-300">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <p className="text-gray-400 text-sm">{suspect.occupation} | {suspect.gender}, {suspect.age} tuổi</p>
              </div>
            ))}
            <div className="border border-[#3b5454] rounded-lg p-4 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newSuspect.fullName}
                  onChange={(e) => setNewSuspect({ ...newSuspect, fullName: e.target.value })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                  placeholder="Tên đầy đủ"
                />
                <input
                  type="text"
                  value={newSuspect.alias}
                  onChange={(e) => setNewSuspect({ ...newSuspect, alias: e.target.value })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                  placeholder="Bí danh"
                />
                <select
                  value={newSuspect.gender}
                  onChange={(e) => setNewSuspect({ ...newSuspect, gender: e.target.value })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
                <input
                  type="number"
                  value={newSuspect.age}
                  onChange={(e) => setNewSuspect({ ...newSuspect, age: parseInt(e.target.value) || 0 })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                  placeholder="Tuổi"
                />
                <input
                  type="text"
                  value={newSuspect.occupation}
                  onChange={(e) => setNewSuspect({ ...newSuspect, occupation: e.target.value })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                  placeholder="Nghề nghiệp"
                />
                <input
                  type="text"
                  value={newSuspect.portraitImageUrl}
                  onChange={(e) => setNewSuspect({ ...newSuspect, portraitImageUrl: e.target.value })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                  placeholder="URL Ảnh chân dung"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSuspect.isPrimarySuspect}
                    onChange={(e) => setNewSuspect({ ...newSuspect, isPrimarySuspect: e.target.checked })}
                    className="size-4 rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-300">Nghi phạm chính</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6 shadow-lg ring-1 ring-primary/20 flex flex-col gap-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-white text-xl font-bold">Manh mối & Bằng chứng</h3>
            <button
              type="button"
              onClick={handleAddClue}
              className="flex items-center gap-2 text-primary text-sm font-bold hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Thêm Manh mối
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {clues.map((clue, index) => (
              <div key={index} className="border border-[#3b5454] rounded-lg p-4 flex flex-col gap-2 bg-black/20">
                <div className="flex justify-between items-start">
                  <h4 className="text-primary font-bold">{clue.title}</h4>
                  <button type="button" onClick={() => handleRemoveClue(index)} className="text-red-400 hover:text-red-300">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <p className="text-gray-300 text-sm">{clue.content}</p>
                <p className="text-gray-500 text-xs">Giá mở khóa: {clue.unlockCost} điểm</p>
              </div>
            ))}
            <div className="border border-[#3b5454] rounded-lg p-4 flex flex-col gap-4">
              <input
                type="text"
                value={newClue.title}
                onChange={(e) => setNewClue({ ...newClue, title: e.target.value })}
                className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                placeholder="Tiêu đề manh mối"
              />
              <textarea
                value={newClue.content}
                onChange={(e) => setNewClue({ ...newClue, content: e.target.value })}
                className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] min-h-[80px] p-4 text-sm focus:border-primary focus:outline-none"
                placeholder="Nội dung manh mối"
              ></textarea>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  value={newClue.unlockCost}
                  onChange={(e) => setNewClue({ ...newClue, unlockCost: parseInt(e.target.value) || 0 })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                  placeholder="Giá mở khóa (điểm)"
                />
                <input
                  type="text"
                  value={newClue.imageUrl}
                  onChange={(e) => setNewClue({ ...newClue, imageUrl: e.target.value })}
                  className="form-input rounded-lg text-white bg-[#1b2727] border border-[#3b5454] h-12 px-4 text-sm focus:border-primary focus:outline-none"
                  placeholder="URL Ảnh manh mối"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : isEditing ? 'Cập nhật Vụ án' : 'Lưu & Xuất bản'}
          </button>
        </div>
      </form>
    </div>
  );
};

