import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import HomePage from '@/pages/HomePage'
import PlayDetailPage from '@/pages/PlayDetailPage'
import ProfilePage from '@/pages/ProfilePage'
import DiscountsPage from '@/pages/DiscountsPage'
import EphemeralChatPage from '@/pages/EphemeralChatPage'
import NotificationsPage from '@/pages/NotificationsPage'
import NewsPage from '@/pages/NewsPage'
import NewsDetailPage from '@/pages/NewsDetailPage'
import ChatbotPage from '@/pages/ChatbotPage'
import { AppProvider } from '@/context/AppContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'play/:playId', element: <PlayDetailPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'discounts', element: <DiscountsPage /> },
      { path: 'discounts/pack/:packId/chat', element: <EphemeralChatPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:articleId', element: <NewsDetailPage /> },
      { path: 'chatbot', element: <ChatbotPage /> },
    ],
  },
])

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
