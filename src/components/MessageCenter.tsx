import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Clock, CheckCircle, User as UserIcon } from 'lucide-react';
import { Message, User, CreateMessageDto } from '../types';
import { ApiService } from '../services/api';
import { formatDistanceToNow } from 'date-fns';

interface MessageCenterProps {
  user: User;
}

export const MessageCenter: React.FC<MessageCenterProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [recipientName, setRecipientName] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await ApiService.getMessages();
      setMessages(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !recipientId.trim()) return;

    setSending(true);
    try {
      const messageData: CreateMessageDto = {
        content: newMessage,
        recipientId,
        recipientName: recipientName || undefined,
      };

      const sentMessage = await ApiService.sendMessage(messageData);
      setMessages(prev => [sentMessage, ...prev]);
      setNewMessage('');
      setRecipientId('');
      setRecipientName('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const updatedMessage = await ApiService.markMessageAsRead(messageId);
      setMessages(prev => 
        prev.map(msg => msg.id === messageId ? updatedMessage : msg)
      );
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const unreadCount = messages.filter(msg => !msg.isRead && msg.recipientId === user.id).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Message Center</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>

      {/* Send Message Form */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Send New Message</h3>
          <p className="card-description">Send a message to another user</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="recipientId" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient ID
                </label>
                <input
                  id="recipientId"
                  type="text"
                  className="input"
                  placeholder="e.g., 1, 2, 3"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name (Optional)
                </label>
                <input
                  id="recipientName"
                  type="text"
                  className="input"
                  placeholder="e.g., John Doe"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="input resize-none"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={sending || !newMessage.trim() || !recipientId.trim()}
              className="btn-primary flex items-center space-x-2"
            >
              {sending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Messages List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Your Messages</h3>
          <p className="card-description">
            {messages.length === 0 ? 'No messages yet' : `${messages.length} messages`}
          </p>
        </div>
        <div className="card-content">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No messages to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isReceived = message.recipientId === user.id;
                const isUnread = !message.isRead && isReceived;

                return (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border ${
                      isUnread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {isReceived ? message.senderName : message.recipientName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {isReceived ? 'to you' : 'from you'}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{message.content}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isReceived && (
                          <>
                            {message.isRead ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <button
                                onClick={() => handleMarkAsRead(message.id)}
                                className="btn-ghost text-xs"
                              >
                                Mark as read
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};