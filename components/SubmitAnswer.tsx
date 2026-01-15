import React, { useState } from 'react';
import { caseApi, SubmitAnswerRequest, SubmitInferenceRequest } from '../services/api';

interface SubmitAnswerProps {
  caseId: string;
  onSuccess?: () => void;
}

export const SubmitAnswer: React.FC<SubmitAnswerProps> = ({ caseId, onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showInference, setShowInference] = useState(false);
  const [inference, setInference] = useState({
    suspectedPerpetrator: '',
    perpetrationReasoning: '',
    aliasUsed: '',
    additionalNotes: '',
  });

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    try {
      setLoading(true);
      const data: SubmitAnswerRequest = {
        caseId,
        submittedAnswer: answer,
      };
      const response = await caseApi.submitAnswer(data);
      setResult(response);
      if (response.isCorrect && onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      alert(err.message || 'Không thể gửi câu trả lời');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inference.suspectedPerpetrator.trim() || !inference.perpetrationReasoning.trim()) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      const data: SubmitInferenceRequest = {
        suspectedPerpetrator: inference.suspectedPerpetrator,
        perpetrationReasoning: inference.perpetrationReasoning,
        aliasUsed: inference.aliasUsed || null,
        additionalNotes: inference.additionalNotes || null,
      };
      const response = await caseApi.submitInference(caseId, data);
      setResult(response);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      alert(err.message || 'Không thể gửi suy luận');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowInference(false)}
          className={`flex-1 py-2 text-sm font-bold rounded ${
            !showInference
              ? 'bg-primary text-black'
              : 'bg-surface-dark text-gray-400 hover:text-white'
          }`}
        >
          Gửi câu trả lời
        </button>
        <button
          onClick={() => setShowInference(true)}
          className={`flex-1 py-2 text-sm font-bold rounded ${
            showInference
              ? 'bg-primary text-black'
              : 'bg-surface-dark text-gray-400 hover:text-white'
          }`}
        >
          Gửi suy luận
        </button>
      </div>

      {result && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            result.isCorrect
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : 'bg-red-500/20 border border-red-500/50 text-red-400'
          }`}
        >
          <p className="font-bold mb-2">{result.message}</p>
          {result.isCorrect && result.scoreEarned && (
            <p>Bạn đã nhận được {result.scoreEarned} điểm!</p>
          )}
          {result.detailedSolution && (
            <div className="mt-2 text-sm">{result.detailedSolution}</div>
          )}
        </div>
      )}

      {!showInference ? (
        <form onSubmit={handleSubmitAnswer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Câu trả lời của bạn
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-2 bg-surface-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
              rows={4}
              placeholder="Nhập câu trả lời của bạn..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !answer.trim()}
            className="w-full py-3 bg-blood-red text-white font-bold rounded-lg hover:bg-blood-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed typewriter-font uppercase tracking-wider border-2 border-blood-red"
            style={{
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)',
            }}
          >
            {loading ? 'Đang gửi...' : 'Gửi câu trả lời'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitInference} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nghi phạm
            </label>
            <input
              type="text"
              value={inference.suspectedPerpetrator}
              onChange={(e) =>
                setInference({ ...inference, suspectedPerpetrator: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
              placeholder="Tên nghi phạm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lý do
            </label>
            <textarea
              value={inference.perpetrationReasoning}
              onChange={(e) =>
                setInference({ ...inference, perpetrationReasoning: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
              rows={4}
              placeholder="Giải thích lý do bạn nghĩ người này là thủ phạm..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bí danh (nếu có)
            </label>
            <input
              type="text"
              value={inference.aliasUsed}
              onChange={(e) => setInference({ ...inference, aliasUsed: e.target.value })}
              className="w-full px-4 py-2 bg-surface-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
              placeholder="Bí danh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ghi chú thêm
            </label>
            <textarea
              value={inference.additionalNotes}
              onChange={(e) =>
                setInference({ ...inference, additionalNotes: e.target.value })
              }
              className="w-full px-4 py-2 bg-surface-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
              rows={3}
              placeholder="Ghi chú bổ sung..."
            />
          </div>
          <button
            type="submit"
            disabled={loading || !inference.suspectedPerpetrator.trim() || !inference.perpetrationReasoning.trim()}
            className="w-full py-3 bg-blood-red text-white font-bold rounded-lg hover:bg-blood-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed typewriter-font uppercase tracking-wider border-2 border-blood-red"
            style={{
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)',
            }}
          >
            {loading ? 'Đang gửi...' : 'Gửi suy luận'}
          </button>
        </form>
      )}
    </div>
  );
};

