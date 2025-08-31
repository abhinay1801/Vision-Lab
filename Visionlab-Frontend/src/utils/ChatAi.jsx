import React, { useState } from "react";

const ChatInterface = ({ experiment }) => {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([[]]);
  const [activeConversation, setActiveConversation] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to active conversation
    const userMessage = { role: "user", content: message };
    const updatedConversations = [...conversations];
    updatedConversations[activeConversation] = [
      ...updatedConversations[activeConversation],
      userMessage,
    ];
    setConversations(updatedConversations);

    // Clear input immediately after sending
    setMessage("");

    setIsLoading(true);

    try {
      // Call Gemini API directly
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBIPHUIqTFVVinllfpjKrcERZMgy0PGLl8",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI-powered experimental doubt solver designed to assist users with educational queries. Act as a helpful teacher, providing concise, accurate, and research-backed. Focus strictly on academic topics such as math, science, coding, history, and language learning. Avoid unrelated, opinion-based, or non-educational discussions.  

                    if general conversation are asked reply with a normal responce conversation ex{hi with how can i help you}

                    Base your response on the current chat experiment: **${experiment}**  
                    User's question: **${userMessage.content}**  
                    Provide a direct and relevant answer based on the experiment.  
`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1250,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "Error from API");
      }

      const aiResponseText =
        (data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0] &&
          data.candidates[0].content.parts[0].text) ||
        "No response received";

      const apiResponse = { role: "assistant", content: aiResponseText };
      updatedConversations[activeConversation] = [
        ...updatedConversations[activeConversation],
        apiResponse,
      ];
      setConversations(updatedConversations);
    } catch (error) {
      const errorMessage = {
        role: "system",
        content: `Error: ${error.message}`,
      };
      updatedConversations[activeConversation] = [
        ...updatedConversations[activeConversation],
        errorMessage,
      ];
      setConversations(updatedConversations);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = () => {
    setConversations([...conversations, []]);
    setActiveConversation(conversations.length);
    setMessage("");
  };

  const switchConversation = (index) => {
    setActiveConversation(index);
    setMessage("");
  };

  const activeMessages = conversations[activeConversation] || [];

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      {/* Conversation Tabs */}
      <div className="flex items-center mb-4 overflow-x-auto pb-2">
        {conversations.map((conv, index) => (
          <button
            key={index}
            onClick={() => switchConversation(index)}
            className={`px-4 py-2 mr-2 rounded-t-md text-sm font-medium whitespace-nowrap ${
              index === activeConversation
                ? "bg-white border-t border-l border-r border-gray-300 -mb-px"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Conversation {index + 1} {conv.length > 0 ? `(${conv.length})` : ""}
          </button>
        ))}
        <button
          onClick={startNewConversation}
          className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
        >
          + New
        </button>
      </div>

      {/* Conversation Display */}
      <div className="flex-grow overflow-auto mb-4 bg-white p-4 rounded-md border border-gray-300">
        {activeMessages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Ask a question to start conversation
          </div>
        ) : (
          activeMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 ml-8"
                  : msg.role === "system"
                  ? "bg-red-100"
                  : "bg-gray-100 mr-8"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="flex items-center">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type your question here..."
          disabled={isLoading}
          onKeyPress={(e) =>
            e.key === "Enter" &&
            !isLoading &&
            message.trim() &&
            handleSendMessage()
          }
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
          className={`px-4 py-3 rounded-r-md text-white font-medium ${
            isLoading || !message.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors duration-200`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
