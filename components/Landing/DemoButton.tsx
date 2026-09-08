'use client'
import useDemoLogin from '@/hooks/useDemoLogin';

export default function DemoButton() {
    const { handleDemo } = useDemoLogin();

    return (
        <button
            onClick={handleDemo}
            type="button"
            className="
                cursor-pointer
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-6
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition-all
                  hover:border-slate-300
                  hover:bg-slate-50
                "
        >
            View Demo
        </button>
    )
}
