import { ChatbotOption } from '@/types';
import Button from '@/components/ui/Button';

interface ChatbotOptionsProps {
  options: ChatbotOption[];
  onSelect: (option: ChatbotOption) => void;
}

export function ChatbotOptions({ options, onSelect }: ChatbotOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {options.map((option) => (
        <Button
          key={option.value ?? option.label}
          variant="secondary"
          size="sm"
          onClick={() => onSelect(option)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
