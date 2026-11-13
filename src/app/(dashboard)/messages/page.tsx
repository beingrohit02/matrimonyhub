"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Search, MoreVertical, Paperclip, Mic, Smile } from "lucide-react";
import { getInitials } from "@/lib/utils";

const mockConversations = [
  { id: "1", name: "Priya Sharma", lastMessage: "Hey! How are you?", time: "10:30 AM", unread: 2, avatar: null, online: true },
  { id: "2", name: "Vikram Singh", lastMessage: "Thanks for accepting my interest", time: "Yesterday", unread: 0, avatar: null, online: false },
  { id: "3", name: "Anjali Patel", lastMessage: "Sure, let\'s talk more", time: "Monday", unread: 1, avatar: null, online: true },
];

const mockMessages = [
  { id: "1", senderId: "1", content: "Hey! How are you?", time: "10:30 AM", isOwn: false },
  { id: "2", senderId: "me", content: "I\'m doing great! Thanks for asking.", time: "10:31 AM", isOwn: true },
  { id: "3", senderId: "1", content: "That\'s good to hear. I liked your profile.", time: "10:32 AM", isOwn: false },
  { id: "4", senderId: "me", content: "Thank you! I liked yours too.", time: "10:33 AM", isOwn: true },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Connect with your matches</p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <Card className="w-80 flex-shrink-0 flex flex-col hidden lg:flex">
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {mockConversations
                .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full flex gap-3 p-3 rounded-lg transition-colors text-left ${
                      selectedConversation.id === conversation.id
                        ? "bg-primary/10"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar || ""} alt={conversation.name} />
                        <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium truncate">{conversation.name}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                        {conversation.unread}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedConversation ? (
            <>
              <Card className="flex-shrink-0">
                <CardHeader className="flex items-center gap-4 p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedConversation.avatar || ""} alt={selectedConversation.name} />
                    <AvatarFallback>{getInitials(selectedConversation.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.online ? "Online" : "Offline"}
                    </p>
                  </div>
                  <div className="flex-1" />
                  <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </CardHeader>
              </Card>

              <ScrollArea className="flex-1 p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <Card className="flex-shrink-0 p-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && e.preventDefault() && sendMessage()}
                  />
                  <Button variant="ghost" size="icon"><Mic className="h-4 w-4" /></Button>
                  <Button onClick={sendMessage} disabled={!messageInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Card className="max-w-md text-center">
                <CardContent className="py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function sendMessage() {
    if (!messageInput.trim() || !selectedConversation) return;
    setMessageInput("");
  }
}
