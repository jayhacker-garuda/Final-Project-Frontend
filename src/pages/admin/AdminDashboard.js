import { Fragment, useState } from 'react'

import { useAppContext } from '../../context/appContext';
import { isAdmin } from '../../utils';
import { useForm } from 'react-hook-form';



function AdminDashboard() { 


    return (
        <div>
            
            <div className="flex flex-col flex-1">
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="py-4">
                                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminDashboard