'use client'

import React, { useState } from 'react'
import { Send, ThumbsUp, MessageSquare } from 'lucide-react'

interface PollOption {
  id: string
  text: string
  votes: number
}

interface Question {
  id: string
  text: string
  upvotes: number
  hasUserUpvoted: boolean
}

export default function SessionLivePage() {
  const [activeTab, setActiveTab] = useState<'poll' | 'qa' | 'notes'>('poll')
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: '1', text: 'AI will be the biggest driver', votes: 245 },
    { id: '2', text: 'Web3 and blockchain', votes: 89 },
    { id: '3', text: 'Quantum computing', votes: 156 },
    { id: '4', text: 'Sustainable tech', votes: 112 },
  ])

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'Q1',
      text: 'How do we implement real-time syncing in distributed systems?',
      upvotes: 34,
      hasUserUpvoted: false,
    },
    {
      id: 'Q2',
      text: 'What are the best practices for cloud cost optimization?',
      upvotes: 28,
      hasUserUpvoted: false,
    },
    {
      id: 'Q3',
      text: 'Can you share resources on machine learning ops?',
      upvotes: 19,
      hasUserUpvoted: true,
    },
  ])

  const [notes, setNotes] = useState('')
  const [newQuestion, setNewQuestion] = useState('')

  const totalVotes = pollOptions.reduce((sum, opt) => sum + opt.votes, 0)

  const votePoll = (optionId: string) => {
    setPollOptions(
      pollOptions.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    )
  }

  const upvoteQuestion = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              upvotes: q.hasUserUpvoted ? q.upvotes - 1 : q.upvotes + 1,
              hasUserUpvoted: !q.hasUserUpvoted,
            }
          : q
      )
    )
  }

  const submitQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        {
          id: `Q${questions.length + 1}`,
          text: newQuestion,
          upvotes: 1,
          hasUserUpvoted: true,
        },
      ])
      setNewQuestion('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Session Info */}
      <div className="rounded-xl border border-white/30 bg-white/40 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-600">Now Playing</p>
            <p className="mt-0.5 text-xl font-bold text-zinc-900">
              Keynote: Future of AI
            </p>
            <p className="mt-1 text-sm text-zinc-600">Dr. Sarah Chen</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-xs font-semibold text-red-700">LIVE</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/20">
        {(['poll', 'qa', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-all capitalize ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {tab === 'poll' && 'Poll'}
            {tab === 'qa' && 'Q&A'}
            {tab === 'notes' && 'Notes'}
          </button>
        ))}
      </div>

      {/* Poll Tab */}
      {activeTab === 'poll' && (
        <div className="space-y-4">
          <div className="rounded-lg border border-white/30 bg-white/40 p-4 backdrop-blur-md">
            <p className="mb-4 font-semibold text-zinc-900">
              What do you think will be the most important technology in 5 years?
            </p>
            <div className="space-y-3">
              {pollOptions.map((option) => {
                const percentage =
                  totalVotes > 0
                    ? Math.round((option.votes / totalVotes) * 100)
                    : 0

                return (
                  <button
                    key={option.id}
                    onClick={() => votePoll(option.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-zinc-900">{option.text}</span>
                      <span className="text-xs font-semibold text-zinc-600">
                        {option.votes} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-zinc-100 overflow-hidden transition-all hover:bg-zinc-200">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Q&A Tab */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          {/* Submit Question */}
          <div className="rounded-lg border border-white/30 bg-white/40 p-3 backdrop-blur-md">
            <div className="flex gap-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyPress={(e) =>
                  e.key === 'Enter' && submitQuestion()
                }
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-white/20 bg-white/50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                onClick={submitQuestion}
                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {questions.map((question) => (
              <div
                key={question.id}
                className="rounded-lg border border-white/30 bg-white/40 p-3 backdrop-blur-md"
              >
                <p className="text-sm text-zinc-900">{question.text}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => upvoteQuestion(question.id)}
                    className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                      question.hasUserUpvoted
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    <ThumbsUp size={12} />
                    {question.upvotes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="rounded-lg border border-white/30 bg-white/40 p-4 backdrop-blur-md">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes during the session..."
              className="h-80 w-full rounded-lg border border-white/20 bg-white/50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200">
                Save Notes
              </button>
              <button className="flex-1 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200">
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
