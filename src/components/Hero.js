import React from 'react'

function Hero() {
    return (
        <div className="grid grid-cols-4 bg-gray-300">
            <div className="col-span-2 bg-teal-200 h-full px-10 py-2">
                <div className="flex flex-col justify-items-center text-center">
                    <h1 className="text-4xl font-mono">
                        Journey With The Jackson's
                    </h1>
                    <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate et sunt sapiente in nam accusantium nulla incidunt vitae necessitatibus, distinctio labore sint ipsa quod vero temporibus quae officiis? Recusandae, odit.
                    </p>
                    <button className="bg-teal-600 mx-auto px-4 py-1 rounded-md text-white">Join The Journey</button>
                </div>
            </div>
            <div className="col-span-2 bg-teal-400 h-full row-span-2">Some Image</div>
            <div className="col-span-2 bg-teal-500 h-full">Picture</div>

        </div>
    )
}

export default Hero