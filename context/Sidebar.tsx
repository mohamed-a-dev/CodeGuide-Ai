'use client';

import { createContext, useContext, useState } from 'react';

type SidebarContextType = {
    showSidebar: boolean;
    toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    return (
        <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (context === null) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }

    return context;
};