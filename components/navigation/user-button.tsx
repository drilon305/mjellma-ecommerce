"use client"

import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { use } from "react"
import { Moon, Settings, Sun, TruckIcon } from "lucide-react"



export const UserButton = ({ user }: Session) => {
  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 p-4 flex flex-col gap-1 items-center rounded-lg bg-primary/25">
            {user.image && (
              <Image
                className="rounded-full"
                src={user.image}
                alt={user.name!}
                width={36}
                height={36}
              />
            )}
            <p className="font-bold text-xs">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <TruckIcon size={14} className=" mr-2" /> My Orders
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <Settings size={14} className=" mr-2" /> Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
            <div className="flex items-center">
              <Sun size={14} />
              <Moon size={14} />
              <p>
                Theme <span>theme</span>
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};