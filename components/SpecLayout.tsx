import React, { ReactNode } from "react"

interface LayoutProps {
    children : React.ReactNode
}

export default function SpecialLayout({children} : LayoutProps) {
    return <div>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
    </div>
}
