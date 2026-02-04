import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ResponsableSidebar } from '../components/responsable-sidebar'

const RespoonsableLayout = ({ children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <ResponsableSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className='p-6'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default RespoonsableLayout