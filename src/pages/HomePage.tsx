import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import HomeFeed from '@/components/home/HomeFeed';
import OnboardingModal from '@/components/onboarding/OnboardingModal';

export default function HomePage() {
  const { currentUser } = useApp();
  const [showOnboarding, setShowOnboarding] = useState(
    !currentUser.onboardingCompleted
  );

  return (
    <div className="p-4 space-y-6">
      {showOnboarding && (
        <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      )}
      <HomeFeed />
    </div>
  );
}
