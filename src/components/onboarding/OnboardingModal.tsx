import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import QuizStep from './QuizStep';
import QuizComplete from './QuizComplete';
import { useApp } from '@/context/AppContext';

type Step = 'welcome' | 'quiz' | 'complete';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS: Step[] = ['welcome', 'quiz', 'complete'];

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const { plays, completeOnboarding } = useApp();
  const [step, setStep] = useState<Step>('welcome');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const currentStepIndex = STEPS.indexOf(step);

  function handleToggle(playId: string) {
    setSelectedIds((prev) =>
      prev.includes(playId) ? prev.filter((id) => id !== playId) : [...prev, playId]
    );
  }

  function handleNext() {
    if (step === 'welcome') {
      setStep('quiz');
    } else if (step === 'quiz') {
      setStep('complete');
    }
  }

  function handleFinish() {
    completeOnboarding(selectedIds);
    setStep('welcome');
    setSelectedIds([]);
    onClose();
  }

  function handleClose() {
    setStep('welcome');
    setSelectedIds([]);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={step === 'welcome' ? 'Bienvenido a Teatro' : step === 'quiz' ? 'Elegí tus gustos' : undefined}>
      {/* Welcome step */}
      {step === 'welcome' && (
        <div className="space-y-5">
          <div className="text-center space-y-3 py-4">
            <div className="text-5xl">🎭</div>
            <p className="text-sm font-body text-teatro-text-muted max-w-xs mx-auto">
              Te vamos a hacer unas preguntas rapidas para conocer tus gustos y recomendarte las
              mejores obras de Buenos Aires.
            </p>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleNext}>Empezar</Button>
          </div>
        </div>
      )}

      {/* Quiz step */}
      {step === 'quiz' && (
        <div className="space-y-4">
          <QuizStep plays={plays} selectedIds={selectedIds} onToggle={handleToggle} />
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={selectedIds.length === 0}>
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Complete step */}
      {step === 'complete' && (
        <QuizComplete selectedCount={selectedIds.length} onFinish={handleFinish} />
      )}

      {/* Step indicator dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === currentStepIndex ? 'bg-teatro-gold' : 'bg-teatro-surface-light'
            }`}
          />
        ))}
      </div>
    </Modal>
  );
}
