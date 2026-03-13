import type { Play, ChatbotNode, ChatbotFilters, ChatbotOption } from '../types';

export function walkTree(
  nodeId: string,
  selectedOption: ChatbotOption,
  currentFilters: ChatbotFilters,
  nodes: ChatbotNode[]
): { nextNode: ChatbotNode; updatedFilters: ChatbotFilters } {
  const currentNode = nodes.find((n) => n.id === nodeId);
  const nextNode = nodes.find((n) => n.id === selectedOption.nextNodeId);

  if (!nextNode) {
    throw new Error(`Chatbot node not found: ${selectedOption.nextNodeId}`);
  }

  let updatedFilters = { ...currentFilters };

  if (currentNode?.filterKey && selectedOption.value !== 'any') {
    const key = currentNode.filterKey;

    switch (key) {
      case 'days':
        updatedFilters.days = [selectedOption.value as Play['schedules'][0]['day']];
        break;
      case 'priceRange': {
        const parts = selectedOption.value.split('-');
        updatedFilters.priceRange = {
          min: parseInt(parts[0], 10),
          max: parseInt(parts[1], 10),
        };
        break;
      }
      case 'zone':
        updatedFilters.zone = selectedOption.value.split(',') as Play['zone'][];
        break;
      case 'genre':
        updatedFilters.genre = [selectedOption.value as Play['genre']];
        break;
      case 'circuit':
        updatedFilters.circuit = selectedOption.value as Play['circuit'];
        break;
      case 'targetAudience':
        updatedFilters.targetAudience = selectedOption.value as Play['targetAudience'];
        break;
      default:
        break;
    }
  }

  return { nextNode, updatedFilters };
}

export function filterPlays(filters: ChatbotFilters, plays: Play[]): Play[] {
  let result = [...plays];

  if (filters.days && filters.days.length > 0) {
    result = result.filter((play) =>
      play.schedules.some((s) => filters.days!.includes(s.day))
    );
  }

  if (filters.priceRange) {
    result = result.filter(
      (play) =>
        play.price.min <= filters.priceRange!.max &&
        play.price.max >= filters.priceRange!.min
    );
  }

  if (filters.zone && filters.zone.length > 0) {
    result = result.filter((play) => filters.zone!.includes(play.zone));
  }

  if (filters.genre && filters.genre.length > 0) {
    result = result.filter((play) => filters.genre!.includes(play.genre));
  }

  if (filters.circuit) {
    result = result.filter((play) => play.circuit === filters.circuit);
  }

  if (filters.targetAudience) {
    result = result.filter((play) => play.targetAudience === filters.targetAudience);
  }

  return result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 5);
}
