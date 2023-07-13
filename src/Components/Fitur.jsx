import React from 'react';
import ftrimg from '../Photo/gambar fitur.png'

function Fitur() {
    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="mx-auto max-w-7xl my-0 px-0 py-10 hidden sm:block">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-28 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-4 text-indigo-600">Feature</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">To-Do List</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Our platform is designed to help you stay organized, manage your tasks efficiently, and boost your productivity. Whether you're a busy professional, a student, or simply someone who wants to stay on top of their responsibilities, our to-do list web app has got you covered.</p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                <div className="relative pl-4">
                                    <dt className="inline font-semibold text-gray-900">
                                        Add Task :
                                    </dt>
                                    <dd className="inline"> Enter the task title, click on the "Add Task" button, and a new task entry field will appear.</dd>
                                </div>
                                <div className="relative pl-4">
                                    <dt className="inline font-semibold text-gray-900">
                                        Edit Task :
                                    </dt>
                                    <dd className="inline"> Simply locate the task you want to modify, you can edit the task name and date .</dd>
                                </div>
                                <div className="relative pl-4">
                                    <dt className="inline font-semibold text-gray-900">
                                        Set Date :
                                    </dt>
                                    <dd className="inline"> When adding or editing a task, you can easily assign a specific date to it.</dd>
                                </div>
                                <div>
                                    <a
                                        href="./do-Task"
                                        className="bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-900 
                                        font-bold py-2 px-4 rounded"
                                    >
                                        Get Started
                                    </a>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <img src={ftrimg} alt="tampilan" className='rounded-x1 shadow-xl ring-1 ring-gray-400/50 mt-20' />
                </div>
            </div>
            <div className='block sm:hidden pl-2 pb-8'>
                <img src={ftrimg} alt="tampilan" className='rounded-x1 shadow-xl ring-1 ring-gray-400/50 mt-20' />
                <br />  
                <h2 className="text-base font-semibold leading-4 text-indigo-600">Feature</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">To-Do List</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Our platform is designed to help you stay organized, manage your tasks efficiently, and boost your productivity. Whether you're a busy professional, a student, or simply someone who wants to stay on top of their responsibilities, our to-do list web app has got you covered.</p>
                <dl className="mt-10 max-w-xl space-y-6 text-base leading-7 text-gray-600 lg:max-w-none" />
                <div className="relative pl-4">
                    <dt className="inline font-semibold text-gray-900">
                        Add Task :
                    </dt>
                    <dd className="inline"> Enter the task title, click on the "Add Task" button, and a new task entry field will appear.</dd>
                </div>
                <div className="relative pl-4">
                    <dt className="inline font-semibold text-gray-900">
                        Edit Task :
                    </dt>
                    <dd className="inline"> Simply locate the task you want to modify, you can edit the task name and date .</dd>
                </div>
                <div className="relative pl-4">
                    <dt className="inline font-semibold text-gray-900">
                        Set Date :
                    </dt>
                    <dd className="inline"> When adding or editing a task, you can easily assign a specific date to it.</dd>
                </div>
                <br />
                <div className='pl-3'>
                    <a
                        href="./do-Task"
                        className="bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-900 
                                        font-bold py-2 px-3 rounded"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Fitur;