'use client'
import useDemoLogin from '@/hooks/useDemoLogin'

export default function TryDemoBtn() {
    const { handleDemo } = useDemoLogin();

    return (
        < div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-center" >
            <p className="text-xs text-slate-500">
                Want to explore the project?
            </p>

            <button
                onClick={handleDemo}
                className="mt-1 inline-block text-sm font-medium text-slate-900 hover:underline cursor-pointer"
            >
                Try Demo Account →
            </button>
        </ div>
    )
}
