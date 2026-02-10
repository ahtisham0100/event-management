'use client'

import React, { useState } from 'react'
import { Trash2, Send, Star, CheckCircle, MessageSquare, BarChart3 } from 'lucide-react'

interface Question {
  id: string
  author: string
  text: string
  timestamp: string
  upvotes: number
  status: 'pending' | 'approved' | 'dismissed'
  isPinned: boolean
}

interface Poll {
  id: string
  question: string
  status: 'active' | 'closed'
  responses: Array<{ option: string; count: number }>
}

export default function ModerationPage() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'Q1',
      author: 'Alex K.',
      text: 'How do we implement real-time syncing in distributed systems?',
      timestamp: '2 min ago',
      upvotes: 14,
      status: 'pending',
      isPinned: true,
    },
    {
      id: 'Q2',
      author: 'Jamie L.',
      text: 'What are the best practices for cloud cost optimization?',
      timestamp: '5 min ago',
      upvotes: 8,
      status: 'pending',
      isPinned: false,
    },
    {
      id: 'Q3',
      author: 'Taylor M.',
      text: 'Can you share resources on machine learning ops?',
      timestamp: '7 min ago',
      upvotes: 6,
      status: 'approved',
      isPinned: false,
    },
  ])

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 'POLL1',
      question: 'Which technology excites you most?',
      status: 'active',
      responses: [
        { option: 'AI/ML', count: 245 },
        { option: 'Web3', count: 89 },
        { option: 'Cloud', count: 156 },
      ],
    },
    {
      id: 'POLL2',
      question: 'Rate this talk',
      status: 'closed',
      responses: [
        { option: 'Excellent', count: 180 },
        { option: 'Good', count: 95 },
        { option: 'Average', count: 42 },
      ],
    },
  ])

  const handleApprove = (id: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, status: 'approved' } : q
      )
    )
  }

  const handleDismiss = (id: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, status: 'dismissed' } : q
      )
    )
  }

  const handlePin = (id: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, isPinned: !q.isPinned } : q
      )
    )
  }

  const handleClosePoll = (id: string) => {
    setPolls(
      polls.map((p) => (p.id === id ? { ...p, status: 'closed' } : p))
    )
  }

  const pendingQuestions = questions.filter((q) => q.status === 'pending')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Q&A Moderation</h1>
        <p className="mt-1 text-zinc-600">Live moderator portal for session questions and polls</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200">
        <button className="border-b-2 border-emerald-600 px-4 py-2 font-medium text-emerald-600">
          Q&A ({pendingQuestions.length} pending)
        </button>
        <button className="px-4 py-2 font-medium text-zinc-600 hover:text-zinc-900">
          Polls
        </button>
      </div>

      {/* Questions Feed */}
      <div className="space-y-3">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`rounded-lg border-2 p-4 transition-colors ${
              question.isPinned
                ? 'border-emerald-300 bg-emerald-50'
                : question.status === 'dismissed'
                  ? 'border-zinc-200 bg-zinc-50 opacity-60'
                  : 'border-zinc-200 bg-white'
            }`}
          >
            {/* Question Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-zinc-900">{question.author}</p>
                <p className="mt-1 text-sm text-zinc-700">{question.text}</p>
                <p className="mt-2 text-xs text-zinc-500">{question.timestamp}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                <MessageSquare size={12} />
                {question.upvotes}
              </span>
            </div>

            {/* Action Buttons */}
            {question.status === 'pending' && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleApprove(question.id)}
                  className="flex-1 rounded-lg bg-emerald-100 px-3 py-2 font-medium text-emerald-700 hover:bg-emerald-200"
                >
                  <CheckCircle size={16} className="mb-0.5 inline-block" /> Approve
                </button>
                <button
                  onClick={() => handlePin(question.id)}
                  className="flex-1 rounded-lg bg-amber-100 px-3 py-2 font-medium text-amber-700 hover:bg-amber-200"
                >
                  <Star size={16} className="mb-0.5 inline-block" /> Star
                </button>
                <button
                  onClick={() => handleDismiss(question.id)}
                  className="flex-1 rounded-lg bg-zinc-100 px-3 py-2 font-medium text-zinc-700 hover:bg-zinc-200"
                >
                  <Trash2 size={16} className="mb-0.5 inline-block" /> Dismiss
                </button>
              </div>
            )}

            {question.status === 'approved' && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                <CheckCircle size={16} className="text-emerald-600" />
                <p className="text-sm text-emerald-700">Displayed on big screen</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Polls Section */}
      <div className="mt-8 space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900">
          <BarChart3 size={24} />
          Active Polls
        </h2>
        {polls.map((poll) => (
          <div key={poll.id} className="rounded-lg border border-zinc-200 bg-white p-4">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="font-semibold text-zinc-900">{poll.question}</h3>
              {poll.status === 'active' && (
                <button
                  onClick={() => handleClosePoll(poll.id)}
                  className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 hover:bg-zinc-200"
                >
                  Close Poll
                </button>
              )}
            </div>
            <div className="space-y-2">
              {poll.responses.map((response) => (
                <div key={response.option}>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-700">{response.option}</span>
                    <span className="font-medium text-zinc-900">{response.count}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-emerald-600"
                      style={{
                        width: `${(response.count / Math.max(...poll.responses.map((r) => r.count))) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
