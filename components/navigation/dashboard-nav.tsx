"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function DashboardNav({allLinks}: { allLinks: { label: string; path: string; icon: JSX.Element}[]
}) {

    const pathname = usePathname()

    return (
        <nav className="py-2 overflow-auto">
          <ul className="flex gap-6 text-sm font-bold">
            {allLinks.map((link) => (
              <li key={link.path}>
                <Link className={cn('flex gap-1 flex-col items-center', pathname === link.path ? (
                    <motion.div className="h-[3px] w-full rounded-full absolute bg-primary z-0 l-0 -bottom-1">

                    </motion.div>
                ) : null
            
            )} href={link.path}>
                {link.icon}
                {link.label}
              </Link>
              </li>
            ))}
          </ul>
        </nav>
    )
}