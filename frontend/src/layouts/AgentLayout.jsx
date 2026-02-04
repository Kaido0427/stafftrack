import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AgentSidebar } from '../components/agents-sidebar'

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AgentSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className='p-6'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout