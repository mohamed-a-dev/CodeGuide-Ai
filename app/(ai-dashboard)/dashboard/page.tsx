import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  MessageSquare,
  MessagesSquare,
  TrendingUp,
} from "lucide-react";
import { getUserChatsAction } from "@/actions/chat.actions";
import { formatTimeAgo } from "@/lib/date";
import { getDashboardStats } from "@/services/dashboard.services";

export default async function Page() {
  const chats = await getUserChatsAction();
  const dashboardStats  = await getDashboardStats();

  const formattedChats = chats.map((chat) => ({ ...chat, time: formatTimeAgo(chat.createdAt), icon: MessagesSquare })).slice(0, 4);

  const stats = [
    {
      title: "Total Messages",
      value: dashboardStats.messages,
      description: "+12% this month",
      icon: MessageSquare,
      trend: true,
    },
    {
      title: "Total Chats",
      value: dashboardStats.chats,
      description: "Conversations created",
      icon: MessagesSquare,
    },
    {
      title: "Documents",
      value: dashboardStats.documents,
      description: "Developer documents available",
      icon: BookOpen,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div>
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <TrendingUp size={18} />
            </div>

            <span className="text-sm font-semibold text-blue-600">
              Overview
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Welcome back! Here is your CodeGuide AI chat overview.
          </p>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-blue-200
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      text-slate-500
                      transition-colors
                      group-hover:bg-blue-50
                      group-hover:text-blue-600
                    "
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs">
                  {stat.trend && (
                    <span className="font-semibold text-emerald-600">
                      ↗ +12%
                    </span>
                  )}

                  <span
                    className={
                      stat.trend
                        ? "text-slate-400"
                        : "text-slate-400"
                    }
                  >
                    {stat.trend ? "this month" : stat.description}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Recent chat */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent chat
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Your latest conversations and documents
              </p>
            </div>

            <Link
              href="/history"
              className="
                group
                flex
                items-center
                gap-1
                rounded-lg
                px-3
                py-2
                text-xs
                font-semibold
                text-blue-600
                transition-colors
                hover:bg-blue-50
              "
            >
              View all
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* chat List */}
          <div className="divide-y divide-slate-100">
            {formattedChats.map((chat) => {
              const Icon = chat.icon;

              return (
                <Link
                  key={chat.id}
                  href={`/history/${chat.id}`}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    transition-colors
                    hover:bg-slate-50/80
                    sm:px-6
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      text-slate-500
                      transition-colors
                      group-hover:bg-blue-50
                      group-hover:text-blue-600
                    "
                  >
                    <Icon size={18} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800 transition-colors group-hover:text-blue-600">
                      {chat.title}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock3 size={12} />
                      <span>{chat.time}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={17}
                    className="
                      shrink-0
                      text-slate-300
                      transition-all
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-blue-600
                    "
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
